"use client";

import { forgotPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGlobalContext } from "@/context/JobContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const { showLoader, hideLoader, isLoading } = useGlobalContext();

  const handleForgotPassword = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    showLoader("Sending reset link...");

    try {
      const result = await forgotPasswordAction({ email });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Password reset link sent to your email");
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-10">
      <div className="w-full max-w-[420px] flex flex-col space-y-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-medium text-[#111827]">
            Did you forget your password?
          </h1>
          <p className="text-sm text-[#414759] mt-2">
            Don’t worry, we’ll get you back into your account.
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-6">
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

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            className="w-full h-14 text-base bg-[#203E93] hover:bg-[#1a3275] text-white"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}