import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type IndicatorRating =
  | "Med-High"
  | "High"
  | "Low"
  | "Med-Low"
  | "Strong"
  | "Huge"
  | string;

interface IndicatorCardProps {
  title: string;
  score: string;
  trend: number;
  rating: IndicatorRating;
  className?: string;
}

const ratingColors: Record<string, { bg: string; text: string }> = {
  "Med-High": { bg: "bg-slate-100", text: "text-slate-500" },
  High: { bg: "bg-slate-100", text: "text-slate-500" },
  Low: { bg: "bg-slate-100", text: "text-slate-500" },
  "Med-Low": { bg: "bg-slate-100", text: "text-slate-500" },
  Strong: { bg: "bg-slate-100", text: "text-slate-500" },
  Huge: { bg: "bg-slate-100", text: "text-slate-500" },
};

function getRatingStyle(rating: string) {
  return ratingColors[rating] ?? { bg: "bg-slate-100", text: "text-slate-500" };
}

export function IndicatorCard({
  title,
  score,
  trend,
  rating,
  className,
}: IndicatorCardProps) {
  const isPositive = trend >= 0;
  const { bg, text } = getRatingStyle(rating);

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 leading-tight">
          {title}
        </p>
        <span
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
            bg,
            text,
          )}
        >
          {rating}
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-[26px] font-semibold leading-none text-[#414759]">
          {score}
        </span>
        <span
          className={cn(
            "mb-0.5 flex items-center gap-0.5 text-xs font-semibold",
            isPositive ? "text-emerald-500" : "text-red-400",
          )}
        >
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? `+${trend}` : trend}
        </span>
      </div>
    </div>
  );
}
