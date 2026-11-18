---
id: CHG-0011
title: Scroll reveal can never leave content hidden
status: implemented
created: 2026-11-18
amends: [features/scroll-reveal, pages/journey, quality/accessibility]
superseded_by:
---

# Safe scroll reveal

## Purpose
The fade-in on scroll was added without a request. The user chose to keep it but make it safe: content must never be left invisible for visitors without JavaScript, with reduced motion, with an unusual layout, or at load.

## Requirements
- **R1.** Content is visible by default. Sections are only hidden by JavaScript in the browser, never in the server-rendered HTML, so no-JavaScript, print and pre-hydration views show everything.
- **R2.** When the visitor prefers reduced motion, no section is ever hidden and the Journey cards are always visible.
- **R3.** When `IntersectionObserver` is unavailable, nothing is hidden.
- **R4.** A section already (partly) in the viewport when the effect starts is never hidden, so there is no flash on load or on a deep link.
- **R5.** A section is revealed as soon as its top enters the viewport (threshold 0, 10% bottom margin), so a section taller than the screen cannot stay hidden.
- **R6.** Keyboard focus moving into a section reveals it immediately (existing behaviour, kept).
- **R7.** The Journey cards are hidden only when scripts are enabled and motion is allowed (CSS media query `(scripting: enabled) and (prefers-reduced-motion: no-preference)`); otherwise they are visible.
- **R8.** The replay behaviour is unchanged: sections hide again when they leave the viewport and reveal when re-entered.

## Acceptance criteria
- [x] Server-rendered HTML contains no section with `opacity-0`.
- [x] Normal motion: the hero is not hidden at load; later sections are hidden until scrolled to; the Journey section and the last section reveal on scroll.
- [x] Reduced motion: no section is ever hidden; every Journey card has opacity 1.
- [x] 390px phone: the very tall Journey section reveals when reached.
- [ ] Browser with scripting disabled (rule is in the stylesheet; not exercised in a real no-JS browser).
- [ ] Browser without `IntersectionObserver` (guarded in code; not exercised).

## Accessibility
Hidden-until-revealed content still uses opacity only (stays in the accessibility tree). Removes the case where content never appears for reduced-motion visitors.

## Edge cases and errors
Deep link to `#journey`: the section is in view, so it is not hidden. Replaying the effect on re-entry can briefly show a faded section while scrolling fast; this is intended motion, not lost content.

## Out of scope
Changing the animation style or timing; the other changes made outside the requested work (chat knowledge base, deleted CV and image files) are left as they are and are not specced here.

## Files
`src/app/app.ts`; `src/styles.css` holds the Journey hide rule (already gated by the media query when this started)

## Related
[CHG-0008](0008-taste-skill-accessibility-fixes.md) (its R3 "hidden content" overlaps this spec; another working session made the reduced-motion and Journey media-query changes there), [features/scroll-reveal](../features/scroll-reveal.md), [pages/journey](../pages/journey.md), [quality/accessibility](../quality/accessibility.md)

## Change log
- 2026-11-18: created and implemented at the user's request. The reduced-motion skip, the focus-in reveal and the CSS media query for the Journey cards were already in the working tree when this started (not made by this session); this change added the `IntersectionObserver` guard, the threshold/margin change and the no-hide-when-already-in-view rule.
