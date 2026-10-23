import React, { useEffect, useRef } from "react";

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = window.scrollY;
      imgRef.current.style.transform = `scale(1.06) translateY(${y * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden bg-[#F6F7F5]">
      {/* Full-bleed atmospheric image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/images/editorial/hero_sky.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-40 scale-[1.06]"
          style={{ willChange: "transform" }}
        />
        {/* Warm scrim — heavier at bottom where text lives */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F7F5]/30 via-[#F6F7F5]/50 to-[#F6F7F5]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F7F5]/70 via-transparent to-transparent" />
      </div>

      {/* Content — anchored to bottom left, large negative space above */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-16 pb-16 md:pb-24">

        {/* Tiny institutional note — not a section label */}
        <p className="mb-6 text-[11px] tracking-[0.18em] uppercase text-[#5A6E82] font-medium">
          Continuous Emotional Wellbeing &amp; Distress Monitoring
        </p>

        {/* The ONE headline */}
        <h1 className="hero-headline text-[#173B63] font-bold leading-[0.93] tracking-[-0.04em] max-w-4xl text-balance">
          Support should reach people{" "}
          <span className="text-[#12263A] font-light">before crisis.</span>
        </h1>

        {/* Quiet supporting line */}
        <p className="mt-8 text-lg md:text-xl text-[#4A5E73] font-normal leading-relaxed max-w-xl">
          A person's well-being changes throughout their institutional journey.
          Manosethu makes those changes visible — so support can respond in time.
        </p>

        {/* Journey as inline text flow — not cards */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-0 gap-y-2">
          {[
            "Complaint",
            "Investigation",
            "Trial",
            "Rehabilitation",
            "Compensation",
          ].map((stage, i, arr) => (
            <React.Fragment key={stage}>
              <span className="text-xs md:text-sm font-medium text-[#173B63] tracking-wide">
                {stage}
              </span>
              {i < arr.length - 1 && (
                <span className="mx-3 text-[#2B9C91]" aria-hidden="true">
                  <svg width="24" height="2" viewBox="0 0 24 2" fill="none">
                    <line x1="0" y1="1" x2="20" y2="1" stroke="#2B9C91" strokeWidth="1.5" />
                    <polygon points="18,0 24,1 18,2" fill="#2B9C91" />
                  </svg>
                </span>
              )}
            </React.Fragment>
          ))}
          <span className="ml-4 text-[11px] tracking-[0.15em] uppercase text-[#2B9C91] font-medium">
            Continuous presence
          </span>
        </div>

        {/* Single CTA — understated */}
        <div className="mt-12">
          <a
            href="#problem"
            className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.15em] uppercase text-[#F6F7F5] bg-[#173B63] hover:bg-[#0F253F] px-7 py-3.5 transition-colors duration-300"
          >
            See how Manosethu works
          </a>
        </div>
      </div>
    </section>
  );
}
