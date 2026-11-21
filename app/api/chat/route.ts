import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/assistant-knowledge';

export const runtime = 'nodejs';

// The SDK reads ANTHROPIC_API_KEY from the environment by itself.
const client = new Anthropic();

// Limits enforced in code. Anyone can call this URL with anything, so we never trust the browser.
// Every message we keep is paid for again on each request, so these also cap cost.
const MAX_MESSAGE_LENGTH = 500; // characters per message
const MAX_INCOMING = 40; // reject absurdly large payloads outright
const MAX_KEPT = 10; // only the most recent messages go to Claude

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// Returns a clean message list, or null if the input is not acceptable.
function parseMessages(input: unknown): ChatMessage[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_INCOMING) return null;

  const clean: ChatMessage[] = [];
  for (const item of input) {
    if (typeof item !== 'object' || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string') return null;
    const text = content.trim();
    if (!text || text.length > MAX_MESSAGE_LENGTH) return null;
    clean.push({ role, content: text });
  }

  // Keep only the most recent messages, and the conversation must start with the visitor.
  const recent = clean.slice(-MAX_KEPT);
  while (recent.length && recent[0].role !== 'user') recent.shift();

  // The last message must be the visitor's, because that is what Claude answers.
  if (recent.length === 0 || recent[recent.length - 1].role !== 'user') return null;
  return recent;
}

// STEP 6a: the browser sends the whole conversation; Claude has no memory of its own.
export async function POST(req: Request) {
  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const messages = parseMessages(body.messages);
  if (!messages) {
    return NextResponse.json({ error: 'Invalid messages.' }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
      max_tokens: 500,
      system: buildSystemPrompt(),
      messages,
    });

    // The reply is a list of content blocks; we keep the text ones.
    const reply = response.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('');

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat: Claude request failed', err);
    return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
  }
}
