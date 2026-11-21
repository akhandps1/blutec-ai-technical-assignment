---
name: visual-qa
description: >-
  Automated and manual visual regression testing procedure comparing
  cloned pages directly against original reference screenshots.
---

# Skill: Visual QA

## Purpose
Provide a rigorous visual quality gate by comparing rendered cloned components and pages side-by-side against reference screenshots in `research/screenshots/`.

## When to Use
- Following the completion of a page implementation.
- Before committing final production milestones.

## Inputs
- Reference screenshots in `research/screenshots/`
- `research/SCREENSHOT_INDEX.md`
- Local application server running on `http://localhost:3000`

## Workflow
1. Capture identical viewport screenshot of local page under test.
2. Align against the corresponding reference screenshot from `research/screenshots/`.
3. Inspect pixel fidelity: typography weight, spacing, background tints, border radii, shadows.
4. Verify interactive states (expanded accordions, modal overlays, active filters).
5. Document any discrepancies in a visual QA log and apply fixes.

## Tools
- Playwright screenshot capture
- Image diff / visual inspection

## Rules
- Zero tolerance for missing elements, inverted colors, or wrong font families.
- All visual fixes must be verified on both desktop and mobile.

## Expected Outputs
- Clean visual audit log with zero outstanding high-severity visual defects.

## Validation Checklist
- [ ] Fonts render with correct weights (800 for Fraunces, 620 for Figtree).
- [ ] Shadows match the hard offset token (`0px 8px 0px -2.4px #2A170E`).
- [ ] Image aspect ratios match reference.

## Common Mistakes
- Skipping visual verification of hover or active states.
- Ignoring font rendering differences caused by missing font weights.
