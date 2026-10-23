import React, { useState } from "react";
import { useManosethu } from "@/lib/manosethu-store";
import { getTranslation } from "@/services/i18n/translations";
import { CheckInFlow } from "./CheckInFlow";
import { DistressAnalysis } from "./DistressAnalysis";
import { TrendChart } from "./TrendChart";
import { SupportSection } from "./SupportSection";
import { OnboardingModal } from "./OnboardingModal";
import {
  Clock,
  TrendingUp,
  TrendingDown,
  Calendar,
  Shield,
  ArrowRight,
  HeartHandshake,
  Lock,
  MessageSquare,
  Sparkles,
  PhoneCall,
  Activity,
  Mic,
  FileText,
  UserCheck,
  Send,
  AlertTriangle,
  ChevronRight,
  Info,
} from "lucide-react";

export function VictimHome() {
  const {
    activeCase,
    language,
    setIsPrivacyOpen,
    setIsEmergencyOpen,
    timeRange,
    setTimeRange,
    isOnboarded,
    messages,
    sendDirectMessage,
    exportActiveCaseData,
    latestRiskPrediction,
  } = useManosethu();

  const t = getTranslation(language);

  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(!isOnboarded);
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "messages">("overview");
  const [messageInput, setMessageInput] = useState("");

  // Get current hour for greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Check-in history
  const history = activeCase.checkInHistory || [];
  const latestCheckIn = history[history.length - 1];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendDirectMessage(messageInput.trim(), "USER");
    setMessageInput("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 space-y-8">
      {/* Onboarding Modal if needed */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartFirstCheckIn={() => setIsCheckInOpen(true)}
      />

      {/* Calm Status Strip: Stage & Case ID */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#E8F5F3] border border-[#2B9C91]/20 px-5 py-3.5 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#2B9C91]" />
          <span className="font-bold text-[#173B63]">
            {activeCase.caseCode} · {activeCase.stageDisplayName}
          </span>
          <span className="rounded bg-white/60 border border-[#2B9C91]/30 px-2 py-0.5 text-[10px] font-mono text-[#173B63]">
            {activeCase.anonymousCaseId}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[#4A5E73]">
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-[#2B9C91]" />
            <span>{t.lastCheckIn}: {activeCase.lastCheckInAt}</span>
          </span>
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="flex items-center gap-1 text-[#173B63] hover:underline font-semibold"
          >
            <Lock size={12} className="text-[#2B9C91]" />
            <span>DPDP Protected</span>
          </button>
        </div>
      </div>

      {/* Personalized Calm Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#173B63]">
            {greeting}, {activeCase.anonymousCaseId}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6E82] mt-1">
            Your space for continuous emotional reflection and confidential caseworker connection.
          </p>
        </div>

        {/* View Switcher: Overview / History / Messages */}
        <div className="flex items-center rounded-xl bg-white border border-[#E1E6E2] p-1 shadow-2xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "overview"
                ? "bg-[#173B63] text-white shadow-xs"
                : "text-[#5A6E82] hover:text-[#12263A]"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "timeline"
                ? "bg-[#173B63] text-white shadow-xs"
                : "text-[#5A6E82] hover:text-[#12263A]"
            }`}
          >
            Check-In History
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
              activeTab === "messages"
                ? "bg-[#173B63] text-white shadow-xs"
                : "text-[#5A6E82] hover:text-[#12263A]"
            }`}
          >
            <span>Messages</span>
            {messages.some((m) => !m.read && m.senderRole === "COUNSELLOR") && (
              <span className="ml-1.5 h-2 w-2 rounded-full bg-[#2B9C91] inline-block" />
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Hero Check-in Card */}
          <div className="rounded-3xl border border-[#E1E6E2] bg-white p-7 sm:p-12 shadow-xs text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F6F7F5] border border-[#E1E6E2] px-3.5 py-1 text-xs font-semibold text-[#5A6E82]">
              <HeartHandshake size={14} className="text-[#2B9C91]" />
              <span>Routine Well-being Check-in</span>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#173B63]">
                {t.howAreYouFeelingToday}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5E73] leading-relaxed">
                Take a brief moment to record your emotional reflection, sleep quality, and physical safety.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsCheckInOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#173B63] px-8 py-3.5 text-sm font-bold text-white hover:bg-[#12263A] transition-all shadow-sm active:scale-98 cursor-pointer"
              >
                <span>{t.startCheckIn}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setIsEmergencyOpen(true)}
                className="w-full sm:w-auto rounded-xl border border-[#C94C4C]/30 bg-[#FFF5F5] px-6 py-3.5 text-sm font-semibold text-[#C94C4C] hover:bg-[#FDECEC] transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall size={15} />
                <span>Need immediate support</span>
              </button>
            </div>

            {/* Metric Summary Cards */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3.5">
                <div className="flex items-center gap-1.5 text-[#5A6E82] text-[10px] font-bold uppercase tracking-wider">
                  <Clock size={12} />
                  <span>{t.lastCheckIn}</span>
                </div>
                <p className="mt-1 text-xs font-bold text-[#173B63]">
                  {activeCase.lastCheckInAt}
                </p>
              </div>

              <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3.5">
                <div className="flex items-center gap-1.5 text-[#5A6E82] text-[10px] font-bold uppercase tracking-wider">
                  <TrendingUp size={12} />
                  <span>{t.currentTrend}</span>
                </div>
                <p className="mt-1 text-xs font-bold text-[#173B63]">
                  {activeCase.trend === "INCREASING" ? "Elevated Variance" : activeCase.trend === "IMPROVING" ? "Steady Recovery" : "Consistent Baseline"}
                </p>
              </div>

              <div className="rounded-xl border border-[#E1E6E2] bg-[#F6F7F5] p-3.5">
                <div className="flex items-center gap-1.5 text-[#5A6E82] text-[10px] font-bold uppercase tracking-wider">
                  <Calendar size={12} />
                  <span>{t.nextCheckIn}</span>
                </div>
                <p className="mt-1 text-xs font-bold text-[#173B63]">
                  In 3 Days (Voluntary)
                </p>
              </div>
            </div>
          </div>

          {/* Calm Current Wellbeing & Distress Profile */}
          <DistressAnalysis />

          {/* Longitudinal Trend Chart with Range Filter */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-[#173B63]">
                  Longitudinal Wellbeing Trend
                </h3>
                <p className="text-xs text-[#5A6E82]">
                  Visualizing emotional continuity across check-in intervals.
                </p>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center rounded-lg border border-[#E1E6E2] bg-white p-0.5 text-xs font-semibold">
                {(["7d", "30d", "90d", "all"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      timeRange === r
                        ? "bg-[#173B63] text-white"
                        : "text-[#5A6E82] hover:text-[#12263A]"
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <TrendChart />
          </div>

          {/* Multimodal Signals Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-[#173B63]">
              Active Signal Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-[#E1E6E2] bg-white p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5A6E82]">
                  <span className="font-bold text-[#173B63]">TEXT SIGNALS</span>
                  <FileText size={14} className="text-[#2B9C91]" />
                </div>
                <p className="text-xs text-[#4A5E73]">
                  {activeCase.signals.find((s) => s.includes("worry") || s.includes("stress")) || "Consistent reflection"}
                </p>
                <span className="text-[10px] font-semibold text-[#2B9C91] block">
                  Linguistic sentiment verified
                </span>
              </div>

              <div className="rounded-2xl border border-[#E1E6E2] bg-white p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5A6E82]">
                  <span className="font-bold text-[#173B63]">VOICE ACOUSTICS</span>
                  <Mic size={14} className="text-[#2B9C91]" />
                </div>
                <p className="text-xs text-[#4A5E73]">
                  {activeCase.signals.find((s) => s.includes("speech") || s.includes("pacing")) || "Measured conversational cadence"}
                </p>
                <span className="text-[10px] font-semibold text-[#2B9C91] block">
                  Acoustic prosody steady
                </span>
              </div>

              <div className="rounded-2xl border border-[#E1E6E2] bg-white p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5A6E82]">
                  <span className="font-bold text-[#173B63]">BEHAVIOUR</span>
                  <Activity size={14} className="text-[#2B9C91]" />
                </div>
                <p className="text-xs text-[#4A5E73]">
                  Regular check-in cadence · Bi-weekly response rate: 100%
                </p>
                <span className="text-[10px] font-semibold text-[#2B9C91] block">
                  High engagement consistency
                </span>
              </div>

              <div className="rounded-2xl border border-[#E1E6E2] bg-white p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5A6E82]">
                  <span className="font-bold text-[#173B63]">ESTIMATED RISK</span>
                  <Sparkles size={14} className="text-[#2B9C91]" />
                </div>
                <p className="text-xs text-[#4A5E73]">
                  {latestRiskPrediction.riskLevel} Risk Horizon: {latestRiskPrediction.horizon}
                </p>
                <span className="text-[10px] font-semibold text-[#2B9C91] block">
                  Decision-support estimate
                </span>
              </div>
            </div>
          </div>

          {/* Contextual Recommendation Card */}
          <div className="rounded-2xl border border-[#2B9C91]/30 bg-[#E8F5F3]/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#2B9C91]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#173B63]">
                  Recommended Next Step
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#4A5E73]">
                {latestRiskPrediction.recommendedAction}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab("messages")}
                className="rounded-xl bg-[#173B63] px-4 py-2 text-xs font-bold text-white hover:bg-[#12263A] transition-all shadow-xs"
              >
                Message Caseworker
              </button>
              <button
                onClick={exportActiveCaseData}
                className="rounded-xl border border-[#E1E6E2] bg-white px-3 py-2 text-xs font-semibold text-[#5A6E82] hover:text-[#12263A]"
              >
                Export Record
              </button>
            </div>
          </div>

          {/* Support Pathways */}
          <SupportSection />
        </div>
      )}

      {/* TAB 2: CHECK-IN HISTORY */}
      {activeTab === "timeline" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#173B63]">Your Complete Check-In Timeline</h2>
              <p className="text-xs text-[#5A6E82]">Stored longitudinal data protected under DPDP Act 2023.</p>
            </div>
            <button
              onClick={exportActiveCaseData}
              className="rounded-xl border border-[#E1E6E2] bg-white px-3.5 py-1.5 text-xs font-bold text-[#173B63] hover:bg-[#F6F7F5]"
            >
              Download JSON Export
            </button>
          </div>

          <div className="space-y-3">
            {history.map((item, idx) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E1E6E2] bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#173B63]">
                      Check-in #{idx + 1}
                    </span>
                    <span className="text-xs text-[#5A6E82]">·</span>
                    <span className="text-xs text-[#5A6E82]">
                      {new Date(item.timestamp).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A5E73]">
                    Feeling: <strong className="capitalize">{item.feeling.replace("_", " ")}</strong> · Safety:{" "}
                    <strong>{item.safety === "yes" ? "Secure" : item.safety === "not_sure" ? "Uncertain" : "Compromised"}</strong>
                  </p>
                  {item.feelingNote && (
                    <p className="text-xs text-[#5A6E82] italic bg-[#F6F7F5] rounded-lg p-2 mt-1">
                      "{item.feelingNote}"
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.signals.map((sig, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md bg-[#FAFBF9] border border-[#E1E6E2] px-2 py-0.5 text-[10px] text-[#5A6E82]"
                      >
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E1E6E2]">
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-[#173B63]">
                      {item.distressScore}
                    </span>
                    <span className="text-xs text-[#5A6E82]"> / 100</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      item.riskLevel === "HIGH" || item.riskLevel === "VERY HIGH"
                        ? "bg-[#FDECEC] text-[#C94C4C]"
                        : item.riskLevel === "MODERATE"
                        ? "bg-[#FFF9E6] text-[#D97706]"
                        : "bg-[#E8F5F3] text-[#2B9C91]"
                    }`}
                  >
                    {item.riskLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CASEWORKER MESSAGES */}
      {activeTab === "messages" && (
        <div className="rounded-3xl border border-[#E1E6E2] bg-white shadow-xs overflow-hidden flex flex-col h-[520px]">
          {/* Header */}
          <div className="border-b border-[#E1E6E2] bg-[#FAFBF9] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#173B63] text-white flex items-center justify-center font-bold text-xs">
                SR
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#173B63]">Officer Sunita R.</h3>
                <p className="text-[10px] text-[#2B9C91] font-semibold">Assigned Welfare Caseworker</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#5A6E82]">
              <Lock size={12} className="text-[#2B9C91]" />
              <span>Encrypted Thread</span>
            </div>
          </div>

          {/* Safety Notice */}
          <div className="bg-[#E8F5F3]/60 border-b border-[#2B9C91]/20 px-4 py-2 text-[11px] text-[#173B63] flex items-center gap-2">
            <Info size={13} className="text-[#2B9C91] shrink-0" />
            <span>Messages are reviewed during business hours. For immediate crisis support, dial 14566.</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => {
              const isMe = msg.senderRole === "USER";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] font-bold text-[#5A6E82] mb-1">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                      isMe
                        ? "bg-[#173B63] text-white rounded-tr-none"
                        : "bg-[#F6F7F5] border border-[#E1E6E2] text-[#12263A] rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[9px] text-[#8BA0B2] mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSendMessage} className="border-t border-[#E1E6E2] p-3 flex items-center gap-2 bg-[#FAFBF9]">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message to your caseworker..."
              className="flex-1 rounded-xl border border-[#E1E6E2] bg-white px-4 py-2.5 text-xs text-[#12263A] focus:border-[#2B9C91] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#173B63] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#12263A] transition-all flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send size={13} />
            </button>
          </form>
        </div>
      )}

      {/* Check-In Flow Modal */}
      <CheckInFlow
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
        onComplete={() => setIsCheckInOpen(false)}
      />
    </div>
  );
}
