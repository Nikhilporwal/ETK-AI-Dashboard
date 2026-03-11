import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-auth-custom flex flex-col items-center justify-between py-12 px-6">
      {/* Top Logo Section */}
      <div className="flex flex-col items-center space-y-12 w-full max-w-[440px]">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo-with-name.png"
            alt="logo"
            width={150}
            height={150}
          />
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl text-[#111827] tracking-tight">
            Get started with <br />Globalwise
          </h1>
          <p className="text-[#6B7280] font-medium">
            Already have an account? <Link href="/login" className="text-[#0EA497] font-bold underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <Button variant="social" className="w-full">
            <Image
              src="/icons/google-login-icon.png"
              alt="Google"
              width={20}
              height={20}
            />
            Log in with Google
          </Button>

          <Button variant="social" className="w-full">
            <Image
              src="/icons/linkedIn-login-icon.png"
              alt="LinkedIn"
              width={20}
              height={20}
            />
            Log in with LinkedIn
          </Button>

          <Button variant="social" className="w-full">
            Log in with SSO
          </Button>

          <div className="flex items-center gap-4 py-4">
            <div className="h-[1px] flex-1 bg-[#63687B]"></div>
            <span className="text-sm text-[#63687B] font-medium">Or use email</span>
            <div className="h-[1px] flex-1 bg-[#63687B]"></div>
          </div>

          <Button variant="primary" className="w-full" asChild>
            <Link href="/signup">
              Email address
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-[#63687B] text-xs font-medium mt-14">
        © copyright 2025, ETK
      </div>
    </div>
  );
}
