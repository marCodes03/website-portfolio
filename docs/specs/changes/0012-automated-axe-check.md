---
id: CHG-0012
title: Repeatable AXE accessibility check across themes, widths and interactive states
status: implemented
created: 2026-11-19
amends: [quality/accessibility]
superseded_by:
---

# Repeatable AXE accessibility check across themes, widths and interactive states

## Purpose
AGENTS.md requires the site to pass all AXE checks, but until now that was only verified by one-off scripts. A command anyone can run, and CI can run, keeps that bar from regressing (the dark-mode form error contrast failure found on 2026-11-19 is the example).

## Requirements
Numbered, each testable.

- **R1.** `npm run test:a11y` builds nothing itself; it serves the existing production build (`dist/website-portfolio-test/browser`) on a local port, runs axe-core in headless Chrome, and exits non-zero if any violation is found.
- **R2.** Rule set: axe tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` and `best-practice`.
- **R3.** It runs at 1280px and 390px wide, in light and dark theme (by toggling the `dark` class on `html`).
- **R4.** In each of those four combinations it checks these states: the page after scrolling through it once; the chat panel open; the project modal open; the certificate modal open; the contact form submitted empty (error messages shown).
- **R5.** While axe executes, content hidden or fading from the scroll reveal is forced to settled opacity (`opacity: 1; transition: none`), so mid-fade colours are not reported as contrast failures. The forced style is removed afterwards.
- **R6.** Output lists each violation with rule id, impact, node count, the state and viewport/theme it occurred in, and up to three selectors with axe's message.
- **R7.** If the script cannot find an element it needs to open a state (chat toggle, a project trigger, a certificate trigger, the form submit button), it fails with a message naming that selector; it never reports a state as passing when it was not reached.
- **R8.** Chrome is found from `CHROME_PATH`, else the standard Windows, macOS and Linux install locations; if none is found it exits non-zero with a message saying so.
- **R9.** The only new dependency is `axe-core`, added to `devDependencies`. No browser-automation package is added; the script drives Chrome through its DevTools protocol using Node's built-in `fetch`, `WebSocket` and `http`.

## Acceptance criteria
- [ ] AC1. On the current build, `npm run test:a11y` exits 0 and prints 0 violations for all 20 combinations (2 widths x 2 themes x 5 states).
- [ ] AC2. Temporarily restoring `--color-error: #ba1a1a` in the `.dark` block and rebuilding makes it exit non-zero and name `color-contrast` on the contact error messages in dark theme.
- [ ] AC3. Renaming the chat toggle's `aria-controls` makes it fail with a message naming the missing selector (R7).
- [ ] AC4. `npm ls axe-core` shows it under devDependencies only; `package.json` has no other new dependency.
- [ ] AC5. `ng test` still passes and `ng build` output is unchanged.

## Accessibility
Does not change the site. The script verifies it; it does not replace manual keyboard and screen-reader checks (see Out of scope).

## Edge cases and errors
- Build missing: exits non-zero with "run `npm run build` first".
- Port already in use: picks a free port.
- Chrome fails to start or the page does not load within 15 seconds: exits non-zero; no partial pass.
- Chrome process is always killed on exit, including on failure.

## Out of scope
- Hover and focus-visible states, the chat's error reply, and real touch.
- Real screen-reader testing and manual keyboard walkthroughs.
- Running it in CI (a workflow can call the same command later).
- Visual-regression screenshots.
- Adding `npm run test:a11y` to `prebuild` or `ng test`.

## Files
`scripts/a11y-check.mjs`, `package.json` (script `test:a11y`, devDependency `axe-core@4.10.2`), `package-lock.json`, `docs/specs/quality/accessibility.md` (change log line), `README.md` (Testing section).

## Related
- `docs/decisions.md`: "AXE on interactive states: dark-mode form error contrast" (2026-11-19).
- [quality/accessibility](../quality/accessibility.md)

## Change log
- 2026-11-19: created.
- 2026-11-19: approved and implemented. AC1 (20 checks, 0 violations), AC2 (restoring the old dark error colour fails with `color-contrast` on the contact errors in dark theme), AC3 (missing selector fails and names it) and AC4 verified. AC5 partly: `ng build` passes, but `ng test` fails with "Vitest failed to find the runner" with or without axe-core installed, so it is not caused by this change.
