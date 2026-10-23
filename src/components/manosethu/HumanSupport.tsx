import React from "react";

export function HumanSupport() {
  return (
    <section id="human-support" className="py-28 md:py-40 bg-[#F6F7F5]">
      <div className="mx-auto max-w-7xl px-6 md:px-16">

        <p className="text-[11px] tracking-[0.18em] uppercase text-[#2B9C91] font-medium mb-8">
          AI + Human
        </p>

        {/* Central thesis — large, commanding, but human */}
        <div className="max-w-4xl mb-20 md:mb-32">
          <h2 className="editorial-section-title font-bold text-[#173B63] leading-[0.96] text-balance">
            AI identifies signals.{" "}
            <span className="font-light text-[#12263A]">
              People provide support.
            </span>
          </h2>
          <p className="mt-8 text-lg text-[#4A5E73] leading-relaxed max-w-xl">
            Technology serves as a continuous digital sensor. All clinical, legal,
            and administrative decisions remain exclusively under the authority of
            human professionals.
          </p>
        </div>

        {/* Two territories — separated by space and weight, not by boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* AI side */}
          <div>
            <div className="border-b border-[#E1E6E2] pb-4 mb-10 flex items-baseline justify-between">
              <span className="text-xs tracking-[0.15em] uppercase text-[#5A6E82] font-medium">
                The system observes
              </span>
              <span className="text-[10px] font-mono text-[#2B9C91]">Automated analysis</span>
            </div>
            <div className="space-y-7">
              {[
                { verb: "Listens", desc: "Ingesting multi-channel speech, text, and interaction telemetry continuously." },
                { verb: "Analyses", desc: "Synthesizing acoustic prosody and linguistic distress markers into normalized ratings." },
                { verb: "Tracks", desc: "Observing trajectory over months against personalized historical baselines." },
                { verb: "Explains", desc: "Providing human-interpretable feature attributions for flagged anomalies." },
                { verb: "Alerts", desc: "Dispatching notifications when predefined safety thresholds are crossed." },
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-4">
                    <span className="text-base font-semibold text-[#12263A]">{item.verb}</span>
                  </div>
                  <div className="col-span-8">
                    <p className="text-sm text-[#5A6E82] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[10px] tracking-[0.12em] uppercase text-[#5A6E82]">
              Zero autonomous authority
            </p>
          </div>

          {/* Human side */}
          <div>
            <div className="border-b border-[#2B9C91]/30 pb-4 mb-10 flex items-baseline justify-between">
              <span className="text-xs tracking-[0.15em] uppercase text-[#173B63] font-medium">
                The people decide
              </span>
              <span className="text-[10px] font-mono text-[#2B9C91]">Human authority</span>
            </div>
            <div className="space-y-7">
              {[
                { verb: "Review", desc: "Certified psychologists evaluate contextual distress evidence with clinical nuance." },
                { verb: "Counsel", desc: "Conducting personalized trauma therapy, de-escalation, and psychiatric first aid." },
                { verb: "Protect", desc: "District police and protection cells enforce statutory witness safety measures." },
                { verb: "Assist", desc: "Legal aid authorities facilitate free representation and trial accompaniment." },
                { verb: "Intervene", desc: "District Magistrates expedite statutory interim financial compensation." },
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 items-baseline">
                  <div className="col-span-4">
                    <span className="text-base font-semibold text-[#173B63]">{item.verb}</span>
                  </div>
                  <div className="col-span-8">
                    <p className="text-sm text-[#5A6E82] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[10px] tracking-[0.12em] uppercase text-[#2B9C91] font-medium">
              100% human authority over relief &amp; treatment
            </p>
          </div>
        </div>

        {/* The central idea — stated plainly, with maximum weight */}
        <div className="mt-24 md:mt-32 border-t border-[#E1E6E2] pt-12">
          <p className="text-2xl md:text-3xl font-light text-[#173B63] text-balance max-w-2xl">
            <span className="font-bold">HUMAN OVERSIGHT</span> is not a feature.
            It is the foundation on which Manosethu is built.
          </p>
        </div>
      </div>
    </section>
  );
}
