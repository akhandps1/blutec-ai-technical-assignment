---
name: website-research
description: >-
  Standard operating procedure for reverse-engineering websites, extracting sitemaps,
  mapping component hierarchies, and documenting DOM structures with high fidelity.
---

# Skill: Website Research

## Purpose
Guide agents through exhaustive, evidence-based reverse engineering audits of target websites prior to writing implementation code.

## When to Use
- When initiating a clone, redesign, or migration project.
- When discovering new pages, routes, forms, or interactive states.
- When mapping user journeys and section-by-section DOM hierarchies.

## Inputs
- Target reference URL (e.g. `https://puppy.instabizweb.com/`).
- Discovery parameters (viewports, routes, sitemaps).

## Workflow
1. Crawl robots.txt and sitemap.xml to identify all declared routes.
2. Inspect homepage, header navigation, dropdowns, nested routes, and footer links.
3. Use automated browser tools (Chromium / Playwright) to navigate to every discovered route.
4. Record exact DOM tree sequence, headings, paragraphs, buttons, and forms.
5. Identify interactive components (modals, accordions, carousels, drawers).
6. Document findings in structured research files under `research/`.

## Tools
- `run_command` (Playwright / Chromium scripts, curl, node)
- `read_file`, `write_file`
- Chrome DevTools MCP tools

## Rules
- Never assume the homepage represents the entire website.
- Never invent missing content or text copy.
- Record inaccessible or restricted endpoints explicitly.

## Expected Outputs
- `COMPLETE_SITEMAP.md`
- `PAGE_BY_PAGE_AUDIT.md`
- `SECTION_ORDER_MAP.md`

## Validation Checklist
- [ ] Every internal link visited and verified with HTTP status.
- [ ] Heading levels (H1, H2, H3) documented accurately.
- [ ] All forms, inputs, placeholders, and honeypots cataloged.

## Common Mistakes
- Relying solely on sitemap.xml without crawling client-side routing.
- Ignoring responsive mobile navigation differences.
- Guessing backend API behavior instead of noting boundaries.
