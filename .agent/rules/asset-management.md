# Rule: Asset Management

1. **Original Assets Only:** Always reference assets downloaded into `public/assets/`. Never substitute with generic stock photos or placeholders.
2. **Next.js Image Optimization:** Use Next.js `<Image>` with explicit width/height or `fill` with `sizes` to eliminate layout shifts.
3. **Native SVG Vectors:** Use the 42 extracted SVG assets in `public/assets/svg/` for exact resolution and styling control.
4. **Preserve Formats:** Maintain original asset formats (AVIF, WebP, JPG, MP4, WOFF2) without unnecessary conversions.
5. **Video Handling:** Use HTML5 `<video>` tags with `playsinline`, `muted`, `loop`, and `poster` attributes matching the reference implementation.
