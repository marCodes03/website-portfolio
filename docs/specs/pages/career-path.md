---
id: pages/career-path
title: Workflow process (career path)
status: implemented
created: 2026-11-18
amends: []
---

# Workflow Process (`#career-path`)

## Purpose
Explains how Marco delivers a project, as six steps with a sticky step navigator.

## Requirements
- **R1.** Section `id="career-path"` with `<h2>` "Workflow Process".
- **R2.** Six steps, in order: Research & Discovery, Analyze & Model, System Design & UI, Full-Stack Development, Quality Assurance, Launch & Optimize (ids: research, analyze, design, development, qa, launch). Each has a title, subtitle, description and a list of technology badges.
- **R3.** A step navigator (sticky on `lg` and wider) lists the steps; clicking one smooth-scrolls to that step's panel and marks it active.
- **R4.** While scrolling, the step whose panel crosses the band between 30% and 50% of the viewport height becomes active. "research" is active on load.
- **R5.** The scroll observer is disconnected when the component is destroyed.

## Acceptance criteria
- [ ] Clicking "Quality Assurance" scrolls its panel into view with room for the sticky header and highlights it in the navigator.
- [ ] Scrolling manually updates the highlighted step.
- [ ] No more than one step is active at a time.

## Accessibility
Navigator entries are buttons. Unverified: `aria-current` on the active step.

## Edge cases and errors
Narrow screens: the navigator is not sticky and the panels stack. `scroll-mt-28` keeps panels below the header.

## Files
`src/app/components/career-path/career-path.component.ts`

## Related
`docs/portfolio-content.md` (Workflow Process)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0007](../changes/0007-tabs-and-step-semantics.md) (Tab and current-step semantics for Skills and Workflow). Any "known gap" above that this resolves is now closed.
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): Stage text shortened to two lines, AI-assisted dev named in stage 4, "Ask the chat about my workflow" link added.
- 2026-11-19: amended by [CHG-0015](../changes/0015-career-path-length.md) (stage panels in two columns from 1280px).
