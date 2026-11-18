---
id: pages/hero
title: Hero (home)
status: implemented
created: 2026-11-18
amends: []
---

# Hero (`#home`)

## Purpose
First screen: says who Marco is, shows a rotating role, and offers the two main actions (get the CV, see the tech stack).

## Requirements
- **R1.** The section has `id="home"`, is at least 85vh tall, and shows an `<h1>` "Hello, I'm Marco".
- **R2.** An "I am a" line shows a rotating role badge cycling through, in order: Software Engineer, .NET Developer, Angular Developer, Mobile App Developer. It advances every 3 seconds as a 3D cube rotation about the X axis (90° per step) and loops forever.
- **R3.** The rotation only starts in the browser (not during server render) and stops when the component is destroyed.
- **R4.** A one-sentence summary paragraph is shown below the role line (copy: see `docs/portfolio-content.md`, About).
- **R5.** "Download CV" is a link to `/assets/files/marco-o-amira-cv-reference.pdf` that opens in a new tab and suggests the filename `Marco-O-Amira-CV.pdf`.
- **R6.** "View Tech Stack" is a link to `#skills`.
- **R7.** A profile photo (`assets/image/marco-amira-hero-w-bg.png`) is shown to the right on desktop (12-column grid, text 7 / image 5) and stacks on mobile.

## Acceptance criteria
- [ ] After 3, 6, 9 and 12 seconds the badge reads .NET Developer, Angular Developer, Mobile App Developer, Software Engineer.
- [ ] Clicking Download CV downloads or opens the PDF; the file exists in `public/assets/files/`.
- [ ] Clicking View Tech Stack scrolls to the Tech Stack section.
- [ ] With `prefers-reduced-motion: reduce` the cube turns effectively instantly (global CSS) without breaking the layout.

## Accessibility
Only one `<h1>` on the page. The CV button and link are real anchors. The badge text changes without a live region (decorative rotation; the paragraph states the role in plain text). Unverified: whether screen readers read all four stacked cube faces at once.

## Edge cases and errors
Hidden cube faces use `backface-visibility: hidden`. If the image fails to load the text layout is unaffected.

## Files
`src/app/components/hero/hero.component.ts`, `public/assets/files/marco-o-amira-cv-reference.pdf`, `public/assets/image/marco-amira-hero-w-bg.png`

## Related
`docs/portfolio-content.md` (About), [scroll-reveal](../features/scroll-reveal.md), [design-tokens](../quality/design-tokens.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-19: amended by [CHG-0013](../changes/0013-layout-rhythm.md) (hero fills first screen; Journey shows newest 7 milestones, older behind a toggle).
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): Hero actions are now "Download CV" and "Ask my AI about my work" (opens the chat); "View Tech Stack" removed.
- 2026-11-19: amended by [CHG-0016](../changes/0016-hero-headline-and-copy.md) (h1 full stop, fact line, "Contact me").
