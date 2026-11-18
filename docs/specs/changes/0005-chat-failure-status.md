---
id: CHG-0005
title: Chat API returns an error status when the model call fails
status: implemented
created: 2026-11-18
amends: [platform/api-chat, features/chat-bot]
superseded_by:
---

# Chat failure status

## Purpose
When Gemini fails, `/api/chat` returns HTTP 200 with an apology, so outages are invisible to monitoring and logs of status codes. The visitor-facing result should stay the same, but the status should tell the truth.

## Requirements
- **R1.** If the model call throws or times out, `/api/chat` returns **502** with JSON `{ error: "upstream_unavailable", reply: <fixed apology> }`. No upstream message or stack is included.
- **R2.** The cause is still logged server-side.
- **R3.** The chat UI treats any non-2xx as a failure and shows the same fixed apology bubble it shows today (the UI already does this for network errors); it may use `reply` from the body when present.
- **R4.** All other statuses are unchanged (400, 405, 429, 500 for missing key).
- **R5.** The same change applies to the local server because it mounts the same handler.

## Acceptance criteria
- [ ] With the model call forced to fail, the response status is 502 and the body has no error text from upstream.
- [ ] The chat shows exactly one apology bubble, the same text as before.
- [ ] Successful replies are unchanged (200 `{ reply }`).

## Accessibility
No change; the apology is announced by the existing live log.

## Edge cases and errors
A timeout is treated as a failure. A reply that is empty but not an error stays as the existing "couldn't generate a response" text with 200.

## Out of scope
Retries, fallback models, alerting.

## Files
`api/chat.ts`

**Decision recorded:** Model failure returns 502 `{ error: "upstream_unavailable", reply }` (approved by the user); the chat UI is unchanged because it already shows the same apology on any failed request.

## Related
[platform/api-chat](../platform/api-chat.md), [features/chat-bot](../features/chat-bot.md)

## Change log
- 2026-11-18: created (draft).
- 2026-11-18: approved by the user and implemented; verified in a browser / by request.
