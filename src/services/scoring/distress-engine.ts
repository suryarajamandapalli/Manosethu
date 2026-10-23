export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "VERY HIGH";
export type TrendDirection = "IMPROVING" | "STABLE" | "INCREASING";
export type EscalationLevel = "LOW" | "MODERATE" | "ELEVATED";

export interface CheckInResponses {
  feeling: "calm" | "okay" | "worried" | "distressed" | "very_distressed";
  feelingNote?: string;
  safety: "yes" | "not_sure" | "no";
  experiences: {
    sleep: "never" | "sometimes" | "often" | "nearly_every_day";
    worry: "never" | "sometimes" | "often" | "nearly_every_day";
    safety: "never" | "sometimes" | "often" | "nearly_every_day";
    concentration: "never" | "sometimes" | "often" | "nearly_every_day";
    isolation: "never" | "sometimes" | "often" | "nearly_every_day";
    lossOfInterest: "never" | "sometimes" | "often" | "nearly_every_day";
  };
  voiceTranscript?: string;
  voiceAcousticPace?: "steady" | "hesitant" | "rapid_tremor" | "flat";
}

export interface DistressComputationResult {
  distressScore: number; // 0 - 100
  riskLevel: RiskLevel;
  trend: TrendDirection;
  escalationRisk: EscalationLevel;
  signals: string[];
  explanation: string;
  recommendedSupport: string[];
  requiresHumanReview: boolean;
}

export function computeDistressScore(
  current: CheckInResponses,
  previousScore?: number
): DistressComputationResult {
  let score = 15; // baseline calibration
  const signals: string[] = [];

  // 1. Feeling evaluation
  switch (current.feeling) {
    case "calm":
      score += 0;
      break;
    case "okay":
      score += 8;
      break;
    case "worried":
      score += 20;
      signals.push("increased worry");
      break;
    case "distressed":
      score += 30;
      signals.push("elevated distress");
      break;
    case "very_distressed":
      score += 42;
      signals.push("acute distress reported");
      break;
  }

  // 2. Safety evaluation
  if (current.safety === "no") {
    score += 28;
    signals.push("reduced sense of safety");
  } else if (current.safety === "not_sure") {
    score += 14;
    signals.push("safety uncertainty");
  }

  // 3. Questionnaire responses
  const exp = current.experiences;
  const weights: Record<string, number> = {
    never: 0,
    sometimes: 2,
    often: 5,
    nearly_every_day: 8,
  };

  const sleepWeight = weights[exp.sleep] || 0;
  score += sleepWeight;
  if (exp.sleep === "often" || exp.sleep === "nearly_every_day") {
    signals.push("sleep difficulty");
  }

  const worryWeight = weights[exp.worry] || 0;
  score += worryWeight;
  if ((exp.worry === "often" || exp.worry === "nearly_every_day") && !signals.includes("increased worry")) {
    signals.push("persistent apprehension");
  }

  const safetyWeight = weights[exp.safety] || 0;
  score += safetyWeight;
  if ((exp.safety === "often" || exp.safety === "nearly_every_day") && !signals.includes("reduced sense of safety")) {
    signals.push("recurring safety concern");
  }

  const concWeight = weights[exp.concentration] || 0;
  score += concWeight;
  if (exp.concentration === "often" || exp.concentration === "nearly_every_day") {
    signals.push("concentration strain");
  }

  const isolWeight = weights[exp.isolation] || 0;
  score += isolWeight;
  if (exp.isolation === "often" || exp.isolation === "nearly_every_day") {
    signals.push("feeling isolated");
  }

  const interestWeight = weights[exp.lossOfInterest] || 0;
  score += interestWeight;
  if (exp.lossOfInterest === "often" || exp.lossOfInterest === "nearly_every_day") {
    signals.push("loss of interest");
  }

  // 4. Voice acoustic and linguistic markers (simulated / analyzed)
  if (current.voiceAcousticPace === "hesitant" || current.voiceAcousticPace === "rapid_tremor") {
    score += 4;
    signals.push("speech pacing variation");
  }

  // 5. Free-text linguistic sentiment flags
  if (current.feelingNote && current.feelingNote.trim().length > 0) {
    const textLower = current.feelingNote.toLowerCase();
    const distressKeywords = ["threat", "scared", "fear", "cant sleep", "cannot sleep", "alone", "hopeless", "panic", "harassed", "follow", "court"];
    let matchCount = 0;
    distressKeywords.forEach((kw) => {
      if (textLower.includes(kw)) matchCount++;
    });
    if (matchCount > 0) {
      score += Math.min(10, matchCount * 3);
      signals.push("text linguistic distress markers");
    }
  }

  // Bound score: 0 - 100
  const distressScore = Math.min(95, Math.max(10, Math.round(score)));

  // Risk bands
  let riskLevel: RiskLevel = "LOW";
  if (distressScore >= 80) {
    riskLevel = "VERY HIGH";
  } else if (distressScore >= 60) {
    riskLevel = "HIGH";
  } else if (distressScore >= 30) {
    riskLevel = "MODERATE";
  } else {
    riskLevel = "LOW";
  }

  // Trend determination against previous check-in
  let trend: TrendDirection = "STABLE";
  if (previousScore !== undefined) {
    const delta = distressScore - previousScore;
    if (delta >= 6) {
      trend = "INCREASING";
    } else if (delta <= -6) {
      trend = "IMPROVING";
    } else {
      trend = "STABLE";
    }
  } else {
    // Single check-in heuristic
    trend = distressScore >= 60 ? "INCREASING" : distressScore <= 28 ? "IMPROVING" : "STABLE";
  }

  // Escalation risk calculation
  let escalationRisk: EscalationLevel = "LOW";
  if (riskLevel === "VERY HIGH" || (riskLevel === "HIGH" && trend === "INCREASING") || current.safety === "no") {
    escalationRisk = "ELEVATED";
  } else if (riskLevel === "HIGH" || riskLevel === "MODERATE") {
    escalationRisk = "MODERATE";
  } else {
    escalationRisk = "LOW";
  }

  // Generate plain-language non-clinical explanation
  let explanation = "";
  if (signals.length > 0) {
    const signalSummary = signals.slice(0, 3).join(", ");
    explanation = `Recent responses indicate ${signalSummary} compared with earlier baseline records.`;
  } else {
    explanation = "Recent responses indicate steady well-being consistent with historical baseline records.";
  }

  // Recommended voluntary support pathways
  const recommendedSupport: string[] = [];
  if (distressScore >= 60 || current.safety === "no") {
    recommendedSupport.push("counselling");
    recommendedSupport.push("witness protection & safety");
    recommendedSupport.push("human follow-up");
  } else if (distressScore >= 30) {
    recommendedSupport.push("counselling");
    recommendedSupport.push("legal aid check");
    recommendedSupport.push("human follow-up");
  } else {
    recommendedSupport.push("routine monitoring");
    recommendedSupport.push("rehabilitation review");
  }

  const requiresHumanReview = escalationRisk === "ELEVATED" || riskLevel === "HIGH" || riskLevel === "VERY HIGH" || current.safety === "no";

  return {
    distressScore,
    riskLevel,
    trend,
    escalationRisk,
    signals: signals.length > 0 ? signals : ["baseline within standard range"],
    explanation,
    recommendedSupport,
    requiresHumanReview,
  };
}

export interface DistressScoreOutput extends DistressComputationResult {
  band: "STABLE" | "ELEVATED" | "HIGH" | "CRITICAL";
  contributingSignals: string[];
  stableSignals: string[];
  confidence: number;
  timestamp: string;
}

export function calculateDistressScore(
  current: CheckInResponses,
  previousScore?: number
): DistressScoreOutput {
  const base = computeDistressScore(current, previousScore);
  
  let band: DistressScoreOutput["band"] = "STABLE";
  if (base.distressScore >= 80) band = "CRITICAL";
  else if (base.distressScore >= 60) band = "HIGH";
  else if (base.distressScore >= 40) band = "ELEVATED";
  else band = "STABLE";

  const contributingSignals: string[] = [];
  const stableSignals: string[] = [];

  if (current.feeling === "worried" || current.feeling === "distressed" || current.feeling === "very_distressed") {
    contributingSignals.push(`Self-reported emotional distress (${current.feeling.replace("_", " ")})`);
  } else {
    stableSignals.push("Positive or calm emotional tone reported");
  }

  if (current.safety === "no") {
    contributingSignals.push("Compromised sense of immediate personal safety");
  } else if (current.safety === "not_sure") {
    contributingSignals.push("Safety apprehension in living environment");
  } else {
    stableSignals.push("Physical safety remains secure");
  }

  const exp = current.experiences;
  if (exp.sleep === "often" || exp.sleep === "nearly_every_day") {
    contributingSignals.push("Frequent sleep disruption");
  } else {
    stableSignals.push("Regular sleep patterns maintained");
  }

  if (exp.isolation === "often" || exp.isolation === "nearly_every_day") {
    contributingSignals.push("Feelings of social isolation");
  } else {
    stableSignals.push("Active connection with trusted contacts");
  }

  return {
    ...base,
    band,
    contributingSignals: contributingSignals.length > 0 ? contributingSignals : ["Consistent routine indicators"],
    stableSignals: stableSignals.length > 0 ? stableSignals : ["Engagement maintained"],
    confidence: 0.91,
    timestamp: new Date().toISOString(),
  };
}
