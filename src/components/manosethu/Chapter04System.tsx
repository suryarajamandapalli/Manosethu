import React, { useEffect, useRef } from "react";
import { getGsap } from "@/utils/gsap";

export function Chapter04System({ darkMode = false }: { darkMode?: boolean }) {
  const steps = [
    { title: "LISTEN",        subtitle: "Periodic check-ins across low-barrier channels" },
    { title: "UNDERSTAND",   subtitle: "Speech prosody, textual markers & interaction latency" },
    { title: "FOLLOW",       subtitle: "Tracking longitudinal change against personal baseline" },
    { title: "SURFACE CHANGE", subtitle: "Anticipating potential distress escalation" },
    { title: "HUMAN SUPPORT", subtitle: "Dispatching explainable alerts to certified caseworkers" },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const pauseRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    getGsap().then((gsapModules) => {
      if (!gsapModules || !sectionRef.current) return;
      const { gsap } = gsapModules;
      ctx = gsap.context(() => {
        if (headlineRef.current) {
          gsap.fromTo(headlineRef.current, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 80%" },
          });
        }
        if (pauseRef.current) {
          gsap.fromTo(pauseRef.current, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: pauseRef.current, start: "top 82%" },
          });
        }
        if (lineRef.current && stepsRef.current) {
          gsap.fromTo(lineRef.current, { scaleY: 0, transformOrigin: "top" }, {
            scaleY: 1, duration: 1.5, ease: "power2.out",
            scrollTrigger: { trigger: stepsRef.current, start: "top 75%" },
          });
        }
        if (stepsRef.current) {
          gsap.fromTo(stepsRef.current.children, { y: 35, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: stepsRef.current, start: "top 75%" },
          });
        }
      }, sectionRef);
    });
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="py-36 md:py-56 hairline-t section-transition"
      style={{ backgroundColor: "var(--surface-base)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <p className="mb-10 text-xs tracking-[0.25em] uppercase text-[#2B9C91] font-medium flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2B9C91]" />
          <span>Chapter 04 · Manosethu</span>
        </p>

        <div className="max-w-4xl mb-8">
          <h2 ref={headlineRef} className="editorial-chapter-title font-bold text-surface-primary text-balance">
            What happens <br />
            <span className="font-light text-surface-secondary">
              between the milestones?
            </span>
          </h2>
        </div>

        <div ref={pauseRef} className="max-w-2xl mb-24 md:mb-36">
          <p className="editorial-lead font-light text-[#2B9C91] text-balance">
            Manosethu adds a layer of continuity.
          </p>
        </div>

        {/* Steps — Apple Interactive Continuity Cards */}
        <div className="relative max-w-4xl">
          <div
            ref={lineRef}
            className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-[#2B9C91]/30 hidden sm:block"
          />
          <div ref={stepsRef} className="space-y-4 sm:space-y-5">
            {steps.map((st, idx) => (
              <div
                key={st.title}
                className="apple-press relative sm:pl-16 p-6 sm:p-7 rounded-2xl border border-transparent hover:border-black/5 dark:hover:border-white/10 hover:apple-glass-card transition-all duration-300 spring-bounce flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                {/* Node indicator */}
                <div
                  className="hidden sm:flex absolute left-[20px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-[#2B9C91] group-hover:scale-125 transition-transform duration-300 spring-bounce"
                  style={{ boxShadow: "0 0 0 4px var(--surface-base), 0 2px 8px rgba(43,156,145,0.4)" }}
                />
                
                <div className="flex items-center gap-4">
                  <span className="apple-tracking-caps px-2.5 py-1 rounded-full bg-[#2B9C91]/10 text-[#2B9C91] font-bold">
                    0{idx + 1}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-bold apple-tracking-title text-surface-primary group-hover:text-[#2B9C91] transition-colors"
                  >
                    {st.title}
                  </h3>
                </div>

                <span className="text-sm md:text-base text-surface-muted group-hover:text-surface-secondary font-normal apple-tracking-body transition-colors">
                  {st.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-28 md:mt-36 pt-8 hairline-t flex items-center justify-between">
          <p className="text-xs tracking-[0.2em] uppercase text-surface-muted">
            A bridge between distress and timely human intervention
          </p>
          <img
            src="/logos/manosethu-mark.svg"
            alt=""
            aria-hidden="true"
            className="h-4 w-auto opacity-40 hidden sm:block"
            style={{ filter: darkMode ? "brightness(0) saturate(100%) invert(1)" : "none" }}
          />
        </div>
      </div>
    </section>
  );
}
