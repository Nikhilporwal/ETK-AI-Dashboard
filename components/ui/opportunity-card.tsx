"use client";

import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface OpportunityCardProps {
  title: string;
  badgeText: string;
  description: string;
  className?: string;
}

export function OpportunityCard({
  title,
  badgeText,
  description,
  className,
}: OpportunityCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#F0F5FF] bg-[#F8FAFF] p-5 shadow-xs transition-all hover:shadow-sm",
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-3">
        <h3 className="text-sm font-semibold text-[#1E293B]">{title}</h3>
        <span className="shrink-0 rounded-full bg-[#D1FAE5] px-2.5 py-0.5 text-[10px] font-bold text-[#059669]">
          {badgeText}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-[#64748B]">{description}</p>
    </div>
  );
}
