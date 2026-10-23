import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SupportedLanguage, getTranslation } from "@/services/i18n/translations";
import {
  CheckInResponses,
  DistressComputationResult,
  computeDistressScore,
  calculateDistressScore,
  DistressScoreOutput,
} from "@/services/scoring/distress-engine";
import { AlertRecord, evaluateEscalationRisk } from "@/services/scoring/escalation-engine";
import {
  StoredCheckInRecord,
  LongitudinalChartPoint,
  buildLongitudinalChartSeries,
} from "@/services/analytics/longitudinal";
import { dispatchCommunication, CommunicationEvent } from "@/services/communications/dispatcher";
import { subscribeToAuth, signInWithGoogle, signOutUser, User } from "@/lib/firebase";
import { analyzeText, TextAnalysisResult } from "@/services/ai/text-analyzer";
import { analyzeVoice, VoiceAnalysisResult } from "@/services/ai/voice-analyzer";
import { predictRisk, RiskPredictionResult } from "@/services/scoring/risk-engine";
import {
  AuditRecord,
  AuditAction,
  getAuditLogs,
  logAuditEvent,
} from "@/services/audit/audit-service";
import {
  MessageRecord,
  getCaseMessages,
  sendCaseMessage,
  markMessagesAsRead,
} from "@/services/messaging/messaging-service";
import {
  getPrivacySettings,
  savePrivacySettings,
  UserPrivacySettings,
  exportUserDataAsJSON,
} from "@/services/privacy/privacy-service";

export type UserRole = "entry" | "victim" | "counsellor" | "admin";
export type CaseStage = "complaint" | "investigation" | "trial" | "rehabilitation" | "compensation";

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "USER" | "COUNSELLOR" | "ADMIN";
  caseId?: string;
  status: "ACTIVE" | "DISABLED";
  consentGiven: boolean;
  consentDate: string;
  lastActive: string;
}

export interface SupportActionRecord {
  id: string;
  caseId: string;
  actionType:
    | "MARK_REVIEWED"
    | "CONTACT_PERSON"
    | "REQUEST_COUNSELLING"
    | "OFFER_SUPPORT"
    | "SCHEDULE_FOLLOWUP"
    | "MARK_RESOLVED";
  performedBy: string;
  timestamp: string;
  notes: string;
  status: string;
}

export interface CaseRecord {
  id: string;
  anonymousCaseId: string;
  caseCode: string;
  caseStage: CaseStage;
  stageDisplayName: string;
  createdAt: string;
  lastCheckInAt: string;
  currentDistressScore: number;
  currentRiskLevel: "LOW" | "MODERATE" | "HIGH" | "VERY HIGH";
  trend: "IMPROVING" | "STABLE" | "INCREASING";
  escalationRisk: "LOW" | "MODERATE" | "ELEVATED";
  status: "Needs Review" | "Priority Review" | "Support Requested" | "Follow-up Scheduled" | "Reviewed";
  signals: string[];
  reasonForReview: string;
  checkInHistory: StoredCheckInRecord[];
  timeline: Array<{ step: string; timestamp: string; note: string; completed: boolean; isAlert?: boolean }>;
  supportHistory: Array<{ date: string; type: string; officer: string; summary: string }>;
  officerNotes: string[];
}

export interface ModelMetadata {
  id: string;
  name: string;
  version: string;
  type: string;
  status: "ACTIVE" | "ONLINE" | "CALIBRATED";
  confidenceScore: number;
  lastUpdated: string;
  description: string;
}

const INITIAL_SYNTHETIC_USERS: UserAccount[] = [
  {
    id: "usr-8921",
    name: "Beneficiary AN-8921",
    email: "an8921@secure.manosethu.internal",
    role: "USER",
    caseId: "MS-1042",
    status: "ACTIVE",
    consentGiven: true,
    consentDate: "2026-08-20T10:00:00.000Z",
    lastActive: "Today · 15 mins ago",
  },
  {
    id: "usr-7740",
    name: "Beneficiary AN-7740",
    email: "an7740@secure.manosethu.internal",
    role: "USER",
    caseId: "MS-1038",
    status: "ACTIVE",
    consentGiven: true,
    consentDate: "2026-07-28T08:00:00.000Z",
    lastActive: "Yesterday · 4:30 PM",
  },
  {
    id: "usr-6419",
    name: "Beneficiary AN-6419",
    email: "an6419@secure.manosethu.internal",
    role: "USER",
    caseId: "MS-1029",
    status: "ACTIVE",
    consentGiven: true,
    consentDate: "2026-07-10T09:00:00.000Z",
    lastActive: "2 days ago",
  },
  {
    id: "usr-5112",
    name: "Beneficiary AN-5112",
    email: "an5112@secure.manosethu.internal",
    role: "USER",
    caseId: "MS-1015",
    status: "ACTIVE",
    consentGiven: true,
    consentDate: "2026-06-15T09:00:00.000Z",
    lastActive: "3 days ago",
  },
  {
    id: "usr-counsellor-1",
    name: "Dr. Radhika Sharma",
    email: "r.sharma@welfare.manosethu.internal",
    role: "COUNSELLOR",
    status: "ACTIVE",
    consentGiven: true,
    consentDate: "2026-01-10T09:00:00.000Z",
    lastActive: "Active Now",
  },
  {
    id: "usr-counsellor-2",
    name: "Officer Sunita R.",
    email: "s.ramesh@welfare.manosethu.internal",
    role: "COUNSELLOR",
    status: "ACTIVE",
    consentGiven: true,
    consentDate: "2026-02-15T09:00:00.000Z",
    lastActive: "Active Now",
  },
  {
    id: "usr-counsellor-3",
    name: "Inspector V. Kumar",
    email: "v.kumar@police.manosethu.internal",
    role: "COUNSELLOR",
    status: "ACTIVE",
    consentGiven: true,
    consentDate: "2026-03-01T09:00:00.000Z",
    lastActive: "1 hour ago",
  },
  {
    id: "usr-admin-1",
    name: "System Administrator",
    email: "admin@manosethu.org",
    role: "ADMIN",
    status: "ACTIVE",
    consentGiven: true,
    consentDate: "2026-01-01T00:00:00.000Z",
    lastActive: "Active Now",
  },
];

const INITIAL_SYNTHETIC_CASES: CaseRecord[] = [
  {
    id: "MS-1042",
    anonymousCaseId: "AN-8921",
    caseCode: "CASE #MS-1042",
    caseStage: "investigation",
    stageDisplayName: "Investigation Stage · Day 18",
    createdAt: "2026-08-20T10:00:00.000Z",
    lastCheckInAt: "Today · 15 mins ago",
    currentDistressScore: 62,
    currentRiskLevel: "HIGH",
    trend: "INCREASING",
    escalationRisk: "MODERATE",
    status: "Needs Review",
    signals: ["increased worry", "sleep difficulty", "reduced sense of safety", "procedural stress"],
    reasonForReview: "Recent responses indicate more frequent worry and sleep difficulty compared with earlier baseline records.",
    checkInHistory: [
      {
        id: "chk-1042-1",
        caseId: "MS-1042",
        timestamp: "2026-08-22T09:30:00.000Z",
        feeling: "calm",
        safety: "yes",
        experiences: { sleep: "never", worry: "sometimes", safety: "never", concentration: "never", isolation: "never", lossOfInterest: "never" },
        signals: ["baseline recorded post-registration"],
        distressScore: 28,
        riskLevel: "LOW",
        trend: "STABLE",
        escalationRisk: "LOW",
      },
      {
        id: "chk-1042-2",
        caseId: "MS-1042",
        timestamp: "2026-08-28T14:15:00.000Z",
        feeling: "okay",
        safety: "yes",
        experiences: { sleep: "sometimes", worry: "sometimes", safety: "never", concentration: "sometimes", isolation: "never", lossOfInterest: "never" },
        signals: ["mild statement anxiety"],
        distressScore: 38,
        riskLevel: "MODERATE",
        trend: "STABLE",
        escalationRisk: "LOW",
      },
      {
        id: "chk-1042-3",
        caseId: "MS-1042",
        timestamp: "2026-09-04T11:00:00.000Z",
        feeling: "worried",
        safety: "not_sure",
        experiences: { sleep: "sometimes", worry: "often", safety: "sometimes", concentration: "sometimes", isolation: "sometimes", lossOfInterest: "never" },
        signals: ["sleep disruption", "notice received"],
        distressScore: 48,
        riskLevel: "MODERATE",
        trend: "INCREASING",
        escalationRisk: "MODERATE",
      },
      {
        id: "chk-1042-4",
        caseId: "MS-1042",
        timestamp: "2026-09-10T16:20:00.000Z",
        feeling: "worried",
        safety: "not_sure",
        experiences: { sleep: "often", worry: "often", safety: "sometimes", concentration: "often", isolation: "sometimes", lossOfInterest: "sometimes" },
        signals: ["increased worry", "sleep difficulty"],
        distressScore: 56,
        riskLevel: "MODERATE",
        trend: "INCREASING",
        escalationRisk: "MODERATE",
      },
      {
        id: "chk-1042-5",
        caseId: "MS-1042",
        timestamp: "2026-09-15T10:45:00.000Z",
        feeling: "distressed",
        safety: "not_sure",
        experiences: { sleep: "often", worry: "often", safety: "often", concentration: "often", isolation: "often", lossOfInterest: "sometimes" },
        signals: ["elevated distress", "sleep difficulty", "safety apprehension"],
        distressScore: 62,
        riskLevel: "HIGH",
        trend: "INCREASING",
        escalationRisk: "MODERATE",
      },
    ],
    timeline: [
      { step: "CHECK-IN: Scheduled Submission", timestamp: "Today 10:15 AM", note: "Submitted via web companion", completed: true },
      { step: "SIGNALS: Multimodal Markers", timestamp: "Today 10:16 AM", note: "Extracted: increased worry, sleep difficulty, safety concern", completed: true },
      { step: "MODEL: Distress Score Calculated", timestamp: "Today 10:16 AM", note: "Dynamic Distress Score: 62/100 (HIGH) · Trend: INCREASING", completed: true, isAlert: true },
      { step: "MESSAGE: Flagged for Review", timestamp: "Today 10:17 AM", note: "Escalation risk: MODERATE · Added to caseworker review queue", completed: true, isAlert: true },
      { step: "SUPPORT: Voluntary Outreach", timestamp: "Pending Action", note: "Caseworker outreach recommended", completed: false },
    ],
    supportHistory: [
      { date: "29 Aug 2026", type: "Initial Welfare Call", officer: "Officer Sunita R. (Caseworker)", summary: "Verified local safety setup and shared coping guidance." },
      { date: "05 Sep 2026", type: "Legal Aid Briefing", officer: "District Legal Services Desk", summary: "Connected with legal counsel for procedural briefing." },
    ],
    officerNotes: [
      "29 Aug: Receptive to check-ins; requested SMS reminders.",
      "10 Sep: Noted anxiety around upcoming proceedings. Case scheduled for priority review.",
    ],
  },
  {
    id: "MS-1038",
    anonymousCaseId: "AN-7740",
    caseCode: "CASE #MS-1038",
    caseStage: "trial",
    stageDisplayName: "Trial Stage · Day 42",
    createdAt: "2026-07-28T08:00:00.000Z",
    lastCheckInAt: "Yesterday · 4:30 PM",
    currentDistressScore: 82,
    currentRiskLevel: "VERY HIGH",
    trend: "INCREASING",
    escalationRisk: "ELEVATED",
    status: "Priority Review",
    signals: ["immediate safety concern", "chronic sleep disruption", "acute distress reported"],
    reasonForReview: "Potential escalation detected: recent check-ins indicate immediate safety concern and sleep disruptions.",
    checkInHistory: [
      {
        id: "chk-1038-1",
        caseId: "MS-1038",
        timestamp: "2026-08-05T10:00:00.000Z",
        feeling: "okay",
        safety: "yes",
        experiences: { sleep: "sometimes", worry: "sometimes", safety: "never", concentration: "never", isolation: "never", lossOfInterest: "never" },
        signals: ["baseline entry"],
        distressScore: 36,
        riskLevel: "MODERATE",
        trend: "STABLE",
        escalationRisk: "LOW",
      },
      {
        id: "chk-1038-2",
        caseId: "MS-1038",
        timestamp: "2026-08-20T11:30:00.000Z",
        feeling: "worried",
        safety: "not_sure",
        experiences: { sleep: "often", worry: "often", safety: "sometimes", concentration: "sometimes", isolation: "sometimes", lossOfInterest: "never" },
        signals: ["trial approach anxiety"],
        distressScore: 58,
        riskLevel: "MODERATE",
        trend: "INCREASING",
        escalationRisk: "MODERATE",
      },
      {
        id: "chk-1038-3",
        caseId: "MS-1038",
        timestamp: "2026-09-18T16:30:00.000Z",
        feeling: "very_distressed",
        safety: "no",
        experiences: { sleep: "nearly_every_day", worry: "nearly_every_day", safety: "nearly_every_day", concentration: "nearly_every_day", isolation: "often", lossOfInterest: "often" },
        signals: ["immediate safety concern", "chronic sleep disruption", "acute distress reported"],
        distressScore: 82,
        riskLevel: "VERY HIGH",
        trend: "INCREASING",
        escalationRisk: "ELEVATED",
      },
    ],
    timeline: [
      { step: "CHECK-IN: Escalation Trigger", timestamp: "18 Sep 04:30 PM", note: "Reported compromised safety and acute worry", completed: true, isAlert: true },
      { step: "MODEL: Severe Band Trigger", timestamp: "18 Sep 04:31 PM", note: "Dynamic Distress Score: 82/100 (VERY HIGH)", completed: true, isAlert: true },
      { step: "MESSAGE: High Priority Alert", timestamp: "18 Sep 04:32 PM", note: "Dispatched to Officer Sunita R. for emergency review", completed: true, isAlert: true },
    ],
    supportHistory: [
      { date: "18 Sep 2026", type: "Urgent Callback Dispatched", officer: "Nodal Support Desk", summary: "Immediate callback requested following safety alert." },
    ],
    officerNotes: [
      "18 Sep: Complainant reported threatening interaction near premises. Protection unit alerted for welfare check.",
    ],
  },
  {
    id: "MS-1029",
    anonymousCaseId: "AN-6419",
    caseCode: "CASE #MS-1029",
    caseStage: "trial",
    stageDisplayName: "Trial Stage · Day 64",
    createdAt: "2026-07-10T09:00:00.000Z",
    lastCheckInAt: "2 days ago",
    currentDistressScore: 54,
    currentRiskLevel: "MODERATE",
    trend: "STABLE",
    escalationRisk: "MODERATE",
    status: "Follow-up Scheduled",
    signals: ["concentration strain", "routine disruption"],
    reasonForReview: "Moderate distress variance noted: responses indicate elevated worry and mild sleep fluctuations.",
    checkInHistory: [
      {
        id: "chk-1029-1",
        caseId: "MS-1029",
        timestamp: "2026-07-25T11:00:00.000Z",
        feeling: "distressed",
        safety: "yes",
        experiences: { sleep: "often", worry: "often", safety: "sometimes", concentration: "often", isolation: "sometimes", lossOfInterest: "sometimes" },
        signals: ["procedural cross-examination stress"],
        distressScore: 64,
        riskLevel: "HIGH",
        trend: "STABLE",
        escalationRisk: "MODERATE",
      },
      {
        id: "chk-1029-2",
        caseId: "MS-1029",
        timestamp: "2026-08-12T10:00:00.000Z",
        feeling: "worried",
        safety: "yes",
        experiences: { sleep: "sometimes", worry: "often", safety: "never", concentration: "sometimes", isolation: "never", lossOfInterest: "never" },
        signals: ["steady with legal support"],
        distressScore: 56,
        riskLevel: "MODERATE",
        trend: "IMPROVING",
        escalationRisk: "LOW",
      },
      {
        id: "chk-1029-3",
        caseId: "MS-1029",
        timestamp: "2026-09-01T14:00:00.000Z",
        feeling: "okay",
        safety: "yes",
        experiences: { sleep: "sometimes", worry: "sometimes", safety: "never", concentration: "sometimes", isolation: "never", lossOfInterest: "never" },
        signals: ["hearing completed without incident"],
        distressScore: 52,
        riskLevel: "MODERATE",
        trend: "STABLE",
        escalationRisk: "LOW",
      },
      {
        id: "chk-1029-4",
        caseId: "MS-1029",
        timestamp: "2026-09-17T11:00:00.000Z",
        feeling: "worried",
        safety: "yes",
        experiences: { sleep: "sometimes", worry: "often", safety: "never", concentration: "often", isolation: "never", lossOfInterest: "never" },
        signals: ["concentration strain", "routine disruption"],
        distressScore: 54,
        riskLevel: "MODERATE",
        trend: "STABLE",
        escalationRisk: "MODERATE",
      },
    ],
    timeline: [
      { step: "CHECK-IN: Routine Response", timestamp: "17 Sep 11:00 AM", note: "Periodic bi-weekly response", completed: true },
      { step: "MODEL: Stable Evaluation", timestamp: "17 Sep 11:01 AM", note: "Distress stable at 54/100 (MODERATE)", completed: true },
      { step: "SUPPORT: Session Booked", timestamp: "18 Sep 10:00 AM", note: "Follow-up counselling session arranged for 21 Sep", completed: true },
    ],
    supportHistory: [
      { date: "02 Sep 2026", type: "Psychosocial Support", officer: "Dr. K. Verma (Psychologist)", summary: "Coping strategies shared for post-trial adjustment." },
    ],
    officerNotes: [
      "Complainant completed testimony calmly. Scheduled follow-up session for 21 Sep.",
    ],
  },
  {
    id: "MS-1015",
    anonymousCaseId: "AN-5112",
    caseCode: "CASE #MS-1015",
    caseStage: "rehabilitation",
    stageDisplayName: "Rehabilitation Stage · Day 92",
    createdAt: "2026-06-15T09:00:00.000Z",
    lastCheckInAt: "3 days ago",
    currentDistressScore: 24,
    currentRiskLevel: "LOW",
    trend: "IMPROVING",
    escalationRisk: "LOW",
    status: "Reviewed",
    signals: ["improved sleep", "calm outlook", "livelihood engagement"],
    reasonForReview: "Routine check-in response indicates steady longitudinal stability.",
    checkInHistory: [
      {
        id: "chk-1015-1",
        caseId: "MS-1015",
        timestamp: "2026-06-25T10:00:00.000Z",
        feeling: "very_distressed",
        safety: "no",
        experiences: { sleep: "nearly_every_day", worry: "nearly_every_day", safety: "often", concentration: "often", isolation: "often", lossOfInterest: "often" },
        signals: ["post-incident acute trauma"],
        distressScore: 78,
        riskLevel: "HIGH",
        trend: "INCREASING",
        escalationRisk: "ELEVATED",
      },
      {
        id: "chk-1015-2",
        caseId: "MS-1015",
        timestamp: "2026-07-20T11:00:00.000Z",
        feeling: "worried",
        safety: "yes",
        experiences: { sleep: "often", worry: "often", safety: "never", concentration: "sometimes", isolation: "sometimes", lossOfInterest: "never" },
        signals: ["rehabilitation support engaged"],
        distressScore: 54,
        riskLevel: "MODERATE",
        trend: "IMPROVING",
        escalationRisk: "LOW",
      },
      {
        id: "chk-1015-3",
        caseId: "MS-1015",
        timestamp: "2026-08-18T10:30:00.000Z",
        feeling: "okay",
        safety: "yes",
        experiences: { sleep: "sometimes", worry: "sometimes", safety: "never", concentration: "never", isolation: "never", lossOfInterest: "never" },
        signals: ["employment training started"],
        distressScore: 36,
        riskLevel: "MODERATE",
        trend: "IMPROVING",
        escalationRisk: "LOW",
      },
      {
        id: "chk-1015-4",
        caseId: "MS-1015",
        timestamp: "2026-09-16T15:00:00.000Z",
        feeling: "calm",
        safety: "yes",
        experiences: { sleep: "never", worry: "never", safety: "never", concentration: "never", isolation: "never", lossOfInterest: "never" },
        signals: ["improved sleep", "calm outlook", "livelihood engagement"],
        distressScore: 24,
        riskLevel: "LOW",
        trend: "IMPROVING",
        escalationRisk: "LOW",
      },
    ],
    timeline: [
      { step: "CHECK-IN: Monthly Review", timestamp: "16 Sep 03:00 PM", note: "Rehabilitation check-in completed", completed: true },
      { step: "MODEL: Positive Recovery", timestamp: "16 Sep 03:01 PM", note: "Distress Score: 24/100 (LOW) · Trend: IMPROVING", completed: true },
      { step: "SUPPORT: Progress Recorded", timestamp: "16 Sep 03:30 PM", note: "Recovery baseline sustained for 60+ days", completed: true },
    ],
    supportHistory: [
      { date: "15 Jul 2026", type: "Vocational Support", officer: "District Welfare Officer", summary: "Enrolled in self-employment livelihood program." },
    ],
    officerNotes: [
      "Complainant doing well in livelihood program. Positive longitudinal recovery sustained.",
    ],
  },
  {
    id: "MS-0988",
    anonymousCaseId: "AN-4890",
    caseCode: "CASE #MS-0988",
    caseStage: "compensation",
    stageDisplayName: "Compensation Stage · Day 120",
    createdAt: "2026-05-20T09:00:00.000Z",
    lastCheckInAt: "5 days ago",
    currentDistressScore: 32,
    currentRiskLevel: "MODERATE",
    trend: "STABLE",
    escalationRisk: "LOW",
    status: "Reviewed",
    signals: ["compensation processing wait", "steady social support"],
    reasonForReview: "Routine check-in response indicates steady longitudinal stability.",
    checkInHistory: [
      {
        id: "chk-0988-1",
        caseId: "MS-0988",
        timestamp: "2026-09-14T11:20:00.000Z",
        feeling: "okay",
        safety: "yes",
        experiences: { sleep: "sometimes", worry: "sometimes", safety: "never", concentration: "never", isolation: "never", lossOfInterest: "never" },
        signals: ["steady baseline"],
        distressScore: 32,
        riskLevel: "MODERATE",
        trend: "STABLE",
        escalationRisk: "LOW",
      },
    ],
    timeline: [
      { step: "CHECK-IN: Verification", timestamp: "14 Sep 11:20 AM", note: "Baseline verified", completed: true },
      { step: "MODEL: Normal Range", timestamp: "14 Sep 11:21 AM", note: "Distress Score: 32/100 (MODERATE)", completed: true },
    ],
    supportHistory: [
      { date: "12 Aug 2026", type: "Disbursement Check", officer: "DLSA Desk", summary: "First tranche of statutory compensation credited." },
    ],
    officerNotes: [
      "Staying with supportive family network. Regular check-ins ongoing.",
    ],
  },
];

const INITIAL_ALERTS: AlertRecord[] = [
  {
    alertId: "ALT-892101",
    caseId: "MS-1042",
    anonymousId: "AN-8921",
    riskLevel: "HIGH",
    escalationRisk: "MODERATE",
    reason: "Recent responses indicate more frequent worry and sleep difficulty compared with earlier baseline records.",
    createdAt: "2026-09-19T10:17:00.000Z",
    status: "NEW",
  },
  {
    alertId: "ALT-774002",
    caseId: "MS-1038",
    anonymousId: "AN-7740",
    riskLevel: "VERY HIGH",
    escalationRisk: "ELEVATED",
    reason: "Potential escalation detected: recent check-ins indicate immediate safety concern and sleep disruptions.",
    createdAt: "2026-09-18T16:32:00.000Z",
    status: "UNDER REVIEW",
    reviewedBy: "Officer Sunita R.",
  },
  {
    alertId: "ALT-641903",
    caseId: "MS-1029",
    anonymousId: "AN-6419",
    riskLevel: "MODERATE",
    escalationRisk: "MODERATE",
    reason: "Moderate distress variance noted: responses indicate elevated worry and mild sleep fluctuations.",
    createdAt: "2026-09-17T11:05:00.000Z",
    status: "CONTACTED",
    reviewedBy: "Dr. K. Verma",
    resolutionNote: "Follow-up counselling session arranged for 21 Sep.",
  },
];

const INITIAL_MODELS: ModelMetadata[] = [
  {
    id: "mod-text",
    name: "Linguistic Sentiment & Signal Analyzer",
    version: "v2.4.1",
    type: "NLP / Semantic Feature Engine",
    status: "ACTIVE",
    confidenceScore: 0.92,
    lastUpdated: "2026-10-15",
    description: "Extracts fear, procedural stress, isolation, and coping indicators from free-text reflections with certified trauma-informed safety guardrails.",
  },
  {
    id: "mod-voice",
    name: "Voice Acoustic & Latency Estimator",
    version: "v1.8.0",
    type: "Audio Prosody & Pacing Analyzer",
    status: "CALIBRATED",
    confidenceScore: 0.88,
    lastUpdated: "2026-10-10",
    description: "Analyzes conversational latency, vocal hesitancy, and pacing variations across spoken check-ins.",
  },
  {
    id: "mod-distress",
    name: "Deterministic Dynamic Distress Engine",
    version: "v3.1.0",
    type: "Multi-Vector Bounded Scoring (0-100)",
    status: "ACTIVE",
    confidenceScore: 0.95,
    lastUpdated: "2026-10-18",
    description: "Deterministic synthesis of self-reported affect, environmental safety, symptom inventory, and linguistic markers.",
  },
  {
    id: "mod-risk",
    name: "Longitudinal Risk & Velocity Predictor",
    version: "v2.0.4",
    type: "Predictive Trajectory Modeling",
    status: "ONLINE",
    confidenceScore: 0.86,
    lastUpdated: "2026-10-20",
    description: "Evaluates trend velocity slope, milestone proximity, and symptom clustering to estimate escalation risk over 7–14 days.",
  },
];

interface ManosethuContextType {
  role: UserRole;
  setRole: (r: UserRole) => void;
  language: SupportedLanguage;
  setLanguage: (l: SupportedLanguage) => void;
  cases: CaseRecord[];
  activeCase: CaseRecord;
  users: UserAccount[];
  alerts: AlertRecord[];
  communications: CommunicationEvent[];
  auditLogs: AuditRecord[];
  messages: MessageRecord[];
  models: ModelMetadata[];
  selectedCaseForReview: CaseRecord | null;
  setSelectedCaseForReview: (c: CaseRecord | null) => void;
  
  // Onboarding
  isOnboarded: boolean;
  completeOnboarding: (profile: { name?: string; preferredTime?: string }) => void;

  // Actions
  submitCheckIn: (responses: CheckInResponses) => Promise<DistressScoreOutput>;
  requestCallSupport: (caseId?: string) => void;
  performSupportAction: (action: Omit<SupportActionRecord, "id" | "timestamp">) => void;
  resolveAlert: (alertId: string, resolutionNote: string) => void;
  resetDemoEnvironment: () => void;

  // Modals & Panels
  isEmergencyOpen: boolean;
  setIsEmergencyOpen: (open: boolean) => void;
  isPrivacyOpen: boolean;
  setIsPrivacyOpen: (open: boolean) => void;

  // Auth
  currentUser: (User | { displayName: string; email: string; photoURL?: string | null; roleTitle?: string }) | null;
  isAuthLoading: boolean;
  loginWithGoogle: () => Promise<User>;
  loginAsDemoOfficer: (officer: { displayName: string; email: string; roleTitle: string }) => void;
  loginAsDemoCitizen: () => void;
  logoutUser: () => Promise<void>;

  // Messaging
  sendDirectMessage: (content: string, senderRole: "USER" | "COUNSELLOR") => void;
  markCurrentCaseMessagesRead: (readerRole: "USER" | "COUNSELLOR") => void;

  // Admin User Management
  toggleUserStatus: (userId: string) => void;
  changeUserRole: (userId: string, newRole: "USER" | "COUNSELLOR" | "ADMIN") => void;

  // Time Range
  timeRange: "7d" | "30d" | "90d" | "all";
  setTimeRange: (tr: "7d" | "30d" | "90d" | "all") => void;

  // Privacy & Export
  exportActiveCaseData: () => void;
  activePrivacySettings: UserPrivacySettings;
  updatePrivacySettings: (settings: Partial<UserPrivacySettings>) => void;

  // Risk Prediction
  latestRiskPrediction: RiskPredictionResult;
}

const ManosethuContext = createContext<ManosethuContextType | undefined>(undefined);

const LOCAL_STORAGE_CASES_KEY = "manosethu_cases_store_v3";
const LOCAL_STORAGE_ALERTS_KEY = "manosethu_alerts_store_v3";
const LOCAL_STORAGE_USERS_KEY = "manosethu_users_store_v3";
const LOCAL_STORAGE_OFFICER_KEY = "manosethu_officer_store_v3";
const LOCAL_STORAGE_ONBOARDED_KEY = "manosethu_onboarded_v3";

export function ManosethuProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>("entry");
  const [language, setLanguage] = useState<SupportedLanguage>("en");
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedCaseForReview, setSelectedCaseForReview] = useState<CaseRecord | null>(null);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");

  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LOCAL_STORAGE_ONBOARDED_KEY) === "true";
    }
    return true; // default true so existing flow doesn't block unless requested
  });

  const [currentUser, setCurrentUser] = useState<(User | { displayName: string; email: string; photoURL?: string | null; roleTitle?: string }) | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_OFFICER_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to restore saved session", e);
      }
    }
    return null;
  });

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe: () => void = () => {};
    try {
      unsubscribe = subscribeToAuth((user) => {
        if (user) setCurrentUser(user);
        setIsAuthLoading(false);
      });
    } catch (err) {
      console.warn("Firebase Auth fallback", err);
      setIsAuthLoading(false);
    }

    const timer = setTimeout(() => setIsAuthLoading(false), 1000);
    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const loginWithGoogle = async (): Promise<User> => {
    setIsAuthLoading(true);
    try {
      const user = await signInWithGoogle();
      setCurrentUser(user);
      setIsAuthLoading(false);
      logAuditEvent(user.displayName || user.email || "Google User", "USER", "LOGIN", "Web Platform", { provider: "Google" });
      return user;
    } catch (err) {
      setIsAuthLoading(false);
      throw err;
    }
  };

  const loginAsDemoOfficer = (officer: { displayName: string; email: string; roleTitle: string }) => {
    const profile = {
      displayName: officer.displayName,
      email: officer.email,
      roleTitle: officer.roleTitle,
      photoURL: null,
    };
    setCurrentUser(profile);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_OFFICER_KEY, JSON.stringify(profile));
    }
    logAuditEvent(officer.displayName, "COUNSELLOR", "LOGIN", "Support Console", { role: officer.roleTitle });
  };

  const loginAsDemoCitizen = () => {
    const profile = {
      displayName: "AN-8921",
      email: "an8921@secure.manosethu.internal",
      roleTitle: "Beneficiary (Investigation Stage)",
      photoURL: null,
    };
    setCurrentUser(profile);
    setRole("victim");
    logAuditEvent("Beneficiary AN-8921", "USER", "LOGIN", "Citizen Companion", { caseId: "MS-1042" });
  };

  const logoutUser = async (): Promise<void> => {
    setIsAuthLoading(true);
    try {
      await signOutUser();
    } catch (err) {
      console.warn("Sign-Out fallback", err);
    } finally {
      if (currentUser) {
        logAuditEvent(currentUser.displayName || "User", "USER", "LOGOUT", "System");
      }
      setCurrentUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem(LOCAL_STORAGE_OFFICER_KEY);
      }
      setIsAuthLoading(false);
      setRole("entry");
    }
  };

  const [cases, setCases] = useState<CaseRecord[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_CASES_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load cases", e);
      }
    }
    return INITIAL_SYNTHETIC_CASES;
  });

  const [users, setUsers] = useState<UserAccount[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load users", e);
      }
    }
    return INITIAL_SYNTHETIC_USERS;
  });

  const [alerts, setAlerts] = useState<AlertRecord[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_ALERTS_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to load alerts", e);
      }
    }
    return INITIAL_ALERTS;
  });

  const [communications, setCommunications] = useState<CommunicationEvent[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditRecord[]>(getAuditLogs());
  const [messages, setMessages] = useState<MessageRecord[]>(getCaseMessages("MS-1042"));
  const [models] = useState<ModelMetadata[]>(INITIAL_MODELS);

  const [activePrivacySettings, setActivePrivacySettings] = useState<UserPrivacySettings>(() =>
    getPrivacySettings("MS-1042")
  );

  // Sync state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_CASES_KEY, JSON.stringify(cases));
    }
  }, [cases]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_ALERTS_KEY, JSON.stringify(alerts));
    }
  }, [alerts]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
    }
  }, [users]);

  // Primary active citizen case is MS-1042
  const activeCase = cases.find((c) => c.id === "MS-1042") || cases[0];

  // Dynamically calculate latest risk prediction
  const latestRiskPrediction = predictRisk(activeCase.checkInHistory, 12);

  const completeOnboarding = (profile: { name?: string; preferredTime?: string }) => {
    setIsOnboarded(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_ONBOARDED_KEY, "true");
    }
    logAuditEvent("AN-8921", "USER", "SETTINGS_CHANGED", "Onboarding Completed", { profile });
  };

  const submitCheckIn = async (responses: CheckInResponses): Promise<DistressScoreOutput> => {
    const previousScore = activeCase.currentDistressScore;

    // Run multimodal signal analysis
    const textAnalysis = await analyzeText(responses.feelingNote || "");
    const voiceAnalysis = await analyzeVoice(null, responses.voiceAcousticPace === "hesitant" ? 4 : 12, responses.voiceTranscript);

    // Compute deterministic score with rich feature breakdown
    const result = calculateDistressScore(responses, previousScore);

    // Merge textual and voice signals into active signals array
    const combinedSignals = Array.from(
      new Set([
        ...result.signals,
        ...textAnalysis.distressIndicators,
        ...voiceAnalysis.voiceStressIndicators,
      ])
    );

    const newRecord: StoredCheckInRecord = {
      id: `chk-${Date.now()}`,
      caseId: activeCase.id,
      timestamp: new Date().toISOString(),
      feeling: responses.feeling,
      feelingNote: responses.feelingNote,
      safety: responses.safety,
      experiences: responses.experiences,
      voiceTranscript: responses.voiceTranscript || voiceAnalysis.transcription,
      signals: combinedSignals,
      distressScore: result.distressScore,
      riskLevel: result.riskLevel,
      trend: result.trend,
      escalationRisk: result.escalationRisk,
    };

    // Evaluate escalation and create alert record if needed
    const escalationEval = evaluateEscalationRisk({
      caseId: activeCase.id,
      anonymousId: activeCase.anonymousCaseId,
      currentScore: result.distressScore,
      previousScore,
      safetyResponse: responses.safety,
      sleepResponse: responses.experiences.sleep,
      consecutiveHighDistressCount: result.riskLevel === "HIGH" || result.riskLevel === "VERY HIGH" ? 2 : 1,
      signals: combinedSignals,
    });

    if (escalationEval.shouldGenerateAlert && escalationEval.alertRecord) {
      setAlerts((prev) => [escalationEval.alertRecord!, ...prev]);
      logAuditEvent("Distress Scoring Engine", "ADMIN", "ALERT_ACKNOWLEDGED", escalationEval.alertRecord.alertId, {
        caseId: activeCase.id,
        score: result.distressScore,
        risk: result.riskLevel,
      });
    }

    // Update active case
    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id === activeCase.id) {
          const updatedHistory = [...c.checkInHistory, newRecord];
          const updatedTimeline = [
            {
              step: "CHECK-IN: Submitted",
              timestamp: "Just now",
              note: `Recorded reflection (Feeling: ${responses.feeling})`,
              completed: true,
            },
            {
              step: "SIGNALS: Analyzed",
              timestamp: "Just now",
              note: combinedSignals.slice(0, 3).join(", "),
              completed: true,
            },
            {
              step: "SCORE: Updated",
              timestamp: "Just now",
              note: `Dynamic Distress Score: ${result.distressScore}/100 (${result.band})`,
              completed: true,
              isAlert: result.distressScore >= 60,
            },
            {
              step: "TRIAGE: Escalation Evaluated",
              timestamp: "Just now",
              note: `Escalation Risk: ${result.escalationRisk} · ${result.requiresHumanReview ? "Prioritized for caseworker" : "Steady within baseline"}`,
              completed: true,
              isAlert: result.requiresHumanReview,
            },
            {
              step: "SUPPORT: Pathways Available",
              timestamp: "Available",
              note: "Voluntary support options ready",
              completed: false,
            },
          ];

          return {
            ...c,
            lastCheckInAt: "Just now",
            currentDistressScore: result.distressScore,
            currentRiskLevel: result.riskLevel,
            trend: result.trend,
            escalationRisk: result.escalationRisk,
            signals: combinedSignals,
            reasonForReview: result.explanation,
            status: result.requiresHumanReview ? "Needs Review" : "Reviewed",
            checkInHistory: updatedHistory,
            timeline: updatedTimeline,
          };
        }
        return c;
      })
    );

    logAuditEvent("Beneficiary AN-8921", "USER", "NOTE_ADDED", `Case #${activeCase.id}`, {
      score: result.distressScore,
      band: result.band,
    });

    setAuditLogs(getAuditLogs());
    return result;
  };

  const requestCallSupport = async (caseId: string = "MS-1042") => {
    const comm = await dispatchCommunication({
      type: "OFFICER_CALL_REQUEST",
      recipient: "Nodal Support Desk",
      caseId,
      summary: `Urgent callback requested for ${caseId}`,
    });

    setCommunications((prev) => [comm, ...prev]);

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            status: "Support Requested",
            officerNotes: [
              `[${new Date().toLocaleTimeString()}] Urgent callback requested by person. Gateway status: ${comm.status}.`,
              ...c.officerNotes,
            ],
          };
        }
        return c;
      })
    );

    logAuditEvent("Beneficiary AN-8921", "USER", "INTERVENTION_CREATED", `Case #${caseId}`, {
      type: "OFFICER_CALL_REQUEST",
    });
    setAuditLogs(getAuditLogs());
  };

  const performSupportAction = (action: Omit<SupportActionRecord, "id" | "timestamp">) => {
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === action.caseId) {
          let updatedStatus = c.status;
          if (action.actionType === "MARK_REVIEWED") updatedStatus = "Reviewed";
          if (action.actionType === "SCHEDULE_FOLLOWUP" || action.actionType === "REQUEST_COUNSELLING") updatedStatus = "Follow-up Scheduled";
          if (action.actionType === "MARK_RESOLVED") updatedStatus = "Reviewed";

          return {
            ...c,
            status: updatedStatus,
            officerNotes: [
              `[${new Date().toLocaleDateString()}] ${action.actionType.replace(/_/g, " ")} recorded by ${action.performedBy}: ${action.notes}`,
              ...c.officerNotes,
            ],
            supportHistory: [
              {
                date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                type: action.actionType.replace(/_/g, " "),
                officer: action.performedBy,
                summary: action.notes,
              },
              ...c.supportHistory,
            ],
          };
        }
        return c;
      })
    );

    logAuditEvent(action.performedBy, "COUNSELLOR", "INTERVENTION_CREATED", `Case #${action.caseId}`, {
      actionType: action.actionType,
      notes: action.notes,
    });
    setAuditLogs(getAuditLogs());
  };

  const resolveAlert = (alertId: string, resolutionNote: string) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.alertId === alertId) {
          return {
            ...a,
            status: "RESOLVED",
            resolutionNote,
            reviewedBy: currentUser?.displayName || "Officer Sunita R.",
          };
        }
        return a;
      })
    );

    logAuditEvent(currentUser?.displayName || "Officer Sunita R.", "COUNSELLOR", "ALERT_RESOLVED", alertId, {
      note: resolutionNote,
    });
    setAuditLogs(getAuditLogs());
  };

  const sendDirectMessage = (content: string, senderRole: "USER" | "COUNSELLOR") => {
    const senderName =
      senderRole === "USER"
        ? `${activeCase.anonymousCaseId} (You)`
        : currentUser?.displayName || "Officer Sunita R. (Caseworker)";

    const newMsg = sendCaseMessage({
      caseId: activeCase.id,
      senderId: senderRole === "USER" ? activeCase.id : "officer-sunita",
      senderName,
      senderRole,
      recipientId: senderRole === "USER" ? "officer-sunita" : activeCase.id,
      content,
    });

    setMessages((prev) => [...prev, newMsg]);
  };

  const markCurrentCaseMessagesRead = (readerRole: "USER" | "COUNSELLOR") => {
    markMessagesAsRead(activeCase.id, readerRole);
    setMessages(getCaseMessages(activeCase.id));
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
          logAuditEvent("System Administrator", "ADMIN", "USER_UPDATED", u.name, {
            status: nextStatus,
          });
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    setAuditLogs(getAuditLogs());
  };

  const changeUserRole = (userId: string, newRole: "USER" | "COUNSELLOR" | "ADMIN") => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          logAuditEvent("System Administrator", "ADMIN", "ROLE_CHANGED", u.name, {
            oldRole: u.role,
            newRole,
          });
          return { ...u, role: newRole };
        }
        return u;
      })
    );
    setAuditLogs(getAuditLogs());
  };

  const updatePrivacySettings = (settings: Partial<UserPrivacySettings>) => {
    const updated = { ...activePrivacySettings, ...settings };
    setActivePrivacySettings(updated);
    savePrivacySettings(updated);
    setAuditLogs(getAuditLogs());
  };

  const exportActiveCaseData = () => {
    exportUserDataAsJSON(activeCase.id, activeCase, activeCase.checkInHistory);
    setAuditLogs(getAuditLogs());
  };

  const resetDemoEnvironment = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_STORAGE_CASES_KEY);
      localStorage.removeItem(LOCAL_STORAGE_ALERTS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USERS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_ONBOARDED_KEY);
    }
    setCases(INITIAL_SYNTHETIC_CASES);
    setAlerts(INITIAL_ALERTS);
    setUsers(INITIAL_SYNTHETIC_USERS);
    setCommunications([]);
    setSelectedCaseForReview(null);
    setAuditLogs(getAuditLogs());
    setMessages(getCaseMessages("MS-1042"));
  };

  return (
    <ManosethuContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        cases,
        activeCase,
        users,
        alerts,
        communications,
        auditLogs,
        messages,
        models,
        selectedCaseForReview,
        setSelectedCaseForReview,
        isOnboarded,
        completeOnboarding,
        submitCheckIn,
        requestCallSupport,
        performSupportAction,
        resolveAlert,
        resetDemoEnvironment,
        isEmergencyOpen,
        setIsEmergencyOpen,
        isPrivacyOpen,
        setIsPrivacyOpen,
        currentUser,
        isAuthLoading,
        loginWithGoogle,
        loginAsDemoOfficer,
        loginAsDemoCitizen,
        logoutUser,
        sendDirectMessage,
        markCurrentCaseMessagesRead,
        toggleUserStatus,
        changeUserRole,
        timeRange,
        setTimeRange,
        exportActiveCaseData,
        activePrivacySettings,
        updatePrivacySettings,
        latestRiskPrediction,
      }}
    >
      {children}
    </ManosethuContext.Provider>
  );
}

export function useManosethu() {
  const context = useContext(ManosethuContext);
  if (!context) {
    throw new Error("useManosethu must be used within a ManosethuProvider");
  }
  return context;
}
