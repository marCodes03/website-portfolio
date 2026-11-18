---
id: CHG-0010
title: Chat bot announces replies cleanly and closes with Escape from anywhere
status: implemented
created: 2026-11-18
amends: [features/chat-bot]
superseded_by:
---

# Chat announcements and Escape

## Purpose
Two accessibility gaps from the spec review: the typing status was nested inside the live message log and every message was read out with a speaker prefix; and Escape only closed the chat while keyboard focus was inside it.

## Requirements
- **R1.** The typing status is a separate, always-mounted `role="status"` region outside the message log, reading "marCodes Bot is typing" while a reply is pending and empty otherwise. No `role="status"` is nested inside the log.
- **R2.** Bot replies are announced as their plain text with no speaker prefix. The visitor's own messages keep a screen-reader-only "You: " prefix so the history stays understandable.
- **R3.** Pressing Escape while the chat is open closes it from anywhere on the page.
- **R4.** If a project or certificate modal is open, Escape closes only the modal, not the chat behind it.
- **R5.** On close, focus returns to the toggle button only if it was inside the chat panel (or nowhere); closing with Escape while the visitor is elsewhere does not move their focus.

## Acceptance criteria
- [x] With the chat open and focus on a header link, Escape closes the chat and focus stays on that link.
- [x] With focus inside the chat, Escape closes it and focus lands on the toggle.
- [x] A bot reply contains no "marCodes Bot:" text; a visitor message does contain "You:".
- [x] The log contains zero `role="status"` elements; one status region exists outside it.
- [ ] Escape with a modal open leaves the chat open (implemented, not exercised in a browser).

## Accessibility
This is the accessibility change; keeps `role="log"` with `aria-live="polite"`.

## Edge cases and errors
Two live regions announce independently, so a reply and the end of "typing" are not merged into one announcement.

## Out of scope
Persisting chat history.

## Files
`src/app/components/chat-bot/chat-bot.component.ts`

## Related
[features/chat-bot](../features/chat-bot.md), [quality/accessibility](../quality/accessibility.md)

## Change log
- 2026-11-18: created and implemented in the same pass at the user's request.
