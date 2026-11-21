"use client";

import React, { useEffect, useRef } from "react";
import homeData from "@/data/home_data.json";

export default function PathsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Replace any broken image url in paths with clean direct media path
  const sanitizedHtml = homeData.paths.replace(
    /\/(_next\/image\?url=%2Fmedia%2FgAaGwoGej2g6%2F5523e884dd%2F|media\/)b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2\.jpg[^"']*/g,
    "/media/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg"
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const flight = container.querySelector<HTMLElement>(".tp-flight");
    if (!flight) return;

    const route = flight.querySelector<SVGPathElement>(".tp-flight__route");
    const svg = flight.querySelector<SVGSVGElement>("svg");
    if (!route || !svg) return;

    // The airplane group is the main <g> inside <svg> (skipping <defs>)
    const planeG = svg.querySelector<SVGGElement>("svg > g");
    if (!planeG) return;

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
      return;
    }

    let ticking = false;

    const onScroll = () => {
      ticking = false;
      const rect = flight.getBoundingClientRect();
      const windowH = window.innerHeight;

      // offset: ["start 95%", "end 25%"]
      // start: flight top reaches 95% of viewport
      const start = windowH * 0.95;
      // end: flight bottom reaches 25% of viewport
      const end = windowH * 0.25 - rect.height;

      if (start === end) return;

      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      updatePlane(progress);
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial positioning
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      suppressHydrationWarning
    />
  );
}
