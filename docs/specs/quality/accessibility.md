---
id: quality/accessibility
title: Accessibility bar
status: implemented
created: 2026-11-18
amends: []
---

# Accessibility

## Purpose
The minimum every page and feature must meet. `AGENTS.md` requires passing all AXE checks and WCAG AA.

## Requirements
- **R1.** Axe (wcag2a, wcag2aa, wcag21aa, best-practice) reports zero violations on the idle page in light and dark themes, and with the chat, project modal and certificate modal open.
- **R2.** Every interactive element is reachable and operable by keyboard, has an accessible name, and shows a visible `focus-visible` indicator. Icon-only buttons have `aria-label`; decorative Material icon spans have `aria-hidden="true"`.
- **R3.** Every `<button>` has an explicit `type`. Non-visual text alternatives exist for informative images (`alt`).
- **R4.** Text is at least 12px (`text-xs`) and meets 4.5:1 contrast (3:1 for large text) in both themes. Text on the always-dark sections uses `.accent-on-dark` so the light-theme accent is not used there.
- **R5.** Dialogs have `role="dialog"`, an accessible name, focus moved in on open and restored on close, and Escape to close.
- **R6.** Live updates are announced: chat replies (`role="log"`), toasts (`role="alert"` or `role="status"`), form errors (linked with `aria-describedby`).
- **R7.** `prefers-reduced-motion: reduce` collapses animations and transitions to near zero and disables smooth scrolling.
- **R8.** A skip link and a `<main id="main-content">` landmark exist; heading levels do not skip.

## Acceptance criteria
- [ ] Run axe against the idle page (light and dark) and each open dialog: 0 violations.
- [ ] Tab through the whole page: nothing is skipped or trapped (except the known modal gap below); the closed chat drawer contributes no Tab stops.
- [ ] Emulate reduced motion: marquees and entrances stop animating.

## Accessibility
This spec is the accessibility bar itself.

## Edge cases and errors
Known gaps, each a candidate change spec: focus is not trapped inside modals; the dropdown has no arrow-key support; skills tabs and career-path steps lack tab or `aria-current` semantics (unverified); portfolio arrows are invisible until hover; toast timing has no pause; around 40 contrast checks in overlay states are not machine-verifiable and were checked by eye.

## Files
Applies project-wide; shared pieces in `src/styles.css` (`.skip-link`, reduced-motion block, `.accent-on-dark`).

## Related
`AGENTS.md` (Accessibility Requirements), [design-tokens](design-tokens.md), [detail-modals](../features/detail-modals.md), [chat-bot](../features/chat-bot.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0002](../changes/0002-modal-focus-trap.md) (Trap keyboard focus inside open modals). Any "known gap" above that this resolves is now closed.
- 2026-11-18: amended by [CHG-0010](../changes/0010-chat-announcements-and-escape.md) (chat live regions and Escape).
- 2026-11-18: amended by [CHG-0011](../changes/0011-safe-scroll-reveal.md) (scroll reveal never leaves content hidden).
- 2026-11-19: amended by [CHG-0008](../changes/0008-taste-skill-accessibility-fixes.md) (taste-skill checker fixes: focus ring and stops, 44px tap targets, no hidden content without JS or under reduced motion).
- 2026-11-19: amended by [CHG-0012](../changes/0012-automated-axe-check.md) (`npm run test:a11y` runs axe across themes, widths and interactive states).
