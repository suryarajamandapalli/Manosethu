import React from "react";

interface InnovationGridProps {
  darkMode?: boolean;
}

export function InnovationGrid({ darkMode = false }: InnovationGridProps) {
  const innovations = [
    { title: "Emotion AI", desc: "Quantifying nuanced affective shifts — sorrow, grief, agitation — across check-ins over time." },
    { title: "Voice Stress Analytics", desc: "Analyzing vocal tremor, fundamental frequency volatility, and response pauses in phone calls." },
    { title: "Multilingual NLP", desc: "Extracting emotional polarity and cognitive distress expressions from diverse regional language dialogue." },
    { title: "Predictive Risk Modelling", desc: "Anticipating non-linear distress spikes before acute crisis moments occur — not in reaction to them." },
    { title: "Multilingual Conversational AI", desc: "Facilitating empathetic dialogues across diverse Indian regional languages in accessible formats." },
    { title: "Explainable AI (XAI)", desc: "Providing interpretable feature attributions so caseworkers understand why a risk score was generated." },
    { title: "Automated Case Prioritisation", desc: "Sorting district caseloads dynamically so accelerating distress receives urgent human outreach first." },
    { title: "Real-Time Alert Architecture", desc: "Promptly dispatching multi-stakeholder notifications when predefined safety thresholds are crossed." },
  ];

  return (
    <section
      id="features"
      className={`py-28 md:py-40 transition-colors duration-500 ${
        darkMode ? "bg-[#0b1b33] text-[#d4e4f2]" : "bg-[#F6F7F5] text-[#12263A]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#2B9C91] font-medium mb-8">
          Features &amp; Technological Pillars
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 md:mb-24">
          <div className="lg:col-span-7">
            <h2
              className={`editorial-section-title font-bold leading-[0.96] text-balance ${
                darkMode ? "text-white" : "text-[#173B63]"
              }`}
            >
              Designed around{" "}
              <span className={`font-light ${darkMode ? "text-[#a8d0e8]" : "text-[#12263A]"}`}>
                multiple signals.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className={`text-base leading-relaxed ${darkMode ? "text-[#9ab5ca]" : "text-[#5A6E82]"}`}>
              The technological pillars synthesize speech acoustics, natural language,
              and predictive analytics into a unified, empathetic decision-support framework.
            </p>
          </div>
        </div>

        {/* Typographic flow — no boxes, just paired columns of text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {innovations.map((item, i) => (
            <div
              key={i}
              className={`py-7 px-0 md:px-0 border-b ${
                darkMode ? "border-white/10" : "border-[#E1E6E2]"
              } grid grid-cols-12 gap-5 items-baseline ${
                i % 2 === 0
                  ? "md:pr-16"
                  : `md:pl-16 md:border-l ${darkMode ? "border-white/10" : "border-[#E1E6E2]"}`
              }`}
            >
              <div className="col-span-1 text-[11px] font-mono text-[#2B9C91] pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-11">
                <h3
                  className={`text-sm font-semibold mb-1 ${
                    darkMode ? "text-white" : "text-[#173B63]"
                  }`}
                >
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? "text-[#9ab5ca]" : "text-[#5A6E82]"}`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
