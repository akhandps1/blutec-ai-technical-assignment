---
name: responsive-testing
description: >-
  Systematic multi-viewport inspection workflow to ensure flawless layout
  adaptation across Desktop, Laptop, Tablet, and Mobile devices.
---

# Skill: Responsive Testing

## Purpose
Validate that all components and pages adapt seamlessly across standard responsive viewports without horizontal overflow or layout breakage.

## When to Use
- Before completing any page or section implementation.
- Prior to final visual QA and deployment.

## Inputs
- `research/RESPONSIVE_BEHAVIOR.md`
- Target viewport dimensions:
  - Desktop: 1440 × 900
  - Laptop: 1280 × 800
  - Tablet: 768 × 1024
  - Mobile: 390 × 844

## Workflow
1. Launch local dev server (`npm run dev`) or build output (`npm run start`).
2. Run automated headless browser sessions targeting each viewport.
3. Check navigation transition (horizontal menu -> hamburger drawer at 768px).
4. Verify multi-column grid collapses (4-col -> 3-col -> 2-col -> 1-col).
5. Verify touch target compliance on mobile (minimum 44x44px).
6. Capture and inspect full-page screenshots at each viewport.

## Tools
- Playwright viewport emulation
- Chrome DevTools device mode

## Rules
- Never accept horizontal scrolling on mobile viewports.
- Verify sticky header behavior on scroll across all devices.

## Expected Outputs
- Responsive test reports and multi-viewport screenshots.

## Validation Checklist
- [ ] No layout overflow or clipped text at 390px mobile.
- [ ] Drawer menu opens cleanly and traps focus on mobile.
- [ ] Door cards scale correctly on tablet.

## Common Mistakes
- Only testing desktop and mobile while ignoring tablet layout shifts.
- Fixed pixel padding that causes text clipping on narrow mobile screens.
