"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="w-full max-w-[420px] mx-auto space-y-8">

            {/* Title */}
            <div className="text-center">
                <h1 className="text-3xl font-medium text-[#111827]">
                    Log in to access your account
                </h1>
            </div>

            <div className="space-y-6">

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#111827]">
                        Email address<span className="text-red-500">*</span>
                    </label>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="border-[#203E93]"
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#111827]">
                        Enter password<span className="text-red-500">*</span>
                    </label>

                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="border-[#203E93]"
                        rightIcon={
                            showPassword ? (
                                <EyeOff
                                    className="w-5 h-5 cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <Eye
                                    className="w-5 h-5 cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )
                        }
                    />

                    {/* Forgot password */}
                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-sm text-[#0EA497] font-bold underline">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                {/* Login button */}
                <Button
                    variant="primary"
                    className="w-full h-14 text-base"
                >
                    Log in
                </Button>

            </div>
        </div>
    )
}