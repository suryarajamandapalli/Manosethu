import React from "react";

export function ProblemSection() {
  return (
    <section id="problem" className="py-28 md:py-40 bg-[#F6F7F5]">
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        {/* Asymmetric two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left: The statement */}
          <div className="lg:col-span-6">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#2B9C91] font-medium mb-8">
              The Reality
            </p>
            <h2 className="editorial-section-title font-bold text-[#173B63] leading-[0.96] text-balance">
              Support stops{" "}
              <span className="font-light text-[#12263A]">
                when the complaint is filed.
              </span>
            </h2>
            <p className="mt-8 text-lg text-[#4A5E73] leading-relaxed max-w-md">
              When a victim of an atrocity registers an FIR, the legal system
              begins. But during the months and years that follow, the
              psychological pressure compounds — silently, invisibly, without
              any institutional awareness.
            </p>
          </div>

          {/* Right: The distress factors — pure typographic list, no boxes */}
          <div className="lg:col-span-6 pt-2">
            <div className="space-y-0">
              {[
                { title: "Threats & Intimidation", desc: "Post-complaint coercion and retaliation from perpetrators or local power structures." },
                { title: "Repeated Court Appearances", desc: "Adversarial cross-examinations causing cumulative psychological re-traumatization." },
                { title: "Investigation Delays", desc: "Prolonged legal uncertainty extending across years without resolution." },
                { title: "Social Ostracism", desc: "Community boycott and relational alienation following formal registration." },
                { title: "Economic Hardship", desc: "Loss of livelihood, travel burdens, and severe family strain." },
                { title: "Rehabilitation Struggles", desc: "Difficulty re-establishing housing, safety, and community belonging." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="py-6 border-b border-[#E1E6E2] grid grid-cols-12 gap-4 items-baseline"
                >
                  <div className="col-span-1 text-[11px] font-mono text-[#2B9C91] pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-11">
                    <h3 className="text-sm font-semibold text-[#173B63] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#5A6E82] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* The gap — pure text, no box */}
            <div className="mt-12 pl-5 border-l-2 border-[#173B63]">
              <p className="text-base text-[#4A5E73] leading-relaxed">
                Existing systems focus exclusively on episodic legal and financial aid.{" "}
                <strong className="text-[#173B63] font-semibold">
                  Continuous, proactive monitoring of psychological well-being is missing.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
