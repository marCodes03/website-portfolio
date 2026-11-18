---
id: CHG-0007
title: Proper tab and current-step semantics for Skills and Workflow
status: implemented
created: 2026-11-18
amends: [pages/skills, pages/career-path]
superseded_by:
---

# Tabs and step semantics

## Purpose
The Skills tab strip and the Workflow step navigator behave like tabs/steps visually but expose plain buttons to assistive technology, with no selected or current state.

## Requirements
- **R1.** Skills: the tab strip has `role="tablist"` with an accessible name; each tab has `role="tab"`, `aria-selected` (true only for the active tab), `aria-controls` pointing at the panel, and a roving `tabindex` (active tab 0, others -1).
- **R2.** Skills: the cards area is a `role="tabpanel"` labelled by its active tab.
- **R3.** Skills: Left/Right arrow keys move to the previous/next tab and activate it; Home/End go to the first/last tab.
- **R4.** Workflow: the active step in the navigator has `aria-current="step"`; inactive steps have none.
- **R5.** Visuals, labels and click behaviour are unchanged.

## Acceptance criteria
- [ ] A screen reader announces "Development, tab, selected, 1 of 4".
- [ ] Arrow keys switch tabs and the panel content follows.
- [ ] While scrolling the Workflow section, exactly one navigator entry has `aria-current="step"`.
- [ ] Axe reports no violations.

## Accessibility
This is the accessibility change; follow the WAI-ARIA tabs pattern.

## Edge cases and errors
Tab content that is empty still renders an empty labelled panel. Focus stays on the tab after activation.

## Out of scope
Changing which skills belong to which tab.

## Files
`src/app/components/skills/skills.component.ts`, `src/app/components/career-path/career-path.component.ts`

**Decision recorded:** WAI-ARIA tabs pattern with roving tabindex and arrow/Home/End keys on the Skills tabs; `aria-current="step"` on the active Workflow step.

## Related
[pages/skills](../pages/skills.md), [pages/career-path](../pages/career-path.md), [quality/accessibility](../quality/accessibility.md)

## Change log
- 2026-11-18: created (draft).
- 2026-11-18: approved by the user and implemented; verified in a browser / by request.
