import { CheckInResponses, DistressComputationResult, computeDistressScore } from "../scoring/distress-engine";

export interface AIAnalysisRequest {
  caseId: string;
  responses: CheckInResponses;
  previousScore?: number;
  language?: string;
}

export async function analyzeCheckInWithAI(
  request: AIAnalysisRequest
): Promise<DistressComputationResult> {
  // Check if server-side, Vite client-side, or environment Gemini key is configured
  const apiKey =
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (import.meta as any).env?.GEMINI_API_KEY ||
    (typeof process !== "undefined" ? process.env?.GEMINI_API_KEY : undefined) ||
    "";

  // If Gemini API is available and can be called server-side
  if (apiKey && apiKey.trim().length > 0) {
    try {
      const prompt = `You are the AI distress analysis engine for MANOSETHU, an AI-assisted psychological distress monitoring and early risk identification platform.
Analyze the following check-in data and output strictly valid JSON matching this schema:
{
  "distressScore": number (0-100),
  "riskLevel": "LOW" | "MODERATE" | "HIGH" | "VERY HIGH",
  "trend": "IMPROVING" | "STABLE" | "INCREASING",
  "escalationRisk": "LOW" | "MODERATE" | "ELEVATED",
  "signals": string[],
  "explanation": string,
  "recommendedSupport": string[],
  "requiresHumanReview": boolean
}
RULES:
1. Do NOT make clinical psychiatric diagnoses (e.g. no "depression", "PTSD").
2. Dynamic Distress Score must range 0-100 based on feeling: ${request.responses.feeling}, safety: ${request.responses.safety}, sleep: ${request.responses.experiences.sleep}, worry: ${request.responses.experiences.worry}, concentration: ${request.responses.experiences.concentration}.
3. Text note: "${request.responses.feelingNote || ""}".
4. Previous score: ${request.previousScore ?? 50}.
Output only valid JSON:`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          if (typeof parsed.distressScore === "number" && Array.isArray(parsed.signals)) {
            return parsed as DistressComputationResult;
          }
        }
      }
    } catch (err) {
      console.warn("Gemini service query returned error. Falling back to deterministic scoring engine:", err);
    }
  }

  // Graceful deterministic local scoring fallback
  return computeDistressScore(request.responses, request.previousScore);
}
