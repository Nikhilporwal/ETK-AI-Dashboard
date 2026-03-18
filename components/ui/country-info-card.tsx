"use client";

import Image from "next/image";
import { TrendingUp } from "lucide-react";
import React from "react";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #97B0FB, #072069)",
        padding: "1.5px",
        borderRadius: 11,
        display: "inline-flex",
      }}
    >
      <button
        className="flex items-center gap-[7px] bg-white px-[14px] py-[7px] text-[13px] font-medium text-[#414759] transition-colors duration-150 hover:bg-[#f0f5ff]"
        style={{ borderRadius: 9.5 }}
      >
        {icon}
        {label}
      </button>
    </div>
  );
}

interface CountryInfoCardProps {
  flag: string;
  name: string;
  description: string;
  score: string;
  trend: number;
  totalIndicators: number;
  updatedAt: string;
  actions: ActionButtonProps[];
}

export function CountryInfoCard({
  flag,
  name,
  description,
  score,
  trend,
  totalIndicators,
  updatedAt,
  actions,
}: CountryInfoCardProps) {
  return (
    <div className="-mx-6 w-auto border border-slate-200 bg-white shadow-sm">
      <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-1 items-start gap-4">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <span style={{ fontSize: 30 }}>{flag}</span>
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="mb-1 text-[22px] font-bold leading-tight text-slate-900">
                {name}
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-slate-500">
                {description}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {actions.map((action, index) => (
                  <ActionButton
                    key={index}
                    icon={action.icon}
                    label={action.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-6 border-t border-slate-200 pt-4 lg:shrink-0 lg:border-t-0 lg:pt-0 lg:pl-4">
            <div className="text-left">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#414759]">
                Score
              </p>
              <div className="flex items-center gap-2">
                <span className="text-[28px] font-semibold leading-none text-[#414759]">
                  {score}
                </span>

                <span className="flex items-center gap-0.5 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                  <TrendingUp size={11} />
                  {trend > 0 ? `+${trend}` : trend}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Updated: {updatedAt}
              </p>
            </div>

            <div className="hidden w-px self-stretch bg-slate-200 lg:block" />

            <div className="text-left">
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Total Indicators Used
              </p>
              <p className="text-[28px] font-semibold leading-none text-[#414759]">
                {totalIndicators}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
