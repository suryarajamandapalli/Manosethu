import React, { useState } from "react";
import { CaseRecord, useManosethu } from "@/lib/manosethu-store";
import {
  X,
  Phone,
  Calendar,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  Clock,
  UserCheck,
  HeartHandshake,
  Send,
  FileText,
} from "lucide-react";

interface CaseDetailModalProps {
  caseData: CaseRecord | null;
  onClose: () => void;
}

export function CaseDetailModal({ caseData, onClose }: CaseDetailModalProps) {
  const { performSupportAction } = useManosethu();
  const [activeModalAction, setActiveModalAction] = useState<string | null>(null);
  const [actionNotes, setActionNotes] = useState("");
  const [lastActionSuccessMsg, setLastActionSuccessMsg] = useState<string | null>(null);

  if (!caseData) return null;

  const handleExecuteAction = (actionType: any, defaultNote: string) => {
    const finalNote = actionNotes.trim() || defaultNote;
    performSupportAction({
      caseId: caseData.id,
      actionType,
      performedBy: "Officer Sunita R. (Authorized Caseworker)",
      notes: finalNote,
      status: "COMPLETED",
    });

    setLastActionSuccessMsg(`Action recorded by authorized support officer: ${actionType.replace("_", " ")}`);
    setActiveModalAction(null);
    setActionNotes("");
    setTimeout(() => setLastActionSuccessMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-[#E1E6E2] overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E1E6E2] px-6 py-4 bg-[#F6F7F5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-[#173B63]">
                {caseData.caseCode}
              </span>
              <span className="rounded bg-white px-2 py-0.5 text-[10px] font-bold text-[#5A6E82] border border-[#E1E6E2]">
                {caseData.anonymousCaseId}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                  caseData.currentRiskLevel === "VERY HIGH" || caseData.currentRiskLevel === "HIGH"
                    ? "bg-[#FDECEC] text-[#C94C4C] border border-[#C94C4C]/30"
                    : caseData.currentRiskLevel === "MODERATE"
                    ? "bg-[#FFF9E6] text-[#D97706] border border-[#F59E0B]/30"
                    : "bg-[#E8F5F3] text-[#2B9C91] border border-[#2B9C91]/30"
                }`}
              >
                {caseData.currentRiskLevel} RISK
              </span>
            </div>
            <p className="mt-1 text-xs text-[#5A6E82]">
              {caseData.stageDisplayName} · Last check-in: {caseData.lastCheckInAt}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#5A6E82] hover:bg-white hover:text-[#12263A]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Feedback notification if action performed */}
        {lastActionSuccessMsg && (
          <div className="bg-[#E8F5F3] border-b border-[#2B9C91]/30 px-6 py-2 text-xs font-bold text-[#173B63] flex items-center gap-2">
            <CheckCircle size={14} className="text-[#2B9C91]" />
            <span>{lastActionSuccessMsg}</span>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Distress Score
              </span>
              <p className="mt-1 text-2xl font-extrabold text-[#173B63]">
                {caseData.currentDistressScore}{" "}
                <span className="text-xs font-normal text-[#5A6E82]">/ 100</span>
              </p>
            </div>

            <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Risk Level
              </span>
              <p className="mt-1 text-sm font-bold text-[#12263A]">{caseData.currentRiskLevel}</p>
            </div>

            <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Trend
              </span>
              <p className="mt-1 text-sm font-bold text-[#173B63]">{caseData.trend}</p>
            </div>

            <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Escalation Risk
              </span>
              <p className="mt-1 text-sm font-extrabold text-[#C94C4C]">{caseData.escalationRisk}</p>
            </div>
          </div>

          {/* Reason for Review & Signals */}
          <div className="rounded-xl border border-[#E1E6E2] bg-white p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B63]">
              Reason for Review
            </h3>
            <p className="mt-1.5 text-xs text-[#12263A] leading-relaxed">
              {caseData.reasonForReview}
            </p>

            <div className="mt-3 pt-3 border-t border-[#E1E6E2]">
              <span className="text-[11px] font-bold text-[#5A6E82]">Active Detected Signals:</span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {caseData.signals.map((sig, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-md bg-[#F6F7F5] border border-[#E1E6E2] px-2.5 py-1 text-[11px] font-medium text-[#173B63]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2B9C91]" />
                    <span>{sig}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stored Check-ins History Summary */}
          <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B63] mb-3">
              Stored Check-in Records ({caseData.checkInHistory.length})
            </h3>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {caseData.checkInHistory.map((rec, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-[#E1E6E2] text-xs">
                  <div>
                    <span className="font-bold text-[#173B63]">Check-in {i + 1}</span>
                    <span className="ml-2 text-[10px] text-[#5A6E82]">
                      {new Date(rec.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                    <span className="block text-[11px] text-[#4A5E73] capitalize mt-0.5">
                      Feeling: {rec.feeling} · Safety: {rec.safety}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-[#173B63]">{rec.distressScore}</span>
                    <span className="text-[10px] text-[#5A6E82]">/100</span>
                    <span className="ml-2 text-[10px] font-bold text-[#2B9C91]">{rec.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Stage Progression Timeline required */}
          <div className="rounded-xl border border-[#E1E6E2] bg-white p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B63] mb-3">
              Decision &amp; Escalation Timeline
            </h3>

            <div className="relative pl-6 space-y-4 border-l-2 border-[#E1E6E2] ml-2">
              {[
                { step: "CHECK-IN", note: "Victim completed scheduled check-in", completed: true },
                { step: "SIGNALS DETECTED", note: caseData.signals.slice(0, 2).join(", "), completed: true },
                { step: "DISTRESS SCORE UPDATED", note: `Dynamic score evaluated at ${caseData.currentDistressScore}/100`, completed: true, isAlert: caseData.currentDistressScore >= 60 },
                { step: "ESCALATION RISK IDENTIFIED", note: `Escalation Risk: ${caseData.escalationRisk}`, completed: true, isAlert: caseData.escalationRisk === "ELEVATED" },
                { step: "HUMAN REVIEW", note: "Case prioritized in Support Officer review queue", completed: true },
                { step: "SUPPORT OFFERED", note: "Voluntary support referral prepared", completed: caseData.status === "Follow-up Scheduled" || caseData.status === "Reviewed" },
                { step: "MONITOR AGAIN", note: "Continuous monitoring active", completed: caseData.status === "Reviewed" },
              ].map((ev, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-white ${
                      ev.isAlert
                        ? "border-[#C94C4C] text-[#C94C4C]"
                        : ev.completed
                        ? "border-[#2B9C91] text-[#2B9C91]"
                        : "border-[#8BA0B2] text-[#8BA0B2]"
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        ev.isAlert ? "bg-[#C94C4C]" : ev.completed ? "bg-[#2B9C91]" : "bg-transparent"
                      }`}
                    />
                  </div>
                  <div>
                    <span className={`text-xs font-bold ${ev.isAlert ? "text-[#C94C4C]" : "text-[#173B63]"}`}>
                      {ev.step}
                    </span>
                    <p className="mt-0.5 text-xs text-[#4A5E73]">{ev.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support History */}
          <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173B63] mb-2">
              Support History &amp; Caseworker Audit Notes
            </h3>
            <div className="space-y-2">
              {caseData.supportHistory.map((item, i) => (
                <div key={i} className="rounded-lg bg-white p-2.5 text-xs border border-[#E1E6E2]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#173B63]">{item.type}</span>
                    <span className="text-[10px] text-[#5A6E82]">{item.date}</span>
                  </div>
                  <p className="text-[11px] text-[#2B9C91] mt-0.5 font-medium">{item.officer}</p>
                  <p className="text-xs text-[#4A5E73] mt-1">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Human Control Guarantee */}
          <div className="rounded-xl border border-[#2B9C91]/30 bg-[#E8F5F3] p-3 flex items-start gap-2">
            <Shield size={16} className="text-[#2B9C91] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#173B63] leading-relaxed">
              <strong>Human-in-the-Loop Principle:</strong> AI identifies patterns and assists triage. Authorized humans make all decisions and record actions.
            </p>
          </div>
        </div>

        {/* Support Officer Actions Footer */}
        <div className="border-t border-[#E1E6E2] bg-white px-6 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#173B63] uppercase tracking-wider">
              Human Actions:
            </span>
            <span className="text-[10px] text-[#5A6E82]">
              Every action is logged with officer credentials
            </span>
          </div>

          {/* Action Buttons required:
              MARK AS REVIEWED, CONTACT PERSON, REQUEST COUNSELLING, OFFER SUPPORT, SCHEDULE FOLLOW-UP, MARK RESOLVED */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleExecuteAction("MARK_REVIEWED", "Clinical review completed by caseworker. No acute intervention required.")}
              className="rounded-xl bg-[#173B63] py-2 px-3 text-xs font-bold text-white hover:bg-[#12263A] transition-colors"
            >
              MARK AS REVIEWED
            </button>

            <button
              onClick={() => handleExecuteAction("CONTACT_PERSON", "Secure outreach initiated with complainant via official helpline gateway.")}
              className="rounded-xl bg-[#2B9C91] py-2 px-3 text-xs font-bold text-white hover:bg-[#238077] transition-colors"
            >
              CONTACT PERSON
            </button>

            <button
              onClick={() => handleExecuteAction("REQUEST_COUNSELLING", "Referred case for Tele-MANAS district clinical counsellor booking.")}
              className="rounded-xl border border-[#2B9C91] bg-white py-2 px-3 text-xs font-bold text-[#2B9C91] hover:bg-[#E8F5F3] transition-colors"
            >
              REQUEST COUNSELLING
            </button>

            <button
              onClick={() => handleExecuteAction("OFFER_SUPPORT", "Dispatched voluntary assistance package options to complainant.")}
              className="rounded-xl border border-[#E1E6E2] bg-white py-2 px-3 text-xs font-semibold text-[#173B63] hover:bg-[#F6F7F5]"
            >
              OFFER SUPPORT
            </button>

            <button
              onClick={() => handleExecuteAction("SCHEDULE_FOLLOWUP", "Scheduled welfare check-in call for next week.")}
              className="rounded-xl border border-[#E1E6E2] bg-white py-2 px-3 text-xs font-semibold text-[#173B63] hover:bg-[#F6F7F5]"
            >
              SCHEDULE FOLLOW-UP
            </button>

            <button
              onClick={() => handleExecuteAction("MARK_RESOLVED", "Immediate distress factors resolved through caseworker intervention.")}
              className="rounded-xl border border-[#C94C4C] bg-white py-2 px-3 text-xs font-bold text-[#C94C4C] hover:bg-[#FFF5F5]"
            >
              MARK RESOLVED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
