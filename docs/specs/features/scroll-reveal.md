---
id: features/scroll-reveal
title: Scroll reveal
status: implemented
created: 2026-11-18
amends: []
---

# Scroll Reveal

## Purpose
Sections fade and slide in as the visitor scrolls to them.

## Requirements
- **R1.** After the app renders in the browser, every `<section>` gets a 1-second opacity and translate transition and starts hidden (opacity 0, shifted down 2.5rem).
- **R2.** When at least 10% of a section is visible it becomes fully visible; when it leaves the viewport it returns to hidden, so the effect replays on every pass.
- **R3.** The observer is disconnected when the root component is destroyed.
- **R4.** The Journey timeline additionally reveals each card separately (see [journey](../pages/journey.md)).
- **R5.** Under `prefers-reduced-motion: reduce`, transition durations collapse to near zero so content appears without animation.

## Acceptance criteria
- [ ] Scrolling to a section fades it in; scrolling away and back replays it.
- [ ] With reduced motion enabled the section appears immediately.

## Accessibility
Hidden sections remain in the accessibility tree (only opacity changes). Keyboard focus can land on a visually hidden control if the visitor tabs ahead of the scroll position (known limitation).

## Edge cases and errors
Server-rendered and no-JavaScript visitors see all sections fully visible, because the classes are only added in the browser. A very tall section can take longer to reach 10% visibility.

## Files
`src/app/app.ts`, `src/styles.css` (reduced-motion block)

## Related
[journey](../pages/journey.md), [accessibility](../quality/accessibility.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0011](../changes/0011-safe-scroll-reveal.md) (safe scroll reveal: not hidden when already in view, not applied without IntersectionObserver or under reduced motion, threshold 0 so tall sections reveal).
