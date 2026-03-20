"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { signupAction } from "@/actions/auth.actions";
import { Loader } from "@/components/common/Loader";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // Added email state
  const [password, setPassword] = useState("");

  // TanStack Mutation for Signup
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (vars: any) => {
      const res = await signupAction(vars);
      if (res && "error" in res) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      router.push("/maps");
      router.refresh();
    },
  });

  const requirements = [
    { label: "At least 6 characters long", test: (p: string) => p.length >= 6 },
    {
      label: "At least 1 uppercase letter (A-Z)",
      test: (p: string) => /[A-Z]/.test(p),
    },
    { label: "At least 1 number (0-9)", test: (p: string) => /[0-9]/.test(p) },
    {
      label: "At least 1 special character (!@#$%^&*)",
      test: (p: string) => /[!@#$%^&*]/.test(p),
    },
  ];

  const passedCount = requirements.filter((r) => r.test(password)).length;

  const handleSignup = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (passedCount < 4 || !email) return;

    mutate({
      email,
      password,
    });
  };

  const getStrengthLabel = () => {
    if (!password) return "Empty";
    if (passedCount === 1) return "Weak";
    if (passedCount === 2) return "Fair";
    if (passedCount === 3) return "Good";
    if (passedCount === 4) return "Strong";
  };

  const getStrengthColorClass = () => {
    const label = getStrengthLabel();
    if (label === "Weak") return "text-red-500";
    if (label === "Fair") return "text-orange-500";
    if (label === "Good") return "text-yellow-500";
    if (label === "Strong") return "text-green-600";
    return "text-[#6B7280]";
  };

  return (
    <form
      onSubmit={handleSignup}
      className="w-full max-w-[500px] mx-auto space-y-8"
    >
      <div className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#111827]">
            What&apos;s your email?<span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter your email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[#203E93]"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#111827]">
            Choose a password<span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-[#203E93]"
            required
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
        </div>

        {/* Password Strength Box */}
        <div className="bg-white border border-[#A5B4FC]/30 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="space-y-2">
            <span
              className={cn(
                "text-sm font-medium transition-colors",
                getStrengthColorClass(),
              )}
            >
              {getStrengthLabel()}
            </span>
            <div className="flex gap-2 h-1">
              {[1, 2, 3, 4].map((i) => {
                let bgColor = "bg-slate-100";
                if (i <= passedCount) {
                  if (passedCount === 1) bgColor = "bg-red-500";
                  else if (passedCount === 2) bgColor = "bg-orange-500";
                  else if (passedCount === 3) bgColor = "bg-yellow-500";
                  else if (passedCount === 4) bgColor = "bg-green-500";
                }
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 rounded-full transition-all duration-300",
                      bgColor,
                    )}
                  />
                );
              })}
            </div>
          </div>

          <ul className="space-y-2">
            {requirements.map((req, idx) => {
              const isPassed = req.test(password);
              return (
                <li
                  key={idx}
                  className={cn(
                    "flex items-center gap-2 text-xs font-medium transition-colors",
                    isPassed ? "text-[#0EA497]" : "text-[#6B7280]",
                  )}
                >
                  <Check
                    className={cn(
                      "w-3 h-3 transition-colors",
                      isPassed ? "text-[#0EA497]" : "text-slate-300",
                    )}
                  />
                  {req.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* API Error Message */}
        {error && (
          <p className="text-sm text-red-500 text-center font-medium">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        )}
      </div>

      <div className="space-y-6 text-center">
        <Button
          type="submit"
          variant="primary"
          className="w-full h-14 text-base font-bold"
          disabled={passedCount < 4 || isPending}
        >
          {isPending ? (
            <Loader variant="full" message="Creating account..." />
          ) : (
            "Get started"
          )}
        </Button>

        <p className="text-xs text-slate-500 text-center">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="text-[#0EA497] font-semibold underline"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-[#0EA497] font-semibold underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
