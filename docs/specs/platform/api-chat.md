---
id: platform/api-chat
title: Chat API (`/api/chat`)
status: implemented
created: 2026-11-18
amends: []
---

# Chat API

## Purpose
Server endpoint that turns a visitor's question into a reply from Google Gemini, grounded in the portfolio content.

## Requirements
- **R1.** `POST /api/chat` with JSON `{ "message": string }`. On Vercel it is an Edge function (`api/chat.ts`); locally the same handler is mounted by `src/server.ts`.
- **R2.** `OPTIONS` returns 204 with CORS headers; any other method except `POST` returns 405 `{ error: "Method not allowed" }`.
- **R3.** Before any work, the request is rate limited (see [request-guard](request-guard.md)); a limited request returns 429.
- **R4.** The body must contain a non-blank string `message` of at most 500 characters; otherwise 400 with an `error` string. A body that is not valid JSON is treated as a missing message (400).
- **R5.** If `GEMINI_API_KEY` is not set, return 500 `{ error: "Server configuration error" }` and log the cause server-side.
- **R6.** Success: 200 `{ reply: string }`. The model is `gemini-2.5-flash` at temperature 0.7 with a system prompt made of the persona and tone rules plus the full text of `docs/portfolio-content.md`. An empty model response becomes "I'm sorry, I couldn't generate a response."
- **R7.** If the model call throws, log the error server-side and return **200** `{ reply: <fixed apology> }`. The response never contains the error message or stack.
- **R8.** The knowledge text is embedded at build time: `npm run generate:chat-context` (run automatically before `start` and `build`) writes `api/_lib/portfolio-content.generated.ts` from `docs/portfolio-content.md`.

## Acceptance criteria
- [ ] 501-character message → 400; empty or whitespace → 400; number → 400.
- [ ] GET → 405; OPTIONS → 204.
- [ ] Without the key → 500 and no secret in the body.
- [ ] Forcing the model call to fail → 200 with the apology and nothing from the error.
- [ ] Editing `docs/portfolio-content.md` and rebuilding changes what the bot knows.

## Accessibility
Not applicable (API); see [chat-bot](../features/chat-bot.md).

## Edge cases and errors
Returning 200 on model failure hides outages from monitoring; it is an accepted trade-off so the UI always shows a normal bot bubble (not logged as a decision yet). The generated file is committed, so it can be stale if the generator is not run.

## Files
`api/chat.ts`, `api/_lib/chat-assistant.ts`, `api/_lib/portfolio-content.generated.ts`, `scripts/generate-chat-context.mjs`, `src/server.ts`

## Related
[chat-bot](../features/chat-bot.md), [request-guard](request-guard.md), `docs/portfolio-content.md`

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0005](../changes/0005-chat-failure-status.md) (Chat API returns an error status on model failure). Any "known gap" above that this resolves is now closed.
- 2026-11-18: refactor, no behaviour change: responses now go through the shared jsonResponse helper.
- 2026-11-19: amended by [CHG-0023](../changes/0023-api-hardening-and-clock.md) (maxOutputTokens 400) and [CHG-0024](../changes/0024-chat-knowledge-base-pipeline.md) (generated knowledge-base module is untracked).
