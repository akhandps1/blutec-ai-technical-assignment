# Technical Stack & Architecture Research

## 1. Core Framework & Build Tooling
- **Framework:** **Next.js 14 / 15** (App Router architecture)
- **Bundler & Compiler:** **Turbopack** (Evidenced by runtime chunks `turbopack-2c3mg3r-05n1w.js`)
- **Rendering Paradigm:** React Server Components (RSC) + Static Site Generation (SSG) with Pre-rendered HTML (`x-nextjs-prerender: 1`, `x-nextjs-cache: HIT`)
- **Hydration:** Flight data streams embedded directly into SSR HTML (`self.__next_f.push(...)`)

## 2. Styling & CSS Architecture
- **CSS Engine:** **Tailwind CSS V3/V4** with bespoke configuration
- **Feature Layering:** Modern CSS `@layer properties`, native CSS variables (`--tw-*`, `--font-*`, `--tilt`, `--swing`)
- **Typography Engine:** `next/font/google` with local WOFF2 font caching and subsetting:
  - `Fraunces` (Google Variable Serif)
  - `Figtree` (Google Variable Sans-serif)
  - `Shantell Sans` (Google Variable Handwriting)
- **Animation System:** Pure CSS keyframes (46 keyframe definitions) combined with hardware-accelerated transforms (`translate3d`, `rotateY`, `scale`, `clip-path`). No external Framer Motion or GSAP bundle overhead.

## 3. Media & Asset Pipeline
- **Image Delivery:** Next.js Image Optimization service (`/_next/image?url=...`) serving WebP and AVIF formats with responsive `srcset` breakpoints.
- **Original Media Storage:** Cloud-hosted high-resolution media repository accessed via `/media/[hash]/[id]/filename.[ext]`
- **Video Delivery:** Native HTML5 MP4 video with H.264 encoding, delivered over HTTP/2 byte-range requests with caching.
- **Icons & Graphics:** 100% inline scalable vector graphics (SVG) with reusable defs patterns (`#tp-curtain-scallop`).

## 4. Hosting, Infrastructure & Security
- **Edge CDN & Proxy:** **Cloudflare** (Server header: `cloudflare`, HTTP/2 & HTTP/3 ALTSVC support)
- **Caching Policies:**
  - HTML documents: `s-maxage=86400, stale-while-revalidate=518400`
  - Media & Fonts: `public, max-age=31536000, immutable`
  - Brand assets: `public, max-age=14400`
- **Security Headers:**
  - Content-Security-Policy (CSP): `default-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`
  - X-Frame-Options: `DENY`
  - X-Content-Type-Options: `nosniff`
  - Referrer-Policy: `strict-origin-when-cross-origin`
  - Permissions-Policy: `camera=(), microphone=(), geolocation=(), interest-cohort=()`

## 5. Third-Party Integrations
- **Cloudflare Web Analytics:** `https://static.cloudflareinsights.com/beacon.min.js`
- **Cloudflare Static Email Obfuscation:** `/cdn-cgi/scripts/.../email-decode.min.js`
- **WhatsApp Web / Mobile Direct Integration:** WhatsApp Click-to-Chat deep links pre-populated with intent text:
  `https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I%27d%20like%20to%20discuss%20a%20project.`
