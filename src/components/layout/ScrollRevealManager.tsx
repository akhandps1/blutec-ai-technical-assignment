"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If reduced motion is requested, immediately reveal everything
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const revealAll = () => {
        document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => {
          el.setAttribute("data-revealed", "true");
        });
      };
      revealAll();
      const mo = new MutationObserver(revealAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.setAttribute("data-revealed", "true");
            observer.unobserve(target);
          }
        });
      },
      {
        rootMargin: "50px 0px 50px 0px",
        threshold: 0,
      }
    );

    const observeElements = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])").forEach((el) => {
        el.setAttribute("data-armed", "true");
        const rect = el.getBoundingClientRect();
        // If element is in viewport or above it or close to it, reveal immediately
        if (rect.top <= window.innerHeight + 50 && rect.bottom >= -50) {
          el.setAttribute("data-revealed", "true");
        } else {
          observer.observe(el);
        }
      });
    };

    observeElements();
    const t1 = setTimeout(observeElements, 50);
    const t2 = setTimeout(observeElements, 250);

    const mo = new MutationObserver(() => {
      observeElements();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", observeElements, { passive: true });
    window.addEventListener("resize", observeElements, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      observer.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", observeElements);
      window.removeEventListener("resize", observeElements);
    };
  }, [pathname]);

  return null;
}

