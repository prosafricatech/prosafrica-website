'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// STEP 5: floating chat widget. It sits above the WhatsApp button on every page.
// STEP 5b: replies come from /api/chat (see getReply below). STEP 6a: the whole conversation is sent each time.

type Msg = { role: 'user' | 'assistant'; content: string };

const MAX_LEN = 500;
const WELCOME: Msg = {
  role: 'assistant',
  content: 'Hi! Ask me anything about ProsERP: its modules, the industries it serves, or how to get started.',
};

// The ONLY place that knows where replies come from: our own server route, never Anthropic directly.
// (The API key lives on the server; the browser only ever talks to /api/chat.)
async function getReply(history: Msg[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || typeof data?.reply !== 'string') throw new Error(data?.error || 'Request failed');
  return data.reply;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    const next: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setSending(true);
    try {
      // The welcome line is only for display; the conversation Claude sees starts with the visitor.
      const reply = await getReply(next.filter((m) => m !== WELCOME));
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div
          role="dialog"
          aria-label="ProsERP assistant"
          inert={!open}
          aria-hidden={!open}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          className={cn(
            'fixed right-4 bottom-[156px] z-50 flex h-[min(520px,calc(100dvh-12rem))] w-[min(380px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_20px_50px_rgba(12,10,46,0.25)] sm:right-6 sm:bottom-[172px]',
            // open/close animation: fade + slight scale and slide from the launcher corner (skipped for reduced motion)
            'transition-[opacity,transform,visibility] duration-250 ease-out motion-reduce:transition-none',
            open ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible translate-y-3 scale-95 opacity-0'
          )}
        >
          <div className="flex items-center justify-between bg-navy px-5 py-4 text-white">
            <div>
              <p className="text-base font-bold">ProsERP assistant</p>
              <p className="text-xs text-[#C9CCF5]">Ask about modules, industries and getting started</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="cursor-pointer rounded-full p-1.5 text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="size-5" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-alt px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[15px] leading-[1.55]',
                  m.role === 'user' ? 'self-end bg-indigo text-white' : 'self-start bg-white text-ink'
                )}
              >
                {m.content}
              </div>
            ))}
            {sending && <div className="self-start rounded-2xl bg-white px-4 py-2.5 text-[15px] text-muted">Typing…</div>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-end gap-2 border-t border-border bg-white p-3"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              maxLength={MAX_LEN}
              rows={1}
              placeholder="Type your question"
              aria-label="Your message"
              className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-border px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-indigo"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Send message"
              className="flex size-11 flex-none cursor-pointer items-center justify-center rounded-full bg-indigo text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat with the ProsERP assistant'}
        aria-expanded={open}
        className="fixed right-4 bottom-[88px] z-50 flex size-14 cursor-pointer items-center justify-center rounded-full bg-indigo text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo sm:right-6 sm:bottom-[104px]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('absolute size-7 transition duration-250 motion-reduce:transition-none', open ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100')}
          aria-hidden
        >
          <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className={cn('absolute size-6 transition duration-250 motion-reduce:transition-none', open ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0')}
          aria-hidden
        >
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </>
  );
}
