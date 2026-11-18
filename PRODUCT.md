# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Three audiences, confirmed as a mix: employers and recruiters evaluating fit for full-stack .NET + Angular roles; clients and freelance leads deciding whether to commission web, mobile or IoT work; and students (many from the owner's AMA Computer College classes) who want to see what the work and path look like. Visitors arrive to judge credibility quickly, then contact the owner, download the CV, or ask the chatbot. Employers are the lead audience.

## Product Purpose
Personal portfolio of Marco O. Amira, a Software Engineer (Eclectus Technologies) and part-time professor. It presents experience, projects, skills, workflow, programming journey, off-screen activities, certificates and trainings, and gives visitors three ways to act: contact form, CV download, and an AI chatbot that answers questions about the owner. Success: a visitor leaves with a clear, credible picture of the owner and takes one of those actions.

## Positioning
A working full-stack engineer who ships production .NET/Angular platforms and ThingsBoard IoT systems, and who also teaches, and who works in an expert-level AI-assisted workflow, shown on the site through its own Gemini chatbot and workflow section. Confirmed by the owner as full-stack + IoT + teaching, and AI-assisted engineering.

## Operating Context
- Angular 22 app with SSR (Express), Tailwind CSS 4, deployed with Vercel-style serverless endpoints (`api/chat.ts`, contact email via nodemailer, Upstash rate limiting).
- Content lives in `docs/portfolio-content.md` (single source of truth), mirrored into `src/app/components/`; the chatbot reads it via `npm run generate:chat-context`.
- Behaviour specs in `docs/specs/`; decisions in `docs/decisions.md`.

## Capabilities and Constraints
- Sections: hero, about, experience, projects, skills, workflow, journey/career path, off-screen activities, certificates (modal), contact, footer, chatbot.
- Theme switching (light and dark) must stay.
- Gemini chatbot, contact form and CV download are required features.
- Standalone Angular components, signals, native control flow, Reactive forms; no `ngClass`/`ngStyle`/`@HostBinding`; `NgOptimizedImage` for static images (see AGENTS.md).
- Terminology: "Eclectus Technologies Inc.", "Capataz", "Eyeko", "VestiCare", "Smart Farming App".
- Undecided: hosting target and final domain beyond what the repo records.

## Brand Commitments
- The blue accent stays (light `#1b6375`, dark `#b1e5f2` in `brand.md`).
- Typography may change; Roboto Mono in `brand.md` is not binding.
- Everything else in `brand.md` (gradients, glassmorphism, indigo/plum dark surfaces, spacing) is incumbent, not confirmed binding.

## Evidence on Hand
Real experience, projects, awards, certificates and trainings in `docs/portfolio-content.md`; project and activity photos in `public/assets/image/`; CV at `public/assets/files/marco-o-amira-cv-reference.pdf`; live project link https://capataz.ph/. Testimonials are not on hand (the Reviews component is unmounted); do not fabricate any.

## Product Principles
1. Credibility first: every claim traces to `docs/portfolio-content.md`.
2. Serve three audiences without splitting the page; employers reach proof fastest.
3. The chatbot, contact form and CV are conversion paths and stay prominent and working.
4. Accessible by default: WCAG AA and AXE clean, in both themes.
5. Show the AI-assisted workflow honestly, as one part of the engineering story.

## Accessibility & Inclusion
Must pass all AXE checks and meet WCAG AA minimums, including focus management, contrast and ARIA (AGENTS.md); respect reduced motion; both themes must meet contrast.
