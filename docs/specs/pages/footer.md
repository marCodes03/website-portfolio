---
id: pages/footer
title: Footer
status: implemented
created: 2026-11-18
amends: []
---

# Footer

## Purpose
Closing links, copyright and a back-to-top control.

## Requirements
- **R1.** Shows "Marco O. Amira" and "© <current year> Marco O. Amira. All rights reserved." where the year is computed at render time.
- **R2.** Three links: GitHub (`https://github.com/marCodes03`), LinkedIn (`https://www.linkedin.com/in/marco-amira/`) and Email (`mailto:amira.coder03@gmail.com`). GitHub and LinkedIn open in a new tab.
- **R3.** A round "Scroll to Top" button (`aria-label="Scroll to Top"`) smooth-scrolls the window to the top.

## Acceptance criteria
- [ ] The year equals the current calendar year.
- [ ] Each link goes to the URL above; external links use `rel` that prevents opener access (unverified).
- [ ] Clicking the button returns to the hero.

## Accessibility
The button is typed `button`, has a visible label and `aria-hidden` icon. Link text is plain words, not just icons.

## Edge cases and errors
Server-rendered pages are prerendered at build time, so the year is the build year until the browser re-renders.

## Files
`src/app/components/footer/footer.component.ts`

## Related
`docs/portfolio-content.md`

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-19: amended by [CHG-0021](../changes/0021-consistent-section-headings.md) (section heading eyebrow and weight).
