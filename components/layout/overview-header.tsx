"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function OverviewHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#BED6F5] bg-[#F8F9FC]/80 backdrop-blur-md bg-white">
      <div className="mx-auto flex h-[64px] w-full max-w-[1350px] items-center justify-between px-6 sm:h-[72px] sm:px-6">
        <Link href="/" className="flex min-w-0 items-center">
          <Image
            src="/images/logo-with-name.png"
            alt="GlobalWise"
            width={140}
            height={40}
            priority
            className="h-auto w-[96px] sm:w-[120px] md:w-[140px]"
          />
        </Link>

        <div
          style={{
            background: "linear-gradient(135deg, #97B0FB, #072069)",
            padding: "1.5px",
            borderRadius: 13,
            display: "inline-flex",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => router.back()}
            aria-label="Close"
            className="flex h-10 w-10 items-center justify-center bg-white transition-transform duration-150 hover:bg-[#f0f5ff] sm:h-12 sm:w-12"
            style={{ borderRadius: 11.5 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
            >
              <line
                x1="4.5"
                y1="4.5"
                x2="13.5"
                y2="13.5"
                stroke="#7A8BB5"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line
                x1="13.5"
                y1="4.5"
                x2="4.5"
                y2="13.5"
                stroke="#7A8BB5"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
