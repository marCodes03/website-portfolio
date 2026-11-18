---
id: pages/about
title: About
status: implemented
created: 2026-11-18
amends: []
---

# About (`#about`)

## Purpose
Short professional summary plus a "Quick Facts" panel.

## Requirements
- **R1.** Section `id="about"` with the eyebrow "ABOUT ME", an `<h2>` ("Crafting Software with .NET, Angular & Mobile Technologies") and three paragraphs of summary copy (see `docs/portfolio-content.md`, About).
- **R2.** A "QUICK FACTS" panel shows six facts, each as a bold value over a caps label: 9+ Yrs / CODING EXPERIENCE, 20+ Projects / WEB, DESKTOP & MOBILE, Backend & Frontend Dev / PRIMARY FOCUS, Part-time Professor / TEACHING, Taguig City, PH / LOCATION, Cum Laude Graduate / HONORS.
- **R3.** Layout: copy 7 columns, facts 5 columns on desktop; stacked on mobile; the facts grid is 2 columns on small screens and 3 from `sm` up.

## Acceptance criteria
- [ ] All six facts are visible with the exact values above.
- [ ] "20+ Projects" is the owner-supplied total of web, desktop and mobile apps built; it intentionally exceeds the featured project cards in [portfolio](portfolio.md) (currently 6).
- [ ] No horizontal scroll at 390px.

## Accessibility
Heading order: `<h2>` then the panel's `<h3>`. Static text only, no interaction.

## Edge cases and errors
Facts are hard-coded; they go stale unless edited by hand when jobs, projects or years change.

## Files
`src/app/components/about/about.component.ts`

## Related
`docs/portfolio-content.md`, [experience](experience.md)

## Change log
- 2026-11-18: baseline written from code.
