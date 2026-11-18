---
id: features/site-navigation
title: Site navigation (header and scroll-spy)
status: implemented
created: 2026-11-18
amends: []
---

# Site Navigation

## Purpose
A sticky header that jumps to every section and shows where the visitor is.

## Requirements
- **R1.** A sticky, translucent header with the "mr[Codes]" logo linking to `#home`, plus a skip link ("Skip to main content") before it that targets `#main-content` and is only visible when focused.
- **R2.** Desktop (from `md`): five main links in order Home, About, Experience, Projects, Contact, plus an "Other" dropdown listing six links: Tech Stack, Work Flow Process, Programming Journey, Achievements, Outside Work, Certificates.
- **R3.** Mobile (below `md`): a menu button (`aria-expanded`, `aria-controls="mobile-menu"`) opens a drawer with the same five links and an "Other" accordion with the six entries (shorter labels: Skills & Tools, Career Path, Journey, Achievements, Off-Screen, Certificates).
- **R4.** All entries are generated from two data arrays (main and other) so desktop and mobile cannot drift.
- **R5.** The "Other" dropdown opens on click, closes on Escape, on choosing a link, and on any click outside it. Mobile menus close on choosing a link.
- **R6.** Scroll-spy: the section crossing the band from 30% to 50% of the viewport height is the active section; its link gets the accent colour and `aria-current="location"`. "Other" is highlighted when the active section is one of its six.
- **R7.** The scroll observer is disconnected when the header is destroyed.

## Acceptance criteria
- [ ] Clicking each link scrolls to the matching section id, and no link points at a missing id.
- [ ] The dropdown shows 6 links, and Escape hides them.
- [ ] Scrolling to Projects highlights "Projects"; scrolling to Certificates highlights "Other".
- [ ] The skip link is reachable as the first Tab stop and moves focus to the main content.

## Accessibility
Landmark `<nav aria-label="Primary">`. The dropdown trigger has `aria-controls`/`aria-expanded`. Visible `focus-visible` rings on every link and button. Known gap: arrow-key navigation inside the dropdown is not implemented.

## Edge cases and errors
Sections missing from the DOM are skipped by the observer. The desktop dropdown has no mobile equivalent for hover.

## Files
`src/app/components/header/header.component.ts`, `src/app/app.html` (skip link and `<main id="main-content">`), `src/styles.css` (`.skip-link`)

## Related
All page specs; [accessibility](../quality/accessibility.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0009](../changes/0009-remove-dead-feedbacks-nav-link.md) (removed the dead "Feedbacks" link; counts above updated from seven to six).
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): Section order changed; "Other" now holds four entries (Tech Stack, Workflow Process, Journey, Certificates); dead "Achievements" link removed.
- 2026-11-19: amended by [CHG-0018](../changes/0018-contact-form-dialog-in-closing-band.md): the "Contact" entry points at `#get-in-touch`; the page ends on the closing band.
