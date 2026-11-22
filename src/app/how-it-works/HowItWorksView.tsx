"use client";

import React, { useEffect, useRef } from "react";

interface HowItWorksViewProps {
  html: string;
}

export default function HowItWorksView({ html }: HowItWorksViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. AEROPLANE SCROLL ANIMATION (.tp-flight) ---
    const flights = Array.from(container.querySelectorAll<HTMLElement>(".tp-flight"));

    const flightControllers = flights.map((flight) => {
      const route = flight.querySelector<SVGPathElement>(".tp-flight__route");
      const planeG = flight.querySelector<SVGSVGElement>("svg > g");
      if (!route || !planeG) return null;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const updatePlane = (progress: number) => {
        const totalLength = route.getTotalLength();
        const distance = Math.min(totalLength, Math.max(0, progress * totalLength));
        const pt = route.getPointAtLength(distance);
        const nextPt = route.getPointAtLength(Math.min(totalLength, distance + 1));
        const prevPt = route.getPointAtLength(Math.max(0, distance - 1));
        const angle = (180 * Math.atan2(nextPt.y - prevPt.y, nextPt.x - prevPt.x)) / Math.PI;

        planeG.setAttribute(
          "transform",
          `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`
        );
        planeG.style.opacity = String(Math.min(1, Math.max(0, (progress - 0.11) / 0.06)));
      };

      if (prefersReducedMotion) {
        updatePlane(0.62);
        return () => {};
      }

      const update = () => {
        const rect = flight.getBoundingClientRect();
        const windowH = window.innerHeight;

        // offset: ["start 95%", "end 25%"]
        const start = windowH * 0.95;
        const end = windowH * 0.25 - rect.height;

        if (start === end) return;

        const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
        updatePlane(progress);
      };

      // Initial update
      update();

      return update;
    }).filter(Boolean) as (() => void)[];

    let ticking = false;
    const onScroll = () => {
      ticking = false;
      flightControllers.forEach((fn) => fn());
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial position after paint
    const t = setTimeout(onScroll, 50);

    // --- 2. INTERACTIVE JOURNEY TABS (.tp-switch) ---
    const switchEl = container.querySelector<HTMLElement>(".tp-switch");
    const tabs = Array.from(container.querySelectorAll<HTMLButtonElement>(".tp-switch__tab"));
    const panels = Array.from(container.querySelectorAll<HTMLElement>('[role="tabpanel"]'));

    function selectTab(index: number) {
      if (!switchEl || tabs.length === 0) return;

      switchEl.style.setProperty("--at", String(index));
      switchEl.style.setProperty("--n", String(tabs.length));

      tabs.forEach((tab, i) => {
        const isSelected = i === index;
        tab.setAttribute("aria-selected", isSelected ? "true" : "false");
        tab.setAttribute("tabindex", isSelected ? "0" : "-1");
      });

      panels.forEach((panel, i) => {
        if (i === index) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "");
        }
      });

      // Update flights that may have had their layout shifted
      requestAnimationFrame(onScroll);
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => selectTab(index));
      tab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          const nextIndex = (index + 1) % tabs.length;
          tabs[nextIndex].focus();
          selectTab(nextIndex);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          const prevIndex = (index - 1 + tabs.length) % tabs.length;
          tabs[prevIndex].focus();
          selectTab(prevIndex);
        }
      });
    });

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
