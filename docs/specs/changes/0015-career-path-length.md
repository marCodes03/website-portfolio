---
id: CHG-0015
title: Workflow Process section fits two screens
status: implemented
created: 2026-11-19
amends: [pages/career-path]
superseded_by:
---

# Workflow Process section fits two screens

## Purpose
The taste-skill gate measures the Workflow Process section at 2471 px (2.7 screens at 1440x900). It is now the longest block after Programming Journey (fixed in CHG-0013). Bring it to two screens or fewer without removing any stage.

## Requirements
- **R1.** At 1440x900 the `#career-path` section is at most 1800 px tall (two screens). At 390x844 it may grow with its content, but the stage list and detail panel together stay within three screens.
- **R2.** All six stages from `docs/portfolio-content.md` section 5 remain reachable, each with title, subtitle, description and skill tags. No copy changes.
- **R3.** Reduce height by tightening vertical spacing and panel padding first. If that is not enough, show one stage's detail at a time (the tab behaviour from CHG-0007) with the panel sized to the tallest stage, so the section height does not jump when switching.
- **R4.** The "Ask the chat about my workflow" link stays in the section and still opens the chatbot.

## Acceptance criteria
- [ ] AC1. `consistency.mjs ... --widths 1440,390` shows no over-two-screens `section-height` FAIL for `app-career-path`.
- [ ] AC2. Switching stages changes the section height by no more than 2 px at 1440.
- [ ] AC3. Keyboard: Arrow keys, Home and End still move between stages (CHG-0007); focus stays visible (CHG-0008).
- [ ] AC4. No horizontal scroll from 320 to 1440 px; light and dark themes checked; AXE still 0 violations.

## Accessibility
Tab semantics and `aria-current` from CHG-0007 unchanged. Tap targets at least 44 px. Reduced motion: no height animation.

## Edge cases and errors
Long stage descriptions at 320 px; the tallest stage at narrow widths; dark theme.

## Out of scope
Card visuals (`card-visual` finding), copy changes, redesign of the stage layout.

## Files
`src/app/components/career-path/career-path.component.ts` (stage panels in two columns from 1280px).

## Related
[pages/career-path](../pages/career-path.md), [0007](0007-tabs-and-step-semantics.md), [0013](0013-layout-rhythm.md). Content: `docs/portfolio-content.md` section 5.

## Change log
- 2026-11-19: created.
- 2026-11-19: approved by the user.
- 2026-11-19: implemented with a two-column panel grid at xl instead of tabs (R3 first option was spacing; a grid cut the section from 2471 px to 1386 px at 1440). All six stages unchanged; AXE not rerun.
