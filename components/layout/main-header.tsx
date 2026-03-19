"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Centralized step configuration
const stepConfigs: Record<string, { step: number; total: number }> = {
  //   "/signup": { step: 1, total: 4 },
  "/market-entry-model": { step: 2, total: 4 },
  "/company-details": { step: 3, total: 4 },
  "/user-interests": { step: 4, total: 4 },

  //   "/forgot-password": { step: 1, total: 3 },
  //   "/verify-otp": { step: 2, total: 3 },
  //   "/reset-password": { step: 3, total: 3 },
};

export function MainHeader() {
  const pathname = usePathname();
  const { step: currentStep = 0, total: totalSteps = 4 } =
    stepConfigs[pathname] || {};

  const progress = (currentStep / totalSteps) * 100;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F8F9FC]/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 h-[80px] flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo-with-name.png"
            alt="GlobalWise"
            width={140}
            height={40}
            priority
          />
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-[2px] bg-slate-100">
        {/* Green progress fill */}
        <div
          className="absolute top-0 left-0 h-full bg-[#1FD3C8] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />

        {/* Step indicator badge */}
        {currentStep > 0 && (
          <div
            className="absolute -bottom-4 transition-all duration-500 ease-in-out"
            style={{
              left: `calc(${progress}% - ${currentStep === totalSteps ? "45px" : "20px"})`,
            }}
          >
            <div className="bg-white border border-[#A5B4FC]/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-lg px-3 py-1 text-[12px] font-bold text-slate-500 whitespace-nowrap">
              {currentStep}/{totalSteps}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
