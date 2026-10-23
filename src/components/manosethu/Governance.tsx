import React from "react";
import { ArrowRight } from "lucide-react";

export function Governance() {
  const tiers = [
    {
      level: "District Level",
      scope: "Case-Level Coordination",
      focus: "Action & Outreach",
      points: [
        "Prioritized case queues for district counsellors and welfare officers",
        "Direct coordination with local police and legal aid bodies (DLSA)",
        "Hearing-aligned distress monitoring linked to local Special Courts",
      ],
    },
    {
      level: "State Level",
      scope: "Regional Aggregation",
      focus: "Resource Oversight",
      points: [
        "District-wise comparative distress index and vulnerability maps",
        "Counsellor deployment and regional caseload balancing",
        "Inter-departmental welfare and compensation tracking",
      ],
    },
    {
      level: "National Level",
      scope: "System-Level Insights",
      focus: "Policy Formulation",
      points: [
        "Pan-India aggregated trauma recovery trajectory analytics",
        "National Helpline Against Atrocities (14566) ecosystem review",
        "Evidence-based policy refinement for MoSJE welfare programs",
      ],
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#F6F7F5]">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Metadata Header */}
        <div className="flex items-center gap-3 mb-8 text-[11px] font-mono tracking-[0.25em] uppercase text-[#2B9C91]">
          <span>11 // GOVERNANCE STRUCTURE</span>
          <span className="text-[#E1E6E2]">——</span>
          <span>ADMINISTRATIVE HIERARCHY</span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="editorial-section-title font-bold text-[#173B63] text-balance">
            One system. <br />
            <span className="font-light text-[#12263A]">Three levels of visibility.</span>
          </h2>
          <p className="mt-4 text-base text-[#4A5E73] leading-relaxed">
            From direct case intervention by district officers to state-level resource planning and national policy insights—structured for privacy, hierarchy, and statutory alignment.
          </p>
        </div>

        {/* Conceptual Data Progression Header */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 text-[11px] font-mono text-[#5A6E82] pb-4 hairline-b">
          <span>INDIVIDUAL CASE</span>
          <ArrowRight size={12} className="text-[#2B9C91]" />
          <span>DISTRICT COORDINATION</span>
          <ArrowRight size={12} className="text-[#2B9C91]" />
          <span>STATE REGIONAL VIEW</span>
          <ArrowRight size={12} className="text-[#2B9C91]" />
          <span>NATIONAL POLICY LAYER</span>
        </div>

        {/* 3-Tier Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className="p-8 bg-white border border-[#E1E6E2] flex flex-col justify-between group hover:border-[#173B63] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 hairline-b mb-6">
                  <span className="text-xs font-mono font-bold text-[#173B63]">
                    0{idx + 1} // TIER
                  </span>
                  <span className="text-[10px] font-mono text-[#2B9C91] uppercase tracking-wider font-semibold">
                    {tier.focus}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#173B63] mb-1">{tier.level}</h3>
                <div className="text-xs font-mono text-[#5A6E82] mb-6">{tier.scope}</div>

                <ul className="space-y-3 pt-4 hairline-t">
                  {tier.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs text-[#5A6E82] leading-relaxed flex items-start gap-2">
                      <span className="text-[#2B9C91] font-bold">—</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 hairline-t mt-8 text-[10px] font-mono text-[#5A6E82]">
                {idx === 0 ? "DIRECT CASE ACCESS" : "AGGREGATED & ANONYMIZED"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
