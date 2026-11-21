---
id: pages/portfolio
title: Featured projects (portfolio)
status: implemented
created: 2026-11-18
amends: []
---

# Featured Projects (`#projects`)

## Purpose
A swipeable carousel of six projects, each opening a detail modal.

## Requirements
- **R1.** Section `id="projects"` with eyebrow "SELECTED WORKS" and `<h2>` "Featured Projects" on the always-dark background, using the light accent in both themes (`.accent-on-dark`).
- **R2.** Six project cards, in order: Smart Farming App, Capataz Web Application, Capataz Mobile Application, Eyeko App, VestiCare App, Student Cafeteria Management System. Each shows a screenshot (16:10 frame, `object-cover`), category, title, a 3-line clamped description and up to five skill pills.
- **R3.** Cards sit in a horizontally scrolling, scroll-snapping carousel: one card per view on mobile, two on `md` and wider.
- **R4.** Previous and next arrow buttons (labelled "Previous projects" and "Next projects") scroll by one container width. They are visible on carousel hover.
- **R5.** One pagination dot per project, labelled "Go to project N"; the dot for the card nearest the scroll position is highlighted and clicking a dot scrolls that card to centre.
- **R6.** Clicking a card, or its arrow button ("View details for <title>"), opens the project detail modal (see [detail-modals](../features/detail-modals.md)).
- **R7.** Project images use `NgOptimizedImage` in fill mode with `sizes`, so no aspect-ratio warnings appear.

## Acceptance criteria
- [ ] All six cards are reachable by arrows, dots, swipe and keyboard.
- [ ] The active dot follows manual scrolling.
- [ ] Opening a card shows its title, overview, contributions and skills in the modal.
- [ ] No NG02952 console warnings.

## Accessibility
The scroll container is a labelled, focusable region (`role="region"`, `aria-label="Featured projects"`, `tabindex="0"`). The only nested control per card is its labelled arrow button. Known gap: the arrows are `opacity-0` until hover, with no focus-visible reveal.

## Edge cases and errors
Image missing: the card shows a placeholder icon frame. Very long titles wrap. The Capataz mobile screenshot is portrait and is cropped by `object-cover`.

## Files
`src/app/components/portfolio/portfolio.component.ts`, `src/app/components/portfolio/project-modal.component.ts`, `public/assets/image/`

## Related
`docs/portfolio-content.md` (Projects), [detail-modals](../features/detail-modals.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: arrow offset changed from 32px to 24px on `md`+ so the next arrow no longer overflows the page at 820px.
- 2026-11-18: amended by [CHG-0006](../changes/0006-carousel-arrows-on-focus.md) (Projects carousel arrows visible on keyboard focus). Any "known gap" above that this resolves is now closed.
- 2026-11-21: amended by [CHG-0026](../changes/0026-fintrack-project-and-source-link.md) (FinTrack project; optional `githubUrl` and a "View Source" button in the project modal).
