---
id: CHG-0020
title: Typography: JetBrains Mono for headings and labels, IBM Plex Sans for body text
status: implemented
created: 2026-11-19
amends: [quality/design-tokens]
superseded_by:
---

# Typography: JetBrains Mono for headings and labels, IBM Plex Sans for body text

## Purpose
The design hook flags Roboto Mono as an overused font, and long monospace paragraphs (workflow, about, journey, activities) are tiring to read. The user chose, from three options on 2026-11-19: JetBrains Mono for headings, labels and tags (keeps the developer character) and IBM Plex Sans for body text (easier long reading). Typography is not a binding brand commitment (PRODUCT.md). Approval basis: the user picked this exact direction in answer to a direct question; this spec text itself was not separately reviewed.

## Requirements
- **R1.** The font tokens in `src/styles.css` map as follows: `--font-display-lg`, `--font-display-lg-mobile`, `--font-headline-lg`, `--font-headline-md`, `--font-label-caps` and `--font-roboto-mono` use JetBrains Mono (monospace fallback); `--font-body-md` and `--font-body-lg` use IBM Plex Sans (sans-serif fallback). The `--font-roboto-mono` token keeps its name so no component class changes.
- **R2.** No other font family remains in CSS or templates apart from the icon fonts (Material Symbols, Devicon) and generic fallbacks; no literal "Roboto Mono" is left.
- **R3.** `src/index.html` loads JetBrains Mono (weights 400 to 700) and IBM Plex Sans (weights 400, 500, 600, 700) from Google Fonts with `display=swap`, and no longer loads Roboto Mono.
- **R4.** Sizes, weights, line heights and letter spacing of every type token stay as they are (DESIGN.md typography table); only the family changes.
- **R5.** Running paragraphs read in IBM Plex Sans; headings, buttons, tags, nav and code-like labels read in JetBrains Mono.
- **R6.** `DESIGN.md` and `.impeccable/design.json` typography entries are updated to the new families.

## Acceptance criteria
- [ ] AC1. Computed `font-family` of the page `h1` and a button starts with JetBrains Mono; of a workflow paragraph and the hero paragraph starts with IBM Plex Sans.
- [ ] AC2. `grep -r "Roboto" src` finds nothing.
- [ ] AC3. At 1440x900 and 390x844 there is no horizontal scroll, the hero still ends at the viewport bottom (CHG-0013 R1), and Journey is at most two screens tall at 1440x900 (CHG-0013 R2).
- [ ] AC4. `npm run test:a11y` passes (0 violations) in all states.
- [ ] AC5. The design hook no longer reports `overused-font`.

## Accessibility
Body text moves to a proportional sans, which improves reading. Contrast and sizes are unchanged. Fonts load with `display=swap`, so text is visible during loading.

## Edge cases and errors
- Font CDN blocked or slow: fallbacks (`monospace`, `sans-serif`) apply and layout stays usable.
- Narrower body face means paragraphs run shorter; sections that were height-limited (Journey, Workflow) can only get shorter.
- Code-like strings (the email address in the band) stay in the label face.

## Out of scope
- Changing sizes, scale or spacing; self-hosting the fonts; any colour change.

## Files
`src/styles.css` (font tokens), `src/index.html` (font links), `src/app/components/about/about.component.ts` (paragraph no longer forced to the mono token), `DESIGN.md`, `.impeccable/design.json`.

## Related
- `docs/decisions.md` entry for this change; design hook finding `overused-font`.
- [quality/design-tokens](../quality/design-tokens.md)

## Change log
- 2026-11-19: implemented. Verified in headless Chrome: h1 and buttons compute to JetBrains Mono, hero, about and workflow paragraphs to IBM Plex Sans, fonts load; no horizontal scroll; hero ends at the viewport bottom at 1440x900 and 390x844; Journey 1.71 screens at 1440x900; `npm run test:a11y` 24 checks, 0 violations; the design hook reports no findings. Note: the sidecar was refreshed in the same pass (it was stale).
- 2026-11-19: created and approved on the user's choice of direction (see Purpose).
