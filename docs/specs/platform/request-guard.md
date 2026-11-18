---
id: platform/request-guard
title: Request guard (CORS and rate limiting)
status: implemented
created: 2026-11-18
amends: []
---

# Request Guard

## Purpose
Shared protection for the two API endpoints: which origins may call them, and how often one client may.

## Requirements
- **R1.** CORS headers on every response: methods `POST, OPTIONS`; headers `Content-Type, Authorization`.
- **R2.** `Access-Control-Allow-Origin` is: `https://<VERCEL_URL>` when `VERCEL_ENV` is `preview`; otherwise `https://<VERCEL_PROJECT_PRODUCTION_URL>` when set; otherwise `*` (local development).
- **R3.** Rate limit: a sliding window of 10 requests per minute per client, stored in Upstash Redis, shared by both endpoints. The client is the first address in `x-forwarded-for`, else `x-real-ip`, else `"unknown"`.
- **R4.** A limited request gets 429 `{ error: "Too many requests. Please try again shortly." }` with the CORS headers.
- **R5.** If `UPSTASH_REDIS_REST_URL` or `UPSTASH_REDIS_REST_TOKEN` is missing, rate limiting is skipped (fails open) and a warning is logged once.

## Acceptance criteria
- [ ] The 11th request within a minute from one IP gets 429 (with Upstash configured).
- [ ] With the Upstash variables unset, requests succeed and a warning appears in the log.
- [ ] A preview deployment answers with its own `VERCEL_URL` origin.

## Accessibility
Not applicable.

## Edge cases and errors
Locally there is effectively no rate limiting unless Upstash is configured, so local behaviour differs from production. A second production domain (see [seo-and-social-meta](seo-and-social-meta.md)) is not in the allowed-origin list, which only affects cross-origin calls (same-origin calls ignore CORS). `vercel dev` (`VERCEL_ENV=development`) may pick the production origin (unverified).

## Files
`api/_lib/request-guard.ts`

## Related
[api-chat](api-chat.md), [api-contact](api-contact.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0004](../changes/0004-local-rate-limiting.md) (Rate limiting also works locally without Upstash). Any "known gap" above that this resolves is now closed.
- 2026-11-18: refactor, no behaviour change: jsonResponse(body, status, corsHeaders) is exported from the guard and used by both endpoints.
