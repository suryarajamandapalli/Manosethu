import React, { useState } from "react";
import { useManosethu } from "@/lib/manosethu-store";
import {
  Shield,
  Download,
  CheckCircle2,
  Lock,
  FileText,
  Sliders,
  X,
  Bell,
  Mic,
  Eye,
  Check,
} from "lucide-react";

export function PrivacyPanel() {
  const {
    isPrivacyOpen,
    setIsPrivacyOpen,
    activePrivacySettings,
    updatePrivacySettings,
    exportActiveCaseData,
    activeCase,
  } = useManosethu();

  const [activeTab, setActiveTab] = useState<"framework" | "preferences">("framework");
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isPrivacyOpen) return null;

  const handleExport = () => {
    exportActiveCaseData();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleToggle = (key: keyof typeof activePrivacySettings, value: any) => {
    updatePrivacySettings({ [key]: value });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-[#E1E6E2] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E1E6E2] px-6 py-4 bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#E8F5F3] p-2.5 text-[#2B9C91]">
              <Shield size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#173B63]">
                Privacy, Consent & Data Rights
              </h2>
              <p className="text-xs text-[#5A6E82]">
                DPDP Act (2023) Framework · Case {activeCase?.caseCode || "#MS-1042"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="rounded-lg p-2 text-[#5A6E82] hover:bg-slate-200 hover:text-[#12263A] transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E1E6E2] bg-white px-6">
          <button
            onClick={() => setActiveTab("framework")}
            className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-2 mr-6 transition-colors ${
              activeTab === "framework"
                ? "border-[#2B9C91] text-[#173B63]"
                : "border-transparent text-[#718498] hover:text-[#173B63]"
            }`}
          >
            <Lock size={14} />
            Protection Framework
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`py-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === "preferences"
                ? "border-[#2B9C91] text-[#173B63]"
                : "border-transparent text-[#718498] hover:text-[#173B63]"
            }`}
          >
            <Sliders size={14} />
            Consent Controls & Data Export
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === "framework" && (
            <>
              <div className="rounded-xl bg-[#F0F6FA] border border-[#C5DCEB] p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-[#173B63] text-white p-1 mt-0.5">
                    <Shield size={14} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#173B63] uppercase tracking-wide">
                      Citizen Wellbeing Privacy Guarantee
                    </h3>
                    <p className="text-xs text-[#4A5E73] mt-1 leading-relaxed">
                      ManoSethu is engineered strictly on principles of privacy-by-design. Your responses are used solely for emotional wellbeing pattern understanding and proactive human-centred care. We never sell, monetize, or disclose your check-in records to unauthorized third parties.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-full bg-[#E8F5F3] p-1 text-[#2B9C91] shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#173B63]">
                      Pseudonymized Identity
                    </h3>
                    <p className="text-xs text-[#4A5E73] leading-relaxed mt-0.5">
                      Your records are stored using random identifiers (<span className="font-mono font-medium text-[#173B63]">AN-8921</span>). Real names and identity documents are decoupled from emotional check-ins.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-full bg-[#E8F5F3] p-1 text-[#2B9C91] shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#173B63]">
                      Strict Data Minimization
                    </h3>
                    <p className="text-xs text-[#4A5E73] leading-relaxed mt-0.5">
                      We only capture self-reported affective indicators (sleep, worry, situational safety). No invasive background sensors, microphone background eavesdropping, or location tracking.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-full bg-[#E8F5F3] p-1 text-[#2B9C91] shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#173B63]">
                      Audited Human Review
                    </h3>
                    <p className="text-xs text-[#4A5E73] leading-relaxed mt-0.5">
                      Only verified, credentialed counsellors and support caseworkers can view flagged trends. Every case access is recorded in an immutable, tamper-evident audit log.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-full bg-[#E8F5F3] p-1 text-[#2B9C91] shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#173B63]">
                      Full Revocation & Export Rights
                    </h3>
                    <p className="text-xs text-[#4A5E73] leading-relaxed mt-0.5">
                      You maintain full ownership of your data under the Digital Personal Data Protection Act. You can pause monitoring, revoke audio processing consent, or export your complete history anytime.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-6">
              {saveSuccess && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                  <Check size={14} className="text-emerald-600" />
                  Preferences updated and logged to audit trail.
                </div>
              )}

              {/* Granular Toggles */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#173B63] uppercase tracking-wide">
                  Active Consent Controls
                </h4>

                <div className="p-3.5 rounded-xl border border-[#E1E6E2] bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-50 text-[#2B9C91]">
                      <Eye size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#173B63]">
                        Longitudinal Pattern Tracking
                      </p>
                      <p className="text-[11px] text-[#5A6E82]">
                        Allows AI distress scoring to calculate multi-week trends and shifts.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activePrivacySettings.isMonitoringActive}
                      onChange={(e) =>
                        handleToggle("isMonitoringActive", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2B9C91]"></div>
                  </label>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E1E6E2] bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-50 text-[#2B9C91]">
                      <Mic size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#173B63]">
                        Spoken Reflection Audio Analysis
                      </p>
                      <p className="text-[11px] text-[#5A6E82]">
                        Allow speech prosody and pacing analysis during optional voice check-ins.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activePrivacySettings.allowVoiceCollection}
                      onChange={(e) =>
                        handleToggle("allowVoiceCollection", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2B9C91]"></div>
                  </label>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E1E6E2] bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-50 text-[#2B9C91]">
                      <Shield size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#173B63]">
                        Counsellor Peer Clinical Review
                      </p>
                      <p className="text-[11px] text-[#5A6E82]">
                        Permits credentialed district mental health officers to review elevated alerts.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activePrivacySettings.allowCounsellorReview}
                      onChange={(e) =>
                        handleToggle("allowCounsellorReview", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2B9C91]"></div>
                  </label>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E1E6E2] bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-50 text-[#2B9C91]">
                      <Bell size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#173B63]">
                        Emergency Check-in Reminders
                      </p>
                      <p className="text-[11px] text-[#5A6E82]">
                        Receive confidential SMS or browser prompt reminders when check-in is due.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activePrivacySettings.allowSMSDispatch}
                      onChange={(e) =>
                        handleToggle("allowSMSDispatch", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2B9C91]"></div>
                  </label>
                </div>
              </div>

              {/* Data Portability / Export */}
              <div className="pt-2 border-t border-[#E1E6E2]">
                <h4 className="text-xs font-bold text-[#173B63] uppercase tracking-wide mb-2">
                  DPDP Statutory Data Portability
                </h4>
                <div className="rounded-xl border border-[#C5DCEB] bg-[#F8FAFC] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#173B63] flex items-center gap-1.5">
                      <FileText size={15} className="text-[#2B9C91]" />
                      Download Complete Wellbeing Archive (.JSON)
                    </p>
                    <p className="text-[11px] text-[#5A6E82] mt-0.5">
                      Includes all {activeCase?.checkInHistory?.length || 0} recorded check-ins, scores, linguistic signal extractions, and consent timeline.
                    </p>
                  </div>
                  <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#173B63] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#12263A] transition-colors shrink-0 shadow-xs"
                  >
                    <Download size={14} />
                    {downloadSuccess ? "Downloaded!" : "Export My Data"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E1E6E2] px-6 py-3.5 bg-[#F8FAFC] flex items-center justify-between">
          <p className="text-[11px] text-[#5A6E82]">
            Consent recorded on {new Date(activePrivacySettings.consentTimestamp).toLocaleDateString()}
          </p>
          <button
            onClick={() => setIsPrivacyOpen(false)}
            className="rounded-xl bg-[#173B63] px-5 py-2 text-xs font-semibold text-white hover:bg-[#12263A] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}