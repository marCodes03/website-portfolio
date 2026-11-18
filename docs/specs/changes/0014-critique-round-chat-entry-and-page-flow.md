---
id: CHG-0014
title: Critique round 1 - chat entry, AI workflow, page ending, awards consolidation, skills by depth, polish
status: implemented
created: 2026-11-19
amends: [pages/hero, pages/skills, pages/career-path, pages/contact, pages/certificates, pages/off-screen-activities, pages/journey, features/site-navigation, features/chat-bot]
superseded_by:
---

# Critique round 1

## Purpose
The 2026-11-19 `/impeccable critique` (23/32, Good) found that the two differentiators in `PRODUCT.md` (the Gemini chatbot and the AI-assisted workflow) are nearly invisible, the page has no real ending, awards repeat three times, skills are 15 equal tiles, and a few edges look unfinished. This spec fixes all five. Decisions taken by the user: one spec for the whole round; chat button replaces "View Tech Stack" in the hero; Contact moves to the end AND a closing CTA band is added; awards consolidated to one place; skills grouped by depth. Content stays in `docs/portfolio-content.md` and is edited there first; no new claims are invented.

## Requirements

### A. Chat entry (P1)
- **A1.** The hero shows two actions: "Download CV" and an "Ask my AI about my work" button. "View Tech Stack" is removed from the hero (the section stays reachable from the nav and the page).
- **A2.** Activating the hero chat button opens the chat panel and moves focus into it; closing it returns focus to the hero button.
- **A3.** (Dropped on 2026-11-19: the chat already shows three rotating suggestion chips from a pool of 24, see features/chat-bot R3. No change.)
- **A4.** (Dropped, same reason.)
- **A5.** The existing floating chat toggle keeps working unchanged.

### B. AI-assisted workflow and labels (P1/P2)
- **B1.** The Workflow section gains an explicit AI-assisted mention inside the existing stages (not a new stage), using only claims already in `docs/portfolio-content.md` (AI-Assisted Dev, Prompt Engineering, Claude/Gemini rows) and a link "Ask the chat about my workflow" that opens the chat (same behaviour as A2).
- **B2.** The nav label and the section heading use the same name ("Workflow Process"), and the nav entry pointing at Certificates is named to match that section's heading.
- **B3.** Workflow stage descriptions are cut to at most two short lines each; the full text stays in `docs/portfolio-content.md` as the source and the shortened wording is recorded there.

### C. Page flow and ending (P1/P2)
- **C1.** Section order becomes: hero, about, experience, skills, workflow, projects, journey, off-screen activities, certificates, contact, closing CTA band, footer. Nav order matches.
- **C2.** A closing CTA band sits between Contact and the footer with three actions: Download CV, Email, "Ask my AI". It uses existing contact details and the existing CV file.
- **C3.** (Replaced after review on 2026-11-19: the project strip repeated the carousel, so it was removed. Instead the headline numbers in the Experience bullets (10,000+, 100+, 50%, 80%) are emphasised.)
- **C4.** The "Other" menu holds at most four entries; the primary nav shows the rest.

### D. Awards consolidation and skills by depth (P2)
- **D1.** Awards and certificates live in one section (Certificates). Journey keeps its award-track milestones as short entries that link to the matching certificate. Off-Screen Activities no longer repeats award cards; its "Academic Awards" activity is removed or reduced to a link, and `docs/portfolio-content.md` is edited accordingly first.
- **D2.** Skills are shown in three depth groups taken from the proficiency levels in `docs/portfolio-content.md`: Primary (100% and 80% Expert/Advanced), Working (60% Proficient), Familiar (40% and 20%). Each skill appears once; the four category tabs are replaced by group headings.
- **D3.** Within each group, skills are ordered by proficiency then name. The proficiency label (Expert, Advanced, ...) is shown as text next to the ring.
- **D4.** If the baseline skills spec and `docs/portfolio-content.md` disagree on a percentage, the content file wins.

### E. Polish (P3)
- **E1.** The grey "IT OLYMPICS" placeholder block in Certificates is replaced by its real image from `public/assets/image/`, or removed if no image exists.
- **E2.** Both carousels (projects, activities) use the same control layout: arrows in the same position and the same dot style.
- **E3.** Journey card body text is at least 14px.
- **E4.** Running paragraphs in monospace are capped at 65-75 characters wide with line height at least 1.6.
- **E5.** The Off-Screen Activities images are verified to load in a real browser; if any stay blank after load, that is fixed.

## Acceptance criteria
- [ ] AC1. At 1280px and 390px the hero shows exactly two buttons; the chat button opens the chat, focus is in the panel, and Escape returns focus to the button.
- [ ] AC2. (Dropped with A3/A4.) The existing suggestion chips still show three questions when the chat opens from the hero button.
- [ ] AC3. Page order and nav order match C1 at both widths; "Other" has at most four entries.
- [ ] AC4. The closing band has three working actions (CV downloads, mail link, chat opens).
- [ ] AC5. The Experience bullets show 10,000+, 100+, 50% and 80% emphasised; no project strip exists.
- [ ] AC6. Each award appears as a full card exactly once (in Certificates); Journey and Off-Screen only link to it.
- [ ] AC7. Skills show three groups; every skill from `docs/portfolio-content.md` section 4 appears exactly once.
- [ ] AC8. No placeholder block remains; both carousels have identical control layout; Journey text computes to at least 14px.
- [ ] AC9. `npm run test:a11y` passes (0 violations in all 20 checks, updated for the new selectors if any), `ng build` passes, and `npm run generate:chat-context` is run so the chatbot sees the edited content file.
- [ ] AC10. Nothing is hidden by default without JavaScript or under reduced motion (CHG-0011 still holds).

## Accessibility
New buttons have visible text names and 44px targets; focus moves into the chat on open and returns on close; suggested questions are real buttons in a labelled group; the closing band is a labelled region; skills groups use headings, not colour alone; contrast checked in both themes.

## Edge cases and errors
- Chat component not loaded yet (it loads on idle): the hero button still works; the open state is held in the shared chat service and the panel opens as soon as the component loads.
- Chat API failure after a suggestion is sent: the existing error message path shows; the suggestion is not retried silently.
- Reduced motion: no new motion is added.
- Dark theme: every new element uses theme tokens (`DESIGN.md`).
- Narrow screens: the strip and closing band stack to one column.

- **Interaction with CHG-0013 (implemented, same day):** the hero must still end within 2 px of the viewport bottom at 1440x900 and 390x844 after the button change (A1); Journey must stay at most two screens tall at 1440x900 even with the larger text (E3), which may mean shortening cards instead of only enlarging text; the fixed chat and theme buttons must still avoid covering body text (the closing band and new strip must not put text under them at 390px). Those CHG-0013 criteria are re-run as part of AC9.

## Out of scope
- New testimonials or any new factual claim.
- A redesign of the visual world; DESIGN.md tokens stay.
- Case-study pages for projects.
- Changing the chatbot's model, prompt or API.
- Rebuilding Journey as a repository metaphor across the whole page.

## Files
`docs/portfolio-content.md` (workflow text, awards placement, skills depth groups, project strip), `src/app/app.html`, `src/app/app.ts`, `src/app/components/chat-bot/chat-bot.service.ts`, `chat-bot.component.ts`, `hero/hero.component.ts`, `career-path/career-path.component.ts`, `skills/skills.component.ts`, `header/header.component.ts`, `journey/journey.component.ts`, `off-screen-activities/off-screen-activities.component.ts`, `certificates/certificates.component.ts`, `portfolio/portfolio.component.ts`, new `project-strip/project-strip.component.ts` and `cta-band/cta-band.component.ts`, `api/_lib/portfolio-content.generated.ts` (regenerated).

## Related
- Critique run of 2026-11-19 (not saved; whole-site target). Decisions to log in `docs/decisions.md` when this ships.
- `docs/portfolio-content.md` (edited first: chat suggestions, shortened workflow text, awards placement).
- Specs amended: see `amends`.

## Change log
- 2026-11-19: created.
- 2026-11-19: implemented. Verified in headless Chrome: page and nav order, hero shows two actions, chat opens from the hero, focus goes into the panel and returns to the hero button on Escape, skills in three groups, Journey 1.75 screens tall at 1440x900, no horizontal overflow, `npm run test:a11y` 0 violations in all 20 checks. Deviations: C3 links to the Projects section rather than the specific card; C4 left four entries in Other by removing the dead "Achievements" link and moving "Outside Work" out of the nav; E3 applied as 14px text on Journey bullets with award cards shortened to title plus a link. Not met and not caused here: CHG-0013 R1 at 390x844 (hero is 1173px tall; 1099px even without the new button).
- 2026-11-19: project strip removed at the user's request (redundant with the carousel); metrics emphasised in Experience instead (C3, AC5, page order updated).
- 2026-11-19: approved. A3/A4/AC2 dropped because the chat already has suggestion chips; chat-unavailable edge case replaced (state lives in ChatBotService).
