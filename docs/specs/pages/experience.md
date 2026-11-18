---
id: pages/experience
title: Work experience
status: implemented
created: 2026-11-18
amends: []
---

# Work Experience (`#experience`)

## Purpose
Lists jobs, teaching and key thesis work with dates and bullet achievements.

## Requirements
- **R1.** Section `id="experience"` with an `<h2>` "Work Experience" on the always-dark section background.
- **R2.** Entries come from a `jobs` array (role, company, location, dates, logo or icon, bullets); there are currently 6 entries (see `docs/portfolio-content.md`, section 1).
- **R3.** Only the first 3 entries show initially. A button below toggles between "View All Experience" and "View Less", shows all entries when expanded, and sets `aria-expanded`.
- **R4.** Each card shows the role, "Company • Location", a date pill, and a check-circle bullet list. Company logos use `NgOptimizedImage` at 64×64 with alt `"<company> logo"`.
- **R5.** Accent-coloured text in this section uses the light accent in both themes (`.accent-on-dark`).

## Acceptance criteria
- [ ] On load exactly 3 cards are visible; after clicking, all 6, and the button reads "View Less" with the chevron rotated.
- [ ] Keyboard: Tab reaches the toggle; Enter or Space toggles it; `aria-expanded` matches the state.
- [ ] Contrast of the company line and bullets is at least 4.5:1 in light and dark.

## Accessibility
Toggle has `type="button"`, a visible focus ring, and an accessible name (`aria-label` plus visible text). Icons are `aria-hidden`.

## Edge cases and errors
Fewer than 4 jobs: the toggle is still rendered (unverified whether it should hide). Long bullet text wraps.

## Files
`src/app/components/experience/experience.component.ts`

## Related
`docs/portfolio-content.md`, [design-tokens](../quality/design-tokens.md) (`.accent-on-dark`)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-19: amended by [CHG-0021](../changes/0021-consistent-section-headings.md) (section heading eyebrow and weight).
