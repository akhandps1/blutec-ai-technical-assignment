# Call to Action (CTA) & Functional Map

This document catalogs every interactive call-to-action button, link, and form submission on **TeddyPups U.A.E.**

---

## 1. Global Navigation & Header CTAs

| CTA Element | Visual Appearance | Destination / Action | Functionality | Context |
|---|---|---|---|---|
| **Site Brand Logo** | Circular logo image + 'TeddyPups' text | `/` | Navigates to Homepage root | Desktop & Mobile Header |
| **Nav Links** | Warm brown Figtree text with hover paw indicator | `/puppies`, `/happy-families`, `/how-it-works`, `/faq`, `/contact` | Direct client-side page routing | Desktop Header |
| **WhatsApp Header CTA** | Forest green pill button with hard shadow | `https://wa.me/919898124987?text=...` | Opens WhatsApp chat in new window | Desktop Header (right side) |
| **Mobile Menu Toggle** | Rounded button labeled 'Menu' / 'Close' | Toggles `.tp-menu` active class | Opens/closes full-screen navigation drawer | Mobile Header (<768px) |

---

## 2. Homepage Specific CTAs

| Section | CTA Label | Button Style | Target Destination | Behavioral Result |
|---|---|---|---|---|
| **Hero Scene** | "Meet available puppies" | Forest green pill, text-white, drop shadow | `/puppies` | Routes to Available Puppies catalog |
| **Hero Scene** | "WhatsApp us" | Cocoa border pill, transparent bg | `https://wa.me/...` | Launches WhatsApp consultation |
| **Meet Pups** | "See all available puppies" | Terracotta inline text link with arrow | `/puppies` | Routes to Available Puppies catalog |
| **Journey Scene** | "Chat with us" | Green pill button | `https://wa.me/...` | Launches WhatsApp pre-adoption chat |
| **Dusk Scene** | "See all happy families" | Terracotta button | `/happy-families` | Routes to customer testimonials |
| **Night Scene** | "Read all questions" | Terracotta button | `/faq` | Routes to complete FAQ guide |
| **Home Scene** | "Find your puppy" | Green primary pill button | `/puppies` | Routes to Available Puppies catalog |
| **Home Scene** | "Say hello on WhatsApp" | Cocoa outline pill button | `https://wa.me/...` | Direct messaging |

---

## 3. Catalog & Puppy Detail CTAs

| Page | CTA Label | Visual Style | Destination | Functionality |
|---|---|---|---|---|
| `/puppies` | "In Dubai" / "Imported" | Filter pill (`rounded-full`) | `?origin=local` / `?origin=imported` | Dynamically filters puppy cards grid |
| `/puppies` | Breed Pills (Maltipoo, Poodle...) | Filter pill (`rounded-full`) | `?breed=[breed]` | Dynamically filters puppy cards by breed |
| `/puppies` | "Meet [Puppy Name]" | Door plate link button | `/puppies/[slug]` | Navigates to puppy profile page |
| `/puppies` | "See who went home" | Secondary banner button | `/gone-home` | Routes to adopted archive |
| `/puppies/[slug]` | "‹ All puppies" | Back navigation link | `/puppies` | Returns to catalog |
| `/puppies/[slug]` | Slider Prev / Next (‹ / ›) | Circular chevron button | Internal state update | Cycles photo carousel index |
| `/puppies/[slug]` | Video Play Button (▶) | Floating glyph over thumbnail | Internal state update | Replaces photo slider with HTML5 video player |
| `/puppies/[slug]` | "Ask about [Name]" | Green primary pill button | `https://wa.me/919898124987?text=Hi%2C%20I%20am%20inquiring%20about%20[Name]` | Launches WhatsApp pre-filled with puppy inquiry |

---

## 4. Contact Form Functional Specification

| Form Field | HTML Input Type | Required | Placeholder / Default | Validation / Sanitization Rule |
|---|---|---|---|---|
| **Full Name** | `text` | Yes | None | Trimmed string, min 2 chars |
| **Phone Number** | `tel` | Yes | `+971 50 123 4567` | Valid international / UAE mobile phone pattern |
| **Email Address** | `email` | No | `optional` | Standard RFC 5322 email syntax |
| **Area in UAE** | `text` | No | `e.g. Dubai Marina` | Freeform text string |
| **Puppy Selection** | `select-one` | No | `any puppy (not sure yet)` | Matches 16 puppy UUIDs or blank |
| **Message Notes** | `textarea` | No | `Anything else you'd like to tell us…` | Multiline text |
| **Honeypot** | `text` | No | Hidden / Off-screen | Must remain empty; submissions discarded if filled |
| **Submit Action** | `button[type=submit]` | N/A | `Send enquiry` / `Send letter` | Triggers POST to `/contact` and letter-fold animation |
