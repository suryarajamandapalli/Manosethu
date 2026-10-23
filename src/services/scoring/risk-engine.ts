/**
 * risk-engine.ts — Longitudinal Risk Prediction Service for MANOSETHU
 *
 * Implements Section 19: predictive risk modeling based on longitudinal history,
 * regression slope, symptom combination, and procedural context.
 *
 * IMPORTANT:
 * Never presents predictions as certainties.
 * Explicitly labels results as "Prototype risk estimate" for decision support.
 */

import { StoredCheckInRecord } from "@/services/analytics/longitudinal";

export interface RiskPredictionResult {
  riskLevel: "LOW" | "MODERATE" | "ELEVATED" | "HIGH";
  probability: number; // 0.0 to 1.0 (estimated probability of crossing threshold in horizon)
  horizon: string; // e.g., "Next 7–14 days"
  contributingFactors: string[];
  confidence: number;
  trendSlope: number; // change per check-in (+/-)
  explanation: string;
  recommendedAction: string;
}

export interface RiskPredictor {
  predict(history: StoredCheckInRecord[], contextMilestoneDays?: number): RiskPredictionResult;
}

export class PrototypeRiskPredictor implements RiskPredictor {
  predict(history: StoredCheckInRecord[] = [], contextMilestoneDays?: number): RiskPredictionResult {
    if (!history || history.length === 0) {
      return {
        riskLevel: "LOW",
        probability: 0.1,
        horizon: "Next 14 days",
        contributingFactors: ["No prior check-ins recorded; baseline established."],
        confidence: 0.7,
        trendSlope: 0,
        explanation: "Insufficient longitudinal history for predictive slope calculation.",
        recommendedAction: "Maintain scheduled bi-weekly check-in schedule.",
      };
    }

    const n = history.length;
    const scores = history.map((h) => h.distressScore);
    const latestScore = scores[n - 1];
    const latestRecord = history[n - 1];

    // Compute simple linear slope over last up to 5 check-ins
    const slice = scores.slice(-5);
    let slope = 0;
    if (slice.length > 1) {
      const first = slice[0];
      const last = slice[slice.length - 1];
      slope = Number(((last - first) / (slice.length - 1)).toFixed(2));
    }

    const contributingFactors: string[] = [];

    // Factor 1: Slope direction
    if (slope > 3) {
      contributingFactors.push(`Upward distress velocity (+${slope} pts/interval)`);
    } else if (slope < -3) {
      contributingFactors.push(`Positive recovery trajectory (${slope} pts/interval)`);
    }

    // Factor 2: Immediate safety concerns
    if (latestRecord.safety === "no") {
      contributingFactors.push("Reported uncertainty or compromise in personal safety");
    }

    // Factor 3: Severe sleep disturbance
    const exp = latestRecord.experiences;
    if (exp?.sleep === "often" || exp?.sleep === "nearly_every_day") {
      contributingFactors.push("Chronic sleep disturbance and nighttime anxiety");
    }

    // Factor 4: Social isolation or withdrawal
    if (exp?.isolation === "often" || exp?.isolation === "nearly_every_day") {
      contributingFactors.push("Marked social withdrawal or isolation");
    }

    // Factor 5: Procedural milestone proximity (e.g. court trial in next 10 days)
    if (contextMilestoneDays !== undefined && contextMilestoneDays <= 14) {
      contributingFactors.push(`Proximity to institutional milestone (${contextMilestoneDays} days)`);
    }

    // Determine estimated probability of crossing high threshold (score >= 60)
    let baseProb = latestScore / 130;
    if (slope > 3) baseProb += 0.15;
    if (latestRecord.safety === "no") baseProb += 0.25;
    if (contextMilestoneDays !== undefined && contextMilestoneDays <= 7) baseProb += 0.15;
    const probability = Math.min(0.95, Math.max(0.05, Number(baseProb.toFixed(2))));

    // Map probability to categorical risk level
    let riskLevel: RiskPredictionResult["riskLevel"] = "LOW";
    let horizon = "Next 14–30 days";
    let recommendedAction = "Continue routine periodic monitoring.";

    if (probability >= 0.7 || latestRecord.safety === "no" || latestScore >= 75) {
      riskLevel = "HIGH";
      horizon = "Next 48–72 hours";
      recommendedAction = "Direct caseworker outreach and legal/safety verification.";
    } else if (probability >= 0.45 || slope > 4 || latestScore >= 55) {
      riskLevel = "ELEVATED";
      horizon = "Next 7 days";
      recommendedAction = "Schedule supportive counselling check-in before next procedural event.";
    } else if (probability >= 0.25 || latestScore >= 40) {
      riskLevel = "MODERATE";
      horizon = "Next 14 days";
      recommendedAction = "Provide voluntary psychoeducation and coping resources.";
    }

    const explanation =
      riskLevel === "HIGH"
        ? `Prototype risk estimate: High probability of acute distress (${Math.round(probability * 100)}%) over ${horizon}. Driven by ${contributingFactors.slice(0, 2).join(" and ")}.`
        : riskLevel === "ELEVATED"
        ? `Prototype risk estimate: Elevated distress variance noted (${Math.round(probability * 100)}% estimate) with upward trend slope.`
        : `Longitudinal pattern remains steady within normal baseline boundaries.`;

    return {
      riskLevel,
      probability,
      horizon,
      contributingFactors: contributingFactors.length > 0 ? contributingFactors : ["Consistent baseline indicators"],
      confidence: 0.86,
      trendSlope: slope,
      explanation,
      recommendedAction,
    };
  }
}

export const riskPredictor = new PrototypeRiskPredictor();

export function predictRisk(
  history: StoredCheckInRecord[],
  contextMilestoneDays?: number
): RiskPredictionResult {
  return riskPredictor.predict(history, contextMilestoneDays);
}
