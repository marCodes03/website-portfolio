---
id: CHG-0004
title: Rate limiting also works without Upstash (local development)
status: implemented
created: 2026-11-18
amends: [platform/request-guard]
superseded_by:
---

# Local rate limiting

## Purpose
Without Upstash credentials the limiter is skipped, so local runs behave differently from production. Developers should be able to see the 429 behaviour locally.

## Decision needed (default proposed)
**Proposed: an in-memory fallback limiter used only when Upstash is not configured and the app is not running on Vercel.** Alternative: keep fail-open and document it as an accepted gap (no code change).

## Requirements
- **R1.** When Upstash variables are missing and `VERCEL_ENV` is unset (local), requests are limited to the same 10 per minute per client as production, using a per-process in-memory sliding window.
- **R2.** On Vercel, behaviour is unchanged: Upstash when configured; if not configured, fail open with the existing warning (an in-memory counter is not used there because it does not share state across instances).
- **R3.** A limited request returns the same 429 body and CORS headers as today.
- **R4.** The warning logged when Upstash is missing says which mode is active ("in-memory (local)" or "disabled").

## Acceptance criteria
- [ ] Locally, the 11th request to `/api/chat` within a minute returns 429.
- [ ] With Upstash set, behaviour is identical to today.
- [ ] With `VERCEL_ENV=production` and no Upstash, requests pass and the warning says "disabled".

## Accessibility
Not applicable.

## Edge cases and errors
Server restarts clear the in-memory counts. Memory use is bounded by pruning expired entries.

## Out of scope
Changing limits (10/min) or the client identifier.

## Files
`api/_lib/request-guard.ts`

**Decision recorded:** In-memory fallback only when not on Vercel (approved by the user); on Vercel without Upstash it still fails open with a warning.

## Related
[platform/request-guard](../platform/request-guard.md), [platform/api-chat](../platform/api-chat.md), [platform/api-contact](../platform/api-contact.md)

## Change log
- 2026-11-18: created (draft).
- 2026-11-18: approved by the user and implemented; verified in a browser / by request.
- 2026-11-19: R2 (fail open on Vercel) replaced by [CHG-0023](0023-api-hardening-and-clock.md) R1 (fail closed, 503).
