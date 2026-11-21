---
name: animation-recreation
description: >-
  Methodology for implementing high-performance CSS keyframe animations,
  GSAP scroll triggers, and Framer Motion transitions.
---

# Skill: Animation Recreation

## Purpose
Recreate all dynamic visual transitions, mascot running loops, paw print trails, and scroll effects with exact timing, easing, and zero layout shift.

## When to Use
- When implementing page-load curtain reveals, runner loops, door hover swings, and letterform animations.

## Inputs
- `research/ANIMATION_INTERACTION_MAP.md`
- Reference keyframe CSS definitions.

## Workflow
1. Identify the target animation trigger (page load, hover, click, scroll).
2. Configure CSS keyframes in `src/styles/globals.css` or Tailwind config.
3. Set precise duration, easing (`cubic-bezier`), iteration count, and direction.
4. Bind animations to component state or class names.
5. Ensure hardware-acceleration (`transform`, `opacity`).
6. Add `@media (prefers-reduced-motion: reduce)` accessibility fallback.

## Tools
- CSS `@keyframes`
- GSAP / ScrollTrigger
- Framer Motion

## Rules
- Never animate non-composited properties (`top`, `left`, `width`, `height`).
- Always clean up event listeners and timeline instances.
- Maintain 60fps performance on mobile.

## Expected Outputs
- Functional, fluid animations matching the 46 documented keyframes.

## Validation Checklist
- [ ] Mascot runner loops smoothly with alternating leg strides.
- [ ] Mobile menu expands with circular clip-path reveal.
- [ ] Door cards swing open on hover in 3D perspective.

## Common Mistakes
- Using heavy JavaScript libraries for animations that run cleanly in pure CSS.
- Forgetting `overflow-hidden` on containers with moving child elements.
- Omission of reduced motion preferences.
