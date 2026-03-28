"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// Centralized step configuration
const stepConfigs: Record<string, { step: number; total: number }> = {
  "/company-intentions": { step: 2, total: 4 },
  "/company-details": { step: 3, total: 4 },
  "/user-preferences": { step: 4, total: 4 },
};

const navigation = [
  { name: "Overview", href: "/overview" },
  { name: "Watchlist", href: "/watchlist" },
  { name: "Compare", href: "/compare" },
];

export function MainHeader() {
  const pathname = usePathname();
  const { step: currentStep = 0, total: totalSteps = 4 } =
    stepConfigs[pathname] || {};

  const progress = (currentStep / totalSteps) * 100;

  // Check if we are in a step-based flow
  const isSetupFlow = currentStep > 0;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-[80px] flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-with-name.png"
              alt="GlobalWise"
              width={140}
              height={40}
              priority
              className="object-contain h-7 md:h-9 w-auto"
            />
          </Link>
        </div>

        {/* Center: Navigation - Matches image central container */}
        {pathname == "/maps" && <nav className="hidden lg:flex items-center bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 p-1 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          {navigation.map((item) => {
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-6 py-2 text-sm font-bold transition-all duration-200 text-[#475467] hover:text-[#1B3168] hover:bg-white/40 rounded-xl"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>}

        {/* Right side actions - Matches image layout */}
        {pathname == "/maps" && <div className="flex items-center gap-3">
          <Button
            className="h-11 rounded-2xl bg-[#E8EEFB] hover:bg-[#D9E5FF] text-[#22459D] font-bold px-4 md:px-5 border border-white shadow-sm transition-all active:scale-95"
          >
            <span className="hidden sm:inline">New report</span>
            <span className="sm:hidden">+</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-2xl bg-white/40 backdrop-blur-md border-white/60 text-[#475467] hover:bg-white/60 shadow-sm"
          >
            <Bell className="w-5 h-5 fill-[#475467]/5" />
          </Button>

          <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 py-1.5 pl-1.5 pr-4 cursor-pointer hover:bg-white/60 transition-all shadow-sm group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF9D7E] to-[#CD82FF] shadow-inner border border-white/40" />
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-[#1B3168] hidden md:inline">ademola.paylor...</span>
              <ChevronDown className="w-4 h-4 text-[#475467] group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
        }

        {/* Progress Bar - Only visible during setup flows */}
        {isSetupFlow && (
          <div className="relative w-full h-[2px] bg-slate-100/40">
            <div
              className="absolute top-0 left-0 h-full bg-[#1FD3C8] transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />

            {currentStep > 0 && (
              <div
                className="absolute -bottom-4 transition-all duration-500 ease-in-out"
                style={{
                  left: `calc(${progress}% - ${currentStep === totalSteps ? "45px" : "20px"})`,
                }}
              >
                <div className="bg-white border border-[#A5B4FC]/30 shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-lg px-2 py-0.5 text-[10px] font-bold text-slate-500 whitespace-nowrap">
                  {currentStep}/{totalSteps}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
