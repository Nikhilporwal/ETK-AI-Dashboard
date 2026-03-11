"use client"

import { Button } from "@/components/ui/button"

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react"

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]*$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value.slice(-1)
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").replace(/[^0-9]/g, "").slice(0, 6)
        if (pastedData) {
            const newOtp = [...otp]
            for (let i = 0; i < pastedData.length; i++) {
                newOtp[i] = pastedData[i]
            }
            setOtp(newOtp)
            const focusIndex = Math.min(pastedData.length, 5)
            inputRefs.current[focusIndex]?.focus()
        }
    }

    return (
        <div className="w-full flex justify-center items-center py-10">
            <div className="w-full max-w-[420px] flex flex-col space-y-8">

                {/* Title */}
                <div className="text-center">
                    <h1 className="text-3xl font-medium text-[#111827]">
                        We’ve emailed you a code
                    </h1>
                    <p className="text-sm text-[#414759] mt-2">
                        We’ve sent an email to Mike.adenuga@gmail.com. Enter the code here to verify it’s you.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* OTP Boxes */}
                    <div className="flex justify-center gap-2 sm:gap-4 my-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el: HTMLInputElement | null) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-10 h-14 sm:w-16 sm:h-16 text-center text-xl font-semibold border border-[#203E93] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#203E93] focus:border-transparent transition-all bg-white"
                            />
                        ))}
                    </div>

                    {/* Verify button */}
                    <Button
                        variant="primary"
                        className="w-full h-14 text-base bg-[#203E93] hover:bg-[#1a3275] text-white rounded-lg"
                    >
                        Verify me
                    </Button>

                    {/* Resend code */}
                    <div className="text-center mt-6">
                        <span className="text-sm text-[#414759]">Can't find your code? </span>
                        <button className="text-sm text-[#2FB8A6] font-semibold hover:underline">
                            Request a new code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 