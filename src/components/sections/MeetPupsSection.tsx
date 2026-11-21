"use client";

import React, { useEffect, useRef } from "react";
import homeData from "@/data/home_data.json";

export default function MeetPupsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const section = container.querySelector<HTMLElement>(".tp-meet");
    const pinRange = container.querySelector<HTMLElement>("[data-pin-range='true']");
    const track = container.querySelector<HTMLElement>(".tp-meet__track");
    const floor = container.querySelector<HTMLElement>(".tp-meet__floor");
    const doors = container.querySelectorAll<HTMLElement>(".tp-door");

    if (!section || !pinRange || !track) return;

    let ticking = false;

    const updateScrollAnimation = () => {
      ticking = false;

      // On small mobile screens (< 768px), allow natural responsive grid layout
      if (window.innerWidth < 768) {
        track.style.transform = "none";
        section.setAttribute("data-here", "false");
        return;
      }

      const rect = pinRange.getBoundingClientRect();
      const pinHeight = pinRange.offsetHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = pinHeight - windowHeight;

      if (maxScroll <= 0) return;

      // Scroll progress from 0 (top of pin range at top of viewport) to 1 (bottom of pin range)
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Calculate total horizontal travel distance (approx 3842px as measured on reference)
      const trackScrollWidth = track.scrollWidth;
      const stageWidth = window.innerWidth;
      const maxTravel = Math.max(trackScrollWidth - stageWidth + window.innerWidth * 0.15, 3840);
      const currentTranslateX = progress * maxTravel;

      track.style.transform = `translateX(-${currentTranslateX}px)`;

      if (floor) {
        floor.style.setProperty("--floor-x", `-${currentTranslateX}px`);
      }

      // Update section active state
      if (progress > 0 && progress < 1) {
        section.setAttribute("data-here", "true");
        section.setAttribute("data-pinned", "true");
      } else {
        section.setAttribute("data-here", "false");
      }

      if (progress >= 1) {
        section.setAttribute("data-visited", "true");
      }

      // Check doors near the central viewing zone (mascot area at ~10vw to ~40vw)
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
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrollAnimation);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial positioning check
    updateScrollAnimation();

    // Mouse drag support on desktop
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      isDragging = true;
      startX = e.clientX;
      scrollStart = window.scrollY;
      track.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      // Convert horizontal drag to vertical scroll progress
      window.scrollBy({ top: -deltaX * 1.5, behavior: "auto" });
      startX = e.clientX;
    };

    const onMouseUp = () => {
      isDragging = false;
      track.style.cursor = "";
    };

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: homeData.meet }}
      suppressHydrationWarning
    />
  );
}
