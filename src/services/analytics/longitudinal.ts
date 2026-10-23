import { DistressComputationResult, TrendDirection } from "../scoring/distress-engine";

export interface StoredCheckInRecord {
  id: string;
  caseId: string;
  timestamp: string;
  feeling: string;
  feelingNote?: string;
  safety: string;
  experiences: Record<string, string>;
  voiceTranscript?: string;
  signals: string[];
  distressScore: number;
  riskLevel: string;
  trend: TrendDirection;
  escalationRisk: string;
}

export interface LongitudinalChartPoint {
  id: string;
  label: string;
  date: string;
  score: number;
  riskLevel: string;
  trend: TrendDirection;
  isToday?: boolean;
  statusNote?: string;
}

export function buildLongitudinalChartSeries(
  records: StoredCheckInRecord[]
): LongitudinalChartPoint[] {
  if (!records || records.length === 0) return [];

  return records.map((rec, index) => {
    const isLatest = index === records.length - 1;
    const dateObj = new Date(rec.timestamp);
    const formattedDate = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
      : `Check-in ${index + 1}`;

    return {
      id: rec.id,
      label: isLatest ? "Today" : `Check-in ${index + 1}`,
      date: isLatest ? "Today" : formattedDate,
      score: rec.distressScore,
      riskLevel: rec.riskLevel,
      trend: rec.trend,
      isToday: isLatest,
      statusNote: rec.signals.slice(0, 2).join(", "),
    };
  });
}
