"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/JobContext";
import { verifyOtpAction } from "@/actions/auth.actions";

const PASSWORD_REQUIREMENTS = [
    { label: "At least 6 characters long", test: (p: string) => p.length >= 6 },
    { label: "At least 1 uppercase letter (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
    { label: "At least 1 number (0-9)", test: (p: string) => /[0-9]/.test(p) },
    { label: "At least 1 special character (!@#$%^&*)", test: (p: string) => /[!@#$%^&*]/.test(p) },
];

function getStrengthMeta(passedCount: number) {
    const levels = ["Empty", "Weak", "Fair", "Good", "Strong"] as const;
    const colors = ["text-[#6B7280]", "text-red-500", "text-orange-500", "text-yellow-500", "text-green-600"];
    const bars = ["bg-slate-100", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];

    return {
        label: levels[passedCount] ?? "Empty",
        color: colors[passedCount] ?? colors[0],
        barColor: bars[passedCount] ?? bars[0],
    };
}

function VerifyOtpForm() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const router = useRouter();
    const { showLoader, hideLoader, isLoading } = useGlobalContext();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const passedCount = PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length;
    const { label, color, barColor } = getStrengthMeta(passedCount);

    // OTP handlers
    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text/plain").replace(/[^0-9]/g, "").slice(0, 6);

        if (pasted) {
            const newOtp = [...otp];
            pasted.split("").forEach((char, i) => (newOtp[i] = char));
            setOtp(newOtp);
        }
    };

    // FORM SUBMIT
    const handleVerify = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            return toast.error("Please enter complete OTP");
        }

        if (passedCount < 4) {
            return toast.error("Password does not meet requirements");
        }

        showLoader("Verifying...");

        try {
            if (!email) {
                toast.error("Email is required");
                return;
            }

            const result = await verifyOtpAction({
                email: decodeURIComponent(email),
                otp: otpValue,
                new_password: password,
            });

            if (!result.success) {
                toast.error(result.error);
                return;
            }

            toast.success("Verified successfully!");
            router.push("/login");
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            hideLoader();
        }
    };

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full max-w-[420px] flex flex-col space-y-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border">

                {/* Title */}
                <div className="text-center">
                    <h1 className="text-3xl font-medium text-[#111827]">
                        We’ve emailed you a code
                    </h1>
                    <p className="text-sm text-[#414759] mt-2">
                        {`We’ve sent an email to ${email ? decodeURIComponent(email) : "your email"}. Enter the code here to verify it’s you.`}
                    </p>
                </div>

                {/*  FORM START */}
                <form onSubmit={handleVerify} className="space-y-6">

                    {/* OTP */}
                    <div className="flex justify-center gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-center border rounded-lg focus-visible:outline-none focus-visible:border-[#3B5F9A] focus-visible:ring-1 focus-visible:ring-[#3B5F9A]"
                            />
                        ))}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">
                            Choose Password
                        </label>

                        <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            rightIcon={
                                showPassword
                                    ? <EyeOff onClick={() => setShowPassword(false)} className="cursor-pointer" />
                                    : <Eye onClick={() => setShowPassword(true)} className="cursor-pointer" />
                            }
                        />
                    </div>

                    {/* Strength UI */}
                    <div className="bg-white border border-[#A5B4FC]/30 rounded-2xl p-6 space-y-4 shadow-sm">
                        <span className={cn("text-sm font-medium", color)}>{label}</span>

                        <div className="flex gap-2 h-1">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className={cn("flex-1 rounded-full transition-all duration-300", i <= passedCount ? barColor : "bg-slate-100")}
                                />
                            ))}
                        </div>

                        <ul className="space-y-2">
                            {PASSWORD_REQUIREMENTS.map((req, idx) => {
                                const passed = req.test(password);
                                return (
                                    <li key={idx} className={cn("flex items-center gap-2 text-xs", passed ? "text-[#0EA497]" : "text-[#6B7280]")}>
                                        <Check className={cn("w-3 h-3", passed ? "text-[#0EA497]" : "text-slate-300")} />
                                        {req.label}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={passedCount < 4 || isLoading}
                        className="w-full h-14 bg-[#203E93] text-white"
                    >
                        {isLoading ? "Please wait..." : "Update Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtpForm />
        </Suspense>
    );
}