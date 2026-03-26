"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth.actions";
import { useGlobalContext } from "@/context/JobContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { showLoader, hideLoader, isLoading, setUserDetails } = useGlobalContext();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    showLoader("Logging in...");

    try {
      const result = await loginAction({ email, password });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      // ✅ corrected: directly use result.data (AuthData)
      setUserDetails(result.data);
      toast.success("Logged in successfully!");

      router.push(`/company-intentions/${result.data.user_id}`);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-medium text-[#111827]">
          Log in to access your account
        </h1>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#111827]">
            Email <span className="text-red-500">*</span>
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
            Password <span className="text-red-500">*</span>
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
                ? <EyeOff onClick={() => setShowPassword(false)} className="w-5 h-5 cursor-pointer text-gray-500" />
                : <Eye onClick={() => setShowPassword(true)} className="w-5 h-5 cursor-pointer text-gray-500" />
            }
          />
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-[#0EA497] font-bold underline">
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          className="w-full h-14 text-base font-bold bg-[#203E93] hover:bg-[#1a3275]"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : "Login"}
        </Button>
      </form>
    </div>
  );
}