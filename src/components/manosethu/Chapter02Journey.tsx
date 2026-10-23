import React, { useEffect, useRef, useState } from "react";
import { getGsap } from "@/utils/gsap";

export function Chapter02Journey({ darkMode = false }: { darkMode?: boolean }) {
  const stages = [
    "COMPLAINT",
    "INVESTIGATION",
    "TRIAL",
    "REHABILITATION",
    "COMPENSATION",
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    let ctx: any;
    getGsap().then((gsapModules) => {
      if (!gsapModules || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = gsapModules;

      ctx = gsap.context(() => {
        if (headlineRef.current) {
          gsap.fromTo(
            headlineRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: headlineRef.current, start: "top 80%" },
            }
          );
        }
        if (lineRef.current && sectionRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
            onUpdate: (self: any) => {
              const p = self.progress;
              if (lineRef.current) {
                lineRef.current.style.width = `${Math.min(Math.max(p * 100, 5), 100)}%`;
              }
              setActiveStage(Math.min(Math.floor(p * stages.length), stages.length - 1));
            },
          });
        }
      }, sectionRef);
    });
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-36 md:py-56 section-transition hairline-t relative overflow-hidden bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <p className="mb-10 text-xs tracking-[0.25em] uppercase text-[#2B9C91] font-medium flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2B9C91]" />
          <span>Chapter 02 · The Journey</span>
        </p>

        <div className="max-w-4xl mb-24 md:mb-36">
          <h2 ref={headlineRef} className="editorial-chapter-title font-bold text-surface-primary text-balance">
            Every case has a journey.{" "}
            <span className="block font-light text-surface-secondary">
              The journey continues.
            </span>
          </h2>
        </div>

        {/* Desktop Horizontal Journey Line with Direct Interaction (Agency §2) */}
        <div className="hidden lg:block relative my-28">
          <div className="w-full h-[3px] rounded-full" style={{ backgroundColor: "var(--border-subtle)" }} />
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-[3px] rounded-full bg-[#2B9C91] transition-all duration-300 spring-bounce"
            style={{ width: `${Math.max(((activeStage + 1) / stages.length) * 100, 20)}%` }}
          />
          <div className="flex justify-between items-start pt-10">
            {stages.map((stage, idx) => {
              const isReached = idx <= activeStage;
              const isCurrent = idx === activeStage;
              return (
                <button
                  key={stage}
                  onClick={() => setActiveStage(idx)}
                  className="apple-press flex flex-col items-center text-center relative focus:outline-none group cursor-pointer"
                  style={{ width: "18%" }}
                  aria-label={`Milestone 0${idx + 1}: ${stage}`}
                >
                  {/* Precision Apple Node */}
                  <div
                    className={`absolute -top-[53px] h-5 w-5 rounded-full transition-all duration-300 spring-bounce flex items-center justify-center ${
                      isCurrent
                        ? "bg-[#2B9C91] scale-125 shadow-lg shadow-[#2B9C91]/30 ring-4"
                        : isReached
                        ? "bg-[#2B9C91] scale-100 ring-2"
                        : "scale-90 hover:scale-105"
                    }`}
                    style={{
                      backgroundColor: isReached ? "#2B9C91" : "var(--border-subtle)",
                      boxShadow: isCurrent ? "0 0 0 4px var(--surface-base), 0 4px 12px rgba(43,156,145,0.4)" : "0 0 0 3px var(--surface-base)",
                    }}
                  >
                    {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                  </div>

                  <span className={`text-[11px] font-mono mb-2.5 transition-colors duration-200 ${
                    isCurrent ? "text-[#2B9C91] font-bold" : "text-surface-muted"
                  }`}>
                    0{idx + 1}
                  </span>
                  <span
                    className={`text-sm md:text-base apple-tracking-caps transition-all duration-300 ${
                      isCurrent
                        ? "text-[#2B9C91] font-bold scale-105"
                        : isReached
                        ? "text-surface-primary font-semibold"
                        : "text-surface-faint font-medium group-hover:text-surface-muted"
                    }`}
                  >
                    {stage}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Journey Line */}
        <div className="lg:hidden relative pl-8 my-16 space-y-12">
          <div className="absolute top-2 bottom-2 left-2 w-[3px] rounded-full" style={{ backgroundColor: "var(--border-subtle)" }} />
          <div className="absolute top-2 left-2 w-[3px] rounded-full bg-[#2B9C91] h-3/4" />
          {stages.map((stage, idx) => (
            <button
              key={stage}
              onClick={() => setActiveStage(idx)}
              className="apple-press text-left relative focus:outline-none w-full"
            >
              <div className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-[#2B9C91]"
                   style={{ boxShadow: "0 0 0 4px var(--surface-base)" }} />
              <span className="text-[10px] font-mono text-surface-muted block mb-0.5">0{idx + 1}</span>
              <span className="text-lg apple-tracking-caps text-surface-primary font-bold">{stage}</span>
            </button>
          ))}
        </div>

        <div className="mt-24 md:mt-36 pt-8 hairline-t flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-surface-muted max-w-lg leading-relaxed apple-tracking-body">
            From the initial formal complaint to final rehabilitation and compensation.
          </p>
          <span className="apple-tracking-caps text-[#2B9C91]">
            Continuous Presence
          </span>
        </div>
      </div>
    </section>
  );
}
