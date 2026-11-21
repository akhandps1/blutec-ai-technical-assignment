# Responsive Behavior & Viewport Audit

## 1. Viewport Test Matrix
Tests were executed in Chromium across 5 standard viewport resolutions.

| Device Viewport | Dimensions | Horizontal Overflow | Mascot Journey Mode | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop High-Res** | 1920 × 1080 | **0px** (scrollWidth === clientWidth) | Full Bézier Live Journey | **PASS** |
| **Standard Desktop** | 1440 × 900 | **0px** (scrollWidth === clientWidth) | Full Bézier Live Journey | **PASS** |
| **Laptop** | 1280 × 800 | **0px** (scrollWidth === clientWidth) | Full Bézier Live Journey | **PASS** |
| **Tablet Portrait** | 768 × 1024 | **0px** (scrollWidth === clientWidth) | Full Bézier Live Journey | **PASS** |
| **Mobile Standard** | 390 × 844 | **0px** (scrollWidth === clientWidth) | Side Lane Peeking Mode | **PASS** |
| **Mobile Compact** | 375 × 812 | **0px** (scrollWidth === clientWidth) | Side Lane Peeking Mode | **PASS** |

## 2. Mobile Lane Mode Details
On screens with width <= 767px, the viewport engages data-pup="lane". The character peeks alternately from the left and right screen edges while scrolling, avoiding covering the central text and mobile action bar.
