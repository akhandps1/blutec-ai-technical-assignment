"use client";

import React, { useEffect, useRef, useState } from "react";
import contactData from "@/data/contact_data.json";

export default function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const form = container.querySelector<HTMLFormElement>("form.tp-letterform");
    const postContainer = container.querySelector<HTMLDivElement>(".tp-post");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = form.querySelector<HTMLInputElement>("input[name='name'], input[type='text']");
      const phoneInput = form.querySelector<HTMLInputElement>("input[name='phone'], input[type='tel']");

      if (!nameInput?.value.trim() || !phoneInput?.value.trim()) {
        alert("Please provide both your name and phone number so we can reach you.");
        return;
      }

      // Check honeypot
      const honey = form.querySelector<HTMLInputElement>("input[name='website']");
      if (honey && honey.value) return;

      if (postContainer) {
        postContainer.setAttribute("data-phase", "sent");
      }
      setSubmitted(true);
      alert("Thank you! Your letter has been sent to TeddyPups. We will reach out on WhatsApp shortly.");
      form.reset();
    });
  }, []);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: contactData.main }}
      suppressHydrationWarning
    />
  );
}
