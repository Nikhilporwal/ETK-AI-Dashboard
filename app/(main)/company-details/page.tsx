"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import { useGlobalContext } from "@/context/JobContext";

export default function CompanyDetailsPage() {
  const router = useRouter();
  const { formData, updateData } = useGlobalContext();

  const text = formData.company_profile || "";

  const charCount = text.length;

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const isValidText = text.trim().length >= 70;
  console.log(formData);

  const isAllValid =
    isValidText &&
    formData.business_type.length > 0 &&
    formData.business_stage.length > 0 &&
    formData.business_turnover.length > 0 &&
    formData.company_intentions.length > 0 &&
    formData.business_timeline.length > 0 &&
    formData.business_clients.length > 0 &&
    formData.business_deal_size.length > 0 &&
    formData.business_product_adaptation.length > 0 &&
    formData.business_international_experience.length > 0 &&
    formData.business_international_enquiries.length > 0 &&
    formData.business_budget.length > 0 &&
    formData.business_growth_export_team.length > 0 &&
    formData.business_preferences.length > 0 &&
    formData.business_risk_appetite.length > 0 &&
    formData.business_local_partners.length > 0 &&
    formData.business_type_of_support.length > 0;

  const renderSelect = (
    label: string,
    key: keyof typeof formData,
    options: string[],
    isMulti = false,
    maxSelection?: number
  ) => (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{label}</p>

      <MultiSelect
        options={options.map((o) => ({ id: o, label: o }))}
        selected={(formData[key] as string[]) || []}
        onChange={(v) => updateData(key, v as any)}
        isMulti={isMulti}
        maxSelection={maxSelection}
      />
    </div>
  );

  return (
    <div className="w-full max-w-[600px] mx-auto space-y-8 py-4">
      <h1 className="text-3xl font-medium">
        Tell us about your company
      </h1>

      {/* TEXTAREA */}
      <Textarea
        value={formData.company_profile}
        onChange={(e) =>
          updateData("company_profile", e.target.value)
        }
        placeholder="Please provide your compay profile"
        className="h-[120px]"
      />

      <div className="flex justify-between text-sm text-[#6B7280]">
        <span className={isValidText ? "text-green-600" : "text-red-500"}>
          Minimum 70 characters required
        </span>

        <span>
          {wordCount} words • {charCount} characters
        </span>
      </div>

      {renderSelect("Business type", "business_type", [
        "Product-based",
        "Service-based",
        "Digital / tech",
      ])}

      {renderSelect("Stage", "business_stage", [
        "Early-stage",
        "Growing",
        "Established",
        "Already exporting",
      ])}

      {renderSelect("Turnover", "business_turnover", [
        "< £250k",
        "£250k – £1m",
        "£1m – £10m",
        "£10m+",
      ])}

      {renderSelect(
        "Growth goals",
        "company_intentions",
        [
          "Increase revenue",
          "Enter new markets",
          "Find distributors/partners",
          "Raise investment",
          "Relocate supply chain",
        ],
        true,
        2
      )}

      {renderSelect(
        "Preferences",
        "business_preferences",
        [
          "Fast revenue",
          "Low risk",
          "High growth potential",
          "Strategic positioning",
        ],
        true,
        2
      )}

      {renderSelect("Timeline", "business_timeline", [
        "Immediately (0–6 months)",
        "6–12 months",
        "12+ months",
      ])}

      {renderSelect("Clients", "business_clients", [
        "Consumers (B2C)",
        "Businesses (B2B)",
        "Government / Institutions",
      ])}

      {renderSelect("Deal size", "business_deal_size", [
        "< £5k",
        "£5k – £50k",
        "£50k – £250k",
        "£250k+",
      ])}

      {renderSelect("Product adaptation", "business_product_adaptation", [
        "No",
        "Minor changes",
        "Significant adaptation",
      ])}

      {renderSelect(
        "International experience",
        "business_international_experience",
        ["Yes", "No"]
      )}

      {renderSelect(
        "International enquiries",
        "business_international_enquiries",
        ["Yes, regularly", "Occasionally", "Not yet"]
      )}

      {renderSelect("Budget", "business_budget", [
        "< £25k",
        "£25k – £100k",
        "£100k – £500k",
        "£500k+",
      ])}

      {renderSelect("Export team", "business_growth_export_team", [
        "Yes",
        "No",
      ])}

      {renderSelect("Risk appetite", "business_risk_appetite", [
        "Low",
        "Medium",
        "High",
      ])}

      {renderSelect("Local partners", "business_local_partners", [
        "Yes",
        "No",
        "Not sure",
      ])}

      {renderSelect("Support type", "business_type_of_support", [
        "Market insights",
        "Finding partners",
        "Market entry execution",
        "Investment support",
      ])}

      {!isAllValid && (
        <p className="text-sm text-red-500 font-semibold">
          Please complete all required fields to continue
        </p>
      )}

      {/* BUTTONS */}
      <div className="flex gap-4">
        <Button onClick={() => router.back()} variant="social">
          Back
        </Button>

        <Button
          disabled={!isAllValid}
          onClick={() => router.push("/user-preferences")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}