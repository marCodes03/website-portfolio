---
id: pages/skills
title: Tech stack (skills)
status: implemented
created: 2026-11-18
amends: []
---

# Tech Stack (`#skills`)

## Purpose
Shows technologies grouped into four tabs, each with a proficiency ring.

## Requirements
- **R1.** Section `id="skills"` with `<h2>` "Tech Stack".
- **R2.** Four tabs, in order: Development, Database & Cloud, Design & AI, Methodologies. "Development" is active on load.
- **R3.** Each tab shows the skills of fixed categories: Development = backend + frontend; Database & Cloud = database + cloud; Design & AI = design + ai-tools; Methodologies = methodologies.
- **R4.** Each skill card shows a name, an icon (devicon class or Material Symbol) and a circular progress ring whose fill is the proficiency percentage (ring circumference 188.5).
- **R5.** Switching tabs replaces the cards without a page reload; cards animate in with a staggered entrance (30 ms steps, up to 15 cards).
- **R6.** Devicon icons come from a CDN stylesheet pinned to devicon 2.16.0.

## Acceptance criteria
- [ ] Clicking each tab shows that tab's skills only.
- [ ] "C# & .NET Core" is in Development at 90%; "REST API" at 92%.
- [ ] Every skill name is readable and every icon renders (no blank squares).

## Accessibility
Tabs are buttons with `type="button"`. Unverified: whether the tab strip uses `role="tablist"` and `aria-selected`; if not, it is a gap worth a future change spec.

## Edge cases and errors
If the devicon CDN is blocked, devicon icons disappear but names and rings remain. Proficiency numbers are self-assessed.

## Files
`src/app/components/skills/skills.component.ts`, `src/index.html` (devicon link)

## Related
`docs/portfolio-content.md` (Tech Stacks & Skills)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0007](../changes/0007-tabs-and-step-semantics.md) (Tab and current-step semantics for Skills and Workflow). Any "known gap" above that this resolves is now closed.
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): Tabs replaced by three depth groups (Primary, Working, Familiar); Primary keeps flip cards, the others are compact chips with a level label.
