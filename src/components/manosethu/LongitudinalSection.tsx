import React from "react";
import { ArrowRight } from "lucide-react";

export function LongitudinalSection() {
  const observations = [
    { id: "OBSERVATION 01", milestone: "Post-Registration", state: "Acute Shock & Baseline Est.", note: "Initial check-in establishing individual vocal & textual baseline." },
    { id: "OBSERVATION 02", milestone: "Police Investigation", state: "Elevated Acoustic Strain", note: "Transient elevation during formal evidence and interrogation cycles." },
    { id: "OBSERVATION 03", milestone: "Court Cross-Examination", state: "Distress Acceleration", note: "Sustained upward divergence triggering automated human notification." },
    { id: "OBSERVATION 04", milestone: "Post-Trial Rehabilitation", state: "Stabilization & Recovery", note: "Gradual normalization following legal protection and financial relief." },
  ];

  return (
    <section className="py-24 md:py-36 bg-white hairline-t hairline-b">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Metadata Header */}
        <div className="flex items-center gap-3 mb-8 text-[11px] font-mono tracking-[0.25em] uppercase text-[#2B9C91]">
          <span>07 // TEMPORAL CONTEXT</span>
          <span className="text-[#E1E6E2]">——</span>
          <span>LONGITUDINAL DISTRESS MODELLING</span>
        </div>

        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-8">
            <h2 className="editorial-section-title font-bold text-[#173B63] text-balance">
              A single moment <br />
              <span className="font-light text-[#12263A]">is not the whole story.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-sm text-[#5A6E82] leading-relaxed">
              Human psychological distress is fluid. Manosethu tracks trajectory over months to distinguish everyday fluctuations from dangerous, accelerating distress.
            </p>
          </div>
        </div>

        {/* Conceptual Abstract Trajectory Visual (Zero Fake Percentages) */}
        <div className="p-8 md:p-12 bg-[#F6F7F5] border border-[#E1E6E2]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 hairline-b mb-8 text-[11px] font-mono text-[#5A6E82]">
            <span>ABSTRACT TRAJECTORY SCHEMATIC // CONTINUOUS TIME DOMAIN</span>
            <span className="text-[#2B9C91] uppercase">DYNAMIC BASELINE TRACKING</span>
          </div>

          {/* SVG Trajectory Visualization */}
          <div className="w-full h-40 md:h-56 relative flex items-center justify-center">
            <svg
              viewBox="0 0 800 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              aria-label="Conceptual diagram showing longitudinal distress trajectory across four observations"
              role="img"
            >
              {/* Horizontal Reference Lines */}
              <line x1="40" y1="40" x2="760" y2="40" stroke="#E1E6E2" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="90" x2="760" y2="90" stroke="#E1E6E2" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="140" x2="760" y2="140" stroke="#E1E6E2" strokeWidth="1" strokeDasharray="4 4" />

              {/* Trajectory Curve */}
              <path
                d="M 60 130 C 140 120, 220 75, 300 85 C 380 95, 460 30, 540 45 C 620 60, 700 120, 740 135"
                stroke="#2B9C91"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Observation Nodes */}
              <g transform="translate(60, 130)">
                <circle r="5" fill="#173B63" />
                <circle r="9" fill="none" stroke="#2B9C91" strokeWidth="1" strokeOpacity="0.4" />
              </g>

              <g transform="translate(300, 85)">
                <circle r="5" fill="#173B63" />
                <circle r="9" fill="none" stroke="#2B9C91" strokeWidth="1" strokeOpacity="0.4" />
              </g>

              <g transform="translate(540, 45)">
                <circle r="6" fill="#2B9C91" />
                <circle r="12" fill="none" stroke="#2B9C91" strokeWidth="1.5" />
              </g>

              <g transform="translate(740, 135)">
                <circle r="5" fill="#173B63" />
                <circle r="9" fill="none" stroke="#2B9C91" strokeWidth="1" strokeOpacity="0.4" />
              </g>
            </svg>
          </div>

          {/* Observation Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 hairline-t">
            {observations.map((obs, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#2B9C91] tracking-wider">
                  {obs.id}
                </span>
                <h4 className="text-sm font-semibold text-[#173B63]">{obs.milestone}</h4>
                <div className="text-xs text-[#12263A] font-medium">{obs.state}</div>
                <p className="text-xs text-[#5A6E82] leading-relaxed pt-1">{obs.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
