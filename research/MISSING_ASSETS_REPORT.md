# Missing and Inaccessible Assets Report

This report documents any requested asset that was not directly accessible, returned non-200 HTTP codes, or required client-side generation.

## Inaccessible / Non-existent Remote Files (1 items)

| Asset Name | Target URL | Expected Purpose | Observation / Reason | Resolution |
|---|---|---|---|---|
| Default Favicon ICO | https://puppy.instabizweb.com/favicon.ico | Browser favicon | Returns 404 on `/favicon.ico`. Site uses Next.js dynamic `/icon.png` and `/apple-icon.png` in HTML `<head>`. | Use downloaded `public/assets/icons/favicon-icon.png` |

## Client-Side Generated Elements (No Remote Asset File Exists)

1. **Puppy Runner Character**: The animated runner dog (`.tp-runner`) is constructed purely out of DOM elements (`.tp-runner__body`, `.tp-runner__ear`, `.tp-runner__leg`, `.tp-runner__tail`) styled with CSS borders, border-radii, and animated with CSS keyframes. There is no external GIF, video, or Lottie file.
2. **Paw Print Trails**: The paw print trails (`.pup-prints`, `.tp-curtain__print`) are SVG vector paths with inline CSS rotate, scale, and animation delay values.
3. **Horizon Sun & Skylines**: The sun (`.tp-horizon__sun`) and city skyline (`.tp-horizon__city`) are CSS-styled elements with radial-gradients and box-shadows rather than bitmap image assets.
4. **Wavy Curtain Hem**: The scalloped edges at section dividers are SVG pattern definitions (`#tp-curtain-scallop`) repeated horizontally via SVG preserveAspectRatio.

## Data Integrity Verification

- All 42 puppy profile master photographs were successfully extracted.
- All 6 puppy feature video clips (.mp4) were successfully downloaded.
- All 10 web font files (.woff2) across Fraunces, Figtree, and Shantell Sans were successfully extracted.
- All 42 unique inline vector SVGs were exported into standalone .svg files.
- Brand logo (PNG) and mobile/desktop app icons were saved in original resolution.
