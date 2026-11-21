---
name: pixel-perfect-development
description: >-
  Techniques and guidelines for reproducing UI components, layouts, and typography
  with 1:1 visual fidelity against verified research specs.
---

# Skill: Pixel-Perfect Development

## Purpose
Translate design tokens and audited page sections into clean, maintainable React/Next.js components matching the reference website.

## When to Use
- When developing layout shells, navigation bars, scenes, door cards, and letterforms.
- When styling elements with exact Tailwind utility classes and CSS variables.

## Inputs
- `research/DESIGN_TOKENS.md`
- `research/UI_UX_DESIGN_SPEC.md`
- Reference screenshots in `research/screenshots/`

## Workflow
1. Review target section in `SECTION_ORDER_MAP.md` and `PAGE_BY_PAGE_AUDIT.md`.
2. Apply designated container widths (`max-w-screen-wide` or `max-w-screen-standard`) and gutter paddings.
3. Set exact font family, size, line-height, letter-spacing, and color token.
4. Implement component structures (e.g. arched door cards, tilted polaroids, scalloped dividers).
5. Compare local rendering against reference screenshot at `1440x900`.
6. Adjust margins, paddings, and border-radii until visual alignment is achieved.

## Tools
- Next.js 14, React 18, TypeScript, Tailwind CSS
- Headless browser screenshot comparison

## Rules
- Never redesign or "improve" the reference layout.
- Use exact measured token values rather than rough approximations.
- Maintain responsive fluid scaling.

## Expected Outputs
- Type-safe, modular React components in `src/components/`.
- Clean route implementations in `src/app/`.

## Validation Checklist
- [ ] Typography scale matches `DESIGN_TOKENS.md`.
- [ ] Colors match hex values.
- [ ] Component borders and drop shadows match measured values.

## Common Mistakes
- Using generic Tailwind classes (`text-xl`) without matching exact line-height and letter-spacing.
- Missing custom container max-widths.
- Hardcoding static pixel dimensions instead of responsive classes.
