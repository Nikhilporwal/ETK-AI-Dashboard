"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/common/Map"), {
  ssr: false,
  loading: () => <p>Map loading...</p>,
});

export default function Page() {
  return (
    <main className="w-full flex-1 relative min-h-[calc(100vh-70px)]">
      <div className="absolute inset-0">
        <Map />
      </div>
    </main>
  );
}
