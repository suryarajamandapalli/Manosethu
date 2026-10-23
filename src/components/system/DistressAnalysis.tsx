import React from "react";
import { useManosethu } from "@/lib/manosethu-store";
import { getTranslation } from "@/services/i18n/translations";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  Info,
  ShieldCheck,
  UserCheck,
  Sparkles,
} from "lucide-react";

export function DistressAnalysis() {
  const { activeCase, language } = useManosethu();
  const t = getTranslation(language);

  const score = activeCase.currentDistressScore;
  const risk = activeCase.currentRiskLevel;
  const trend = activeCase.trend;
  const escalation = activeCase.escalationRisk;

  const getRiskBadge = () => {
    switch (risk) {
      case "VERY HIGH":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FDECEC] px-3 py-1 text-xs font-extrabold text-[#C94C4C] border border-[#C94C4C]/40">
            <span className="h-2 w-2 rounded-full bg-[#C94C4C]" />
            {t.riskVeryHigh}
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FDECEC] px-3 py-1 text-xs font-bold text-[#C94C4C] border border-[#C94C4C]/30">
            <span className="h-2 w-2 rounded-full bg-[#C94C4C]" />
            {t.riskHigh}
          </span>
        );
      case "MODERATE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF9E6] px-3 py-1 text-xs font-bold text-[#D97706] border border-[#F59E0B]/30">
            <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
            {t.riskModerate}
          </span>
        );
      case "LOW":
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F5F3] px-3 py-1 text-xs font-bold text-[#2B9C91] border border-[#2B9C91]/30">
            <span className="h-2 w-2 rounded-full bg-[#2B9C91]" />
            {t.riskLow}
          </span>
        );
    }
  };

  const getTrendDisplay = () => {
    switch (trend) {
      case "INCREASING":
        return (
          <span className="inline-flex items-center gap-1 text-xl font-bold text-[#C94C4C]">
            <TrendingUp size={20} />
            <span>{t.trendIncreasing}</span>
          </span>
        );
      case "IMPROVING":
        return (
          <span className="inline-flex items-center gap-1 text-xl font-bold text-[#2B9C91]">
            <TrendingDown size={20} />
            <span>{t.trendImproving}</span>
          </span>
        );
      case "STABLE":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xl font-bold text-[#173B63]">
            <Minus size={20} />
            <span>{t.trendStable}</span>
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-[#E1E6E2] bg-white p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E1E6E2] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#173B63] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white">
              {t.demoData}
            </span>
            <span className="text-xs text-[#5A6E82]">Continuity Monitoring</span>
          </div>
          <h2 className="mt-1 text-lg font-bold text-[#173B63]">
            {t.dynamicDistressScore}
          </h2>
        </div>

        <div>{getRiskBadge()}</div>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Dynamic Distress Score */}
        <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
            {t.dynamicDistressScore}
          </span>
          <div className="mt-2 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-extrabold text-[#173B63]">{score}</span>
            <span className="text-sm font-semibold text-[#5A6E82]">/ 100</span>
          </div>
          <p className="mt-1 text-[11px] text-[#5A6E82]">
            Deterministic &amp; multimodal input synthesis
          </p>
        </div>

        {/* Longitudinal Trend */}
        <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
            {t.currentTrend}
          </span>
          <div className="mt-3 flex items-center justify-center">
            {getTrendDisplay()}
          </div>
          <p className="mt-1 text-[11px] text-[#5A6E82]">
            Evaluated against prior check-ins
          </p>
        </div>

        {/* Escalation Risk */}
        <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
            {t.escalationRisk}
          </span>
          <div className="mt-3">
            <span
              className={`text-lg font-extrabold ${
                escalation === "ELEVATED"
                  ? "text-[#C94C4C]"
                  : escalation === "MODERATE"
                  ? "text-[#D97706]"
                  : "text-[#2B9C91]"
              }`}
            >
              {escalation === "ELEVATED" ? t.escalationElevated : escalation === "MODERATE" ? t.escalationModerate : t.escalationLow}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#5A6E82]">
            {escalation === "ELEVATED" ? "Prioritized for caseworker review" : "Monitored on standard schedule"}
          </p>
        </div>
      </div>

      {/* Mandatory Non-Clinical Statement */}
      <div className="rounded-xl border border-[#A8D0E8]/60 bg-[#F0F6FA] p-3.5 flex items-start gap-2.5">
        <Info size={15} className="text-[#173B63] shrink-0 mt-0.5" />
        <p className="text-xs text-[#4A5E73] leading-relaxed">
          <strong>Decision-Support Notice:</strong> {t.scoreExplanation} It assists authorized human caseworkers in prioritizing outreach.
        </p>
      </div>

      {/* Human-readable signals */}
      <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B63] mb-3">
          {t.signalsDetected}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {activeCase.signals.map((sig, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg bg-white p-2.5 border border-[#E1E6E2] text-xs font-semibold text-[#173B63]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2B9C91]" />
              <span>{sig}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Explainability Section */}
      <div className="space-y-3">
        <div className="rounded-xl border border-[#E1E6E2] bg-white p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2B9C91]">
            {t.whyThisChanged}
          </span>
          <p className="mt-1 text-xs text-[#12263A] leading-relaxed">
            {activeCase.reasonForReview}
          </p>
        </div>

        {activeCase.escalationRisk === "ELEVATED" && (
          <div className="rounded-xl border border-[#C94C4C]/30 bg-[#FFF5F5] p-4 flex items-start gap-2.5">
            <UserCheck size={16} className="text-[#C94C4C] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-[#C94C4C] uppercase tracking-wide">
                {t.humanReviewRecommended}
              </span>
              <p className="mt-0.5 text-xs text-[#4A5E73] leading-relaxed">
                Recent check-ins indicate increasing distress. A support professional should review this case.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
