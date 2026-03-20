"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginAction } from "@/actions/auth.actions";
import { Loader } from "@/components/common/Loader";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (vars: any) => {
      const res = await loginAction(vars);
      if (res && "error" in res) throw new Error(res.error);
      return res;
    },
    onSuccess: () => {
      router.push("/company-intentions");
      router.refresh();
    },
  });

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    mutate({ email, password });
  };

  return (
    <div className="w-full max-w-[420px] mx-auto space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-medium text-[#111827]">
          Log in to access your account
        </h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#111827]">
            Email email<span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-[#203E93]"
            required
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
            required
            rightIcon={
              showPassword ? (
                <EyeOff
                  className="w-5 h-5 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="w-5 h-5 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />

          {/* Error Message Display */}
          {error && (
            <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
              {error instanceof Error
                ? error.message
                : "Invalid credentials. Please try again."}
            </p>
          )}

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#0EA497] font-bold underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Login button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full h-14 text-base font-bold bg-[#203E93] hover:bg-[#1a3275]"
          disabled={isPending}
        >
          {isPending ? <Loader className="mr-2" /> : null}
          {isPending ? "Please wait" : "Login"}
        </Button>
      </form>
    </div>
  );
}
