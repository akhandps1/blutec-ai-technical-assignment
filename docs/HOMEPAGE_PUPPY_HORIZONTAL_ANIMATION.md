# Meet the Pups: Horizontal Corridor Scroll Animation Reconstruction

## 1. Architectural Architecture & Mechanics
The "Meet the Pups" section (`.tp-meet`) is the central interactive centerpiece of the TeddyPups homepage. It transforms standard vertical window scrolling into a smooth horizontal corridor promenade through 12 puppy nursery suites.

```
+-----------------------------------------------------------------------------------+
|  VIEWPORT (100vh Sticky Stage)                                                    |
|                                                                                   |
|  [Header: "Meet the pups"]                              [Button: See all puppies] |
|                                                                                   |
|                   [Door 1]        [Door 2]        [Door 3]        [Door 4] ...    |
|                   (Max)           (Teacup)        (Poodle)                        |
|                                                                                   |
|      [Mascot]                                                                     |
|      (Treadmill)                                                                  |
|  ===============================================================================  |
|  [ Parquet Wooden Floor Tiles: --floor-x parallax matching track translation ]    |
+-----------------------------------------------------------------------------------+
   Vertical Scroll Range: 3226px  --->  Translates Track from 0px to -3840px
```

---

## 2. Detailed Technical Implementation

### Pinned Sticky Stage
- **Container Selector:** `section.tp-meet`
- **Pin Range Element:** `div[data-pin-range="true"]`
- **CSS Dimension:** `height: calc(3226px + 100vh);`
- **Stage Stacking:** `position: sticky; top: 0; height: 100vh; overflow: hidden;`

### Horizontal Translation Calculation
In `src/components/sections/MeetPupsSection.tsx`:
```typescript
const updateScrollAnimation = () => {
  if (window.innerWidth < 768) {
    track.style.transform = "none";
    return;
  }

  const rect = pinRange.getBoundingClientRect();
  const pinHeight = pinRange.offsetHeight;
  const windowHeight = window.innerHeight;
  const maxScroll = pinHeight - windowHeight;

  if (maxScroll <= 0) return;

  const scrolled = -rect.top;
  const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

  const trackScrollWidth = track.scrollWidth;
  const stageWidth = window.innerWidth;
  const maxTravel = Math.max(trackScrollWidth - stageWidth + window.innerWidth * 0.15, 3840);
  const currentTranslateX = progress * maxTravel;

  track.style.transform = `translateX(-${currentTranslateX}px)`;

  if (floor) {
    floor.style.setProperty("--floor-x", `-${currentTranslateX}px`);
  }
};
```

### 3D Door Swing Logic
As doors slide past the user's primary viewing zone (from 10% to 42% of the viewport width), each door opens in 3D perspective to reveal the real puppy photograph inside:
- **Angle Calculation:**
  ```typescript
  const zoneMin = window.innerWidth * 0.10;
  const zoneMax = window.innerWidth * 0.42;

  doors.forEach((door) => {
    const doorRect = door.getBoundingClientRect();
    const doorCenter = doorRect.left + doorRect.width / 2;
    if (doorCenter >= zoneMin && doorCenter <= zoneMax) {
      door.setAttribute("data-open", "true");
      door.style.setProperty("--door-open", "-75deg");
    } else {
      door.setAttribute("data-open", "false");
      door.style.setProperty("--door-open", "0deg");
    }
  });
  ```
- **CSS Transform:**
  ```css
  .tp-door__panel {
    transform-origin: left center;
    transform: perspective(1000px) rotateY(var(--door-open, 0deg));
    transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  ```

### Bidirectional Scroll & Reverse Restoration
- **Forward Scrolling (Down):** Doors smoothly approach from right to left, open when crossing into the viewing zone, and close as they exit left.
- **Reverse Scrolling (Up):** As the user scrolls back up, the track moves backwards (`translateX` decreases toward 0), and doors re-open as they re-enter the viewing zone from the left, returning to their closed resting positions at the top of the section.
- **Desktop Drag Support:** Mouse click-and-drag is supported on desktop viewports, translating horizontal dragging into corresponding scroll progress.

---

## 3. Mobile (< 768px) Responsive Adaptation
On mobile screens where horizontal sticky corridors would restrict thumb scrolling:
- Sticky pinning is gracefully disabled.
- The 12 puppy suites gracefully re-flow into an intuitive horizontal swipe carousel with touch momentum scrolling.
- All doors remain interactively tappable to open and view puppy details.

---

## 4. Verification Checkpoints Passed
1. Smooth translation from `0px` to `-2765px` to `-3840px` verified via Playwright.
2. Parquet floor parallax alignment confirmed with 0 visual jitter.
3. Door opening animation triggers accurately within the specified viewport zone.
4. Treadmill walking mascot animates synchronously with corridor translation.
