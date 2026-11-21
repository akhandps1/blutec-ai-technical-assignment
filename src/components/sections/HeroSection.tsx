"use client";

import React, { useEffect, useRef } from "react";
import homeData from "@/data/home_data.json";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const pups = container.querySelectorAll<HTMLElement>(".tp-lineup__pup");
    const ghosts = container.querySelectorAll<HTMLElement>(".tp-lineup--tags .tp-lineup__ghost");

    pups.forEach((pup, idx) => {
      const showTag = () => {
        if (ghosts[idx]) ghosts[idx].setAttribute("data-tag", "show");
      };
      const hideTag = () => {
        if (ghosts[idx]) ghosts[idx].removeAttribute("data-tag");
      };

      pup.addEventListener("pointerenter", showTag);
      pup.addEventListener("pointerleave", hideTag);
      pup.addEventListener("focus", showTag);
      pup.addEventListener("blur", hideTag);
    });

    // Optional duck-and-pop subtle idle animation loop
    let activeDuckIdx = -1;
    const interval = setInterval(() => {
      if (document.hidden) return;
      const targetIdx = Math.floor(Math.random() * pups.length);
      const pup = pups[targetIdx];
      if (!pup) return;

      pup.setAttribute("data-state", "duck");
      setTimeout(() => {
        pup.setAttribute("data-state", "pop");
        setTimeout(() => {
          pup.removeAttribute("data-state");
        }, 700);
      }, 360);
    }, 4500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: homeData.hero }}
      suppressHydrationWarning
    />
  );
}
