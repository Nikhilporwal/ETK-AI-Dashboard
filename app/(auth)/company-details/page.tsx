"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function CompanyDetailsPage() {
    const router = useRouter()
    const [profile, setProfile] = useState("")

    const handleContinue = () => {
        // Step mapping to 4 will follow
        // For now navigation placeholder
        // router.push("/somewhere")
    }

    return (
        <div className="w-full max-w-[600px] mx-auto space-y-8">
            <div className="space-y-3">
                <h1 className="text-3xl font-medium text-[#111827]">
                    Tell us about your company
                </h1>
                <p className="text-[#6B7280] font-medium text-sm">
                    You can provide your company profile.
                </p>
            </div>

            <div className="relative group">
                {/* Decorative border if needed or direct component usage */}
                <Textarea
                    placeholder={"Explain about your company"}
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    className="border-[#203D8E]/40"
                />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button
                    variant="social"
                    onClick={() => router.back()}
                    className="w-full sm:w-[200px]"
                >
                    Back
                </Button>
                <Button
                    variant="primary"
                    className="w-full sm:flex-1 h-14"
                    disabled={!profile.trim()}
                    onClick={handleContinue}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
