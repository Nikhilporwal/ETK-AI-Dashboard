"use client";

import Image from "next/image";
import { Plus, Minus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountryTooltipProps {
  flag: string;
  name: string;
  heatMapScore: number;
  gdpGrowth: string;
  riskScore: number;
  totalIndicators: number;
  className?: string;
}

function CountryTooltip({
  flag,
  name,
  heatMapScore,
  gdpGrowth,
  riskScore,
  totalIndicators,
  className,
}: CountryTooltipProps) {
  return (
    <div
      className={cn(
        "absolute z-20 w-[158px] rounded-lg border border-[#CBD5E1] bg-white p-2.5 shadow-sm",
        className,
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm leading-none">{flag}</span>
          <span className="text-[11px] font-bold text-slate-800">{name}</span>
        </div>
        <button className="flex items-center gap-0.5 text-[10px] font-bold text-[#059669] hover:underline">
          Compare
          <ExternalLink size={8} strokeWidth={3} />
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px]">
          <span className="text-slate-400">Heat Map Score</span>
          <span className="font-bold text-slate-700">{heatMapScore}</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-slate-400">GDP growth</span>
          <span className="font-bold text-slate-700">{gdpGrowth}</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-slate-400">Risk score</span>
          <span className="font-bold text-slate-700">{riskScore}</span>
        </div>
        <div className="flex justify-between text-[10px]">
          <span className="text-slate-400">Total indicators used</span>
          <span className="font-bold text-slate-700">{totalIndicators}</span>
        </div>
      </div>
    </div>
  );
}

export function SimilarCountries() {
  return (
    <div className="mx-auto max-w-[1350px] px-6 pb-16">
      <h2 className="text-lg font-bold text-slate-800 mb-6 font-primary">
        Similar countries
      </h2>

      <div className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/worldMap.png"
            alt="World Map"
            fill
            className="object-cover"
            priority
          />
        </div>

        <CountryTooltip
          flag="🇳🇬"
          name="Nigeria"
          heatMapScore={69}
          gdpGrowth="4.23%"
          riskScore={22}
          totalIndicators={322}
          className="left-[46%] top-[34%]"
        />

        <CountryTooltip
          flag="🇹🇬"
          name="Togo"
          heatMapScore={69}
          gdpGrowth="4.23%"
          riskScore={22}
          totalIndicators={322}
          className="left-[29%] top-[63%]"
        />

        <div className="absolute bottom-10 right-10 flex flex-col gap-3">
          <div
            style={{
              background: "linear-gradient(135deg, #97B0FB, #072069)",
              padding: "1.5px",
              borderRadius: 14,
            }}
          >
            <button
              className="flex h-12 w-12 items-center justify-center bg-white bg-linear-to-b from-[#F0F5FF] to-white shadow-[0_4px_12px_rgba(141,162,251,0.25)] transition-all  active:scale-95"
              style={{ borderRadius: 12.5 }}
            >
              <Plus size={24} strokeWidth={2.5} className="text-[#7A8BB5]" />
            </button>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #97B0FB, #072069)",
              padding: "1.5px",
              borderRadius: 14,
            }}
          >
            <button
              className="flex h-12 w-12 items-center justify-center bg-white bg-linear-to-b from-[#F0F5FF] to-white shadow-[0_4px_12px_rgba(141,162,251,0.25)] transition-all  active:scale-95"
              style={{ borderRadius: 12.5 }}
            >
              <Minus size={24} strokeWidth={2.5} className="text-[#7A8BB5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
