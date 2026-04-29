"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  User,
  Crown,
  Gift,
  ChevronDown,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useGlobalContext } from "@/context/JobContext";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userDetails } = useGlobalContext();
  const router = useRouter()
  const pathname = usePathname();

  const { step: currentStep = 0, total: totalSteps = 4 } =
    stepConfigs[pathname] || {};

  const progress = (currentStep / totalSteps) * 100;
  const isSetupFlow = currentStep > 0;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 h-[80px] flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/company-intentions" className="flex items-center gap-2">
          <Image
            src="/images/logo-with-name.png"
            alt="GlobalWise"
            width={140}
            height={40}
            priority
            className="object-contain h-7 md:h-9 w-auto"
          />
        </Link>

        {/* Navigation */}
        {pathname === "/overview" && (
          <nav className="hidden lg:flex items-center bg-white/40 backdrop-blur-md rounded-md p-1 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-6 py-2 text-sm font-bold transition-all",
                  pathname === item.href
                    ? "text-[#1B3168]"
                    : "text-[#475467] hover:text-[#1B3168]"
                )}
              >
                {item.name}

                {/* Underline */}
                <span
                  className={cn(
                    "absolute left-0 -bottom-1 h-[2px] w-full bg-[#1FD3C8] transition-all duration-300",
                    pathname === item.href ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  )}
                />
              </Link>
            ))}
          </nav>
        )}

        {/* Right Actions */}
        {pathname === "/overview" && (
          <div className="flex items-center gap-3">
            {/* Notification */}
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-2xl bg-white/40 backdrop-blur-md border-white/60 text-[#475467] hover:bg-white/60 shadow-sm"
            >
              <Bell className="w-5 h-5" />
            </Button>

            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 py-1.5 pl-1.5 pr-4 cursor-pointer hover:bg-white/60 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF9D7E] to-[#CD82FF]" />

                <span className="text-sm font-medium text-[#475467] truncate max-w-[140px]">
                  {userDetails?.email}
                </span>

                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-[#475467] transition-transform duration-200",
                    isDropdownOpen && "rotate-180"
                  )}
                />
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-[260px] bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50 animate-in fade-in zoom-in-95">

                  {/* User Info */}
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF9D7E] to-[#CD82FF]" />
                    <div>
                      <p className="text-sm text-gray-500">
                        {userDetails?.email}
                      </p>
                    </div>
                  </div>

                  <div className="border-t" />

                  {/* Menu */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        router.push("/account");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                    >
                      <User className="w-4 h-4" />
                      Account
                    </button>

                    <Link href="/user-preferences" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Crown className="w-4 h-4" />
                      Upgrade plan
                    </Link>

                    <Link href="/user-preferences" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Gift className="w-4 h-4" />
                      Gift plan
                    </Link>
                  </div>

                  <div className="border-t" />

                  {/* Logout */}
                  <div className="py-2">
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                      <span>↩</span>
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {isSetupFlow && (
        <div className="relative w-full h-0.5 bg-slate-100/40">
          <div
            className="absolute top-0 left-0 h-full bg-[#1FD3C8] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />

          {currentStep > 0 && (
            <div
              className="absolute -bottom-4"
              style={{
                left: `calc(${progress}% - ${currentStep === totalSteps ? "45px" : "20px"
                  })`,
              }}
            >
              <div className="bg-white border shadow rounded-lg px-3 py-1 text-[12px] font-bold text-slate-500">
                {currentStep}/{totalSteps}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}