import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/assistant-knowledge';

export const runtime = 'nodejs';

// The SDK reads ANTHROPIC_API_KEY from the environment by itself.
const client = new Anthropic();

// STEP 3: one message in, one reply out, now with site knowledge in the system prompt. No history yet.
export async function POST(req: Request) {
  let body: { message?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
      max_tokens: 500,
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: message }],
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
