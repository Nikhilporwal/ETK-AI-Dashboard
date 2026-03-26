"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { useGlobalContext } from "@/context/JobContext";
import {
  getJobIdAction,
  pollingAction,
  saveUserInterestsAction,
} from "@/actions/maps.actions";
import toast from "react-hot-toast";

const countryOptions = [
  { id: "Algeria", label: "Algeria" },
  { id: "Angola", label: "Angola" },
  { id: "Botswana", label: "Botswana" },
  { id: "Cameroon", label: "Cameroon" },
  { id: "Côte d'Ivoire", label: "Côte d'Ivoire" },
  { id: "Egypt", label: "Egypt" },
  { id: "Ethiopia", label: "Ethiopia" },
  { id: "Ghana", label: "Ghana" },
  { id: "Kenya", label: "Kenya" },
  { id: "Libya", label: "Libya" },
  { id: "Madagascar", label: "Madagascar" },
  { id: "Mali", label: "Mali" },
  { id: "Mauritius", label: "Mauritius" },
  { id: "Morocco", label: "Morocco" },
  { id: "Mozambique", label: "Mozambique" },
  { id: "Namibia", label: "Namibia" },
  { id: "Nigeria", label: "Nigeria" },
  { id: "Rwanda", label: "Rwanda" },
  { id: "Senegal", label: "Senegal" },
  { id: "South Africa", label: "South Africa" },
  { id: "Sudan", label: "Sudan" },
  { id: "Tanzania", label: "Tanzania" },
  { id: "Tunisia", label: "Tunisia" },
  { id: "Uganda", label: "Uganda" },
  { id: "Zimbabwe", label: "Zimbabwe" },
];

const industryOptions = [
  { id: "Agriculture", label: "Agriculture" },
  { id: "Energy", label: "Energy" },
  { id: "FMCG", label: "FMCG" },
  { id: "Financial", label: "Financial" },
  { id: "Generic", label: "Generic" },
  { id: "Health & Pharma", label: "Health & Pharma" },
  { id: "Service", label: "Service" },
  { id: "Technology", label: "Technology" },
];

export default function UserInterestsPage() {
  const router = useRouter();
  const { formData, updateData, showLoader, hideLoader, setPollingData, userDetails } =
    useGlobalContext();

  const handlePolling = async (job_id: string) => {
    if (!job_id) {
      toast.error("Job ID missing");
      return;
    }

    try {
      let maxAttempt = 0;

      while (maxAttempt < 60) {
        const result = await pollingAction(job_id);

        if (!result.success) {
          hideLoader();
          toast.error(result.error);
          return;
        }

        if (result.data.state === "error") {
          hideLoader();
          toast.error(result.data.message);
          return;
        }

        if (result.data.state === "done") {
          hideLoader();
          setPollingData(result.data);
          toast.success(result.data.message);
          router.push("/maps");
          return;
        }

        await new Promise((res) => setTimeout(res, 1000));
        maxAttempt++;
      }

      hideLoader();
      toast.error("Polling timed out");

    } catch (e) {
      hideLoader();
      toast.error("Something went wrong");
    }
  };

  const handleGetJobId = async () => {
    if (formData.countries.length === 0 || formData.industries.length === 0) {
      return;
    }

    showLoader("Generating heatmaps...");

    try {
      const [result1, result2] = await Promise.all([
        getJobIdAction(formData),
        saveUserInterestsAction({ ...formData, user_id: userDetails?.user_id }),
      ]);

      if (!result1.success) {
        toast.error(result1.error);
        return;
      }

      if (!result2.success) {
        toast.error(result2.error);
        return;
      }

      handlePolling(result1.data.job_id);
    } catch (e) {
      hideLoader();
    }
  };

  // const toggleCountry = (id: string) => {
  //   setSelectedCountries((prev) =>
  //     prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
  //   );
  // };

  // const toggleIndustry = (id: string) => {
  //   setSelectedIndustries((prev) =>
  //     prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
  //   );
  // };

  return (
    <div className="relative w-full user-preferences-identifier p-6">
      {/* Main Content Area - Aligned to Left */}
      <div className="w-full max-w-[540px] space-y-10 animate-in fade-in slide-in-from-left-6 duration-700">
        <h1 className="text-4xl font-medium text-[#111827] leading-tight">
          What countries and industries
          <br />
          are you interested in?
        </h1>

        <div className="space-y-10">
          {/* Country Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-[#111827]">
              Select country<span className="text-red-500">*</span>
            </label>
            <MultiSelect
              options={countryOptions}
              selected={formData.countries}
              onChange={(value) => updateData("countries", value)}
              placeholder="Select Country"
            />

            {/* {selectedCountries.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-4 pt-2">
                {countryOptions
                  .filter((country) => selectedCountries.includes(country.id))
                  .map((country) => (
                    <div
                      key={country.id}
                      className="flex items-center space-x-2.5 group cursor-pointer"
                    >
                      <Checkbox
                        id={`selected-${country.id}`}
                        checked={true}
                        onCheckedChange={() => toggleCountry(country.id)}
                      />
                      <label
                        htmlFor={`selected-${country.id}`}
                        className="text-sm font-semibold text-[#111827] cursor-pointer group-hover:text-[#203D8E] transition-colors"
                      >
                        {country.label}
                      </label>
                    </div>
                  ))}
              </div>
            )} */}
          </div>

          {/* Industry Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-[#111827]">
              Select industry<span className="text-red-500">*</span>
            </label>
            <MultiSelect
              options={industryOptions}
              selected={formData.industries}
              onChange={(value) => updateData("industries", value)}
              placeholder="Select Industry"
            />

            {/* {selectedIndustries.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-4 pt-2">
                {industryOptions
                  .filter((industry) =>
                    selectedIndustries.includes(industry.id),
                  )
                  .map((industry) => (
                    <div
                      key={industry.id}
                      className="flex items-center space-x-2.5 group cursor-pointer"
                    >
                      <Checkbox
                        id={`selected-ind-${industry.id}`}
                        checked={true}
                        onCheckedChange={() => toggleIndustry(industry.id)}
                      />
                      <label
                        htmlFor={`selected-ind-${industry.id}`}
                        className="text-sm font-semibold text-[#111827] cursor-pointer group-hover:text-[#203D8E] transition-colors"
                      >
                        {industry.label}
                      </label>
                    </div>
                  ))}
              </div>
            )} */}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
          <Button
            variant="social"
            onClick={() => router.back()}
            className="w-full sm:w-[180px]"
          >
            Back
          </Button>
          <Button
            variant="primary"
            className="w-full"
            disabled={
              formData.countries.length === 0 ||
              formData.industries.length === 0
            }
            onClick={handleGetJobId}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
