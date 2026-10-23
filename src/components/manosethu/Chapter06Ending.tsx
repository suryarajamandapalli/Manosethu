import React, { useEffect, useRef } from "react";
import { getGsap } from "@/utils/gsap";

export function Chapter06Ending({ darkMode = false }: { darkMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    getGsap().then((gsapModules) => {
      if (!gsapModules || !sectionRef.current) return;
      const { gsap } = gsapModules;

      ctx = gsap.context(() => {
        // Staggered reveal of the ending statement
        if (textRef.current) {
          gsap.fromTo(
            textRef.current.children,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
              },
            }
          );
        }

        // Brand mark and logo reveal
        if (brandRef.current) {
          gsap.fromTo(
            brandRef.current,
            { scale: 0.95, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: brandRef.current,
                start: "top 85%",
              },
            }
          );
        }

        if (actionRef.current) {
          gsap.fromTo(
            actionRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: actionRef.current,
                start: "top 90%",
              },
            }
          );
        }
      }, sectionRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="ending"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-between py-32 md:py-48 overflow-hidden hairline-t section-transition"
      style={{ backgroundColor: "var(--surface-base)" }}
    >
      {/* Atmospheric Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <img
          src="/images/editorial/quiet_horizon.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom opacity-20 scale-105"
          style={{ opacity: darkMode ? 0.10 : 0.20 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: darkMode
              ? "linear-gradient(to top, var(--surface-base) 0%, rgba(12,28,46,0.7) 60%, var(--surface-base) 100%)"
              : "linear-gradient(to top, #F6F7F5 0%, rgba(246,247,245,0.8) 60%, #F6F7F5 100%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 md:px-16 flex-1 flex flex-col justify-center">
        <p className="mb-10 text-xs tracking-[0.25em] uppercase text-[#2B9C91] font-medium flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2B9C91]" />
          <span>Chapter 06 · The Ending</span>
        </p>

        <div ref={textRef} className="max-w-5xl mb-16 md:mb-20 space-y-4">
          <p className="text-xl md:text-2xl font-light text-surface-muted">
            A complaint is a moment.
          </p>
          <h2 className="hero-headline font-bold text-surface-primary text-balance">
            Support is{" "}
            <span className="font-light text-[#2B9C91]">a journey.</span>
          </h2>
        </div>

        <div ref={brandRef} className="space-y-6 mb-16 max-w-2xl">
          <div className="flex items-center gap-4">
            <img
              src="/logos/manosethu-logo.svg"
              alt="Manosethu Official Logo"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain"
              style={darkMode ? { filter: "brightness(0) saturate(0) invert(1)" } : undefined}
            />
          </div>
          <p className="text-lg md:text-xl font-light leading-relaxed text-surface-secondary">
            A bridge between distress and timely human support.
          </p>
        </div>

        <div ref={actionRef} className="flex flex-wrap items-center gap-4">
          <a
            href="/system"
            className="apple-press inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase text-white px-8 py-4 rounded-full apple-shadow-key transition-all duration-300 spring-bounce group"
            style={{ backgroundColor: "var(--brand-navy)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-navy-dark)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--brand-navy)"; }}
          >
            <span>Launch ManoSethu System</span>
            <span aria-hidden="true" className="text-[#2B9C91] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#journey"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-surface-secondary hover:text-[#2B9C91] px-6 py-4 rounded-full border border-current/20 transition-all duration-300"
          >
            <span>Explore The Journey</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mx-auto w-full max-w-7xl px-6 md:px-16 pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-surface-muted hairline-t"
      >
        <div className="flex items-center gap-3">
          <img
            src="/logos/manosethu-mark.svg"
            alt="MANOSETHU"
            className="h-5 w-auto opacity-50"
            style={darkMode ? { filter: "brightness(0) saturate(0) invert(1)" } : undefined}
          />
          <p>MANOSETHU · Continuous Emotional Wellbeing &amp; Distress Monitoring Platform</p>
        </div>
        <p className="font-mono text-[11px] opacity-50">Dignity · Privacy · Human Care</p>
      </div>
    </section>
  );
}

