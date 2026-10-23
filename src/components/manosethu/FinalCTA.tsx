import React from "react";

export function FinalCTA() {
  return (
    <section className="relative py-32 md:py-52 bg-[#173B63] text-white overflow-hidden">
      {/* Atmospheric image — very faint, cinematic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/editorial/soft_dawn.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.12] scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#173B63]/60 via-transparent to-[#173B63]/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-16">

        {/* The statement — full left-aligned editorial, not centered */}
        <div className="max-w-4xl">

          {/* Epigraph line */}
          <p className="text-base md:text-lg text-white/60 font-light mb-10 leading-relaxed">
            A complaint is a moment.
          </p>

          {/* The main statement */}
          <h2 className="hero-headline text-white font-bold leading-[0.93] tracking-[-0.04em] text-balance">
            Support is{" "}
            <span className="text-[#2B9C91]">a journey.</span>
          </h2>
        </div>

        {/* Brand name — commanding, as the answer */}
        <div className="mt-16 md:mt-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-3">
            This is
          </p>
          <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            MANOSETHU
          </p>
          <p className="mt-2 text-sm text-white/60 tracking-wide">
            Mind · Bridge · Dignity in Care
          </p>
        </div>

        {/* Single CTA — quiet but present */}
        <div className="mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.15em] uppercase text-[#173B63] bg-white hover:bg-[#F6F7F5] px-8 py-4 transition-colors duration-300"
          >
            Back to overview
          </a>
        </div>

        {/* Positioning statement — very bottom */}
        <div className="mt-20 md:mt-28 pt-8 border-t border-white/10">
          <p className="text-xs tracking-[0.15em] uppercase text-white/40">
            AI assists &nbsp;·&nbsp; Humans decide &nbsp;·&nbsp; People receive support
          </p>
        </div>
      </div>
    </section>
  );
}
