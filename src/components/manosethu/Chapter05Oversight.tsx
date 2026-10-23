import React, { useEffect, useRef } from "react";
import { getGsap } from "@/utils/gsap";

export function Chapter05Oversight({ darkMode = false }: { darkMode?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    getGsap().then((gsapModules) => {
      if (!gsapModules || !sectionRef.current) return;
      const { gsap } = gsapModules;

      ctx = gsap.context(() => {
        // Headline reveal
        if (headlineRef.current) {
          gsap.fromTo(
            headlineRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headlineRef.current,
                start: "top 80%",
              },
            }
          );
        }

        // Flow pipeline reveal
        if (flowRef.current) {
          gsap.fromTo(
            flowRef.current.children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: flowRef.current,
                start: "top 82%",
              },
            }
          );
        }

        // Two cards staggered reveal
        const cards = [cardLeftRef.current, cardRightRef.current];
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardLeftRef.current,
              start: "top 82%",
            },
          }
        );

        // Banner reveal
        if (bannerRef.current) {
          gsap.fromTo(
            bannerRef.current,
            { y: 30, opacity: 0, scale: 0.98 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bannerRef.current,
                start: "top 88%",
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
      id="oversight"
      ref={sectionRef}
      className="py-28 md:py-44 bg-gradient-to-b from-[#143355] via-[#173B63] to-[#0e243d] text-white relative overflow-hidden"
    >
      {/* Subtle Official Logo Mark Watermark in Background */}
      <div className="absolute -right-16 -top-16 md:right-10 md:top-10 w-96 h-96 pointer-events-none opacity-[0.04] select-none">
        <img
          src="/logos/manosethu-mark.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain filter invert"
        />
      </div>

      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#2B9C91]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-16 relative z-10">
        {/* Chapter Marker */}
        <div className="flex items-center gap-3 mb-8">
          <span className="h-2 w-2 rounded-full bg-[#2B9C91] animate-pulse" />
          <p className="text-xs tracking-[0.25em] uppercase text-[#2B9C91] font-semibold">
            Chapter 05 · Human Oversight
          </p>
        </div>

        {/* Large White Headline */}
        <div className="max-w-4xl mb-16 md:mb-24">
          <h2
            ref={headlineRef}
            className="editorial-chapter-title font-bold text-white text-balance leading-[0.98]"
          >
            AI can identify a change.{" "}
            <span className="block font-light text-[#2B9C91] mt-2">
              People decide what it means.
            </span>
          </h2>
        </div>

        {/* The Visual Pipeline Bridge: AI → HUMAN REVIEW → SUPPORT */}
        <div
          ref={flowRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 md:mb-24"
        >
          {/* Node 1: AI */}
          <div className="apple-press p-7 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 flex flex-col justify-between backdrop-blur-xl apple-shadow-key transition-all duration-300 spring-bounce">
            <div className="flex items-center justify-between mb-4">
              <span className="apple-tracking-caps text-[#2B9C91]">
                Step 01
              </span>
              <span className="apple-tracking-caps text-white/50">
                Digital Sensor
              </span>
            </div>
            <h3 className="text-xl font-bold apple-tracking-title text-white mb-2">AI Detection</h3>
            <p className="text-xs text-white/70 leading-relaxed apple-tracking-body">
              Passive listening, linguistic marker extraction, and longitudinal drift tracking.
            </p>
          </div>

          {/* Node 2: Human Review (Central Authority) */}
          <div className="apple-press p-7 rounded-2xl bg-[#2B9C91]/15 hover:bg-[#2B9C91]/20 border border-[#2B9C91]/40 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden apple-shadow-key transition-all duration-300 spring-bounce">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#2B9C91]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="apple-tracking-caps text-[#2B9C91]">
                Step 02 · Core Gateway
              </span>
              <span className="apple-tracking-caps text-white bg-[#2B9C91]/40 px-2.5 py-0.5 rounded-full">
                Decisive
              </span>
            </div>
            <h3 className="text-xl font-bold apple-tracking-title text-white mb-2 relative z-10">Human Review</h3>
            <p className="text-xs text-white/90 leading-relaxed apple-tracking-body relative z-10">
              Certified clinical psychologists and district caseworkers evaluate situational nuance.
            </p>
          </div>

          {/* Node 3: Support */}
          <div className="apple-press p-7 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 flex flex-col justify-between backdrop-blur-xl apple-shadow-key transition-all duration-300 spring-bounce">
            <div className="flex items-center justify-between mb-4">
              <span className="apple-tracking-caps text-[#2B9C91]">
                Step 03
              </span>
              <span className="apple-tracking-caps text-white/50">
                Direct Relief
              </span>
            </div>
            <h3 className="text-xl font-bold apple-tracking-title text-white mb-2">Timely Support</h3>
            <p className="text-xs text-white/70 leading-relaxed apple-tracking-body">
              Immediate dispatch of trauma counselling, witness protection, or legal assistance.
            </p>
          </div>
        </div>

        {/* Two Architectural Comparison Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
          {/* Left Panel: AI Sensor Role */}
          <div
            ref={cardLeftRef}
            className="p-8 md:p-12 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl relative overflow-hidden apple-shadow-ambient hover:border-white/20 transition-all duration-500 spring-bounce"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#2B9C91] block mb-1">
                  System Boundary
                </span>
                <h4 className="text-xl font-bold text-white">The System Observes</h4>
              </div>
              <span className="text-[10px] font-mono text-white/60 bg-white/5 px-2.5 py-1 border border-white/10 rounded-sm uppercase tracking-wider">
                Digital Sensor
              </span>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Patterns",
                  desc: "Analyzes acoustic tone, speech tremor, and text syntax across periodic check-ins.",
                },
                {
                  label: "Change",
                  desc: "Measures personal longitudinal deviations from an individual’s historical baseline.",
                },
                {
                  label: "Context",
                  desc: "Aligns risk signals with high-stress external milestones like court appearances and inquiries.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-xs font-mono text-[#2B9C91] font-bold mt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-white mb-1">{item.label}</p>
                    <p className="text-xs text-white/70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono">
              <span>ZERO AUTONOMOUS ACTIONS</span>
              <span className="text-[#2B9C91]">ASSISTIVE ONLY</span>
            </div>
          </div>

          {/* Right Panel: Human Authority Role */}
          <div
            ref={cardRightRef}
            className="p-8 md:p-12 rounded-3xl bg-[#2B9C91]/[0.09] border border-[#2B9C91]/35 backdrop-blur-2xl relative overflow-hidden apple-shadow-ambient hover:border-[#2B9C91]/60 transition-all duration-500 spring-bounce"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/15 mb-8">
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#2B9C91] block mb-1">
                  Institutional Mandate
                </span>
                <h4 className="text-xl font-bold text-white">Authorized Humans Decide</h4>
              </div>
              <span className="text-[10px] font-mono text-[#2B9C91] bg-[#2B9C91]/20 px-2.5 py-1 border border-[#2B9C91]/40 rounded-sm uppercase tracking-wider font-semibold">
                Sole Authority
              </span>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Review",
                  desc: "Certified clinical psychologists review the explainable distress indicators.",
                },
                {
                  label: "Understand",
                  desc: "Interprets personal trauma, local threats, and family circumstances with empathy.",
                },
                {
                  label: "Decide",
                  desc: "Authorizes trauma therapy, protection orders, and legal aid interventions.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="text-xs font-mono text-white font-bold mt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-white mb-1">{item.label}</p>
                    <p className="text-xs text-white/80 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/15 flex items-center justify-between text-[11px] text-white/80 font-mono">
              <span className="text-[#2B9C91]">100% CLINICAL & LEGAL OVERSIGHT</span>
              <span>HUMAN-IN-THE-LOOP</span>
            </div>
          </div>
        </div>

        {/* Central Core Mandate Banner */}
        <div
          ref={bannerRef}
          className="p-8 md:p-12 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#2B9C91] font-bold">
              Guiding Principle
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              HUMAN OVERSIGHT REMAINS CENTRAL.
            </p>
            <p className="text-sm text-white/70 max-w-xl leading-relaxed">
              Technology serves solely as a continuous sensory bridge. All legal, medical, and relief decisions are executed exclusively by authorized human caseworkers.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <img
              src="/logos/manosethu-mark.svg"
              alt="Manosethu Emblem"
              className="h-12 w-auto object-contain filter invert opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
