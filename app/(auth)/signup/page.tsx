"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signupAction } from "@/actions/auth.actions";
import { useGlobalContext } from "@/context/JobContext";
import toast from "react-hot-toast";

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

export default function SignupPage() {
  const router = useRouter();
  const { showLoader, hideLoader, isLoading } = useGlobalContext();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const passedCount = PASSWORD_REQUIREMENTS.filter((r) => r.test(password)).length;
  const { label, color, barColor } = getStrengthMeta(passedCount);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passedCount < 4 || !email) return;

    showLoader("Creating your account...");

    try {
      const result = await signupAction({ email, password });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(result.data.data.message || "Account created successfully");
      router.push("/company-intentions");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      hideLoader();
    }
  };

  return (
    <form onSubmit={handleSignup} className="w-full max-w-[500px] mx-auto space-y-8">
      <div className="space-y-6">

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#111827]">
            What&apos;s your email? <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[#203E93]"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#111827]">
            Choose a password <span className="text-red-500">*</span>
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[#203E93]"
            rightIcon={
              showPassword
                ? <EyeOff onClick={() => setShowPassword(false)} className="w-5 h-5 cursor-pointer" />
                : <Eye onClick={() => setShowPassword(true)} className="w-5 h-5 cursor-pointer" />
            }
          />
        </div>

        {/* Password Strength */}
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
      </div>

      {/* Submit */}
      <div className="space-y-6 text-center">
        <Button
          type="submit"
          variant="primary"
          className="w-full h-14 text-base font-bold"
          disabled={passedCount < 4 || isLoading}
        >
          {isLoading ? "Please wait..." : "Get started"}
        </Button>

        <p className="text-xs text-slate-500">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-[#0EA497] font-semibold underline">Terms & Conditions</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-[#0EA497] font-semibold underline">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}