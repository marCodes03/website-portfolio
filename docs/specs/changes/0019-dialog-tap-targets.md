---
id: CHG-0019
title: Dialog controls meet the 44px target size
status: draft
created: 2026-11-19
amends: [features/detail-modals, features/chat-bot]
superseded_by:
---

# Dialog controls meet the 44px target size

## Purpose
CHG-0008 set the site's tap-target bar at 44 px, but the page-level checker never opened the dialogs. A scripted pass over the project modal, the certificate modal and the chat panel (2026-11-19, 1440 and 390 px, light and dark) found controls under 44 px. Everything else checked passed: focus moves into each modal on open, Tab never leaves a modal, Escape closes it and returns focus to the opener, the page is scroll-locked, and axe-core reports 0 violations in all 20 states (`npm run test:a11y`).

## Requirements
- **R1. Modal close buttons.** The close button in the project modal and the certificate modal (now 40x40 px) has a hit area of at least 44x44 px at every width, without changing its visible size or position.
- **R2. Chat controls.** In the chat panel, the close button (32x38), the send button (36x36), the suggested-topic chips (30 px tall), the Rotate button (71x24) and the message input (42 px tall) each have a hit area of at least 44 px in height, and 44 px in width for icon-only buttons. Hit areas of neighbouring chips do not overlap.
- **R3. No visual redesign.** Extend hit areas with padding, `min-height`, or the shared `.tap-44` class; visible sizes change only where a control would otherwise overlap its neighbour, and the chat panel still fits at 390x844 without horizontal scroll.
- **R4. Focus return from chat.** When the chat panel is closed with Escape or its close button while focus is inside it, focus returns to the chat toggle button. Closing while focus is elsewhere does not move focus.

## Acceptance criteria
- [ ] AC1. Re-running the dialog scan (open each dialog, list controls under 44 px) reports none, at 1440 and 390 px in light and dark.
- [ ] AC2. `npm run test:a11y` still reports 0 violations in all 20 states.
- [ ] AC3. Keyboard: opening the chat, pressing Escape returns focus to the toggle (R4); Tab stays inside both modals; Escape closes them.
- [ ] AC4. Screenshots at 390 and 1440 show no visible change to the modals and no overlap or wrapping problem in the chat panel.

## Accessibility
Raises pointer target size; no change to names, roles, or focus order. Contrast unchanged.

## Edge cases and errors
- Narrow viewport (320 px): chips wrap onto more lines rather than overflow.
- Reduced motion: no change.
- Dark theme: focus ring and hit areas checked in both themes.

## Out of scope
Restyling the chat or modals, new modal content, and the floating chat/theme buttons (already 56 px).

## Files
Filled in when implemented.

## Related
[features/detail-modals](../features/detail-modals.md), [features/chat-bot](../features/chat-bot.md), [0002](0002-modal-focus-trap.md), [0008](0008-taste-skill-accessibility-fixes.md), [0010](0010-chat-announcements-and-escape.md), [0012](0012-automated-axe-check.md).

## Change log
- 2026-11-19: created.
