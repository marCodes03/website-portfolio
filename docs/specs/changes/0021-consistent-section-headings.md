---
id: CHG-0021
title: Every section heading has the blue eyebrow label and the same weight
status: draft
created: 2026-11-19
amends: [pages/about, pages/experience, pages/career-path, pages/journey, pages/footer]
superseded_by:
---

# Every section heading has the blue eyebrow label and the same weight

## Purpose
Five sections show a small blue uppercase label above their `h2` (About, Skills, Featured Projects, Off-Screen Activities, Certificates) and four do not (Work Experience, Workflow Process, Programming Journey, Get in touch). The About `h2` is also the only one not set bold. Make all section headings follow one pattern.

## Requirements
- **R1. Eyebrow on every section heading.** Each of these sections shows an eyebrow `span` directly above its `h2`, using the same classes as the existing eyebrows (`font-label-caps text-label-caps text-accent tracking-widest`), with the sections on the always-dark ground also carrying `accent-on-dark` so the label uses the light accent in every theme (The Dark Band Rule in `DESIGN.md`):
  - Work Experience: **CAREER**
  - Workflow Process: **HOW I WORK**
  - Programming Journey: **SINCE 2017** (2017 is the first Journey entry in `docs/portfolio-content.md`)
  - Get in touch: **WORK WITH ME**
  The wording above is proposed; the user approves or changes it before implementation.
- **R2. Existing eyebrows unchanged.** ABOUT ME, SKILLS & TOOLS, SELECTED WORKS, LIFE OUTSIDE WORK and ACHIEVEMENTS keep their text.
- **R3. Same heading weight.** Every section `h2` uses `font-bold`; the About `h2` gains it.
- **R4. Spacing.** The gap between eyebrow and `h2` and between `h2` and what follows matches the existing sections (the header block's `space-y-*` rhythm); no section's content moves more than 24 px.
- **R5. Not headings.** The chat panel title, the contact dialog title and card titles are not section headings and are left alone.

## Acceptance criteria
- [ ] AC1. In a browser at 1440 and 390 px, light and dark, each of the nine sections above shows a blue eyebrow directly above its heading, and all `h2` look equally bold.
- [ ] AC2. Eyebrow text contrast is at least 4.5:1 in both themes, including on the dark Experience and Get in touch bands; `npm run test:a11y` reports 0 violations.
- [ ] AC3. Heading order is unchanged (one `h1`, section `h2`s in sequence); the eyebrow is a `span`, not a heading.
- [ ] AC4. No visual regression in the hero, cards or buttons.

## Accessibility
The eyebrows are plain text before the heading, so screen readers read the label, then the heading. They are short and not duplicated in the heading text. Contrast per AC2.

## Edge cases and errors
- Narrow screens: labels do not wrap (one or two short words).
- Dark theme: the always-dark bands use the light accent.
- Reviews section is not mounted and is unaffected.

## Out of scope
Restyling headings, changing heading copy, the hero heading, and adding new sections.

## Files
Filled in when implemented.

## Related
`DESIGN.md` (The Dark Band Rule, Caps Label Rule); content: `docs/portfolio-content.md`; [pages/about](../pages/about.md), [pages/experience](../pages/experience.md), [pages/career-path](../pages/career-path.md), [pages/journey](../pages/journey.md), [pages/footer](../pages/footer.md).

## Change log
- 2026-11-19: created.
