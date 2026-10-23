/**
 * messaging-service.ts — Secure Case Communication Service for MANOSETHU
 *
 * Implements Section 26: Confidential 2-way messaging between individual and
 * assigned support caseworkers. Includes timestamps, read states, and safety notices.
 */

export interface MessageRecord {
  id: string;
  caseId: string;
  senderId: string;
  senderName: string;
  senderRole: "USER" | "COUNSELLOR";
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  priority?: "NORMAL" | "HIGH";
}

const MESSAGES_STORAGE_KEY = "manosethu_messages_store_v2";

const INITIAL_MESSAGES: MessageRecord[] = [
  {
    id: "msg-001",
    caseId: "MS-1042",
    senderId: "officer-sunita",
    senderName: "Officer Sunita R. (Caseworker)",
    senderRole: "COUNSELLOR",
    recipientId: "MS-1042",
    content: "Hello. I reviewed your recent check-in noting some trouble sleeping. Please remember you are not alone in this process. Would tomorrow at 11 AM work for a brief call?",
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    read: true,
  },
  {
    id: "msg-002",
    caseId: "MS-1042",
    senderId: "MS-1042",
    senderName: "AN-8921 (You)",
    senderRole: "USER",
    recipientId: "officer-sunita",
    content: "Yes, tomorrow 11 AM works. I was worried about the court hearing next week.",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    read: true,
  },
  {
    id: "msg-003",
    caseId: "MS-1042",
    senderId: "officer-sunita",
    senderName: "Officer Sunita R. (Caseworker)",
    senderRole: "COUNSELLOR",
    recipientId: "MS-1042",
    content: "Understood completely. I have notified our legal aid liaison to review your hearing details beforehand. We will go through the steps together.",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: false,
    priority: "HIGH",
  },
];

export function getCaseMessages(caseId: string): MessageRecord[] {
  if (typeof window === "undefined") return INITIAL_MESSAGES.filter((m) => m.caseId === caseId);
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (raw) {
      const all: MessageRecord[] = JSON.parse(raw);
      return all.filter((m) => m.caseId === caseId).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    }
  } catch (err) {
    console.error("Failed to load messages", err);
  }
  return INITIAL_MESSAGES.filter((m) => m.caseId === caseId);
}

export function sendCaseMessage(message: Omit<MessageRecord, "id" | "timestamp" | "read">): MessageRecord {
  const newMsg: MessageRecord = {
    ...message,
    id: `msg-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString(),
    read: false,
  };

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
      const all: MessageRecord[] = raw ? JSON.parse(raw) : INITIAL_MESSAGES;
      const updated = [...all, newMsg];
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save message", err);
    }
  }

  return newMsg;
}

export function markMessagesAsRead(caseId: string, readerRole: "USER" | "COUNSELLOR") {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const all: MessageRecord[] = raw ? JSON.parse(raw) : INITIAL_MESSAGES;
    const updated = all.map((m) => {
      if (m.caseId === caseId && m.senderRole !== readerRole) {
        return { ...m, read: true };
      }
      return m;
    });
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to mark messages as read", err);
  }
}
