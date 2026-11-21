# Rule: Code Quality & Architecture

1. **Strict TypeScript:** All variables, component props, and API handlers must be explicitly typed. No `any` or `@ts-ignore`.
2. **Modular Components:** Keep components focused and single-purpose under `src/components/`.
3. **Semantic HTML:** Use proper semantic landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`).
4. **Accessible Forms & Controls:** All form inputs must have associated labels or accessible names. All interactive buttons must have distinct focus and active states.
5. **Clean Dependency Graph:** Do not install extra npm packages without verifying necessity against the research document.
