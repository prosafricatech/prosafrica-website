// STEP 7: a simple in-memory rate limiter (fixed window).
//
// IMPORTANT LIMIT: the counters live in this server process. On serverless hosting (e.g. Vercel) each
// request may run in a fresh instance, so in production this is only a rough brake, not a guarantee.
// Everything goes through checkLimit(), so swapping the body for Upstash Redis later changes nothing else.

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();
const MAX_ENTRIES = 5000; // stops a flood of unique visitors from growing memory forever

export type LimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

export async function checkLimit(key: string, limit: number, windowMs: number): Promise<LimitResult> {
  const now = Date.now();

  if (store.size > MAX_ENTRIES) {
    for (const [k, e] of store) if (e.resetAt <= now) store.delete(k);
    // still too big: drop the oldest entries (a Map iterates in insertion order)
    for (const k of store.keys()) {
      if (store.size <= MAX_ENTRIES) break;
      store.delete(k);
    }
  }

  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (entry.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { ok: true };
}
