/**
 * text-analyzer.ts — Text Signal Analysis Service for MANOSETHU
 *
 * Extracts emotional sentiment, distress indicators, and coping markers
 * from free-text reflections using calibrated linguistic patterns.
 * Produces explainable, non-diagnostic summaries for caseworkers and users.
 */

export interface TextAnalysisResult {
  sentiment: "calm" | "neutral" | "concerned" | "distressed" | "acute_distress";
  sentimentScore: number; // -1.0 to 1.0
  emotionalSignals: string[];
  distressIndicators: string[];
  copingIndicators: string[];
  keywords: string[];
  confidence: number;
  explanation: string;
}

export interface TextAnalyzer {
  analyze(input: string): Promise<TextAnalysisResult>;
}

// Calibrated keyword and phrase dictionaries
const DISTRESS_PATTERNS: Array<{ regex: RegExp; label: string; weight: number }> = [
  { regex: /\b(afraid|scared|terror|terrified|fearful|dread)\b/i, label: "fear and apprehension", weight: 0.25 },
  { regex: /\b(threat|threatened|intimidat(ed|ing)|stalking|harass(ed|ing)|warned me)\b/i, label: "perceived external intimidation", weight: 0.35 },
  { regex: /\b(can'?t sleep|insomnia|nightmare|waking up|restless|bad dreams)\b/i, label: "sleep disruption", weight: 0.20 },
  { regex: /\b(alone|isolated|nobody|abandoned|cut off|no one understands)\b/i, label: "social isolation", weight: 0.20 },
  { regex: /\b(hopeless|giving up|can'?t go on|pointless|no way out|exhausted)\b/i, label: "emotional exhaustion", weight: 0.30 },
  { regex: /\b(court|hearing|summons|judge|police|station|statement|lawyer)\b/i, label: "procedural stress", weight: 0.15 },
  { regex: /\b(panic|heart racing|shaking|shivering|can'?t breathe)\b/i, label: "acute somatic anxiety", weight: 0.30 },
  { regex: /\b(sad|crying|tears|grief|pain|heartbroken|unhappy)\b/i, label: "depressive affect", weight: 0.18 },
];

const COPING_PATTERNS: Array<{ regex: RegExp; label: string; weight: number }> = [
  { regex: /\b(calm|peaceful|better|improving|steady|okay today)\b/i, label: "emotional stabilization", weight: 0.20 },
  { regex: /\b(family|friend|support|talked to|helped me|neighbor)\b/i, label: "social support active", weight: 0.25 },
  { regex: /\b(walking|routine|praying|cooking|work|gardening)\b/i, label: "adaptive routine", weight: 0.15 },
  { regex: /\b(safe|locked|secure|protected|patrol)\b/i, label: "perceived environmental safety", weight: 0.25 },
];

export class PrototypeTextAnalyzer implements TextAnalyzer {
  async analyze(input: string): Promise<TextAnalysisResult> {
    const text = (input || "").trim();
    if (!text) {
      return {
        sentiment: "neutral",
        sentimentScore: 0,
        emotionalSignals: ["routine baseline"],
        distressIndicators: [],
        copingIndicators: [],
        keywords: [],
        confidence: 0.9,
        explanation: "No textual reflection provided. Evaluation relies on structured check-in items.",
      };
    }

    const distressMatches: string[] = [];
    const copingMatches: string[] = [];
    let distressWeightSum = 0;
    let copingWeightSum = 0;
    const foundKeywords: string[] = [];

    // Evaluate distress patterns
    for (const pattern of DISTRESS_PATTERNS) {
      if (pattern.regex.test(text)) {
        distressMatches.push(pattern.label);
        distressWeightSum += pattern.weight;
        const matchedWord = text.match(pattern.regex)?.[0];
        if (matchedWord && !foundKeywords.includes(matchedWord.toLowerCase())) {
          foundKeywords.push(matchedWord.toLowerCase());
        }
      }
    }

    // Evaluate coping patterns
    for (const pattern of COPING_PATTERNS) {
      if (pattern.regex.test(text)) {
        copingMatches.push(pattern.label);
        copingWeightSum += pattern.weight;
        const matchedWord = text.match(pattern.regex)?.[0];
        if (matchedWord && !foundKeywords.includes(matchedWord.toLowerCase())) {
          foundKeywords.push(matchedWord.toLowerCase());
        }
      }
    }

    // Compute net sentiment score (-1.0 to 1.0)
    const net = Math.max(-1, Math.min(1, copingWeightSum - distressWeightSum));

    let sentiment: TextAnalysisResult["sentiment"] = "neutral";
    if (distressWeightSum >= 0.6) {
      sentiment = "acute_distress";
    } else if (distressWeightSum >= 0.35) {
      sentiment = "distressed";
    } else if (distressWeightSum >= 0.15) {
      sentiment = "concerned";
    } else if (copingWeightSum >= 0.2) {
      sentiment = "calm";
    }

    // Compose concise human-in-the-loop explanation
    let explanation = "";
    if (sentiment === "acute_distress" || sentiment === "distressed") {
      explanation = `Recent language indicates expressions of ${distressMatches.slice(0, 2).join(" and ")}. Caseworker follow-up is recommended.`;
    } else if (sentiment === "concerned") {
      explanation = `Expressions show mild concern relating to ${distressMatches.join(", ") || "daily routines"}.`;
    } else if (sentiment === "calm") {
      explanation = `Reflections express constructive coping and ${copingMatches.join(", ") || "stability"}.`;
    } else {
      explanation = "Language indicators are balanced with steady routine expressions.";
    }

    return {
      sentiment,
      sentimentScore: Number(net.toFixed(2)),
      emotionalSignals: distressMatches.length > 0 ? distressMatches : copingMatches.length > 0 ? copingMatches : ["steady reflection"],
      distressIndicators: distressMatches,
      copingIndicators: copingMatches,
      keywords: foundKeywords.slice(0, 6),
      confidence: 0.88,
      explanation,
    };
  }
}

export const textAnalyzer = new PrototypeTextAnalyzer();

export async function analyzeText(input: string): Promise<TextAnalysisResult> {
  return textAnalyzer.analyze(input);
}
