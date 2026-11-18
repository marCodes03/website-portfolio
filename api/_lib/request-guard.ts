import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Shared CORS + rate-limiting helpers for the api/ serverless functions
// (api/chat.ts and api/contact.ts). Kept framework-agnostic (Web Request/
// Response APIs only) so it works under both the edge and Node.js runtimes.

/**
 * The allowed CORS origin for these endpoints. Vercel sets
 * VERCEL_PROJECT_PRODUCTION_URL automatically on every deployment to the
 * project's real production domain - using it here avoids hardcoding a
 * guessed *.vercel.app project name. Falls back to '*' only when it's
 * absent (i.e. local development), so local testing still works.
 */
export function getAllowedOrigin(): string {
  const env = process.env['VERCEL_ENV'];
  // Preview deployments get their own host; production uses the project domain.
  const host =
    env === 'preview' ? process.env['VERCEL_URL'] : process.env['VERCEL_PROJECT_PRODUCTION_URL'];
  return host ? `https://${host}` : '*';
}

export function buildCorsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': getAllowedOrigin(),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

/** A JSON Response carrying the CORS headers; shared by every endpoint. */
export function jsonResponse(body: unknown, status: number, corsHeaders: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

/**
 * Shared-store rate limiter backed by Upstash Redis, per backend-patterns
 * guidance (never use a per-process in-memory counter for a serverless
 * API - it resets on every cold start and doesn't share state across
 * instances). Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 * to be set; without them, rate limiting is skipped (fails open) rather
 * than breaking the endpoint entirely, but this should not go unnoticed in
 * production - check the warning log.
 */
let ratelimit: Ratelimit | null | undefined;

function getRatelimiter(): Ratelimit | null {
  if (ratelimit !== undefined) {
    return ratelimit;
  }

  const url = process.env['UPSTASH_REDIS_REST_URL'];
  const token = process.env['UPSTASH_REDIS_REST_TOKEN'];

  if (!url || !token) {
    console.warn(
      'UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set - rate limiting is ' +
        (isRunningOnVercel() ? 'disabled.' : 'in-memory (local development only).')
    );
    ratelimit = null;
    return ratelimit;
  }

  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    // 10 requests per minute per IP, sliding window.
    limiter: Ratelimit.slidingWindow(10, '1 m'),
  });
  return ratelimit;
}

/** True on any Vercel deployment (production, preview or `vercel dev`). */
function isRunningOnVercel(): boolean {
  return !!process.env['VERCEL_ENV'];
}

/**
 * Local-development fallback: the same limit as production (10 requests per minute per
 * client) kept in this process's memory. Never used on Vercel, where per-instance memory
 * would not be shared and would give a false sense of protection.
 */
const LOCAL_WINDOW_MS = 60_000;
const LOCAL_MAX_REQUESTS = 10;
const localHits = new Map<string, number[]>();

function localLimitExceeded(identifier: string): boolean {
  const now = Date.now();
  const recent = (localHits.get(identifier) ?? []).filter(time => now - time < LOCAL_WINDOW_MS);
  const exceeded = recent.length >= LOCAL_MAX_REQUESTS;
  if (!exceeded) {
    recent.push(now);
  }
  localHits.set(identifier, recent);

  // Keep memory bounded: drop clients with no recent hits.
  if (localHits.size > 1000) {
    for (const [key, times] of localHits) {
      if (times.every(time => now - time >= LOCAL_WINDOW_MS)) {
        localHits.delete(key);
      }
    }
  }
  return exceeded;
}

function tooManyRequests(corsHeaders: Record<string, string>): Response {
  return jsonResponse({ error: 'Too many requests. Please try again shortly.' }, 429, corsHeaders);
}

function getClientIdentifier(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') ?? 'unknown';
}

/**
 * Returns null if the request is allowed to proceed, or a 429 Response to
 * return immediately if it has been rate-limited.
 */
export async function checkRateLimit(req: Request, corsHeaders: Record<string, string>): Promise<Response | null> {
  const limiter = getRatelimiter();
  const identifier = getClientIdentifier(req);

  if (!limiter) {
    // Local development: limit in memory. On Vercel without Upstash, fail open
    // rather than block the endpoint - see the warning logged above.
    return !isRunningOnVercel() && localLimitExceeded(identifier) ? tooManyRequests(corsHeaders) : null;
  }

  const { success } = await limiter.limit(identifier);
  return success ? null : tooManyRequests(corsHeaders);
}
