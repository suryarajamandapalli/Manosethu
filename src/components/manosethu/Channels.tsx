import React from "react";
import { MessageSquare, PhoneCall, Bot, Smartphone, Globe, Headphones } from "lucide-react";

export function Channels() {
  const channels = [
    { name: "IVRS Telephony Calls", modality: "Voice Acoustics", desc: "Automated outbound voice interactions for citizens on basic 2G feature phones without internet.", icon: PhoneCall },
    { name: "Conversational Chatbot", modality: "Natural Language Text", desc: "Empathetic, trauma-informed digital text dialogues across Indian regional languages.", icon: Bot },
    { name: "SMS Messaging", modality: "Low-Bandwidth Text", desc: "Discrete, ultra-low-friction prompt check-ins for remote tribal or rural geographies.", icon: MessageSquare },
    { name: "Mobile Application", modality: "Self-Guided Portal", desc: "Secure digital interface for status views, resource guides, and self-reported check-ins.", icon: Smartphone },
    { name: "Integrated Web Portal", modality: "Browser Access", desc: "Accessible gateway linked with official institutional complaint and relief records.", icon: Globe },
    { name: "Helpline Follow-up (14566)", modality: "Assisted Telephony", desc: "Coordination with National Helpline Against Atrocities operators and caseworkers.", icon: Headphones },
  ];

  return (
    <section className="py-24 md:py-36 bg-white hairline-t hairline-b">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Metadata Header */}
        <div className="flex items-center gap-3 mb-8 text-[11px] font-mono tracking-[0.25em] uppercase text-[#2B9C91]">
          <span>05 // INGESTION ECOSYSTEM</span>
          <span className="text-[#E1E6E2]">——</span>
          <span>UNIVERSAL REACHABILITY</span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="editorial-section-title font-bold text-[#173B63] text-balance">
            Meet people <br />
            <span className="font-light text-[#12263A]">where they are.</span>
          </h2>
          <p className="mt-4 text-base text-[#4A5E73] leading-relaxed">
            Victims live across diverse digital and geographic realities. Manosethu integrates six low-barrier communication channels into a unified support layer.
          </p>
        </div>

        {/* Central Core Ecosystem Layout (Editorial Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {channels.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <div
                key={idx}
                className="p-6 md:p-8 bg-[#F6F7F5] border border-[#E1E6E2] flex flex-col justify-between group hover:border-[#173B63] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 hairline-b mb-4">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#2B9C91] font-semibold">
                      {ch.modality}
                    </span>
                    <Icon size={16} className="text-[#173B63] group-hover:text-[#2B9C91] transition-colors" />
                  </div>
                  <h3 className="text-base font-semibold text-[#173B63] mb-2">{ch.name}</h3>
                  <p className="text-xs text-[#5A6E82] leading-relaxed">{ch.desc}</p>
                </div>

                <div className="pt-6 hairline-t mt-6 flex items-center justify-between text-[10px] font-mono text-[#5A6E82]">
                  <span>CHANNEL 0{idx + 1}</span>
                  <span className="text-[#173B63] uppercase">ACTIVE INGESTION</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Ecosystem Summary */}
        <div className="mt-12 p-6 bg-[#EEF2EF] border border-[#E1E6E2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A6E82]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#173B63] font-bold">ECOSYSTEM PRINCIPLE:</span>
            <span>All 6 touchpoints feed into a singular, privacy-isolated distress understanding engine.</span>
          </div>
          <span className="text-[#2B9C91] font-mono text-[10px] uppercase">One Support Layer</span>
        </div>
      </div>
    </section>
  );
}
