"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function JourneySection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const stepsRef = useRef<HTMLOListElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevStepRef = useRef<number>(0);

  // IntersectionObserver to advance steps on scroll
  useEffect(() => {
    const list = stepsRef.current;
    if (!list) return;

    const items = Array.from(list.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = items.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        }
      },
      { rootMargin: "-28% 0px -62% 0px", threshold: 0.2 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Handle typing indicator simulation on step change forward
  useEffect(() => {
    if (activeStep > prevStepRef.current) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 700);
      prevStepRef.current = activeStep;
      return () => clearTimeout(timer);
    }
    prevStepRef.current = activeStep;
  }, [activeStep]);

  // Handle video play/pause
  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const breeds = [
    { name: "Maltipoo", slug: "maltipoo" },
    { name: "Pomeranian", slug: "pomeranian" },
    { name: "Poodle", slug: "poodle" },
    { name: "Cavapoo", slug: "cavapoo" },
    { name: "Shih Tzu", slug: "shih-tzu" },
  ];

  const snaps = [
    {
      src: "/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg",
      alt: "A tiny apricot teddy bear puppy held up in the TeddyPups showroom",
      pos: "54.3% 48.3%",
    },
    {
      src: "/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f001.jpg",
      alt: "The apricot teddy bear puppy from our showroom, close up",
      pos: "46.0% 44.4%",
    },
    {
      src: "/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f002.jpg",
      alt: "The apricot teddy bear puppy from our showroom, looking up",
      pos: "43.7% 40.2%",
    },
    {
      src: "/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg",
      alt: "The apricot teddy bear puppy from our showroom, held up to say hello",
      pos: "45.3% 44.4%",
    },
  ];

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-chat"
      style={
        {
          "--sky-top": "#f7d18d",
          "--sky-bottom": "#f0b866",
        } as React.CSSProperties
      }
      aria-labelledby="journey-title"
      data-here="false"
      data-visited="false"
    >
      <div className="tp-chat__grid gutter" data-pin-range="true">
        {/* Story & Step List */}
        <div className="tp-chat__story">
          <h2 id="journey-title" className="font-plush text-huge">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>

          <ol ref={stepsRef} className="tp-chat__steps">
            <li
              className="tp-chat__step cursor-pointer"
              data-active={activeStep === 0 ? "true" : undefined}
              data-done={activeStep > 0 ? "true" : undefined}
              onClick={() => setActiveStep(0)}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                1
              </span>
              <h3 className="font-plush tp-chat__title">Choose your breed</h3>
              <p className="tp-chat__text">
                Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on
                availability and your lifestyle.
              </p>
            </li>

            <li
              className="tp-chat__step cursor-pointer"
              data-active={activeStep === 1 ? "true" : undefined}
              data-done={activeStep > 1 ? "true" : undefined}
              onClick={() => setActiveStep(1)}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                2
              </span>
              <h3 className="font-plush tp-chat__title">Get photos &amp; details</h3>
              <p className="tp-chat__text">
                Our team will share real photos, health details, and all necessary information directly on WhatsApp.
              </p>
            </li>

            <li
              className="tp-chat__step cursor-pointer"
              data-active={activeStep === 2 ? "true" : undefined}
              data-done={activeStep > 2 ? "true" : undefined}
              onClick={() => setActiveStep(2)}
            >
              <span className="tp-chat__num font-plush" aria-hidden="true">
                3
              </span>
              <h3 className="font-plush tp-chat__title">Secure &amp; safe delivery</h3>
              <p className="tp-chat__text">
                Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
              </p>
            </li>
          </ol>

          <Link href="/how-it-works" className="btn btn-ghost tp-chat__cta">
            How it works
          </Link>
        </div>

        {/* Smartphone Mockup */}
        <div className="tp-chat__side">
          <div
            className="tp-phone"
            aria-label="A WhatsApp conversation with TeddyPups U.A.E."
            role="group"
          >
            {/* Top Bar */}
            <div className="tp-phone__bar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo.png"
                alt=""
                width={40}
                height={40}
                className="tp-phone__avatar"
              />
              <span>
                <span className="tp-phone__name">TeddyPups U.A.E.</span>
                <span className="tp-phone__status">
                  {isTyping ? "typing…" : "online"}
                </span>
              </span>
            </div>

            {/* Screen Stream */}
            <div className="tp-phone__screen">
              <p className="tp-msg tp-msg--me">
                Hi TeddyPups! I&apos;d love to know more about your puppies.
              </p>

              {/* Step 0: Breed Chips */}
              <div
                className="tp-msg-group"
                data-step="0"
                data-show={activeStep >= 0 && (!isTyping || activeStep > 0) ? "true" : "false"}
              >
                <div className="tp-msg tp-msg--them">
                  <p>
                    Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.
                  </p>
                  <ul className="tp-chips" aria-label="Breeds we have now">
                    {breeds.map((b) => (
                      <li key={b.slug}>
                        <Link href={`/puppies?breed=${b.slug}`}>{b.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step 1: Photos & Video Preview */}
              <div
                className="tp-msg-group"
                data-step="1"
                data-show={activeStep >= 1 && (!isTyping || activeStep > 1) ? "true" : "false"}
              >
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    {snaps.map((s, idx) => (
                      <span key={idx} className="tp-snaps__one">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.src}
                          alt={s.alt}
                          loading="eager"
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            left: 0,
                            top: 0,
                            objectFit: "cover",
                            objectPosition: s.pos,
                          }}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-clip">
                    <video
                      ref={videoRef}
                      src="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98-720p.mp4"
                      poster="/media/27b888_323008bb0f6a41d4bde2a0da7206cd98f000.jpg"
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"
                      onEnded={() => setIsVideoPlaying(false)}
                    />
                    <button
                      type="button"
                      className="tp-clip__play"
                      onClick={toggleVideo}
                      aria-pressed={isVideoPlaying}
                      aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        {isVideoPlaying ? (
                          <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="tp-msg tp-msg--them">
                  Our team will share real photos, health details, and all necessary information directly on WhatsApp.
                </p>
              </div>

              {/* Step 2: Safe & Secure Delivery Route */}
              <div
                className="tp-msg-group"
                data-step="2"
                data-show={activeStep >= 2 && !isTyping ? "true" : "false"}
              >
                <div className="tp-msg tp-msg--them">
                  <p>
                    Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.
                  </p>
                  <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                    <path d="M14 52 C 60 6, 120 70, 170 28" className="tp-route__line" />
                    <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                    <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home" />
                    <path d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z" className="tp-route__heart" />
                  </svg>
                </div>
              </div>

              {/* Animated Typing Indicator */}
              <p className="tp-typing" data-show={isTyping ? "true" : "false"} aria-hidden="true">
                <span />
                <span />
                <span />
              </p>
            </div>

            {/* Compose WhatsApp Link */}
            <a
              href="https://wa.me/971500000000?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
              target="_blank"
              rel="noopener noreferrer"
              className="tp-phone__compose"
            >
              <span>Say hello on WhatsApp</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
              </svg>
            </a>
          </div>

          {/* Static Puppy Stop (hidden by html[data-pup] when PupJourney runs) */}
          <div
            data-pup-stop="true"
            data-pose="sit"
            data-facing="right"
            className="pup-stop tp-chat__teddy"
          />
        </div>
      </div>
    </section>
  );
}
