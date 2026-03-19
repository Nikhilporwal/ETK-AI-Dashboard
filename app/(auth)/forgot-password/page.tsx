"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
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

        <div className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#111827]">
              What&apos;s your email?<span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-[#203E93] h-12"
            />
          </div>

          {/* Continue button */}
          <Button
            variant="primary"
            className="w-full h-14 text-base bg-[#203E93] hover:bg-[#1a3275] text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
