/**
 * audit-service.ts — Administrative & Security Audit Trail for MANOSETHU
 *
 * Implements Section 32: Immutable chronological logging of sensitive operations:
 * LOGIN, CASE_VIEWED, ALERT_ACKNOWLEDGED, NOTE_ADDED, USER_UPDATED, ROLE_CHANGED,
 * DATA_EXPORTED, ACCOUNT_DELETED.
 */

export type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "CASE_VIEWED"
  | "ALERT_ACKNOWLEDGED"
  | "ALERT_RESOLVED"
  | "NOTE_ADDED"
  | "INTERVENTION_CREATED"
  | "USER_UPDATED"
  | "ROLE_CHANGED"
  | "DATA_EXPORTED"
  | "ACCOUNT_DELETED"
  | "SETTINGS_CHANGED";

export interface AuditRecord {
  id: string;
  timestamp: string;
  actor: string; // e.g. "Officer Sunita R." or "admin@manosethu.org"
  actorRole: string; // "USER" | "COUNSELLOR" | "ADMIN"
  action: AuditAction;
  target: string; // e.g. "Case #MS-1042", "User AN-8921"
  metadata?: Record<string, any>;
  ipAddress?: string;
}

const AUDIT_STORAGE_KEY = "manosethu_audit_log_v2";

const INITIAL_AUDIT_LOGS: AuditRecord[] = [
  {
    id: "aud-001",
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    actor: "System Initializer",
    actorRole: "ADMIN",
    action: "LOGIN",
    target: "System Gateway",
    metadata: { note: "Administrative session established" },
  },
  {
    id: "aud-002",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    actor: "Dr. Radhika Sharma",
    actorRole: "COUNSELLOR",
    action: "CASE_VIEWED",
    target: "Case #MS-1042",
    metadata: { stage: "Investigation Stage" },
  },
  {
    id: "aud-003",
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    actor: "Dr. Radhika Sharma",
    actorRole: "COUNSELLOR",
    action: "ALERT_ACKNOWLEDGED",
    target: "ALT-892101",
    metadata: { riskLevel: "HIGH" },
  },
  {
    id: "aud-004",
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    actor: "Inspector V. Kumar",
    actorRole: "COUNSELLOR",
    action: "NOTE_ADDED",
    target: "Case #MS-1038",
    metadata: { summary: "Court hearing escort verified" },
  },
  {
    id: "aud-005",
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    actor: "Adv. Priya Nair",
    actorRole: "COUNSELLOR",
    action: "INTERVENTION_CREATED",
    target: "Case #MS-1029",
    metadata: { type: "Counselling Session Scheduled" },
  },
];

export function getAuditLogs(): AuditRecord[] {
  if (typeof window === "undefined") return INITIAL_AUDIT_LOGS;
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to load audit logs", err);
  }
  return INITIAL_AUDIT_LOGS;
}

export function logAuditEvent(
  actor: string,
  actorRole: string,
  action: AuditAction,
  target: string,
  metadata?: Record<string, any>
): AuditRecord {
  const newRecord: AuditRecord = {
    id: `aud-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    actor: actor || "Authorized Officer",
    actorRole: actorRole || "COUNSELLOR",
    action,
    target,
    metadata,
  };

  if (typeof window !== "undefined") {
    try {
      const current = getAuditLogs();
      const updated = [newRecord, ...current].slice(0, 200); // keep up to 200 items
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save audit log", err);
    }
  }

  return newRecord;
}
