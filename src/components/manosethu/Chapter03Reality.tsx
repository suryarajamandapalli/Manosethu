import React, { useEffect, useRef } from "react";
import { getGsap } from "@/utils/gsap";

export function Chapter03Reality({ darkMode = false }: { darkMode?: boolean }) {
  const realities = ["THREATS", "INTIMIDATION", "DELAYS", "ISOLATION", "HARDSHIP"];

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    getGsap().then((gsapModules) => {
      if (!gsapModules || !sectionRef.current) return;
      const { gsap } = gsapModules;
      ctx = gsap.context(() => {
        if (headlineRef.current) {
          gsap.fromTo(headlineRef.current, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 80%" },
          });
        }
        if (paragraphRef.current) {
          gsap.fromTo(paragraphRef.current, { y: 25, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: paragraphRef.current, start: "top 85%" },
          });
        }
        if (imageRef.current) {
          gsap.fromTo(imageRef.current, { scale: 1.15, y: -20 }, {
            scale: 1, y: 20, ease: "none",
            scrollTrigger: { trigger: imageRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        }
        if (wordsContainerRef.current) {
          gsap.fromTo(wordsContainerRef.current.children, { x: 30, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: wordsContainerRef.current, start: "top 80%" },
          });
        }
      }, sectionRef);
    });
    return () => { if (ctx) ctx.revert(); };
  }, []);

  return (
    <section
      id="reality"
      ref={sectionRef}
      className="py-36 md:py-56 hairline-t section-transition bg-surface"
      style={{ backgroundColor: "var(--surface-raised)" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <p className="mb-10 text-xs tracking-[0.25em] uppercase text-[#2B9C91] font-medium flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2B9C91]" />
          <span>Chapter 03 · The Human Reality</span>
        </p>

        <div className="max-w-5xl mb-12 md:mb-16">
          <h2 ref={headlineRef} className="editorial-chapter-title font-bold text-surface-primary text-balance">
            The journey doesn't end{" "}
            <span className="block font-light text-surface-secondary">
              when the complaint begins.
            </span>
          </h2>
        </div>

        <div className="max-w-xl mb-24 md:mb-32">
          <p ref={paragraphRef} className="editorial-body text-surface-secondary font-normal leading-relaxed">
            Threats, delays, intimidation and social pressure can continue long after the initial complaint.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Atmospheric Visual with Apple Squircle Depth */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden aspect-[4/5] rounded-3xl apple-shadow-ambient border border-white/40 dark:border-white/10 bg-surface-sunken group">
              <img
                ref={imageRef}
                src="/images/editorial/journey_landscape.jpg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover image-cinematic group-hover:scale-105 transition-transform duration-700 spring-bounce"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#173B63]/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Editorial Words with Apple Spring Micro-interactions */}
          <div ref={wordsContainerRef} className="lg:col-span-6 flex flex-col justify-center space-y-4 md:space-y-6">
            {realities.map((word) => (
              <div
                key={word}
                className="apple-press p-4 md:p-6 rounded-2xl hairline-b hover:bg-surface transition-all duration-300 spring-bounce flex items-baseline justify-between group cursor-default"
              >
                <span
                  className="editorial-word font-bold text-surface-primary group-hover:text-[#2B9C91] group-hover:translate-x-3 transition-all duration-300 spring-bounce"
                >
                  {word}
                </span>
                <span className="apple-tracking-caps text-surface-muted group-hover:text-[#2B9C91] transition-colors">
                  ——
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
