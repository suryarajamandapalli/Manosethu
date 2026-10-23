import React from "react";
import { ArrowUpRight } from "lucide-react";

export function InterventionSection() {
  const pathways = [
    { num: "01", name: "Counselling & Psychological First Aid", target: "Mental Health Care", desc: "Telephonic and in-person trauma therapy through certified clinical psychologists and social workers." },
    { num: "02", name: "Medical & Psychiatric Treatment", target: "Physical & Clinical Health", desc: "Direct referrals to District Civil Hospitals and PHCs for acute distress evaluation and healthcare." },
    { num: "03", name: "Witness Protection Protocols", target: "Physical Security", desc: "Escalation to District Police and Special Protection Units to ensure safe transit and home security." },
    { num: "04", name: "Relocation & Safe-House Support", target: "Emergency Shelter", desc: "Coordination with state shelter homes or secure accommodations when local physical threats emerge." },
    { num: "05", name: "Financial Assistance Acceleration", target: "Statutory Relief", desc: "Expedited disbursement of statutory interim relief under PoA welfare entitlement norms." },
    { num: "06", name: "Free Legal Aid & Representation", target: "Judicial Support", desc: "Direct linkage with District Legal Services Authorities (DLSA) for free prosecution representation." },
    { num: "07", name: "Comprehensive Social Rehabilitation", target: "Livelihood & Community", desc: "Vocational restoration, educational support, and community mediation against social boycott." },
  ];

  return (
    <section className="py-24 md:py-36 bg-white hairline-t hairline-b">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Metadata Header */}
        <div className="flex items-center gap-3 mb-8 text-[11px] font-mono tracking-[0.25em] uppercase text-[#2B9C91]">
          <span>10 // ACTIONABLE RELIEF</span>
          <span className="text-[#E1E6E2]">——</span>
          <span>SUPPORT PATHWAYS</span>
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="editorial-section-title font-bold text-[#173B63] text-balance">
            Risk should <br />
            <span className="font-light text-[#12263A]">lead somewhere.</span>
          </h2>
          <p className="mt-4 text-base text-[#4A5E73] leading-relaxed">
            When psychological distress signals are detected, the system does not just log a score. It triggers contextual, multidisciplinary support pathways under authorized institutional control.
          </p>
        </div>

        {/* Editorial Interactive List (No generic card grid) */}
        <div className="hairline-t">
          {pathways.map((item) => (
            <div
              key={item.num}
              className="py-6 md:py-8 hairline-b grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group hover:bg-[#F6F7F5] transition-colors px-2 md:px-4"
            >
              <div className="md:col-span-1 text-xs font-mono text-[#2B9C91] font-bold">
                {item.num}
              </div>
              <div className="md:col-span-4">
                <h3 className="text-base font-semibold text-[#173B63] group-hover:text-[#2B9C91] transition-colors">
                  {item.name}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#5A6E82]">
                  {item.target}
                </span>
              </div>
              <div className="md:col-span-6 text-xs sm:text-sm text-[#5A6E82] leading-relaxed">
                {item.desc}
              </div>
              <div className="md:col-span-1 flex justify-end">
                <ArrowUpRight size={16} className="text-[#E1E6E2] group-hover:text-[#173B63] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
