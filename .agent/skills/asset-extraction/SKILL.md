---
name: asset-extraction
description: >-
  Procedure for downloading, categorizing, and cataloging all original web assets
  (fonts, images, SVGs, logos, videos) without quality degradation.
---

# Skill: Asset Extraction

## Purpose
Systematically discover, extract, and categorize all original media and static assets from the reference website.

## When to Use
- When downloading master images, web fonts, vector SVGs, and video media.
- When compiling asset inventories and usage maps.

## Inputs
- Reference website URL.
- Network traces and DOM image/media selectors.

## Workflow
1. Intercept network responses for image, font, media, and video content types.
2. Unwrap image optimization proxies (e.g. Next.js `/_next/image?url=...`) to access master uncompressed files.
3. Download web fonts (.woff2) declared in `@font-face` rules.
4. Export inline vector SVGs into standalone `.svg` files.
5. Organize assets into designated directories under `public/assets/`.
6. Compile dimensions, sizes, and page/section usage mappings into markdown reports.

## Tools
- Node.js download scripts (`https`, `fs`)
- Browser automation (`playwright`)
- Network response listeners

## Rules
- Never replace original media with unrelated stock assets.
- Do not compress or degrade master resolution.
- Verify download integrity (file size > 0 and correct HTTP 200).

## Expected Outputs
- `public/assets/` organized subdirectories (logos, images, icons, svg, fonts, videos).
- `ASSET_INVENTORY.md`
- `ASSET_SOURCE_MAPPING.md`
- `ASSET_USAGE_MAPPING.md`
- `MISSING_ASSETS_REPORT.md`

## Validation Checklist
- [ ] All master puppy photos downloaded in original format.
- [ ] All embedded video files (.mp4) downloaded and verified.
- [ ] All font files downloaded and referenced locally.

## Common Mistakes
- Downloading low-resolution thumbnail derivatives instead of master files.
- Omitting inline SVGs rendered directly in React components.
- Ignoring video assets that load dynamically on click.
