import { EscalationLevel, RiskLevel, TrendDirection } from "./distress-engine";

export interface AlertRecord {
  alertId: string;
  caseId: string;
  anonymousId: string;
  riskLevel: RiskLevel;
  escalationRisk: EscalationLevel;
  reason: string;
  createdAt: string;
  status: "NEW" | "UNDER REVIEW" | "CONTACTED" | "RESOLVED";
  reviewedBy?: string;
  resolutionNote?: string;
}

export interface EscalationEvaluationInput {
  caseId: string;
  anonymousId: string;
  currentScore: number;
  previousScore: number;
  safetyResponse: "yes" | "not_sure" | "no";
  sleepResponse: "never" | "sometimes" | "often" | "nearly_every_day";
  consecutiveHighDistressCount: number;
  signals: string[];
}

export interface EscalationEvaluationOutput {
  escalationRisk: EscalationLevel;
  explanation: string;
  shouldGenerateAlert: boolean;
  alertRecord?: AlertRecord;
}

export function evaluateEscalationRisk(
  input: EscalationEvaluationInput
): EscalationEvaluationOutput {
  const delta = input.currentScore - input.previousScore;
  const isSharpIncrease = delta >= 10;
  const isUnsafe = input.safetyResponse === "no";
  const hasSevereSleepLoss = input.sleepResponse === "often" || input.sleepResponse === "nearly_every_day";
  const hasRepeatedDistress = input.consecutiveHighDistressCount >= 2;

  let escalationRisk: EscalationLevel = "LOW";
  let explanation = "";

  if (isUnsafe || (input.currentScore >= 60 && isSharpIncrease) || hasRepeatedDistress) {
    escalationRisk = "ELEVATED";
    explanation = isUnsafe
      ? "Potential escalation detected: recent check-ins indicate immediate safety concern and sleep disruptions."
      : "Potential escalation detected: recent check-ins show an increase in distress with repeated concerns related to safety and sleep.";
  } else if (input.currentScore >= 45 || isSharpIncrease || hasSevereSleepLoss) {
    escalationRisk = "MODERATE";
    explanation = "Moderate distress variance noted: responses indicate elevated worry and mild sleep fluctuations.";
  } else {
    escalationRisk = "LOW";
    explanation = "Routine check-in response indicates steady longitudinal stability.";
  }

  const shouldGenerateAlert = escalationRisk === "ELEVATED" || input.currentScore >= 60 || isUnsafe;

  let alertRecord: AlertRecord | undefined = undefined;
  if (shouldGenerateAlert) {
    alertRecord = {
      alertId: `ALT-${Date.now().toString().slice(-6)}`,
      caseId: input.caseId,
      anonymousId: input.anonymousId,
      riskLevel: input.currentScore >= 80 ? "VERY HIGH" : input.currentScore >= 60 ? "HIGH" : "MODERATE",
      escalationRisk,
      reason: explanation,
      createdAt: new Date().toISOString(),
      status: "NEW",
    };
  }

  return {
    escalationRisk,
    explanation,
    shouldGenerateAlert,
    alertRecord,
  };
}
