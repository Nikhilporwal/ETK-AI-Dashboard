"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type MetricType = "GDP" | "Inflation" | "FX Rate" | "Industry";

const chartData = [
  { year: "2014", value: 0.8 },
  { year: "2015", value: 1.2 },
  { year: "2016", value: 0.9 },
  { year: "2017", value: 4.33 },
  { year: "2018", value: 1.5 },
  { year: "2019", value: 1.8 },
  { year: "2020", value: 0.6 },
  { year: "2021", value: 2.5 },
  { year: "2022", value: 2.1 },
  { year: "2023", value: 1.6 },
  { year: "2024", value: 1.9 },
  { year: "2025", value: 1.4 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative mb-6">
        <div className="rounded bg-[#1E3A8A] px-3 py-1.5 text-[10px] font-bold text-white shadow-lg">
          {payload[0].value}%
        </div>
        <div className="absolute -bottom-1 left-1/2 -ml-1 h-2 w-2 rotate-45 bg-[#1E3A8A]" />
      </div>
    );
  }
  return null;
};

export function TrendsHistory() {
  const [activeTab, setActiveTab] = useState<MetricType>("GDP");
  const tabs: MetricType[] = ["GDP", "Inflation", "FX Rate", "Industry"];

  return (
    <div className="mx-auto max-w-[1350px] px-6 pb-8">
      <h2 className="mb-6 font-primary text-lg font-bold text-slate-800">
        Trends & History
      </h2>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-5 py-5 text-sm font-semibold transition-all",
                  activeTab === tab
                    ? "text-slate-900"
                    : "text-slate-400 hover:text-slate-600",
                )}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2DD4BF]" />
                )}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
            Year
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="p-10">
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 40, right: 10, left: -20, bottom: 30 }}
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke="#F1F5F9"
                  strokeDasharray="0"
                />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 500 }}
                  dy={20}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94A3B8", fontWeight: 500 }}
                  tickFormatter={(val) => `${val}%`}
                  domain={[0, 5.5]}
                  ticks={[0.55, 1.25, 2.0, 3.25, 4.35, 5.5]}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#1E3A8A",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                  position={{ y: -10 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#1E3A8A"
                  strokeWidth={2}
                  fill="url(#chartGradient)"
                  dot={{
                    r: 3,
                    fill: "#1E3A8A",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 5,
                    fill: "#1E3A8A",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
