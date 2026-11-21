---
id: CHG-0026
title: FinTrack project and a separate "View Source" link in the project modal
status: implemented
created: 2026-11-21
amends: [pages/portfolio, features/detail-modals]
superseded_by:
---

# FinTrack project and "View Source" link

## Purpose
Add the FinTrack full-stack project to Featured Projects, and let a project carry a live-demo link and a source-code link separately so visitors can open either.

## Requirements
- **R1.** `Project` has an optional `githubUrl?: string`, declared after `link`.
- **R2.** FinTrack is the 4th project, between Capataz Mobile Application and Eyeko App. Its copy, skills, links and bullets match [portfolio-content.md](../../portfolio-content.md) section 3. Other projects are unchanged.
- **R3.** FinTrack's card image is `assets/image/project-fintrack-dashboard.png`; its modal header image is `assets/image/project-fintrack-budget-plans.png`.
- **R4.** The modal's action row shows when the project has `link` or `githubUrl`.
- **R5.** When `githubUrl` is set, the row shows a "View Source" link (new tab, `rel="noopener noreferrer"`) styled as an outline button, placed before "Visit Live Project".
- **R6.** "Visit Live Project" still shows only when `link` is set and keeps its current style.
- **R7.** Both buttons sit side by side in a flex row with a small gap; the row wraps on narrow screens.
- **R8.** Projects with only `link` (the Capataz apps) look and behave as before; projects with neither show no row.
- **R9.** The chat knowledge base picks FinTrack up from the content file via `npm run generate:chat-context`.

## Acceptance criteria
- [ ] The 4th carousel card is FinTrack and a 7th pagination dot exists.
- [ ] FinTrack modal shows "View Source" then "Visit Live Project"; each opens the right URL in a new tab.
- [ ] Capataz modal shows only "Visit Live Project"; Smart Farming shows no button row.
- [ ] Both images load (no 404); `npm run build` and `npm run test:a11y` pass, light and dark.
- [ ] Asking the chat bot about FinTrack returns the content-file facts.

## Accessibility
Both are real links reachable by Tab in reading order; outline button needs 3:1 border and 4.5:1 text contrast on the modal surface in light and dark, a visible focus ring, and at least 44px height. The new-tab behaviour is signalled with the existing `arrow_outward` icon (`aria-hidden`).

## Edge cases and errors
Missing image file shows nothing broken only if the file exists, so the images must be copied before shipping. Two buttons at 390px width wrap instead of overflowing. Eight skills: the card shows the first five, the modal all eight.

## Out of scope
Showing all four screenshots (login and transactions are unused). Suggestion: a small thumbnail strip under the modal header, to be specced separately if wanted.

## Files
`src/app/components/portfolio/portfolio.component.ts`, `src/app/components/portfolio/project-modal.component.ts`, `public/assets/image/project-fintrack-{dashboard,budget-plans,login,transactions}.png`, `docs/portfolio-content.md`.

## Related
Decision "FinTrack project and View Source link: CHG-0026 drafted" in `docs/decisions.md`; [portfolio-content.md](../../portfolio-content.md).

## Change log
- 2026-11-21: created.
- 2026-11-21: approved and implemented.
