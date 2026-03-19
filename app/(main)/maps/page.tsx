"use client";

import dynamic from "next/dynamic";

// Isse Leaflet sirf browser mein load hoga
const MapWithNoSSR = dynamic(() => import("@/components/common/Map"), {
  ssr: false,
  loading: () => <p>Map loading...</p>,
});

export default function Page() {
  return (
    <main className="flex-1 w-full h-full relative">
      <div className="absolute inset-0 z-0">
        <MapWithNoSSR />
      </div>
    </main>
  );
}
