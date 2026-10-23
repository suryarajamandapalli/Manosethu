import React from "react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      verb: "Listen",
      desc: "Regular check-ins across low-barrier channels — IVRS voice calls, SMS, chatbot, mobile portal.",
    },
    {
      num: "02",
      verb: "Understand",
      desc: "Extracting acoustic prosody, linguistic distress markers, and engagement latency cues from interaction.",
    },
    {
      num: "03",
      verb: "Track",
      desc: "Computing a Dynamic Distress Score and observing longitudinal change against personal baselines.",
    },
    {
      num: "04",
      verb: "Anticipate",
      desc: "Forecasting potential distress acceleration ahead of high-stress milestones like hearings and inquiries.",
    },
    {
      num: "05",
      verb: "Connect",
      desc: "Dispatching real-time, explainable alerts to authorized counsellors and support officials — not autonomous action.",
    },
  ];

  return (
    <section id="system" className="py-28 md:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#2B9C91] font-medium mb-8">
              How It Works
            </p>
            <h2 className="editorial-section-title font-bold text-[#173B63] leading-[0.96] text-balance">
              From signals{" "}
              <span className="font-light text-[#12263A]">to human support.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-base text-[#5A6E82] leading-relaxed">
              A continuous five-stage pipeline — translating subtle, multi-modal
              interaction signals into timely, human-led intervention.
            </p>
          </div>
        </div>

        {/* Steps — numbered typography with a thin teal vertical connector on desktop */}
        <div className="relative">

          {/* Teal vertical connector — desktop only */}
          <div className="hidden lg:block absolute left-[27px] top-2 bottom-2 w-[1.5px] bg-[#2B9C91]/20" />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="grid grid-cols-12 gap-6 lg:gap-12 py-8 border-b border-[#E1E6E2] items-baseline"
              >
                {/* Number + node */}
                <div className="col-span-1 flex flex-col items-center">
                  <div className="h-[9px] w-[9px] rounded-full bg-[#2B9C91] ring-2 ring-white relative z-10 mt-1" />
                </div>

                {/* Number label */}
                <div className="col-span-2 lg:col-span-1 text-[11px] font-mono text-[#2B9C91] pt-0.5">
                  {step.num}
                </div>

                {/* Verb — large, airy */}
                <div className="col-span-9 lg:col-span-3">
                  <span className="text-xl md:text-2xl font-bold text-[#173B63] tracking-tight">
                    {step.verb}
                  </span>
                </div>

                {/* Description */}
                <div className="col-span-12 lg:col-span-7 pl-0 lg:pl-4">
                  <p className="text-sm text-[#5A6E82] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ethical position — single clean line, no box */}
        <div className="mt-16 pl-5 border-l-2 border-[#2B9C91]">
          <p className="text-sm text-[#4A5E73] leading-relaxed">
            <strong className="text-[#173B63] font-semibold">Decision-support only.</strong>{" "}
            Manosethu generates risk indicators and support triggers — clinical diagnoses
            and all intervention decisions remain with certified human professionals.
          </p>
        </div>
      </div>
    </section>
  );
}
