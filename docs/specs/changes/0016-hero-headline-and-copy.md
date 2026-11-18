---
id: CHG-0016
title: Hero headline names the role and one hard fact; consistent main action
status: draft
created: 2026-11-19
amends: [pages/hero, pages/certificates]
superseded_by:
---

# Hero headline names the role and one hard fact; consistent main action

## Purpose
The taste-skill copy checks fail on the first screen: the h1 "Hello, I'm Marco" does not say what Marco does, no hard fact sits in the first lines, the h1 runs two parts together without a stop, and the main action is worded differently in the nav, hero and close. All wording must come from `docs/portfolio-content.md`; nothing is invented.

## Requirements
- **R1. Headline.** The h1 names the role and, in 2 to 8 words, who or where. The final wording is chosen by the user from the options below before implementation.
- **R2. Hard fact.** The first screen (h1 plus the line under it) contains one verifiable fact from the content file's Quick facts (for example "9+ years coding" or "Taguig City, PH").
- **R3. Run-on.** If the h1 keeps a lighter second part, the first part ends with a full stop.
- **R4. Main action wording.** The primary contact action reads the same, word for word, in the header nav, the hero and the closing section. Proposed label: "Contact me" (pending approval).
- **R5. Closing action.** The last content section before the footer (Certificates) ends with a link or button to the Contact section.
- **R6. Chrome buttons.** The floating chat and theme buttons keep their accessible names; as icon buttons they are exempt from the verb-first label rule.

## Wording options (user to choose)
- **A:** h1 "Marco O. Amira. Full-stack software engineer." with the line "9+ years coding. Based in Taguig City, PH."
- **B:** h1 "Full-stack software engineer in Taguig City." with the line "I'm Marco: .NET backends and Angular frontends, 9+ years coding."
- **C:** keep "Hello, I'm Marco." and set the line to "Full-stack software engineer, 9+ years coding, Taguig City, PH."

## Acceptance criteria
- [ ] AC1. `copy-headline`, `copy-fact` and `run-on` report PASS in `consistency.mjs`; `copy-actions` has no WARN for "Contact".
- [ ] AC2. Quoted facts match `docs/portfolio-content.md` word for word; the chatbot context is regenerated if the content file changes.
- [ ] AC3. The rotating role cube still works and does not replace the h1 text for assistive tech.
- [ ] AC4. At 390 and 1440 px the h1 wraps to at most 3 lines and the hero still fits the first screen (CHG-0013).

## Accessibility
One h1; heading order unchanged; link and button names descriptive; text contrast unchanged.

## Edge cases and errors
Long h1 at 320 px; dark theme; the cube's current word is not part of the h1 text.

## Out of scope
Rewriting other sections, chatbot tone, any fact not in the content file.

## Files
Filled in when implemented.

## Related
[pages/hero](../pages/hero.md), [0013](0013-layout-rhythm.md). Content: `docs/portfolio-content.md` (About, Quick facts).

## Change log
- 2026-11-19: created.
