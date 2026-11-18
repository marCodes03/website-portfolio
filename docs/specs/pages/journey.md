---
id: pages/journey
title: Programming journey
status: implemented
created: 2026-11-18
amends: []
---

# Programming Journey (`#journey`)

## Purpose
A git-style timeline of Marco's education, organisations and achievements, 2017 to present.

## Requirements
- **R1.** Section `id="journey"` with `<h2>` "Programming Journey".
- **R2.** A vertical timeline with three parallel tracks: a solid centre "main" trunk (education and work), a dashed orange "org" branch (student organisations) and a dotted gold "achievements" branch (awards). Each milestone has a commit-style dot on its track.
- **R3.** There are 14 milestones (year or range, title, branch, bullets), in chronological order starting "2017 - 2019 SHS Tech-Voc Computer Programming Track" (see `docs/portfolio-content.md`, Programming Journey).
- **R4.** Each milestone card shows a branch tag (`main`, `org`, `award`), the year, the title and its bullets.
- **R5.** On desktop, cards alternate left and right by index (even = left, odd = right); on mobile, all cards are in one column to the right of the tracks, with the tracks shifted to the left.
- **R6.** Cards start hidden (opacity 0, shifted down, scaled) and are revealed when they scroll into view (10% visible, 50px bottom margin). When the whole section leaves the viewport the reveal resets so it replays on return.
- **R7.** Both observers are disconnected when the component is destroyed.

## Acceptance criteria
- [ ] Scrolling down reveals cards progressively; scrolling away and back replays it.
- [ ] 14 cards exist in the DOM; each shows its bullets once revealed.
- [ ] With JavaScript disabled the cards stay hidden (known limitation of the reveal approach).
- [ ] At 390px there is no horizontal scroll and no card is clipped.

## Accessibility
Content is static text in reading order. Hidden-until-revealed cards use opacity, so they are still in the accessibility tree before reveal. Reduced motion collapses the transition via global CSS.

## Edge cases and errors
If the IntersectionObserver never fires (for example a tall card taller than the viewport at 10%), the card may stay hidden (unverified).

## Files
`src/app/components/journey/journey.component.ts`, `src/styles.css` (`.timeline-card`, `.commit-dot`)

## Related
`docs/portfolio-content.md`, [scroll-reveal](../features/scroll-reveal.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0011](../changes/0011-safe-scroll-reveal.md) (Journey cards are hidden only when scripts are enabled and motion is allowed).
- 2026-11-19: amended by [CHG-0013](../changes/0013-layout-rhythm.md) (hero fills first screen; Journey shows newest 7 milestones, older behind a toggle).
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): Award-track cards show title and a "See the certificate" link instead of bullets; other bullets are 14px.
- 2026-11-19: amended by [CHG-0021](../changes/0021-consistent-section-headings.md) (section heading eyebrow and weight).
