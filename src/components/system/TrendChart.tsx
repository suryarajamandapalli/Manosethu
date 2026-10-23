import React from "react";
import { useManosethu } from "@/lib/manosethu-store";
import { getTranslation } from "@/services/i18n/translations";
import { buildLongitudinalChartSeries } from "@/services/analytics/longitudinal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Info, TrendingUp } from "lucide-react";

export function TrendChart() {
  const { activeCase, language } = useManosethu();
  const t = getTranslation(language);

  const chartData = buildLongitudinalChartSeries(activeCase.checkInHistory);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-[#E1E6E2] bg-white p-3 shadow-md text-xs space-y-1">
          <p className="font-bold text-[#173B63]">
            {data.label} {data.isToday && "(Latest)"}
          </p>
          <p className="text-[10px] text-[#5A6E82]">{data.date}</p>
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-sm font-extrabold text-[#173B63]">{data.score}</span>
            <span className="text-[10px] text-[#5A6E82]">/ 100</span>
            <span className="ml-2 rounded px-1.5 py-0.2 bg-[#F6F7F5] text-[10px] font-bold text-[#4A5E73]">
              {data.riskLevel}
            </span>
          </div>
          {data.statusNote && (
            <p className="text-[10px] text-[#4A5E73]">{data.statusNote}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-2xl border border-[#E1E6E2] bg-white p-6 sm:p-7 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E1E6E2] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2B9C91]">
            Longitudinal Tracking
          </span>
          <h2 className="text-lg font-bold text-[#173B63]">
            {t.longitudinalTrackingTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#5A6E82]">{t.currentTrend}:</span>
          <span className="rounded-full bg-[#F6F7F5] border border-[#E1E6E2] px-3 py-0.5 text-xs font-bold text-[#173B63]">
            {activeCase.trend === "INCREASING" ? t.trendIncreasing : activeCase.trend === "IMPROVING" ? t.trendImproving : t.trendStable}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 5 }}>
            <ReferenceLine
              y={60}
              stroke="#D97706"
              strokeDasharray="4 4"
              label={{
                value: "High Review Threshold (60)",
                position: "insideTopRight",
                fill: "#D97706",
                fontSize: 10,
                fontWeight: 600,
              }}
            />

            <XAxis
              dataKey="label"
              stroke="#5A6E82"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#E1E6E2" }}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#5A6E82"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#E1E6E2" }}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#173B63"
              strokeWidth={2.5}
              activeDot={{ r: 6, fill: "#2B9C91", stroke: "#FFFFFF", strokeWidth: 2 }}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.isToday) {
                  return (
                    <svg key={payload.label} x={cx - 6} y={cy - 6} width={12} height={12}>
                      <circle cx={6} cy={6} r={5} fill="#C94C4C" stroke="#FFFFFF" strokeWidth={2} />
                    </svg>
                  );
                }
                return (
                  <circle
                    key={payload.label}
                    cx={cx}
                    cy={cy}
                    r={3.5}
                    fill="#173B63"
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend and neutral bands */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A6E82] border-t border-[#E1E6E2] pt-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#173B63]" />
            <span>Stored Check-in Records</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C94C4C]" />
            <span>Today</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-[#2B9C91]">0–29 LOW</span>
          <span className="text-[11px] font-medium text-[#173B63]">30–59 MODERATE</span>
          <span className="text-[11px] font-medium text-[#D97706]">60–79 HIGH</span>
          <span className="text-[11px] font-medium text-[#C94C4C]">80–100 VERY HIGH</span>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="flex items-start gap-2 rounded-xl bg-[#F6F7F5] p-3 text-[11px] text-[#5A6E82]">
        <Info size={14} className="text-[#5A6E82] shrink-0 mt-0.5" />
        <p>{t.longitudinalChartDisclaimer}</p>
      </div>
    </div>
  );
}
