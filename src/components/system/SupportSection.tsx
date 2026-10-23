import React, { useState } from "react";
import { useManosethu } from "@/lib/manosethu-store";
import { getTranslation } from "@/services/i18n/translations";
import {
  PhoneCall,
  CheckCircle2,
  Heart,
  Scale,
  ShieldCheck,
  Briefcase,
  Sparkles,
} from "lucide-react";

export function SupportSection() {
  const { activeCase, language, requestCallSupport } = useManosethu();
  const t = getTranslation(language);

  const [callRequested, setCallRequested] = useState(
    activeCase.status === "Support Requested"
  );
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);

  const handleRequestCall = () => {
    requestCallSupport(activeCase.id);
    setCallRequested(true);
  };

  const pathways = [
    {
      id: "counselling",
      title: t.counsellingSupport,
      icon: <Heart size={18} className="text-[#2B9C91]" />,
      desc: "Confidential tele-counselling sessions with trained mental health professionals.",
    },
    {
      id: "legal",
      title: t.legalSupport,
      icon: <Scale size={18} className="text-[#173B63]" />,
      desc: "Free legal representation and trial updates via District Legal Services Authority.",
    },
    {
      id: "protection",
      title: t.protectionSupport,
      icon: <ShieldCheck size={18} className="text-[#C94C4C]" />,
      desc: "Coordinate with the DSP Special Cell for witness safety and neighborhood patrolling.",
    },
    {
      id: "rehab",
      title: t.rehabilitationSupport,
      icon: <Briefcase size={18} className="text-[#D97706]" />,
      desc: "Assistance with interim statutory relief disbursement, housing aid, and livelihood grants.",
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E1E6E2] bg-white p-6 sm:p-7 shadow-xs space-y-6">
      <div className="border-b border-[#E1E6E2] pb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B9C91]">
          Human Support Pathways
        </span>
        <h2 className="text-lg font-bold text-[#173B63]">
          {t.recommendedNextStep}
        </h2>
      </div>

      {/* Recommended Call Card */}
      <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#173B63]">
              {t.speakWithProfessional}
            </h3>
            <p className="text-xs text-[#5A6E82] leading-relaxed max-w-xl">
              An authorized district counsellor can review your recent check-in notes and connect with you at a time of your choice.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {callRequested ? (
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#E8F5F3] px-4 py-2 text-xs font-bold text-[#2B9C91] border border-[#2B9C91]/30">
                <CheckCircle2 size={14} />
                <span>Call Requested · Officer Queue Updated</span>
              </div>
            ) : (
              <button
                onClick={handleRequestCall}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#173B63] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#12263A] transition-colors shadow-xs"
              >
                <PhoneCall size={13} />
                <span>{t.requestACall}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Support Pathways Grid */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B63]">
            {t.availableSupportPathways}
          </h3>
          <p className="mt-1 text-xs text-[#5A6E82]">
            {t.supportVoluntaryNote}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {pathways.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl border border-[#E1E6E2] bg-white p-4 hover:border-[#173B63]/30 hover:bg-[#F6F7F5]/50 transition-all cursor-pointer"
              onClick={() => setSelectedPathway(item.id)}
            >
              <div className="rounded-xl bg-[#F6F7F5] p-2 shrink-0 border border-[#E1E6E2]">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#173B63]">{item.title}</h4>
                <p className="mt-1 text-[11px] text-[#4A5E73] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedPathway && (
          <div className="rounded-xl border border-[#2B9C91]/30 bg-[#E8F5F3] p-3 text-xs text-[#173B63] flex items-center justify-between">
            <span>
              Your interest in <strong>{pathways.find((p) => p.id === selectedPathway)?.title}</strong> has been noted for your caseworker.
            </span>
            <button
              onClick={() => setSelectedPathway(null)}
              className="text-[11px] font-bold text-[#2B9C91] hover:underline ml-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
