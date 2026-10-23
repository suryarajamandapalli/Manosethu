import React, { useEffect, useRef } from "react";
import { getGsap } from "@/utils/gsap";

interface Chapter01Props { darkMode?: boolean; }

export function Chapter01Hero({ darkMode = false }: Chapter01Props) {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const epigraphRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx: any;
    getGsap().then((gsapModules) => {
      if (!gsapModules || !containerRef.current) return;
      const { gsap } = gsapModules;

      ctx = gsap.context(() => {
        // Atmospheric image cinematic zoom
        if (imgRef.current) {
          gsap.fromTo(
            imgRef.current,
            { scale: 1.15, opacity: 0 },
            { scale: 1.05, opacity: 0.35, duration: 2, ease: "power2.out" }
          );
        }

        // Staggered text timeline
        const tl = gsap.timeline({ delay: 0.2 });

        if (epigraphRef.current) {
          tl.fromTo(
            epigraphRef.current,
            { y: -15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
          );
        }

        if (headlineRef.current) {
          tl.fromTo(
            headlineRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
            "-=0.5"
          );
        }

        if (subtitleRef.current) {
          tl.fromTo(
            subtitleRef.current,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "-=0.7"
          );
        }

        if (bottomRef.current) {
          tl.fromTo(
            bottomRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );
        }
      }, containerRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen flex flex-col justify-between pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden transition-colors duration-500 ${darkMode ? "bg-[#08152a]" : "bg-[#F6F7F5]"}`}
    >
      {/* Moving Theme Gradient Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        {/* Base tone */}
        <div className={`absolute inset-0 transition-colors duration-700 ${darkMode ? "bg-[#08152a]" : "bg-[#F5F7F6]"}`} />

        {/* Dynamic moving mesh orbs with theme colors */}
        <div className="absolute inset-0 overflow-hidden filter blur-[75px] sm:blur-[100px] md:blur-[125px] transform-gpu">
          {/* Orb 1: Human Teal (#2B9C91) - Center-top organic drift */}
          <div
            className="hero-mesh-orb absolute rounded-full will-change-transform"
            style={{
              width: "55vw",
              height: "55vw",
              minWidth: "380px",
              minHeight: "380px",
              top: "-10%",
              left: "15%",
              background: darkMode
                ? "radial-gradient(circle, #2B9C91 0%, rgba(43,156,145,0.45) 50%, transparent 75%)"
                : "radial-gradient(circle, #38C5B6 0%, rgba(43,156,145,0.55) 45%, transparent 75%)",
              opacity: darkMode ? 0.45 : 0.65,
              animation: "meshDrift1 22s ease-in-out infinite alternate",
            }}
          />

          {/* Orb 2: Soft Sky Blue / Azure (#72B1EA) - Upper-left celestial wash */}
          <div
            className="hero-mesh-orb absolute rounded-full will-change-transform"
            style={{
              width: "52vw",
              height: "52vw",
              minWidth: "350px",
              minHeight: "350px",
              top: "-5%",
              left: "-12%",
              background: darkMode
                ? "radial-gradient(circle, #1E40AF 0%, rgba(30,64,175,0.4) 50%, transparent 75%)"
                : "radial-gradient(circle, #72B1EA 0%, rgba(114,177,234,0.6) 45%, transparent 75%)",
              opacity: darkMode ? 0.4 : 0.6,
              animation: "meshDrift2 26s ease-in-out infinite alternate",
            }}
          />

          {/* Orb 3: Soft Mint / Seafoam (#85E3D2) - Mid-right radiance */}
          <div
            className="hero-mesh-orb absolute rounded-full will-change-transform"
            style={{
              width: "46vw",
              height: "46vw",
              minWidth: "320px",
              minHeight: "320px",
              top: "10%",
              right: "-8%",
              background: darkMode
                ? "radial-gradient(circle, #0D9488 0%, rgba(13,148,136,0.35) 50%, transparent 75%)"
                : "radial-gradient(circle, #85E3D2 0%, rgba(133,227,210,0.5) 45%, transparent 75%)",
              opacity: darkMode ? 0.35 : 0.55,
              animation: "meshDrift3 20s ease-in-out infinite alternate",
            }}
          />

          {/* Orb 4: Brand Navy (#173B63) - Deep foundation anchor */}
          <div
            className="hero-mesh-orb absolute rounded-full will-change-transform"
            style={{
              width: "60vw",
              height: "60vw",
              minWidth: "420px",
              minHeight: "420px",
              bottom: "-20%",
              left: "10%",
              background: darkMode
                ? "radial-gradient(circle, #0F253F 0%, rgba(23,59,99,0.55) 50%, transparent 75%)"
                : "radial-gradient(circle, #173B63 0%, rgba(23,59,99,0.3) 45%, transparent 75%)",
              opacity: darkMode ? 0.55 : 0.35,
              animation: "meshDrift4 28s ease-in-out infinite alternate",
            }}
          />

          {/* Orb 5: Luminous Light Sky (#BAE6FD) - Subtle center highlight */}
          <div
            className="hero-mesh-orb absolute rounded-full will-change-transform"
            style={{
              width: "48vw",
              height: "48vw",
              minWidth: "300px",
              minHeight: "300px",
              top: "22%",
              left: "32%",
              background: darkMode
                ? "radial-gradient(circle, #0284C7 0%, rgba(2,132,199,0.3) 50%, transparent 75%)"
                : "radial-gradient(circle, #BAE6FD 0%, rgba(186,230,253,0.65) 50%, transparent 75%)",
              opacity: darkMode ? 0.3 : 0.55,
              animation: "meshDrift5 18s ease-in-out infinite alternate",
            }}
          />
        </div>

        {/* Soft atmospheric skyline texture overlay */}
        <img
          ref={imgRef}
          src="/images/editorial/hero_sky.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center mix-blend-overlay opacity-20 dark:opacity-10 pointer-events-none"
        />

        {/* Delicate paper grain for tactile editorial finish matching reference */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.045] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Subtle horizon fade into Chapter 02 */}
        <div
          className={`absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t pointer-events-none transition-colors duration-500 ${
            darkMode ? "from-[#08152a] to-transparent" : "from-[#F6F7F5] to-transparent"
          }`}
        />
        {/* Soft top gradient from navbar */}
        <div
          className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b pointer-events-none transition-colors duration-500 ${
            darkMode ? "from-[#08152a]/75 to-transparent" : "from-[#F6F7F5]/75 to-transparent"
          }`}
        />
      </div>

      {/* Main Editorial Composition */}
      <div className="mx-auto w-full max-w-7xl px-6 md:px-16 flex-1 flex flex-col justify-center">
        {/* Tiny Contextual Epigraph */}
        <p
          ref={epigraphRef}
          className={`mb-8 text-xs tracking-[0.2em] uppercase font-medium flex items-center gap-3 ${darkMode ? "text-[#7fa8c9]" : "text-[#5A6E82]"}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#2B9C91]" />
          <span>Continuous Emotional Wellbeing &amp; Distress Monitoring Platform</span>
        </p>

        {/* ONE Enormous Headline */}
        <div className="max-w-5xl">
          <h1
            ref={headlineRef}
            className={`hero-headline font-bold text-balance ${darkMode ? "text-[#d4e4f2]" : "text-[#173B63]"}`}
          >
            Understanding distress{" "}
            <span className={`block font-light ${darkMode ? "text-[#a8d0e8]" : "text-[#12263A]"}`}>before it becomes a crisis.</span>
          </h1>
        </div>

        {/* Restrained Supporting Statement & System CTA */}
        <div className="mt-10 md:mt-14 max-w-xl space-y-6">
          <p
            ref={subtitleRef}
            className={`editorial-body font-normal leading-relaxed text-balance ${darkMode ? "text-[#7fa8c9]" : "text-[#4A5E73]"}`}
          >
            ManoSethu brings together conversations, behavioural signals and longitudinal patterns to help identify changing emotional distress and connect people with timely human support.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/system"
              className="inline-flex items-center gap-2 rounded-full bg-[#173B63] hover:bg-[#12263A] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md ring-2 ring-[#2B9C91]/40 hover:scale-[1.02]"
            >
              <span>GET STARTED</span>
              <span aria-hidden="true" className="text-[#2B9C91]">→</span>
            </a>
            <a
              href="#system"
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                darkMode
                  ? "border-white/20 text-[#d4e4f2] hover:bg-white/10"
                  : "border-[#173B63]/20 text-[#173B63] hover:bg-black/[0.04]"
              }`}
            >
              <span>HOW IT WORKS</span>
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Horizon */}
      <div
        ref={bottomRef}
        className="mx-auto w-full max-w-7xl px-6 md:px-16 pt-8 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <img
            src="/logos/manosethu-mark.svg"
            alt="Manosethu mark"
            className="h-4 w-auto opacity-60"
            style={darkMode ? { filter: "brightness(0) saturate(0) invert(1)" } : undefined}
          />
          <span className={`text-[11px] tracking-[0.2em] uppercase ${darkMode ? "text-[#7fa8c9]" : "text-[#5A6E82]"}`}>
            Continuity System
          </span>
        </div>

        <a
          href="#journey"
          className={`apple-press px-4 py-2 rounded-full border border-transparent hover:border-black/5 dark:hover:border-white/10 hover:bg-white/40 dark:hover:bg-white/10 text-[11px] tracking-[0.16em] uppercase hover:text-[#2B9C91] transition-all duration-300 spring-bounce flex items-center gap-2 group ${darkMode ? "text-[#7fa8c9]" : "text-[#173B63]"}`}
        >
          <span>Scroll to Journey</span>
          <span aria-hidden="true" className="text-[#2B9C91] transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}

