"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSelect } from "@/components/ui/multi-select"

const countryOptions = [
    { id: "nigeria", label: "Nigeria" },
    { id: "south-africa", label: "South Africa" },
    { id: "togo", label: "Togo" },
]

const industryOptions = [
    { id: "agriculture", label: "Agriculture" },
    { id: "oil-gas-1", label: "Oil & Gas" },
    { id: "oil-gas-2", label: "Oil & Gas" },
    { id: "telecoms", label: "Telecoms" },
    { id: "health", label: "Health" },
]

export default function UserInterestsPage() {
    const router = useRouter()

    // Default selections matching the mockup
    const [selectedCountries, setSelectedCountries] = useState<string[]>(["nigeria", "south-africa", "togo"])
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>(["agriculture", "oil-gas-1", "oil-gas-2", "telecoms", "health",])

    const toggleCountry = (id: string) => {
        setSelectedCountries(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const toggleIndustry = (id: string) => {
        setSelectedIndustries(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    return (
        <div className="relative w-full user-interest-identifier">
            {/* Main Content Area - Aligned to Left */}
            <div className="w-full max-w-[540px] space-y-10 animate-in fade-in slide-in-from-left-6 duration-700">
                <h1 className="text-4xl font-medium text-[#111827] leading-tight">
                    What countries and industries<br />
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
                            selected={selectedCountries}
                            onChange={setSelectedCountries}
                            placeholder="Select Country"
                        />

                        {selectedCountries.length > 0 && (
                            <div className="flex flex-wrap gap-x-6 gap-y-4 pt-2">
                                {countryOptions
                                    .filter((country) => selectedCountries.includes(country.id))
                                    .map((country) => (
                                        <div key={country.id} className="flex items-center space-x-2.5 group cursor-pointer">
                                            <Checkbox
                                                id={`selected-${country.id}`}
                                                checked={true}
                                                onCheckedChange={() => toggleCountry(country.id)}
                                            />
                                            <label htmlFor={`selected-${country.id}`} className="text-sm font-semibold text-[#111827] cursor-pointer group-hover:text-[#203D8E] transition-colors">
                                                {country.label}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Industry Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-semibold text-[#111827]">
                            Select industry<span className="text-red-500">*</span>
                        </label>
                        <MultiSelect
                            options={industryOptions}
                            selected={selectedIndustries}
                            onChange={setSelectedIndustries}
                            placeholder="Select Industry"
                        />

                        {selectedIndustries.length > 0 && (
                            <div className="flex flex-wrap gap-x-6 gap-y-4 pt-2">
                                {industryOptions
                                    .filter((industry) => selectedIndustries.includes(industry.id))
                                    .map((industry) => (
                                        <div key={industry.id} className="flex items-center space-x-2.5 group cursor-pointer">
                                            <Checkbox
                                                id={`selected-ind-${industry.id}`}
                                                checked={true}
                                                onCheckedChange={() => toggleIndustry(industry.id)}
                                            />
                                            <label htmlFor={`selected-ind-${industry.id}`} className="text-sm font-semibold text-[#111827] cursor-pointer group-hover:text-[#203D8E] transition-colors">
                                                {industry.label}
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        )}
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
                        disabled={selectedCountries.length === 0 || selectedIndustries.length === 0}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}
