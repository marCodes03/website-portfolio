---
id: CHG-0023
title: Fail-closed rate limiting, chat output cap, trusted client IP, injectable clock
status: implemented
created: 2026-11-19
amends: [platform/request-guard, platform/api-chat, features/chat-bot, pages/footer]
superseded_by:
---

# API hardening and injectable clock

## Purpose
The pre-push review found that rate limiting silently turns off on Vercel when Upstash is missing or down, that the limiter key can be influenced by the client, that a chat reply has no length cap, and that components read the `Date` global directly (AGENTS.md says not to assume globals). Approved by the user on 2026-11-19 ("Hygiene fixes, Rate limiter hardening, Gemini cost cap, new Date() violations").

## Requirements
- **R1.** On Vercel (`VERCEL_ENV` set), when `UPSTASH_REDIS_REST_URL` or `UPSTASH_REDIS_REST_TOKEN` is missing, `/api/chat` and `/api/contact` return `503` with a generic JSON error and CORS headers. They do not process the request. This replaces CHG-0004 R2 (fail open).
- **R2.** When the Upstash call throws, the endpoint returns the same `503` and logs only the error message, never the request body.
- **R3.** Locally (no `VERCEL_ENV`) the in-memory limiter from CHG-0004 still applies; behaviour is unchanged.
- **R4.** The client identifier is `x-vercel-forwarded-for`, else `x-real-ip`, else the first `x-forwarded-for` entry, else `unknown`.
- **R5.** The Gemini call in `api/_lib/chat-assistant.ts` sets `maxOutputTokens` to 400.
- **R6.** No component calls `new Date()` itself. `ClockService.now()` is the only reader of the current time; the footer year and chat message timestamps use it.

## Acceptance criteria
- [ ] With the Upstash variables unset and `VERCEL_ENV=production`, a POST to `/api/contact` returns 503 and sends no email.
- [ ] With valid variables, the 11th request in a minute still returns 429.
- [ ] Sending a spoofed `x-forwarded-for` together with `x-real-ip` does not change the identifier used.
- [ ] A long reply from Gemini is cut at the configured token cap.
- [ ] `grep "new Date" src/app` matches only `clock.service.ts`.
- [ ] Footer still shows the current year; chat bubbles still show a time.

## Accessibility
None affected. The 503 body uses the same generic wording style the chat and contact dialogs already show for failures.

## Edge cases and errors
Upstash outage: visitors see the existing "try again" message in the chat and contact dialog; the owner sees a server log line. A reply cut by the token cap ends mid-sentence rarely because the prompt asks for 2-4 sentences.

## Out of scope
CAPTCHA or honeypot on the contact form, a global daily Gemini cap, and CSP or other security headers (noted by the review as follow-ups).

## Files
- `api/_lib/request-guard.ts`
- `api/_lib/chat-assistant.ts`
- `src/app/shared/clock.service.ts` (new)
- `src/app/components/footer/footer.component.ts`
- `src/app/components/chat-bot/chat-bot.component.ts`

## Related
`docs/decisions.md`: "2026-11-19 - Pre-push review fixes (CHG-0023 to CHG-0025)". Replaces [CHG-0004](0004-local-rate-limiting.md) R2.

## Change log
- 2026-11-19: created and implemented.
