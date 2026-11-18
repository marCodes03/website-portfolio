---
id: features/chat-bot
title: Chat bot ("marCodes Bot")
status: implemented
created: 2026-11-18
amends: []
---

# Chat Bot

## Purpose
An AI assistant that answers visitors' questions about Marco using the portfolio content.

## Requirements
- **R1.** A floating round button at the bottom-right (above the theme button) opens a right-side drawer, 400px wide from `sm` up, full width on mobile. The component is lazy loaded after the page is idle (`@defer (on idle)`).
- **R2.** The drawer opens with a welcome message from the bot. Messages show a speaker prefix for screen readers, the text, and a short time.
- **R3.** Three suggestion chips are shown from a pool of 24 questions; "Rotate" picks three new ones, and sending any message rotates them.
- **R4.** The visitor types in a text input (max 500 characters) and presses Enter or the send button. Blank input is ignored, and sending is blocked while a reply is pending.
- **R5.** Sending POSTs `{ message }` to `/api/chat` (see [api-chat](../platform/api-chat.md)). While waiting a three-dot typing indicator shows. The reply is appended as a bot message.
- **R6.** If the request fails, or the reply is empty, the bot shows a fixed apology message instead of an error.
- **R7.** The message list auto-scrolls to the newest message.
- **R8.** Opening the drawer moves focus to the input; closing it (close button, toggle, or Escape while focus is inside) returns focus to the toggle button.
- **R9.** When closed the drawer is hidden and `inert`, so none of its controls can be tabbed to.

## Acceptance criteria
- [ ] Open → focus is in "Ask about Marco…"; Escape closes and focus returns to the toggle.
- [ ] Send "Who is Marco?" → user bubble, typing dots, then a bot bubble.
- [ ] A 501-character message cannot be typed; a direct API call with 501 characters returns 400.
- [ ] With the API offline the apology message appears and the input stays usable.
- [ ] Closed drawer contributes no Tab stops.

## Accessibility
`role="dialog"` with a name, `aria-modal="false"`; message list is `role="log"` with `aria-live="polite"`; the typing indicator is `role="status"`; icon buttons are labelled; the input has a visually hidden label; all text is at least 12px; `focus-visible` rings throughout. Known gaps: the `role="status"` typing indicator is nested inside the live log (may double-announce); Escape only works while focus is inside the drawer.

## Edge cases and errors
Chat history is in memory only and is lost on reload. Rate limit: 10 requests per minute per IP, which shows the apology message.

## Files
`src/app/components/chat-bot/chat-bot.component.ts`, `src/app/components/chat-bot/chat-bot.service.ts`, `src/app/app.html`

## Related
[api-chat](../platform/api-chat.md), [request-guard](../platform/request-guard.md), [accessibility](../quality/accessibility.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0005](../changes/0005-chat-failure-status.md) (Chat API returns an error status on model failure). Any "known gap" above that this resolves is now closed.
- 2026-11-18: amended by [CHG-0010](../changes/0010-chat-announcements-and-escape.md) (cleaner announcements; Escape from anywhere; focus only returned when it was inside the panel).
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): The chat can be opened from the hero, workflow and closing band; focus returns to the opener on close.
- 2026-11-19: amended by [CHG-0019](../changes/0019-dialog-tap-targets.md) (chat controls at 44px).
- 2026-11-19: amended by [CHG-0022](../changes/0022-chat-thinking-indicator.md): a thinking bubble with three wave dots while waiting, "Still working on it..." after 8 seconds, and replies typed out at about 80 characters per second with a Skip control (instant under reduced motion).
- 2026-11-19: amended by [CHG-0013](../changes/0013-layout-rhythm.md) (layout rhythm).
- 2026-11-19: amended by [CHG-0023](../changes/0023-api-hardening-and-clock.md) (replies capped at 400 tokens; timestamps from ClockService) and [CHG-0024](../changes/0024-chat-knowledge-base-pipeline.md) (knowledge base pipeline).
