import React from "react";

export function JourneyTimeline() {
  const stages = [
    {
      name: "Complaint Registration",
      desc: "Initial reporting. Acute shock, fear of retaliation, displacement from home.",
    },
    {
      name: "Investigation",
      desc: "Police questioning, forensic examinations, intense pressure to withdraw.",
    },
    {
      name: "Trial",
      desc: "Frequent court appearances, adversarial cross-examinations, psychological exhaustion.",
    },
    {
      name: "Rehabilitation",
      desc: "Navigating isolation, housing transitions, livelihood restoration.",
    },
    {
      name: "Compensation",
      desc: "Financial disbursement, case closure, and ongoing psychological stabilization.",
    },
  ];

  return (
    <section id="journey" className="py-28 md:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 md:mb-28">
          <div className="lg:col-span-7">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#2B9C91] font-medium mb-8">
              The Journey
            </p>
            <h2 className="editorial-section-title font-bold text-[#173B63] leading-[0.96] text-balance">
              Every case has a journey.{" "}
              <span className="font-light text-[#12263A]">
                Well-being changes along the way.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-base text-[#5A6E82] leading-relaxed">
              Psychological distress is non-linear. Manosethu maintains
              persistent, trauma-informed continuity across each critical phase
              — from the first day a complaint is filed to long after resolution.
            </p>
          </div>
        </div>

        {/* Continuous narrative track — single progressing teal line, no grid columns with boxes */}
        <div className="relative">

          {/* The continuous teal line — horizontal on desktop */}
          <div className="hidden lg:block absolute top-[18px] left-0 right-0 h-[1.5px] bg-[#E1E6E2]" />
          <div
            className="hidden lg:block absolute top-[18px] left-0 h-[1.5px] bg-[#2B9C91]"
            style={{ width: "100%" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-8">
            {stages.map((stage, i) => (
              <div key={i} className="relative pt-10 lg:pt-12 pb-0 border-b lg:border-b-0 border-[#E1E6E2] pb-6 lg:pb-0">

                {/* Node on the line */}
                <div className="hidden lg:block absolute top-[14px] left-1/2 -translate-x-1/2 h-[9px] w-[9px] rounded-full bg-[#2B9C91] ring-2 ring-white" />

                {/* Stage number */}
                <p className="text-[11px] font-mono text-[#2B9C91] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-sm font-semibold text-[#173B63] mb-2 leading-snug">
                  {stage.name}
                </h3>
                <p className="text-xs text-[#5A6E82] leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet editorial note — single line */}
        <p className="mt-16 pt-8 border-t border-[#E1E6E2] text-[11px] tracking-[0.15em] uppercase text-[#5A6E82]">
          Continuous digital presence across months and years —{" "}
          <span className="text-[#2B9C91]">no case abandoned post-registration</span>
        </p>
      </div>
    </section>
  );
}
