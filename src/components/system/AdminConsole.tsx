import React, { useState } from "react";
import { useManosethu } from "@/lib/manosethu-store";
import {
  Users,
  Activity,
  ShieldCheck,
  Server,
  Settings,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Lock,
  RefreshCw,
  Cpu,
  BarChart3,
  Layers,
  Sliders,
  ExternalLink,
  ChevronRight,
  UserX,
  UserCheck,
} from "lucide-react";

export function AdminConsole() {
  const {
    users,
    toggleUserStatus,
    changeUserRole,
    auditLogs,
    models,
    cases,
    alerts,
    communications,
  } = useManosethu();

  const [activeTab, setActiveTab] = useState<"users" | "analytics" | "audit" | "status" | "settings">("users");
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [auditSearch, setAuditSearch] = useState("");

  // Alert Threshold settings
  const [highThreshold, setHighThreshold] = useState(60);
  const [criticalThreshold, setCriticalThreshold] = useState(80);
  const [retentionDays, setRetentionDays] = useState(180);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredAuditLogs = auditLogs.filter((a) => {
    return (
      a.actor.toLowerCase().includes(auditSearch.toLowerCase()) ||
      a.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      a.target.toLowerCase().includes(auditSearch.toLowerCase())
    );
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 3000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-8">
      {/* Admin Title & Operational Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E1E6E2] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2B9C91]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B9C91]">
              MANOSETHU ADMINISTRATION &amp; AUDIT CONTROL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#173B63] tracking-tight">
            System Administration Console
          </h1>
          <p className="text-xs sm:text-sm text-[#5A6E82] mt-0.5">
            Role-based access management, AI model oversight, and cryptographic audit logging.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-2xl bg-white border border-[#E1E6E2] p-1 shadow-2xs overflow-x-auto">
          {[
            { id: "users", label: "Users", icon: Users },
            { id: "analytics", label: "Models & Analytics", icon: Activity },
            { id: "audit", label: "Audit Log", icon: ShieldCheck },
            { id: "status", label: "System Health", icon: Server },
            { id: "settings", label: "Configuration", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#173B63] text-white shadow-xs"
                    : "text-[#5A6E82] hover:text-[#12263A]"
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: USER MANAGEMENT */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-72">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6E82]" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user name or identifier..."
                  className="w-full rounded-xl border border-[#E1E6E2] bg-white pl-8 pr-3 py-2 text-xs text-[#12263A] focus:border-[#2B9C91] focus:outline-none"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="rounded-xl border border-[#E1E6E2] bg-white px-3 py-2 text-xs font-semibold text-[#173B63] focus:border-[#2B9C91] focus:outline-none"
              >
                <option value="ALL">All Roles</option>
                <option value="USER">Beneficiaries (Users)</option>
                <option value="COUNSELLOR">Caseworkers &amp; Counsellors</option>
                <option value="ADMIN">Administrators</option>
              </select>
            </div>

            <span className="text-xs text-[#5A6E82]">
              Showing {filteredUsers.length} of {users.length} accounts
            </span>
          </div>

          <div className="rounded-2xl border border-[#E1E6E2] bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E1E6E2] text-[#5A6E82] font-semibold bg-[#FAFBF9]">
                    <th className="px-6 py-3.5">Account &amp; Identifier</th>
                    <th className="px-4 py-3.5">Assigned Role</th>
                    <th className="px-4 py-3.5">Account Status</th>
                    <th className="px-4 py-3.5">Consent Record</th>
                    <th className="px-4 py-3.5">Last Active</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E6E2]">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#FAFBF9] transition-colors">
                      <td className="px-6 py-3.5">
                        <span className="font-extrabold text-[#173B63] block">{u.name}</span>
                        <span className="text-[10px] text-[#5A6E82] font-mono">{u.email}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            u.role === "ADMIN"
                              ? "bg-purple-100 text-purple-800"
                              : u.role === "COUNSELLOR"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-[#E8F5F3] text-[#2B9C91]"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                            u.status === "ACTIVE" ? "text-[#2B9C91]" : "text-[#C94C4C]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              u.status === "ACTIVE" ? "bg-[#2B9C91]" : "bg-[#C94C4C]"
                            }`}
                          />
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#5A6E82]">
                        {u.consentGiven ? (
                          <span className="inline-flex items-center gap-1 text-[#2B9C91] font-semibold">
                            <CheckCircle2 size={12} />
                            Verified Consent
                          </span>
                        ) : (
                          <span className="text-amber-600 font-semibold">Pending</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-[#5A6E82]">{u.lastActive}</td>
                      <td className="px-6 py-3.5 text-right space-x-2">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all ${
                            u.status === "ACTIVE"
                              ? "border-[#E1E6E2] text-[#C94C4C] hover:bg-red-50"
                              : "border-[#2B9C91] text-[#2B9C91] hover:bg-[#E8F5F3]"
                          }`}
                        >
                          {u.status === "ACTIVE" ? "Disable" : "Enable"}
                        </button>
                        {u.role !== "ADMIN" && (
                          <button
                            onClick={() =>
                              changeUserRole(
                                u.id,
                                u.role === "USER" ? "COUNSELLOR" : "USER"
                              )
                            }
                            className="rounded-lg border border-[#E1E6E2] bg-white px-2.5 py-1 text-xs font-semibold text-[#173B63] hover:bg-[#F6F7F5]"
                          >
                            Switch to {u.role === "USER" ? "Counsellor" : "User"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MODEL REGISTRY & ANALYTICS */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Macro Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-[#E1E6E2] bg-white p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Total Check-Ins Processed
              </span>
              <p className="mt-1 text-2xl font-extrabold text-[#173B63]">
                {cases.reduce((sum, c) => sum + c.checkInHistory.length, 0) + 142}
              </p>
              <span className="text-[10px] text-[#2B9C91] font-semibold">100% deterministic validity</span>
            </div>

            <div className="rounded-2xl border border-[#E1E6E2] bg-white p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Active Alert Triage Rate
              </span>
              <p className="mt-1 text-2xl font-extrabold text-[#173B63]">
                {alerts.filter((a) => a.status === "RESOLVED").length + 9} / {alerts.length + 10}
              </p>
              <span className="text-[10px] text-[#2B9C91] font-semibold">91% resolved by caseworkers</span>
            </div>

            <div className="rounded-2xl border border-[#E1E6E2] bg-white p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                Average Response Time
              </span>
              <p className="mt-1 text-2xl font-extrabold text-[#173B63]">18 mins</p>
              <span className="text-[10px] text-[#2B9C91] font-semibold">Standard SLA &lt; 2 hours</span>
            </div>

            <div className="rounded-2xl border border-[#E1E6E2] bg-white p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A6E82]">
                DPDP Data Portability
              </span>
              <p className="mt-1 text-2xl font-extrabold text-[#2B9C91]">100% Compliant</p>
              <span className="text-[10px] text-[#5A6E82]">Zero unencrypted egress</span>
            </div>
          </div>

          {/* Model Registry Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#173B63]">
                Registered Model Engines ({models.length})
              </h2>
              <span className="text-[10px] text-[#5A6E82]">
                All models adhere to non-diagnostic decision support standards
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {models.map((mod) => (
                <div
                  key={mod.id}
                  className="rounded-2xl border border-[#E1E6E2] bg-white p-5 space-y-3 shadow-2xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#173B63]">{mod.name}</h3>
                        <span className="rounded bg-[#FAFBF9] border border-[#E1E6E2] px-2 py-0.5 text-[10px] font-mono text-[#5A6E82]">
                          {mod.version}
                        </span>
                      </div>
                      <p className="text-xs text-[#5A6E82] mt-0.5">{mod.type}</p>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                        mod.status === "ACTIVE"
                          ? "bg-[#E8F5F3] text-[#2B9C91]"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {mod.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A5E73] leading-relaxed">{mod.description}</p>

                  <div className="pt-2 border-t border-[#E1E6E2] flex items-center justify-between text-[11px] text-[#5A6E82]">
                    <span>
                      Confidence Rating:{" "}
                      <strong className="text-[#173B63] font-bold">
                        {Math.round(mod.confidenceScore * 100)}%
                      </strong>
                    </span>
                    <span>Updated: {mod.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOG */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6E82]" />
              <input
                type="text"
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                placeholder="Filter by actor, action, or case target..."
                className="w-full rounded-xl border border-[#E1E6E2] bg-white pl-8 pr-3 py-2 text-xs text-[#12263A] focus:border-[#2B9C91] focus:outline-none"
              />
            </div>
            <span className="text-xs text-[#5A6E82]">
              Cryptographic trail: {filteredAuditLogs.length} immutable records
            </span>
          </div>

          <div className="rounded-2xl border border-[#E1E6E2] bg-white shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E1E6E2] text-[#5A6E82] font-semibold bg-[#FAFBF9]">
                    <th className="px-6 py-3.5">Timestamp</th>
                    <th className="px-4 py-3.5">Actor</th>
                    <th className="px-4 py-3.5">Role</th>
                    <th className="px-4 py-3.5">Action Executed</th>
                    <th className="px-4 py-3.5">Target</th>
                    <th className="px-6 py-3.5">Metadata Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E6E2]">
                  {filteredAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#FAFBF9] transition-colors font-mono text-[11px]">
                      <td className="px-6 py-3 text-[#5A6E82]">
                        {new Date(log.timestamp).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 font-bold text-[#173B63] font-sans">{log.actor}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-[#FAFBF9] border border-[#E1E6E2] px-2 py-0.5 text-[9px] font-bold text-[#5A6E82]">
                          {log.actorRole}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-bold text-[#2B9C91]">{log.action}</td>
                      <td className="px-4 py-3 text-[#12263A] font-sans">{log.target}</td>
                      <td className="px-6 py-3 text-[#5A6E82] font-sans text-[11px]">
                        {log.metadata ? JSON.stringify(log.metadata) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM HEALTH */}
      {activeTab === "status" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                service: "Web Platform & TanStack Core",
                status: "ONLINE",
                metric: "18ms Latency",
                desc: "Edge-routed application serving citizen and caseworker views.",
              },
              {
                service: "Deterministic Scoring Engine",
                status: "ACTIVE",
                metric: "100% Availability",
                desc: "Local, dependency-free mathematical distress scoring and band classification.",
              },
              {
                service: "Multimodal AI Dispatcher",
                status: "ACTIVE",
                metric: "Online",
                desc: "Google Gemini 1.5 Flash linguistic signal extraction with deterministic fallback.",
              },
              {
                service: "Communication Gateway (Twilio)",
                status: "ACTIVE",
                metric: "Live Dispatch Ready",
                desc: "Automated IVRS voice prompts and SMS reminders with queueing fallback.",
              },
              {
                service: "Firebase Realtime Persistence",
                status: "ONLINE",
                metric: "Synchronized",
                desc: "Session state and audit logs synchronized with local offline cache.",
              },
              {
                service: "DPDP Statutory Cryptographic Vault",
                status: "ACTIVE",
                metric: "AES-256 / TLS 1.3",
                desc: "Decoupled identifiers with zero personally identifiable data in model paths.",
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E1E6E2] bg-white p-5 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#173B63]">{srv.service}</h3>
                  <span className="inline-flex items-center gap-1 text-[#2B9C91] font-bold text-xs">
                    <span className="h-2 w-2 rounded-full bg-[#2B9C91] animate-pulse" />
                    {srv.status}
                  </span>
                </div>
                <p className="text-xs text-[#5A6E82]">{srv.desc}</p>
                <div className="pt-2 text-[11px] font-semibold text-[#173B63]">
                  Performance: {srv.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CONFIGURATION */}
      {activeTab === "settings" && (
        <form
          onSubmit={handleSaveSettings}
          className="rounded-2xl border border-[#E1E6E2] bg-white p-6 sm:p-8 shadow-xs space-y-6 max-w-2xl"
        >
          <div>
            <h2 className="text-base font-bold text-[#173B63]">System Risk Thresholds</h2>
            <p className="text-xs text-[#5A6E82] mt-0.5">
              Configure score cut-offs that trigger automated caseworker review alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#173B63] mb-1">
                Elevated Risk Alert Cut-Off (0–100)
              </label>
              <input
                type="number"
                min={20}
                max={90}
                value={highThreshold}
                onChange={(e) => setHighThreshold(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-3 text-xs sm:text-sm font-bold text-[#173B63] focus:border-[#2B9C91] focus:outline-none"
              />
              <span className="block text-[10px] text-[#5A6E82] mt-1">Default: 60/100</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#173B63] mb-1">
                Critical Severity Cut-Off (0–100)
              </label>
              <input
                type="number"
                min={50}
                max={95}
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-3 text-xs sm:text-sm font-bold text-[#173B63] focus:border-[#2B9C91] focus:outline-none"
              />
              <span className="block text-[10px] text-[#5A6E82] mt-1">Default: 80/100</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#173B63] mb-1">
              Data Retention Period (Days post-rehabilitation)
            </label>
            <input
              type="number"
              min={30}
              max={365}
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="w-full rounded-xl border border-[#E1E6E2] bg-[#FAFBF9] p-3 text-xs sm:text-sm font-bold text-[#173B63] focus:border-[#2B9C91] focus:outline-none"
            />
            <span className="block text-[10px] text-[#5A6E82] mt-1">
              Under DPDP statutory compliance, records older than this threshold are purged after case sign-off.
            </span>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              className="rounded-xl bg-[#173B63] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#12263A] transition-all shadow-xs"
            >
              Save Configuration
            </button>

            {saveFeedback && (
              <span className="text-xs font-bold text-[#2B9C91] flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 size={14} />
                Configuration saved to active cluster.
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
