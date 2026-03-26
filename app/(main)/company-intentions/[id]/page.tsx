"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useGlobalContext } from "@/context/JobContext";
import { getUserDataAction } from "@/actions/maps.actions";
import toast from "react-hot-toast";

const options = [
  "Trade Opportunities (D2C & B2C)",
  "JV Partnerships",
  "One-off Project",
  "Licensing / Franchising",
  "Investment / Equity",
  "Subsidiary / Branch set1-up",
];

export default function MarketEntryModelPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { formData, updateData, showLoader, hideLoader, setFormData } = useGlobalContext();

  useEffect(() => {
    if (!id) return;

    const getUserData = async () => {
      showLoader("Loading user data...");
      try {
        const result = await getUserDataAction(id);

        if (!result.success) {
          toast.error(result.error);
          return;
        }

        const profile = result.data?.profile;
        if (!profile) return;

        setFormData(profile)

      } catch (error: any) {
        toast.error(error?.message || "Failed to fetch user data.");
      } finally {
        hideLoader();
      }
    };

    getUserData();
  }, [id]);

  const toggleOption = (option: string) => {
    const current = formData.company_intentions ?? [];
    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    updateData("company_intentions", updated);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-12 py-4">
      <div className="space-y-4 text-center sm:text-left">
        <h1 className="text-3xl font-medium text-[#111827]">
          Select a market entry model
        </h1>
        <div className="flex items-center gap-2 text-[#0EA497] text-sm font-medium cursor-pointer hover:underline mx-auto sm:mx-0 w-fit">
          <div className="w-5 h-5 rounded-full bg-[#0EA497]/10 flex items-center justify-center">
            <Info className="w-3.5 h-3.5" />
          </div>
          What is a market entry model?
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-[#6B7280] text-sm font-medium">
          You can select one or more.
        </p>

        <div className="flex flex-wrap gap-3">
          {options.map((option, idx) => {
            const isSelected = formData.company_intentions?.includes(option) ?? false;

            return (
              <div
                key={idx}
                onClick={() => toggleOption(option)}
                className={`
                  flex items-center gap-3 px-6 h-14 bg-white border-2 rounded-[var(--radius-brand)] transition-all cursor-pointer select-none
                  ${isSelected
                    ? "border-[#203D8E] bg-[#E8EEFB]/30 shadow-sm"
                    : "border-[#A5B4FC]/20 hover:border-[#A5B4FC]/50 hover:bg-slate-50"
                  }
                `}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleOption(option)}
                />
                <span
                  className={`text-sm font-semibold transition-colors ${isSelected ? "text-[#203D8E]" : "text-[#4B5563]"}`}
                >
                  {option}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Button
          variant="primary"
          className="w-full sm:flex-1"
          disabled={(formData.company_intentions?.length ?? 0) === 0}
          onClick={() => router.push("/company-details")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}