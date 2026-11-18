---
id: CHG-0022
title: Chat "thinking" indicator, slow-reply note and typed-out replies
status: implemented
created: 2026-11-19
amends: [features/chat-bot]
superseded_by:
---

# Chat "thinking" indicator, slow-reply note and typed-out replies

## Purpose
While the chat waits for the model, the only signal is three tiny grey pulsing dots (6px) that are easy to miss, and a slow reply gives no sign that anything is still happening. The user asked for a thinking indicator and chose, from options: animated thinking dots in the bubble, a still version for reduced motion, and a note when the reply is slow.

Update 2026-11-19: the user also asked for the bot reply to appear as if typed. Choices: about 80 characters per second; a visible "Skip" control; instant full text for reduced motion; folded into this spec so one approval covers waiting and reading.

## Requirements
- **R1.** While a reply is pending the bot side of the log shows a bubble (same shape, border and colours as bot messages) containing three dots that animate in a calm wave: each dot fades and rises 3px in sequence, 1.2s loop, staggered 150ms, using ease-in-out (no bounce or overshoot).
- **R2.** The dots are 8px, use the accent colour at 75% to 100% opacity (a 40% trough measured only about 1.8:1 in light mode, so it was raised), and have at least 3:1 contrast against the bubble in both themes.
- **R3.** With reduced motion requested, the dots do not move or fade: three still accent dots are shown.
- **R4.** The bubble appears within one frame of the visitor sending a message and is removed as soon as the reply (or the failure message) is added; it never stays on screen after the request ends.
- **R5.** If a reply has not arrived 8 seconds after sending, the bubble also shows the line "Still working on it…" under the dots. It is removed with the bubble.
- **R6.** Screen readers: the existing polite status region says "marCodes Bot is typing" when the wait starts; after 8 seconds it says "Still working on it". The decorative dots stay `aria-hidden`. The visible slow-reply line is not announced a second time.
- **R7.** The Send button and Enter key stay blocked while a reply is pending (existing behaviour, unchanged); the input stays editable.
- **R8.** The chat API, message flow, error message and suggestion chips are unchanged.
- **R9.** When a reply arrives it is shown typed out: characters appear left to right at about 80 per second (time-based, so the speed does not depend on frame rate), preserving line breaks, followed by a blinking caret while typing. The full reply text is never altered.
- **R10.** While a reply is typing, a "Skip" button (text name "Skip typing", at least 44px target, keyboard reachable) sits under the bubble; activating it shows the full reply at once and removes the button and caret.
- **R11.** With reduced motion requested, replies appear complete immediately: no typing, no caret, no Skip button.
- **R12.** Only bot replies from the chat API type out. The greeting, the visitor's own messages and the failure apology appear instantly.
- **R13.** Screen readers receive each reply once, complete, when it starts typing (the full text sits in a visually hidden element); the animated characters are `aria-hidden`, so no per-character announcements occur.
- **R14.** The log stays scrolled to the newest text while the reply grows.
- **R15.** If the visitor sends another message while a reply is typing, the typing finishes instantly first; at most one reply types at a time.
- **R16.** Typing continues if the chat is closed and reopened, and no timer or animation frame is left running once the reply is complete or the component is destroyed.

## Acceptance criteria
- [ ] AC1. After sending a message (API held open), a bubble with three 8px dots is visible in the log; the dots' computed animation is the wave (not bounce) and loops.
- [ ] AC2. With `prefers-reduced-motion: reduce`, the dots have no animation.
- [ ] AC3. With the API held for 9 seconds, "Still working on it…" appears at about 8 seconds and disappears when the reply arrives; the status region text changes accordingly.
- [ ] AC4. When the reply or failure message arrives, the bubble is gone and no timer remains (sending again restarts the 8s count).
- [ ] AC5. A 300-character reply takes between 3 and 5 seconds to type out (about 80 characters per second); line breaks are kept; the caret shows only while typing.
- [ ] AC6. Activating Skip shows the whole reply at once; with reduced motion the whole reply is there immediately and no Skip button exists.
- [ ] AC7. The greeting, the visitor's messages and the error apology are never typed.
- [ ] AC8. An accessibility-tree check shows each reply's full text once (hidden copy) and the animated copy `aria-hidden`.
- [ ] AC9. `npm run test:a11y` passes with the thinking state added (0 violations, light and dark, 1280px and 390px).
- [ ] AC10. `ng build` passes.

## Accessibility
Status text for assistive tech as in R6; decorative animation hidden from the accessibility tree; reduced motion respected; contrast of dots and note checked in both themes; the slow note is plain text (not colour alone).

## Edge cases and errors
- Request fails or times out: the bubble disappears with the existing apology message.
- Visitor closes the chat while waiting: state is kept; the bubble is shown again when it reopens if the reply is still pending, and removed when it arrives.
- Very long replies (up to the API limit): speed stays 80 characters per second, so a 1,500-character reply takes about 19 seconds unless skipped; the Skip button is the answer to that.
- Tab hidden while typing: typing is time-based, so it catches up when the tab is visible again.
- Two quick sends: the second is ignored while pending (existing), so there is only ever one bubble and one timer.
- Narrow screens: the bubble stays within the 80% bubble width.

## Out of scope
- Streaming replies from the server (the full reply is fetched first, then typed), progress percentages, a cancel button, changing the API or the model.
- A full-screen loading overlay.

## Files
`src/app/components/chat-bot/chat-bot.component.ts` (thinking bubble, slow-reply timer, typed replies, Skip), `src/styles.css` (`.thinking-dot`, `.typing-caret` and keyframes), `scripts/a11y-check.mjs` (answers `/api/chat` itself; new states "chat thinking" and "chat typing").

## Related
- [features/chat-bot](../features/chat-bot.md), `src/app/components/chat-bot/chat-bot.component.ts`
- Design tokens: `DESIGN.md` (accent colour; no bounce easing, see CHG-0017).

## Change log
- 2026-11-19: approved by the user and implemented. Verified in headless Chrome with a mocked API: three 8px dots with the wave animation, status "marCodes Bot is typing"; after 8s the note and status "Still working on it"; a 313-character reply typed out in about 3.7s (roughly 85 characters per second) and matched the reply exactly, line breaks kept; full text present once for screen readers while the animated copy is `aria-hidden`; Skip shows the full reply at once; with reduced motion the dots are still, replies appear complete with no caret or Skip button; the greeting is never typed. `npm run test:a11y`: 32 checks (adds thinking and typing), 0 violations. Deviation: dot opacity range 75% to 100% instead of 40% to 100%, for contrast.
- 2026-11-19: scope widened to typed-out replies (R9 to R16) at the user's request; speed, skip and reduced-motion choices recorded above.
- 2026-11-19: created. Note: the chat already shows three small pulsing dots (6px, no label, no slow-reply message); this change makes them larger and a calmer wave, adds the still reduced-motion state and the 8-second note.
