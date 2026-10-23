import React from "react";

export function EarlyEscalation() {
  const stages = [
    "Emerging Change",
    "Rising Concern",
    "Pattern Recognised",
    "Human Review",
    "Support Dispatched",
  ];

  return (
    <section className="py-28 md:py-44 bg-[#173B63] text-white overflow-hidden relative">
      {/* Subtle texture — a very faint teal line across the midsection */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 pointer-events-none"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <div className="h-[1px] w-full bg-[#2B9C91]/15" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-16 relative z-10">

        {/* Big quiet label */}
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#2B9C91] font-medium mb-12">
          Early Escalation Recognition
        </p>

        {/* The big statement */}
        <div className="max-w-3xl mb-20 md:mb-32">
          <h2 className="editorial-section-title font-bold text-white leading-[0.96] text-balance">
            Notice change{" "}
            <span className="font-light text-[#2B9C91]">before crisis.</span>
          </h2>
          <p className="mt-8 text-lg text-white/70 leading-relaxed max-w-xl">
            The core objective is predicting potential escalation of psychological
            distress before a crisis situation emerges — enabling proactive,
            human-led intervention.
          </p>
        </div>

        {/* Progression — abstract continuous flow, full width */}
        <div className="relative">
          {/* The continuous teal line */}
          <div className="hidden md:block absolute top-[9px] left-0 right-0 h-[1.5px] bg-[#2B9C91]/30" />
          <div className="hidden md:block absolute top-[9px] left-0 h-[1.5px] bg-[#2B9C91]"
            style={{ width: "100%" }} />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {stages.map((stage, i) => (
              <div key={i} className="relative pt-0 md:pt-8">

                {/* Node on line — desktop only */}
                <div className="hidden md:block absolute top-[5px] left-1/2 -translate-x-1/2 h-[9px] w-[9px] rounded-full bg-[#2B9C91] ring-2 ring-[#173B63]" />

                {/* Stage */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0 border-b md:border-b-0 border-white/10 pb-5 md:pb-0">
                  <span className="text-[10px] font-mono text-[#2B9C91] md:mb-3 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm md:text-base font-semibold text-white leading-snug tracking-tight">
                    {stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Single ethical principle — large, centered, commanding */}
        <div className="mt-24 md:mt-36 text-center max-w-2xl mx-auto">
          <p className="text-2xl md:text-3xl font-light text-white/80 leading-snug">
            Manosethu generates alerts.{" "}
            <span className="text-white font-semibold">
              Humans decide what happens next.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
