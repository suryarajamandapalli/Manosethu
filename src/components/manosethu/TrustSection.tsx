import React from "react";

export function TrustSection() {
  const principles = [
    {
      title: "Informed & Voluntary Consent",
      desc: "Participation is explicit, fully informed, and unconditionally revocable at any stage — without impacting access to statutory aid.",
    },
    {
      title: "Decoupled Architecture",
      desc: "Personal identifiable information is isolated from psychological distress vectors to prevent profiling or misuse.",
    },
    {
      title: "Cryptographic Data Protection",
      desc: "End-to-end encryption in transit and at rest, with strict role-based access logs across all administrative tiers.",
    },
    {
      title: "Explainable Alerts",
      desc: "Every flagged risk notification includes human-interpretable feature breakdowns — caseworkers understand exactly why an alert was triggered.",
    },
  ];

  return (
    <section id="trust" className="py-28 md:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        <p className="text-[11px] tracking-[0.18em] uppercase text-[#2B9C91] font-medium mb-8">
          Built for Trust
        </p>

        <h2 className="editorial-section-title font-bold text-[#173B63] leading-[0.96] max-w-2xl mb-20 md:mb-28">
          Designed around{" "}
          <span className="font-light text-[#12263A]">human dignity.</span>
        </h2>

        {/* Four principles as four clean lines of typography — no cards */}
        <div className="space-y-0">
          {principles.map((pr, i) => (
            <div
              key={i}
              className="py-8 border-b border-[#E1E6E2] grid grid-cols-12 gap-6 md:gap-16 items-baseline"
            >
              <div className="col-span-12 md:col-span-5">
                <h3 className="text-lg font-semibold text-[#173B63] leading-snug">{pr.title}</h3>
              </div>
              <div className="col-span-12 md:col-span-7">
                <p className="text-sm text-[#5A6E82] leading-relaxed">{pr.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical mandate — single clean sentence */}
        <div className="mt-14 pl-5 border-l-2 border-[#173B63]">
          <p className="text-sm text-[#4A5E73] leading-relaxed">
            Human oversight remains central across every monitoring, scoring, and
            intervention touchpoint.{" "}
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#5A6E82]">
              — DPDP Act 2023 &amp; Mental Healthcare Framework Aligned
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
