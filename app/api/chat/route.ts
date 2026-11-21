import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/assistant-knowledge";
import { checkLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

// The SDK reads ANTHROPIC_API_KEY from the environment by itself.
const client = new Anthropic();

// Limits enforced in code. Anyone can call this URL with anything, so we never trust the browser.
// Every message we keep is paid for again on each request, so these also cap cost.
const MAX_USER_LENGTH = 500; // characters per visitor message
const MAX_ASSISTANT_LENGTH = 4000; // Claude's own earlier replies can be long (max_tokens 500 is about 2,000 characters)
const MAX_INCOMING = 40; // reject absurdly large payloads outright
const MAX_KEPT = 10; // only the most recent messages go to Claude
const MAX_BODY_BYTES = 60_000; // rejected before we even read the body

// Rate limits (see lib/rate-limit.ts for the in-memory caveat).
const PER_IP_PER_MINUTE = 10;
const PER_IP_PER_DAY = 50;
const GLOBAL_PER_DAY = 300; // whole site: a hard ceiling on daily cost
const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;

type ChatMessage = { role: "user" | "assistant"; content: string };

// Returns a clean message list, or null if the input is not acceptable.
function parseMessages(input: unknown): ChatMessage[] | null {
  if (
    !Array.isArray(input) ||
    input.length === 0 ||
    input.length > MAX_INCOMING
  )
    return null;

  const clean: ChatMessage[] = [];
  for (const item of input) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const text = content.trim();
    const maxLength = role === 'user' ? MAX_USER_LENGTH : MAX_ASSISTANT_LENGTH;
    if (!text || text.length > maxLength) return null;
    clean.push({ role, content: text });
  }

  // Keep only the most recent messages, and the conversation must start with the visitor.
  const recent = clean.slice(-MAX_KEPT);
  while (recent.length && recent[0].role !== "user") recent.shift();

  // The last message must be the visitor's, because that is what Claude answers.
  if (recent.length === 0 || recent[recent.length - 1].role !== "user")
    return null;
  return recent;
}

// Who is calling? Behind a proxy (Vercel) the real address is the first entry of x-forwarded-for.
function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "local";
}

function tooMany(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: "Too many messages. Please try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}

export async function POST(req: Request) {
  // 1. Cheap checks first: they cost nothing and reject junk before any real work.
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  // Browsers always send Origin on a cross-site POST. Reject when it is not our own site.
  // (A script can fake headers, so this only stops casual cross-site use, not determined abuse.)
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  // 2. Rate limits, before parsing and before calling Claude, so blocked requests cost nothing.
  const ip = clientIp(req);
  const perMinute = await checkLimit(`ip-min:${ip}`, PER_IP_PER_MINUTE, MINUTE);
  if (!perMinute.ok) return tooMany(perMinute.retryAfterSeconds);
  const perDay = await checkLimit(`ip-day:${ip}`, PER_IP_PER_DAY, DAY);
  if (!perDay.ok) return tooMany(perDay.retryAfterSeconds);
  const global = await checkLimit("global-day", GLOBAL_PER_DAY, DAY);
  if (!global.ok) return tooMany(global.retryAfterSeconds);

  // 3. Parse and validate the body.
  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = parseMessages(body.messages);
  if (!messages) {
    return NextResponse.json({ error: "Invalid messages." }, { status: 400 });
  }

  // 4. Ask Claude, and pass the answer on piece by piece as it is written (streaming).
  try {
    // With stream: true the request starts here. HTTP-level failures (billing, bad key) throw here,
    // before we have sent anything, so we can still answer with a proper error status.
    const events = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
      max_tokens: 500,
      system: buildSystemPrompt(),
      messages,
      stream: true,
    });

    const encoder = new TextEncoder();
    let inputTokens = 0;
    let outputTokens = 0;

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of events) {
            if (event.type === 'message_start') {
              inputTokens = event.message.usage.input_tokens;
            } else if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text)); // one small piece of the answer
            } else if (event.type === 'message_delta') {
              outputTokens = event.usage.output_tokens;
            }
          }
          // The cost of this request, visible in your terminal.
          console.log(`Chat usage: ${inputTokens} in, ${outputTokens} out`);
          controller.close();
        } catch (err) {
          console.error('Chat: stream failed', err);
          controller.error(err); // the browser's reader throws, so the widget knows the answer is incomplete
        }
      },
      cancel() {
        events.controller.abort(); // the visitor closed the page: stop paying for the rest of the answer
      },
    });

    return new Response(body, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  } catch (err) {
    console.error('Chat: Claude request failed', err);
    return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
  }
}
