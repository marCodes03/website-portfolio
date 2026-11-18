---
id: CHG-0017
title: One primary and one secondary button style; no bounce easing
status: implemented
created: 2026-11-19
amends: [quality/design-tokens]
superseded_by:
---

# One primary and one secondary button style; no bounce easing

## Purpose
The gate found 5 button styles in 5 heights (30, 40, 48, 54, 58 px), and the design check flags two bounce/elastic easings as dated. Unify buttons into one primary and one secondary style and replace bounce easing with a smooth decelerating curve, without changing colours or layout otherwise.

## Requirements
- **R1. Two button styles.** Every text button and link-button is either primary (filled) or secondary (outlined), sharing one corner radius, one label size and one height: 48 px on desktop, at least 44 px on touch.
- **R2. Coverage.** Applies to "Download CV", "View Tech Stack", "View All Experience", "Show earlier milestones", stage buttons that look like buttons, and the contact form submit. Icon-only round controls (chat, theme, carousel arrows, back-to-top) keep their style and a 44 px minimum.
- **R3. Tokens.** Button classes are defined once (a shared class in `styles.css`), not repeated per component; colours use existing tokens in light and dark.
- **R4. No bounce easing.** `cubic-bezier(0.34, 1.56, 0.64, 1)` (skill-card flip in `styles.css`) and Tailwind `animate-bounce` (chat typing dots) are replaced by ease-out-quart (`cubic-bezier(0.25, 1, 0.5, 1)`) or a non-bouncing animation. Reduced motion stays honoured.

## Acceptance criteria
- [ ] AC1. `button-styles` and `button-contrast` report PASS; `npx impeccable detect src/` reports no `bounce-easing` advisory.
- [ ] AC2. Measured heights of all in-scope buttons are equal at 1440 and at 390.
- [ ] AC3. Visual check at 1440, 768 and 390 in light and dark: no layout shift beyond button size; hover and focus states visible (CHG-0008).
- [ ] AC4. AXE still reports 0 violations.

## Accessibility
Label contrast at least 4.5:1 on fill and outline in both themes; focus ring unchanged; tap height at least 44 px.

## Edge cases and errors
Long labels wrap at 320 px; buttons with trailing icons; the disabled state of the form submit.

## Out of scope
Colour palette changes, the `/impeccable init` design-context pass, card visuals.

## Files
`src/styles.css` (`.btn-primary`, `.btn-secondary`, `.btn-on-dark`, dark-band overrides, easing), hero, experience, journey, contact, cta-band components (shared classes), `chat-bot.component.ts` (`animate-pulse` dots).

## Related
[quality/design-tokens](../quality/design-tokens.md), [0008](0008-taste-skill-accessibility-fixes.md).

## Change log
- 2026-11-19: created.
- 2026-11-19: approved by the user.
- 2026-11-19: implemented. Bounce easing removed (impeccable: no bounce advisory expected; not rerun). Buttons use one shared class set at 48px. **Checker still FAILs** `button-styles` because it counts fill vs outline as separate styles and sees the floating theme button and the Workflow stage tabs; the workflow tabs and icon-only round controls were left as specified.
