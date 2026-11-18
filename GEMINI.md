# Gemini Development Guide for WebsitePortfolioTest

Welcome! This document provides an overview of the **WebsitePortfolioTest** project structure, architecture, and coding guidelines specifically tailored for Gemini and other AI coding assistants.

---

## 🚀 Project Overview
**WebsitePortfolioTest** is a premium, interactive single-page portfolio application built using **Angular v22.0.0**. It showcases career progression, skillsets, and professional certificates using a highly polished, responsive visual design.

- **URL**: `http://localhost:4200` (Dev server)
- **SSR Server**: Node Express listening on port `4000`

---

## 🛠️ Technology Stack
- **Core Framework**: Angular v22.0.0 (featuring standalone components, Signals, and SSR/hydration)
- **Styling**: Tailwind CSS v4.0 (configured via `@tailwindcss/postcss` and PostCSS) & Custom Vanilla CSS
- **Routing**: Angular router (`app.routes.ts` & `app.routes.server.ts`)
- **Backend / Server**: Node.js, Express (configured for server-side rendering and asset serving)
- **Testing**: Vitest (`vitest`) for unit tests
- **Form Management**: Angular Reactive Forms

---

## 📂 Key Project Structure

```
website-portfolio-test/
├── .gemini/                 # Gemini configuration and guideline documents
│   └── GEMINI.md            # Reference instructions (sync'd with AGENTS.md)
├── src/
│   ├── app/
│   │   ├── components/      # Standalone UI components:
│   │   │   ├── about/
│   │   │   ├── career-path/
│   │   │   ├── certificates/# Certificate gallery and dynamic lightbox/modal
│   │   │   ├── contact/     # Contact form utilizing Reactive Forms
│   │   │   ├── experience/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   ├── hero/
│   │   │   ├── journey/
│   │   │   ├── off-screen-activities/
│   │   │   ├── portfolio/
│   │   │   ├── skills/
│   │   │   └── theme-toggle/# Dark/light theme management
│   │   ├── app.ts           # Main component logic (IntersectionObserver for scroll animations)
│   │   ├── app.html         # Root HTML template
│   │   ├── app.css          # Main component styles
│   │   └── app.config.ts    # Application configuration (hydration, routing)
│   ├── index.html           # Main HTML document template
│   ├── server.ts            # Node/Express SSR setup
│   └── styles.css           # Global custom typography and theme stylesheet
├── AGENTS.md                # Root-level developer rules (read-only reference)
└── package.json             # Build configuration and dependency tree
```

---

## 💻 Development & Verification Commands

Use the following commands during development and validation:

| Action | Command | Description |
|---|---|---|
| **Start Dev Server** | `npm start` or `ng serve` | Runs local server on port 4200. Recompiles on changes. |
| **Build Production** | `npm run build` or `ng build` | Compiles application and server files into `dist/`. |
| **Run Unit Tests** | `npm run test` or `ng test` | Runs unit tests using the Vitest test runner. |
| **Local SSR Server** | `npm run serve:ssr:website-portfolio-test` | Starts Node Express SSR server on port 4000. |

---

## 📏 Coding Guidelines & Best Practices

All additions and modifications MUST adhere to the following rules:

### TypeScript Best Practices
- **Strict Typing**: Always enforce strict type checking.
- **Type Inference**: Prefer type inference when types are obvious.
- **Avoid `any`**: Do not use `any`. Use `unknown` if the type cannot be determined.

### Angular Best Practices
- **Standalone Components**: Always write standalone components.
- **Angular v20+ Decorators**: Do NOT specify `standalone: true` inside component/directive decorators, as it is the default.
- **Signals**: Always use Angular Signals for state management and reactive flows.
- **No `@HostBinding`/`@HostListener`**: Avoid host binding/listener decorators. Use the `host` object configuration within `@Component` or `@Directive`.
- **Image Optimization**: Use the `NgOptimizedImage` directive for all static images (note: does not support inline base64).
- **CSS Class and Style Binding**: Do NOT use `ngClass` or `ngStyle`. Instead, use standard native class and style bindings (e.g. `[class.some-class]="condition"`, `[style.color]="val"`).
- **Relative Path Resolving**: When linking templates and style files, use relative paths to the component file.

### Accessibility (a11y)
- **AXE Checks**: Code must pass all AXE checks.
- **WCAG AA Compliance**: Keep contrast ratios high, handle keyboard focus management, and include proper ARIA roles/attributes.

### Component Architecture
- **Single Responsibility**: Components must be small, focused, and perform a single job.
- **Signals-based APIs**: Prefer `input()` and `output()` API functions over `@Input()` and `@Output()` decorators.
- **Derived State**: Always calculate derived state using `computed()`.
- **Forms**: Prioritize Reactive forms (`FormBuilder`, `FormGroup`) over Template-driven forms.
- **State Mutation**: Never mutate signal values directly. Always use `.set()` or `.update()`.

### Template Guidelines
- **Native Control Flow**: Use modern native control flows (`@if`, `@for`, `@switch`) instead of legacy directive-based bindings (`*ngIf`, `*ngFor`).
- **Async Handling**: Use the async pipe (`| async`) when consuming observables in templates.
- **Sandbox Environment**: Avoid accessing global browser objects (e.g. `new Date()`) directly in templates.

## Setup: Required AI Skills

This repo expects design/review skills that are gitignored (`.claude/`). After cloning, **tell the user to install them** following [docs/required-skills.md](docs/required-skills.md) (source GitHub links and install steps) before doing UI design, audit or review work. If a skill listed there is missing from `.claude/skills/`, say so and point to that file.
