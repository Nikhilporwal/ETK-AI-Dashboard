import Link from "next/link";
import Image from "next/image";

export function AuthHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F8F9FC]/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 h-[80px] flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-with-name.png"
            alt="GlobalWise"
            width={140}
            height={40}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
