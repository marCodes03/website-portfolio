
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Decision Logging

- Any non-trivial decision made during a session (choosing a library/service over another, rewriting copy/tone, approving a deletion, picking an execution order, resolving an ambiguity the user was asked about) MUST be recorded in `docs/decisions.md`, newest entry first, with enough context for a future session to understand *why*.

## Content Source of Truth

- `docs/portfolio-content.md` is the single source of truth for all portfolio content (experience, background, projects, skills, workflow, journey, off-screen activities, certificates and trainings).
- Any content change MUST be made in `docs/portfolio-content.md` FIRST, then mirrored into the Angular components in `src/app/components/`. If the file and a component disagree, the file wins; fix the component.
- The chatbot reads this file via `scripts/generate-chat-context.mjs` (`npm run generate:chat-context`, run automatically on `prestart`/`prebuild`) into `api/_lib/portfolio-content.generated.ts`. Never edit the generated file by hand.
- Record content decisions in `docs/decisions.md`.

## Specs

- Behaviour specs live in `docs/specs/` (see `docs/specs/README.md` for layout, status values and the index).
- Every NEW feature or requirement MUST get its own spec file in `docs/specs/changes/` (`NNNN-short-slug.md`, next free number, copied from `docs/specs/_template.md`) BEFORE any code is written. Write numbered, testable requirements and acceptance criteria, and set `status: draft`.
- Do not implement until the user has approved the spec. When it ships, set `status: implemented`, fill in **Files**, and add a one-line pointer in the **Change log** of every baseline spec it `amends`.
- Keep the specs index in `docs/specs/README.md` current, and link the spec ID from the matching `docs/decisions.md` entry.
- Do not copy page content into specs; link to `docs/portfolio-content.md`.

## Setup: Required AI Skills

This repo expects design/review skills that are gitignored (`.claude/`). After cloning, **tell the user to install them** following [docs/required-skills.md](docs/required-skills.md) (source GitHub links and install steps) before doing UI design, audit or review work. If a skill listed there is missing from `.claude/skills/`, say so and point to that file.
