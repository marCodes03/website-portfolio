---
id: pages/off-screen-activities
title: Off-screen activities
status: implemented
created: 2026-11-18
amends: []
---

# Off-Screen Activities (`#off-screen-activities`)

## Purpose
Shows Marco's life outside work as a carousel of seven activity cards.

## Requirements
- **R1.** Section `id="off-screen-activities"` with eyebrow "LIFE OUTSIDE WORK" (light accent in both themes) and `<h2>` "Off-Screen Activities", on the always-dark background.
- **R2.** Seven cards, in order: Coding & Build Sessions, Student Leadership, Gerry Roxas Foundation, Tech & Seminars, Hardware & Servicing, Academic Awards, Arts & Commission Work. Each has a 16:9 visual (photo, or gradient with an icon), title, period, description and an italic quote.
- **R3.** Cards sit in a scroll-snapping horizontal carousel: one per view on mobile, two on `md` and wider.
- **R4.** Previous and next buttons (labelled "Previous activities" and "Next activities") are shown from `md` up and scroll by one container width.
- **R5.** Pagination dots (labelled "Go to activity N", with `aria-current` on the active one) scroll the chosen card to centre; the active dot follows the scroll position.
- **R6.** Photos use `NgOptimizedImage` fill mode; on hover a frosted-glass overlay fades in over the bottom quarter.

## Acceptance criteria
- [ ] Clicking dot 3 moves the carousel so card 3 is centred (scroll position changes).
- [ ] Next/previous buttons move the carousel by one card width on desktop.
- [ ] All seven titles and periods render; none overflow their card.

## Accessibility
The scroll container is a labelled, focusable region (`role="region"`, `aria-label="Off-screen activities"`, `tabindex="0"`) so keyboards can scroll it. Arrow icons are `aria-hidden`.

## Edge cases and errors
Mobile has no arrow buttons; swipe and dots are the controls. Missing image: nothing replaces it (unverified).

## Files
`src/app/components/off-screen-activities/off-screen-activities.component.ts`, `public/assets/image/activities/`

## Related
`docs/portfolio-content.md` (Off-Screen Activities)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): "Academic Awards" activity removed (six activities); awards live in Certificates.
