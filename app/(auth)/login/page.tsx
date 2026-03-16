"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        // Mock Login Flow
        if (email.trim() && password.trim() && email === "test@email.com" && password === "Test@11") {
            localStorage.setItem("user_token", "mock_token_123")
            router.push("/market-entry-model")
        } else {
            alert("Please provide valid email and password")
        }
    }

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    onClick={handleLogin}
                >
                    Log in
                </Button>

            </div>
        </div>
    )
}