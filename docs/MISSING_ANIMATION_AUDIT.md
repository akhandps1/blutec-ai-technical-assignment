# Section-by-Section Animation Audit

This document records the exact properties, triggers, timing, and behavior of all animations across the website sections, while strictly preserving the independent `PupJourney` mascot scroll animation.

---

## Animation Analysis Matrix

| Property | Hero Lineup (`HeroSection`) | Meet Pups Corridor (`MeetPupsSection`) | Chat Steps (`JourneySection`) | Dusk Photo Wall (`DuskSection`) | Cottage Door (`HomeSection`) | Night Twinkle (`NightSection`) |
|---|---|---|---|---|---|---|
| **Element** | 6 puppy avatars behind quilt scallops | Hallway track & 8 door leaves | Phone message stream, typing dots & video | 8 taped polaroid cards | Cottage door leaf (`.tp-house__door`) | 11 SVG star graphics |
| **Trigger** | Hover, focus & 4.5s idle duck/pop | Pinned scroll (viewport `y=1100` to `y=4400`) | Scroll `IntersectionObserver` & tab click | Scroll entry into view | Scroll view timeline (entry 80% to cover 50%) | CSS continuous keyframe loop |
| **Start Position** | `--peek: 0.62` to `0.82` | `translateX(0px)` | Step 0 (`data-step="0"` visible) | Tilted on wall with `--tape` | Closed (`rotateY(0deg)`) | Scaled & faded |
| **Duration** | 360ms duck / 700ms pop | Tracked smoothly with scroll delta | 700ms typing delay / 500ms message enter | 550ms per card | Tracked across scroll span | 2.4s to 4.0s pulse |
| **Delay / Stagger** | Staggered random intervals | Continuous frame-rate spring | 750ms simulated typing delay | `--d: 110ms * [3,0,5,1,6,2,7,4]` | Continuous | `animation-delay: 0.0s to 4.0s` |
| **Easing** | `cubic-bezier(0.34, 1.56, 0.64, 1)` (pounce) | `cubic-bezier(0.22, 1, 0.36, 1)` (silk) | `var(--ease-pounce)` | `cubic-bezier(0.3, 1.32, 0.48, 1)` | Linear view-timeline | Ease-in-out pulse |
| **Direction** | Forward on hover, reset on leave | Bidirectional: forward & reverse scroll | Bidirectional: steps adjust up and down | Stays revealed once scrolled | Reverses when scrolling back up | Infinite loop |
| **Completion State** | `data-tag="show"` displaying handwriting name | Full travel across 3840px, doors open | Step 2/3 revealed with video & route | Full photowall visible with tape | `rotateY(-102deg)` fully swung open | Twinkling stars in dark night |

---

## Downward & Reverse Scroll Verification
1. **Meet the Pups:** When scrolling downward, the track translates from `0px` to `-4213px`. When scrolling back upward, the track smoothly translates back to `0px` without jumping or lagging.
2. **Journey Chat:** Scrolling down activates Step 1 -> Step 2 -> Step 3. Scrolling up restores Step 2 and Step 1 with proper `data-active` indicators.
3. **Cottage Door:** Door swings smoothly from closed to open (`-102deg`) as the user scrolls into the Home section and resets when scrolled away.
4. **PupJourney Mascot:** Unaffected by section animation enhancements. Travels continuously across all 9 waypoints and docks inside the footer wicker basket.
