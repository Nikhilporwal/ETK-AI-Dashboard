"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingDown } from "lucide-react";

type Industry = "Technology" | "Finance" | "Manufacturing";

interface IndustryMetricProps {
  label: string;
  value: string;
  className?: string;
}

const industryMetrics = [
  {
    label: "Market growth",
    value: "14% YoY",
  },
  {
    label: "Investment",
    value: "$42.3B",
  },
  {
    label: "Market growth",
    value: "14% YoY",
  },
  {
    label: "Investment",
    value: "$42.3B",
  },
  {
    label: "Market growth",
    value: "14% YoY",
    className: "md:col-span-2",
  },
  {
    label: "Investment",
    value: "$42.3B",
    className: "md:col-span-2",
  },
];

function IndustryMetricCard({ label, value, className }: IndustryMetricProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-[#F8FAFF] p-4 border border-[#F0F5FF]",
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-700">{value}</p>
    </div>
  );
}

export function IndustryAnalysis() {
  const [activeTab, setActiveTab] = useState<Industry>("Technology");

  const tabs: Industry[] = ["Technology", "Finance", "Manufacturing"];

  return (
    <div className="mx-auto max-w-[1350px] px-6 pb-8">
      <h2 className="text-lg font-bold text-slate-800 mb-6 underline-offset-4 decoration-2 decoration-[#2DD4BF]">
        Industry analysis
      </h2>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-slate-100 flex px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-4 text-sm font-semibold transition-all relative",
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

        {/* Content */}
        <div className="p-8">
          {/* Score Area */}
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1">
              SCORE
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[32px] font-bold text-[#1E293B]">
                60/100
              </span>
              <div className="flex items-center gap-1 text-[#EF4444] font-bold text-sm">
                <TrendingDown size={18} />
                <span>-10</span>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-4">
            {industryMetrics.map((metric, index) => (
              <IndustryMetricCard
                key={metric.label + metric.value + index}
                {...metric}
              />
            ))}
          </div>

          {/* Market Narrative */}
          <div className="border-t border-slate-100 pt-8">
            <h3 className="text-sm font-bold text-slate-800 mb-4">
              Market narrative
            </h3>
            <div className="rounded-xl bg-[#F8FAFF] border border-[#F0F5FF] p-6">
              <p className="text-sm leading-relaxed text-slate-500">
                Office ipsum you must be muted. Other agile good already cost
                requirements criticality explore. Believe looking take high
                today another. By whatever revision driving asserts shoulder
                unpack competitors container switch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
