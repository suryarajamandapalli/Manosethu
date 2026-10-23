import React from "react";

export function MissingLayer() {
  return (
    <section className="py-28 md:py-40 bg-[#F6F7F5]">
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#2B9C91] font-medium mb-8">
            The Missing Layer
          </p>
          <h2 className="editorial-section-title font-bold text-[#173B63] leading-[0.96] text-balance">
            What's missing{" "}
            <span className="font-light text-[#12263A]">is continuity.</span>
          </h2>
        </div>

        {/* Pure typographic contrast — no boxes, no borders, just space and weight */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Left: What exists */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-[#5A6E82] font-medium mb-10">
              Existing institutional support
            </p>
            <div className="space-y-8">
              {[
                { title: "Legal Proceedings", desc: "FIR filing, charge sheets, court summons, witness testimony." },
                { title: "Financial Compensation", desc: "Statutory monetary disbursements tied to procedural milestones." },
                { title: "Administrative Relief", desc: "Grievance logging on national helplines and department portals." },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="text-base font-semibold text-[#12263A] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#5A6E82] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-xs tracking-[0.1em] text-[#5A6E82] uppercase">
              Transactional · Event-driven · Discontinuous
            </p>
          </div>

          {/* Right: What Manosethu adds */}
          <div>
            <p className="text-xs tracking-[0.15em] uppercase text-[#2B9C91] font-medium mb-10">
              What Manosethu adds
            </p>
            <div className="space-y-8">
              {[
                { title: "Continuous Monitoring", desc: "Proactive, longitudinal check-ins tracking changing emotional strain over months." },
                { title: "Dynamic Understanding", desc: "Synthesizing vocal, textual, and behavioral signals across the full journey." },
                { title: "Early Awareness", desc: "Anticipating distress escalation before a personal breakdown emerges." },
                { title: "Connected Human Support", desc: "Routing signals to certified counsellors and protection officers — not algorithms." },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="text-base font-semibold text-[#173B63] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#5A6E82] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-12 text-xs tracking-[0.1em] text-[#2B9C91] uppercase">
              Proactive · Longitudinal · Human-centered
            </p>
          </div>
        </div>

        {/* Single bridging thought — pure typography */}
        <div className="mt-20 md:mt-28 max-w-2xl">
          <p className="text-2xl md:text-3xl font-light text-[#173B63] leading-snug text-balance">
            Institutional mechanisms are built to process cases episodically.
            Human psychological trauma requires a{" "}
            <span className="font-semibold">continuous bridge.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
