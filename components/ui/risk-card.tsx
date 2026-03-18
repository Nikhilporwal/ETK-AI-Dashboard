"use client";

import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export type RiskSeverity = "Severe" | "Medium" | "Low";

interface RiskCardProps {
  title: string;
  severity: RiskSeverity;
  description: string;
  mitigations?: string[];
  className?: string;
}

const severityStyles: Record<
  RiskSeverity,
  { bg: string; badgeBg: string; badgeText: string; border: string }
> = {
  Severe: {
    bg: "bg-[#FFF5F5]",
    badgeBg: "bg-[#FEE2E2]",
    badgeText: "text-[#991B1B]",
    border: "border-[#FEE2E2]",
  },
  Medium: {
    bg: "bg-[#FFF9F2]",
    badgeBg: "bg-[#FCD2C5]",
    badgeText: "text-[#603006]",
    border: "border-[#FEF3C7]",
  },
  Low: {
    bg: "bg-[#F8FAFC]",
    badgeBg: "bg-[#E2E8F0]",
    badgeText: "text-[#475569]",
    border: "border-[#E2E8F0]",
  },
};

export function RiskCard({
  title,
  severity,
  description,
  mitigations = [],
  className,
}: RiskCardProps) {
  const styles = severityStyles[severity] || severityStyles.Low;

  return (
    <div
      className={cn(
        "rounded-xl border p-5 shadow-xs transition-all hover:shadow-sm",
        styles.bg,
        styles.border,
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-3">
        <h3 className="text-sm font-semibold text-[#1E293B]">{title}</h3>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
            styles.badgeBg,
            styles.badgeText,
          )}
        >
          {severity}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-[#64748B]">{description}</p>

      {mitigations.length > 0 && (
        <div className="mt-4 rounded-lg border border-white/50 bg-white/40 p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
            <ShieldCheck size={14} className="text-[#94A3B8]" />
            Mitigation(s)
          </div>
          <ul className="space-y-1.5">
            {mitigations.map((mitigation, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-[#64748B]"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#94A3B8]" />
                {mitigation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
