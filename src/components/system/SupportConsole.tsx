import React, { useState } from "react";
import { CaseRecord, useManosethu, SupportActionRecord } from "@/lib/manosethu-store";
import { CaseDetailModal } from "./CaseDetailModal";
import {
  Search,
  Filter,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  ChevronRight,
  Shield,
  PhoneCall,
  UserCheck,
  Eye,
  BellRing,
  Activity,
  HeartHandshake,
  MessageSquare,
  Settings,
  Send,
  Plus,
  Calendar,
  FileText,
} from "lucide-react";

export function SupportConsole() {
  const {
    cases,
    alerts,
    resolveAlert,
    performSupportAction,
    messages,
    sendDirectMessage,
    currentUser,
  } = useManosethu();

  const [activeTab, setActiveTab] = useState<
    "overview" | "cases" | "alerts" | "interventions" | "messages" | "settings"
  >("overview");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalCase, setActiveModalCase] = useState<CaseRecord | null>(null);
  const [alertFilter, setAlertFilter] = useState<string>("ALL");

  // New intervention form states
  const [selectedInterventionCaseId, setSelectedInterventionCaseId] = useState<string>("MS-1042");
  const [interventionType, setInterventionType] = useState<SupportActionRecord["actionType"]>("REQUEST_COUNSELLING");
  const [interventionNotes, setInterventionNotes] = useState("");
  const [interventionSuccessMsg, setInterventionSuccessMsg] = useState<string | null>(null);

  // Caseworker message state
  const [caseworkerMsgText, setCaseworkerMsgText] = useState("");

  // Caseworker profile settings state
  const [isAvailableForUrgentCall, setIsAvailableForUrgentCall] = useState(true);
  const [receiveSMSAlerts, setReceiveSMSAlerts] = useState(true);

  // Operational metrics
  const casesRequiringReviewCount = cases.filter(
    (c) => c.status === "Needs Review" || c.status === "Priority Review"
  ).length;
  const newAlertsCount = alerts.filter((a) => a.status === "NEW").length;
  const increasingDistressCount = cases.filter((c) => c.trend === "INCREASING").length;
  const awaitingFollowupCount = cases.filter(
    (c) => c.status === "Follow-up Scheduled" || c.status === "Support Requested"
  ).length;

  const filteredCases = cases.filter((c) => {
    return (
      c.caseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.anonymousCaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.reasonForReview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredAlerts = alerts.filter((al) => {
    if (alertFilter === "ALL") return true;
    if (alertFilter === "HIGH") return al.riskLevel === "HIGH" || al.riskLevel === "VERY HIGH";
    return al.status === alertFilter;
  });

  const handleCreateIntervention = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interventionNotes.trim()) return;

    performSupportAction({
      caseId: selectedInterventionCaseId,
      actionType: interventionType,
      performedBy: currentUser?.displayName || "Officer Sunita R. (Caseworker)",
      notes: interventionNotes.trim(),
      status: "COMPLETED",
    });

    setInterventionNotes("");
    setInterventionSuccessMsg(`Intervention recorded successfully for Case ${selectedInterventionCaseId}.`);
    setTimeout(() => setInterventionSuccessMsg(null), 4000);
  };

  const handleSendCaseworkerMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseworkerMsgText.trim()) return;
    sendDirectMessage(caseworkerMsgText.trim(), "COUNSELLOR");
    setCaseworkerMsgText("");
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "VERY HIGH":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FDECEC] px-2.5 py-0.5 text-xs font-extrabold text-[#C94C4C] border border-[#C94C4C]/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C94C4C]" />
            VERY HIGH
          </span>
        );
      case "HIGH":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FDECEC] px-2.5 py-0.5 text-xs font-bold text-[#C94C4C] border border-[#C94C4C]/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C94C4C]" />
            HIGH
          </span>
        );
      case "MODERATE":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF9E6] px-2.5 py-0.5 text-xs font-bold text-[#D97706] border border-[#F59E0B]/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
            MODERATE
          </span>
        );
      case "LOW":
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F5F3] px-2.5 py-0.5 text-xs font-bold text-[#2B9C91] border border-[#2B9C91]/30">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2B9C91]" />
            LOW
          </span>
        );
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "INCREASING":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#C94C4C]">
            <TrendingUp size={13} />
            <span>INCREASING</span>
          </span>
        );
      case "IMPROVING":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2B9C91]">
            <TrendingDown size={13} />
            <span>IMPROVING</span>
          </span>
        );
      case "STABLE":
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#173B63]">
            <Minus size={13} />
            <span>STABLE</span>
          </span>
        );
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-8">
      {/* Header Profile Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E1E6E2] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2B9C91]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B9C91]">
              MANOSETHU CASEWORKER DECISION SUPPORT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B63] tracking-tight">
            Caseworker Oversight Desk
          </h1>
          <p className="mt-0.5 text-xs text-[#5A6E82]">
            Logged in as: <strong>{currentUser?.displayName || "Officer Sunita R. (Authorized Caseworker)"}</strong>
          </p>
        </div>

        <div className="rounded-xl border border-[#2B9C91]/30 bg-[#E8F5F3] px-4 py-2.5 text-xs text-[#173B63] max-w-xs">
          <p className="font-bold flex items-center gap-1.5">
            <Shield size={14} className="text-[#2B9C91]" />
            <span>AI assists. Humans decide.</span>
          </p>
          <p className="text-[11px] text-[#4A5E73] mt-0.5">
            Decision support radar for timely, empathetic human connection.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E1E6E2] pb-1 overflow-x-auto">
        {[
          { id: "overview", label: "Overview" },
          { id: "cases", label: `Cases (${cases.length})` },
          { id: "alerts", label: `Alert Queue (${alerts.length})` },
          { id: "interventions", label: "Interventions" },
          { id: "messages", label: `Messages (${messages.length})` },
          { id: "settings", label: "Caseworker Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "border-[#173B63] text-[#173B63]"
                : "border-transparent text-[#5A6E82] hover:text-[#12263A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Operational Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-[#E1E6E2] bg-white p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Cases Requiring Review
              </span>
              <p className="mt-1 text-3xl font-extrabold text-[#173B63]">
                {casesRequiringReviewCount}
              </p>
              <span className="text-[10px] text-[#C94C4C] font-semibold">Prioritized for action</span>
            </div>

            <div className="rounded-2xl border border-[#E1E6E2] bg-white p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                New Distress Alerts
              </span>
              <p className="mt-1 text-3xl font-extrabold text-[#C94C4C]">
                {newAlertsCount}
              </p>
              <span className="text-[10px] text-[#C94C4C] font-semibold">Immediate triage required</span>
            </div>

            <div className="rounded-2xl border border-[#E1E6E2] bg-white p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Increasing Distress Velocity
              </span>
              <p className="mt-1 text-3xl font-extrabold text-[#D97706]">
                {increasingDistressCount}
              </p>
              <span className="text-[10px] text-[#D97706] font-semibold">Upward slope detected</span>
            </div>

            <div className="rounded-2xl border border-[#E1E6E2] bg-white p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Follow-ups Scheduled
              </span>
              <p className="mt-1 text-3xl font-extrabold text-[#2B9C91]">
                {awaitingFollowupCount}
              </p>
              <span className="text-[10px] text-[#2B9C91] font-semibold">Scheduled outreach</span>
            </div>
          </div>

          {/* Quick Action: Cases requiring review */}
          <div className="rounded-2xl border border-[#E1E6E2] bg-white shadow-xs overflow-hidden">
            <div className="border-b border-[#E1E6E2] px-6 py-3.5 bg-[#FAFBF9] flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#173B63]">
                Priority Review Queue ({cases.length})
              </h2>
              <span className="text-[10px] font-bold text-[#5A6E82] uppercase tracking-wider">
                SYNTHETIC CASE DATA
              </span>
            </div>

            <div className="divide-y divide-[#E1E6E2]">
              {cases.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveModalCase(c)}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAFBF9] cursor-pointer transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-[#173B63]">{c.caseCode}</span>
                      <span className="text-xs text-[#5A6E82]">({c.anonymousCaseId})</span>
                      {getRiskBadge(c.currentRiskLevel)}
                      <span className="rounded bg-[#FAFBF9] border border-[#E1E6E2] px-2 py-0.5 text-[10px] font-bold text-[#173B63]">
                        {c.stageDisplayName}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5E73]">{c.reasonForReview}</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-[#173B63]">Score: {c.currentDistressScore}/100</div>
                      <div>{getTrendIcon(c.trend)}</div>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg border border-[#E1E6E2] bg-white px-3 py-1.5 text-xs font-bold text-[#173B63] hover:bg-[#173B63] hover:text-white transition-colors"
                    >
                      Review Case
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CASES TAB */}
      {activeTab === "cases" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6E82]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case code, anonymous ID or notes..."
                className="w-full rounded-xl border border-[#E1E6E2] bg-white pl-8 pr-3 py-1.5 text-xs text-[#12263A] focus:border-[#2B9C91] focus:outline-none"
              />
            </div>
            <span className="text-xs text-[#5A6E82]">
              Showing {filteredCases.length} anonymous cases
            </span>
          </div>

          <div className="rounded-2xl border border-[#E1E6E2] bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E1E6E2] text-[#5A6E82] font-semibold bg-[#FAFBF9]">
                    <th className="px-6 py-3">Anonymous ID</th>
                    <th className="px-4 py-3">Stage</th>
                    <th className="px-4 py-3">Risk Level</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Trend</th>
                    <th className="px-4 py-3">Last Check-in</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E6E2]">
                  {filteredCases.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setActiveModalCase(c)}
                      className="hover:bg-[#FAFBF9] cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-3.5">
                        <span className="font-extrabold text-[#173B63] block">{c.caseCode}</span>
                        <span className="text-[10px] text-[#5A6E82]">{c.anonymousCaseId}</span>
                      </td>
                      <td className="px-4 py-3.5 text-[#5A6E82] capitalize">{c.caseStage}</td>
                      <td className="px-4 py-3.5">{getRiskBadge(c.currentRiskLevel)}</td>
                      <td className="px-4 py-3.5 font-extrabold text-[#173B63]">{c.currentDistressScore}/100</td>
                      <td className="px-4 py-3.5">{getTrendIcon(c.trend)}</td>
                      <td className="px-4 py-3.5 text-[#5A6E82]">{c.lastCheckInAt}</td>
                      <td className="px-4 py-3.5 font-bold text-[#2B9C91]">{c.status}</td>
                      <td className="px-6 py-3.5 text-right">
                        <button
                          type="button"
                          className="rounded-lg border border-[#E1E6E2] bg-white px-2.5 py-1 text-xs font-bold text-[#173B63] hover:bg-[#173B63] hover:text-white"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ALERTS TAB */}
      {activeTab === "alerts" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#173B63]">
                Human Review Queue ({filteredAlerts.length})
              </span>
              <div className="flex items-center rounded-lg border border-[#E1E6E2] bg-white p-0.5 text-xs">
                {(["ALL", "NEW", "UNDER REVIEW", "HIGH", "RESOLVED"] as const).map((flt) => (
                  <button
                    key={flt}
                    onClick={() => setAlertFilter(flt)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      alertFilter === flt ? "bg-[#173B63] text-white" : "text-[#5A6E82] hover:text-[#12263A]"
                    }`}
                  >
                    {flt}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[10px] text-[#5A6E82]">AI flags patterns · Caseworker resolves</span>
          </div>

          <div className="space-y-3">
            {filteredAlerts.map((al) => (
              <div
                key={al.alertId}
                className="rounded-2xl border border-[#E1E6E2] bg-white p-5 space-y-3 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#173B63]">{al.alertId}</span>
                    <span className="rounded bg-[#FAFBF9] border border-[#E1E6E2] px-2 py-0.5 text-[10px] font-bold text-[#5A6E82]">
                      Case: {al.caseId} ({al.anonymousId})
                    </span>
                    {getRiskBadge(al.riskLevel)}
                  </div>
                  <span
                    className={`rounded-md px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                      al.status === "NEW"
                        ? "bg-[#FDECEC] text-[#C94C4C]"
                        : al.status === "UNDER REVIEW"
                        ? "bg-[#FFF9E6] text-[#D97706]"
                        : "bg-[#E8F5F3] text-[#2B9C91]"
                    }`}
                  >
                    {al.status}
                  </span>
                </div>

                <p className="text-xs text-[#12263A] leading-relaxed">{al.reason}</p>

                {al.resolutionNote && (
                  <div className="rounded-lg bg-[#FAFBF9] p-2.5 text-xs text-[#4A5E73] border border-[#E1E6E2]">
                    <strong>Resolution Note:</strong> {al.resolutionNote}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-[#E1E6E2]">
                  <span className="text-[10px] text-[#5A6E82]">
                    Created: {new Date(al.createdAt).toLocaleString("en-IN")}
                  </span>
                  {al.status !== "RESOLVED" && (
                    <button
                      onClick={() =>
                        resolveAlert(al.alertId, "Reviewed by caseworker. Welfare verification completed.")
                      }
                      className="rounded-lg bg-[#173B63] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#12263A]"
                    >
                      Resolve Alert
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INTERVENTIONS TAB */}
      {activeTab === "interventions" && (
        <div className="space-y-6">
          {/* New Intervention Recorder Form */}
          <form
            onSubmit={handleCreateIntervention}
            className="rounded-2xl border border-[#E1E6E2] bg-white p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#E1E6E2] pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#173B63] flex items-center gap-1.5">
                <Plus size={14} className="text-[#2B9C91]" />
                <span>Record New Support Action / Intervention</span>
              </h2>
              <span className="text-[10px] text-[#5A6E82]">Logged directly into Case Audit Trail</span>
            </div>

            {interventionSuccessMsg && (
              <div className="rounded-xl bg-[#E8F5F3] border border-[#2B9C91]/30 p-3 text-xs font-bold text-[#173B63] flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#2B9C91]" />
                <span>{interventionSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#173B63] mb-1">
                  Target Case Record
                </label>
                <select
                  value={selectedInterventionCaseId}
                  onChange={(e) => setSelectedInterventionCaseId(e.target.value)}
                  className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-2.5 text-xs font-semibold text-[#12263A] focus:border-[#2B9C91] focus:outline-none"
                >
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.caseCode} ({c.anonymousCaseId}) — {c.stageDisplayName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#173B63] mb-1">
                  Support Intervention Type
                </label>
                <select
                  value={interventionType}
                  onChange={(e) => setInterventionType(e.target.value as any)}
                  className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-2.5 text-xs font-semibold text-[#12263A] focus:border-[#2B9C91] focus:outline-none"
                >
                  <option value="REQUEST_COUNSELLING">Psychosocial Counselling Session</option>
                  <option value="CONTACT_PERSON">Direct Welfare Check-in Phone Call</option>
                  <option value="OFFER_SUPPORT">Legal Aid &amp; Procedural Support Referral</option>
                  <option value="SCHEDULE_FOLLOWUP">Scheduled Pre-Hearing Follow-up</option>
                  <option value="MARK_REVIEWED">Mark Baseline Verified (Review Complete)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B63] mb-1">
                Caseworker Clinical &amp; Operational Notes
              </label>
              <textarea
                value={interventionNotes}
                onChange={(e) => setInterventionNotes(e.target.value)}
                placeholder="Enter observations, support provided, or next steps..."
                rows={3}
                required
                className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-3 text-xs text-[#12263A] focus:border-[#2B9C91] focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-[#173B63] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#12263A] transition-all shadow-xs"
              >
                Record Intervention
              </button>
            </div>
          </form>

          {/* Historical Interventions Across Cases */}
          <div className="rounded-2xl border border-[#E1E6E2] bg-white p-6 shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#173B63]">
              Chronological Caseworker Intervention Log
            </h2>

            <div className="space-y-3">
              {cases.flatMap((c) =>
                c.supportHistory.map((s, idx) => (
                  <div
                    key={`${c.id}-${idx}`}
                    className="rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#173B63]">{c.caseCode}</span>
                        <span className="text-[10px] text-[#5A6E82]">({c.anonymousCaseId})</span>
                        <span className="rounded bg-white border border-[#E1E6E2] px-2 py-0.5 text-[10px] font-bold text-[#2B9C91]">
                          {s.type}
                        </span>
                      </div>
                      <p className="text-[#4A5E73]">{s.summary}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-semibold text-[#173B63] block">{s.officer}</span>
                      <span className="text-[10px] text-[#5A6E82]">{s.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES TAB */}
      {activeTab === "messages" && (
        <div className="rounded-3xl border border-[#E1E6E2] bg-white shadow-xs overflow-hidden flex flex-col h-[520px]">
          <div className="border-b border-[#E1E6E2] bg-[#FAFBF9] p-4 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#173B63]">Direct Communication: Beneficiary AN-8921 (MS-1042)</h3>
              <p className="text-[10px] text-[#5A6E82]">Confidential Caseworker Channel</p>
            </div>
            <span className="rounded bg-[#E8F5F3] text-[#2B9C91] px-2.5 py-0.5 text-[10px] font-bold">
              Encrypted Thread
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => {
              const isOfficer = msg.senderRole === "COUNSELLOR";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isOfficer ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] font-bold text-[#5A6E82] mb-1">
                    {msg.senderName}
                  </span>
                  <div
                    className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed shadow-2xs ${
                      isOfficer
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

          <form onSubmit={handleSendCaseworkerMsg} className="border-t border-[#E1E6E2] p-3 flex items-center gap-2 bg-[#FAFBF9]">
            <input
              type="text"
              value={caseworkerMsgText}
              onChange={(e) => setCaseworkerMsgText(e.target.value)}
              placeholder="Send guidance or appointment details to beneficiary..."
              className="flex-1 rounded-xl border border-[#E1E6E2] bg-white px-4 py-2.5 text-xs text-[#12263A] focus:border-[#2B9C91] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#173B63] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#12263A] transition-all flex items-center gap-1.5"
            >
              <span>Reply</span>
              <Send size={13} />
            </button>
          </form>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === "settings" && (
        <div className="rounded-2xl border border-[#E1E6E2] bg-white p-6 shadow-xs space-y-6 max-w-xl">
          <div>
            <h2 className="text-base font-bold text-[#173B63]">Caseworker Availability &amp; Routing</h2>
            <p className="text-xs text-[#5A6E82] mt-0.5">Manage on-call notification preferences.</p>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] cursor-pointer">
              <div>
                <span className="font-bold text-[#173B63] block">Urgent Callback On-Call Status</span>
                <span className="text-[11px] text-[#5A6E82]">Receive priority routing for acute safety distress triggers.</span>
              </div>
              <input
                type="checkbox"
                checked={isAvailableForUrgentCall}
                onChange={(e) => setIsAvailableForUrgentCall(e.target.checked)}
                className="h-4 w-4 rounded border-[#E1E6E2] text-[#2B9C91] focus:ring-[#2B9C91]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] cursor-pointer">
              <div>
                <span className="font-bold text-[#173B63] block">SMS Emergency Dispatch Mirror</span>
                <span className="text-[11px] text-[#5A6E82]">Forward alert summaries to registered duty phone.</span>
              </div>
              <input
                type="checkbox"
                checked={receiveSMSAlerts}
                onChange={(e) => setReceiveSMSAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-[#E1E6E2] text-[#2B9C91] focus:ring-[#2B9C91]"
              />
            </label>
          </div>
        </div>
      )}

      {/* Case Detail Modal */}
      <CaseDetailModal
        caseData={activeModalCase}
        onClose={() => setActiveModalCase(null)}
      />
    </div>
  );
}
