---
id: CHG-0006
title: Projects carousel arrows are visible on keyboard focus
status: implemented
created: 2026-11-18
amends: [pages/portfolio]
superseded_by:
---

# Carousel arrows on focus

## Purpose
The Projects previous and next arrows are invisible until the carousel is hovered. A keyboard user who tabs to an arrow focuses something they cannot see.

## Requirements
- **R1.** The arrows become fully visible when the carousel contains keyboard focus (focus-visible), as well as on hover.
- **R2.** A focused arrow shows a visible focus ring.
- **R3.** On touch devices with no hover (`hover: none`), the arrows are visible at all times, or removed from the tab order if hidden; they are not left invisible but focusable.
- **R4.** Behaviour on click (scroll by one container width), labels ("Previous projects", "Next projects") and positions are unchanged.

## Acceptance criteria
- [ ] Tab to the carousel: arrows appear and the focused one has a ring.
- [ ] Hover still reveals them; moving away hides them again when not focused.
- [ ] On a touch viewport the arrows are never invisible-but-focusable.
- [ ] No horizontal page overflow at 390, 820 and 1280 px.

## Accessibility
This is the accessibility change; contrast of the arrow against the dark section stays at least 3:1.

## Edge cases and errors
Arrow at the first/last card: stays enabled (as today) unless a later spec says otherwise.

## Out of scope
The Off-Screen carousel (its arrows are already visible from `md` up).

## Files
`src/app/components/portfolio/portfolio.component.ts`

**Decision recorded:** Arrows show on hover, on focus anywhere inside the carousel, and always on devices with no hover.

## Related
[pages/portfolio](../pages/portfolio.md), [quality/accessibility](../quality/accessibility.md)

## Change log
- 2026-11-18: created (draft).
- 2026-11-18: approved by the user and implemented; verified in a browser / by request.
