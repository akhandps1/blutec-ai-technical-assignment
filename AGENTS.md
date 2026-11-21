# AGENTS.md — AI Engineering Guidelines & Operational Standards

## 1. Project Objective
Reproduce the reference website **TeddyPups U.A.E.** (`https://puppy.instabizweb.com/`) with absolute fidelity. The cloned implementation must be visually identical, functionally indistinguishable, responsive across all standard breakpoints, and performant.

---

## 2. Reference Fidelity (Zero Tolerance for Deviation)
- **Research is the Single Source of Truth:** All layouts, content strings, component structures, animations, and typography must adhere strictly to the completed research documents located in `research/`.
- **Never Redesign:** Do not attempt to "modernize", "improve", or alter the layout, color palette, or UX patterns of the reference website.
- **Never Skip Sections or Pages:** Every page discovered in `research/COMPLETE_SITEMAP.md` and every section mapped in `research/SECTION_ORDER_MAP.md` must be reproduced.
- **Never Invent Content:** Do not placeholder text with Lorem Ipsum. Use the exact audited copy, puppy names, descriptions, and FAQs documented in `research/PAGE_BY_PAGE_AUDIT.md`.
- **Exact DOM Sequence:** Maintain the exact section ordering documented in `research/SECTION_ORDER_MAP.md`.
- **Original Mapped Assets Only:** Only use original assets extracted into `public/assets/`. Do not introduce unrelated stock imagery or recreate logos.

---

## 3. Code Quality & Technical Standards
- **TypeScript Strict Mode:** Maintain 100% type coverage without resorting to `any` or `@ts-ignore`.
- **Component Architecture:**
  - `src/components/layout/`: Global wrappers, headers, and footers.
  - `src/components/navigation/`: Navbar, mobile drawer, and filter pills.
  - `src/components/sections/`: Discrete page scenes (`Hero`, `Meet`, `Paths`, `Journey`, `Trust`).
  - `src/components/cards/`: Reusable door cards (`.tp-door`) and polaroids (`.tp-polaroid`).
  - `src/components/forms/`: Storybook letterform, inquiry inputs, and validation handlers.
  - `src/components/animations/`: Mascot runner, paw print trails, and curtain transitions.
  - `src/components/shared/`: Generic buttons, badges, and modals.
- **Semantic HTML & Accessibility:** Use appropriate HTML5 tags (`<main>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<details>`, `<summary>`). Preserve skip links (`#main`) and form field labels.
- **No Unnecessary Dependencies:** Keep `package.json` lean. Use native Tailwind and CSS keyframes for animations where observed.
- **Zero Hardcoded Secrets:** Never commit API keys or sensitive credentials. Reference environment variables via `.env.local`.

---

## 4. Animation & Interaction Protocol
- **Documented Keyframes First:** Implement animations based on the 46 keyframe definitions cataloged in `research/ANIMATION_INTERACTION_MAP.md`.
- **Prevent Layout Shifts:** Explicitly reserve dimensions (`aspect-ratio`, `width`, `height`) on animated containers to maintain zero Cumulative Layout Shift (CLS).
- **Reduced Motion Support:** Always wrap non-essential continuous motion (mascot loops, twinkling) in `@media (prefers-reduced-motion: reduce)` overrides.
- **Listener Cleanup:** Clean up any scroll listeners, IntersectionObservers, or GSAP timelines on component unmount (`useEffect` return cleanup).

---

## 5. Verification & Testing Standards
- **Route Validation:** Ensure every internal route defined in `src/app/` returns HTTP 200 without runtime errors.
- **CTA Verification:** Validate that every button, WhatsApp link, and anchor link targets the exact audited destination.
- **Form Verification:** Verify required field validation, telephone input formatting, and honeypot suppression.
- **Multi-Viewport Audit:** Check rendering at:
  - Desktop: `1440 × 900`
  - Laptop: `1280 × 800`
  - Tablet: `768 × 1024`
  - Mobile: `390 × 844`
- **Build Cleanliness:** Ensure `npm run lint` and `npm run build` pass with 0 errors and 0 warnings before declaring any phase complete.

---

## 6. Git & Commit Hygiene
- **Conventional Commits:** Use standard semantic commit prefixes:
  - `feat:` for new page or component implementations
  - `fix:` for visual, functional, or type bug fixes
  - `chore:` for workspace, dependency, or configuration updates
  - `docs:` for research or documentation updates
- **Atomic Milestones:** Commit only verified, build-passing increments. Never commit broken code.
