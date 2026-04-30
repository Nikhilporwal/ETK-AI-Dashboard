"use client";

import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Data,
} from "@react-google-maps/api";
import { useGlobalContext } from "@/context/JobContext";
import { useState, useCallback, useMemo, useRef } from "react";
import "./Map.css";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";



const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" } as const;

const MAP_CENTER = { lat: 5, lng: 20 } as const;

const MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: false,
  minZoom: 2.5,
  maxZoom: 6,
  gestureHandling: "greedy",
  restriction: {
    latLngBounds: { north: 85, south: -85, west: -180, east: 180 },
    strictBounds: true,
  },
  styles: [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9edf1" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f8f9fb" }],
    },
    {
      featureType: "administrative.country",
      elementType: "geometry.stroke",
      stylers: [{ color: "#d1d5db" }, { weight: 1 }],
    },
  ],
};

const COUNTRY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Algeria: { lat: 28.0339, lng: 1.6596 },
  Angola: { lat: -11.2027, lng: 17.8739 },
  Botswana: { lat: -22.3285, lng: 24.6849 },
  Cameroon: { lat: 7.3697, lng: 12.3547 },
  "Côte d'Ivoire": { lat: 7.54, lng: -5.5471 },
  Egypt: { lat: 26.8206, lng: 30.8025 },
  Ethiopia: { lat: 9.145, lng: 40.4897 },
  Ghana: { lat: 7.9465, lng: -1.0232 },
  Kenya: { lat: -1.2921, lng: 36.8219 },
  Libya: { lat: 26.3351, lng: 17.2283 },
  Madagascar: { lat: -18.7669, lng: 46.8691 },
  Mali: { lat: 17.5707, lng: -3.9962 },
  Mauritius: { lat: -20.3484, lng: 57.5522 },
  Morocco: { lat: 31.7917, lng: -7.0926 },
  Mozambique: { lat: -18.6657, lng: 35.5296 },
  Namibia: { lat: -22.9576, lng: 18.4904 },
  Nigeria: { lat: 9.082, lng: 8.6753 },
  Rwanda: { lat: -1.9403, lng: 29.8739 },
  Senegal: { lat: 14.4974, lng: -14.4524 },
  "South Africa": { lat: -30.5595, lng: 22.9375 },
  Sudan: { lat: 12.8628, lng: 30.2176 },
  Tanzania: { lat: -6.369, lng: 34.8888 },
  Tunisia: { lat: 33.8869, lng: 9.5375 },
  Uganda: { lat: 1.3733, lng: 32.2903 },
  Zimbabwe: { lat: -19.0154, lng: 29.1549 },
};

// ISO-2 → ISO-3 mapping — static data, module-level
const ISO2_TO_ISO3: Record<string, string> = {
  DZ: "DZA", AO: "AGO", BW: "BWA", BI: "BDI", CM: "CMR",
  CV: "CPV", CF: "CAF", TD: "TCD", KM: "COM", CD: "COD",
  CG: "COG", CI: "CIV", DJ: "DJI", EG: "EGY", GQ: "GNQ",
  ER: "ERI", SZ: "SWZ", ET: "ETH", GA: "GAB", GM: "GMB",
  GH: "GHA", GN: "GIN", GW: "GNB", KE: "KEN", LS: "LSO",
  LR: "LBR", LY: "LBY", MG: "MDG", MW: "MWI", ML: "MLI",
  MR: "MRT", MU: "MUS", YT: "MYT", MA: "MAR", MZ: "MOZ",
  NA: "NAM", NE: "NER", NG: "NGA", RE: "REU", RW: "RWA",
  ST: "STP", SN: "SEN", SC: "SYC", SL: "SLE", SO: "SOM",
  ZA: "ZAF", SS: "SSD", SD: "SDN", TZ: "TZA", TG: "TGO",
  TN: "TUN", UG: "UGA", EH: "ESH", ZM: "ZMB", ZW: "ZWE",
};

function getHeatmapColor(value: number): string {
  if (value >= 85) return "#1e3a8a";
  if (value >= 70) return "#2563eb";
  if (value >= 50) return "#3b82f6";
  if (value >= 30) return "#93c5fd";
  if (value >= 10) return "#dbeafe";
  return "#f1f5f9";
}

const DEFAULT_FEATURE_STYLE = {
  fillColor: "#e5e7eb",
  strokeColor: "#9ca3af",
  strokeWeight: 0.5,
  fillOpacity: 0.1,
  visible: true,
} as const;

const AFRICA_ISO3 = new Set(Object.values(ISO2_TO_ISO3));

export default function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const { pollingData } = useGlobalContext();
  const router = useRouter();

  const [mapData, setMapData] = useState<google.maps.Data | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const pixelOffsetRef = useRef<google.maps.Size | null>(null);

  const highlightedIds = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    pollingData?.result?.context?.country_scores_json?.forEach((c: any) => {
      const iso3 = ISO2_TO_ISO3[c.id.toUpperCase()] ?? c.id.toUpperCase();
      map[iso3] = c.value;
    });
    return map;
  }, [pollingData]);

  const countryNameToIso3 = useMemo<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    pollingData?.result?.context?.country_scores_json?.forEach((c: any) => {
      const iso3 = ISO2_TO_ISO3[c.id.toUpperCase()] ?? c.id.toUpperCase();
      map[c.country_name] = iso3;
    });
    return map;
  }, [pollingData]);

  const countryNameToIso2Lower = useMemo<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    pollingData?.result?.context?.country_scores_json?.forEach((c: any) => {
      map[c.country_name] = c.id.toLowerCase();
    });
    return map;
  }, [pollingData]);

  const dataStyle = useCallback(
    (feature: any) => {
      const iso3: string | undefined =
        feature.getProperty("ISO3166-1-Alpha-3") ??
        feature.getProperty("iso_a3");

      if (!iso3) return { visible: false };

      // If NOT Africa then greyed out
      if (!AFRICA_ISO3.has(iso3)) {
        return {
          fillColor: "#7c7c7cff",
          strokeColor: "#d1d5db",
          strokeWeight: 0.5,
          fillOpacity: 0.4,
          visible: true,
          clickable: false,
        };
      }

      // Africa then normal heatmap
      const value = highlightedIds[iso3];
      if (value === undefined) return DEFAULT_FEATURE_STYLE;

      return {
        fillColor: getHeatmapColor(value),
        strokeColor: "#065f46",
        strokeWeight: 1,
        fillOpacity: 0.7,
        visible: true,
      };
    },
    [highlightedIds]
  );

  const onDataLoad = useCallback(
    (data: google.maps.Data) => {
      data.loadGeoJson(
        "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
      );
      data.setStyle(dataStyle);
      setMapData(data);

      // Create pixelOffset once the Maps SDK is available
      if (!pixelOffsetRef.current && window.google) {
        pixelOffsetRef.current = new window.google.maps.Size(0, -10);
      }
    },
    [dataStyle]
  );

  const prevHighlightedRef = useRef(highlightedIds);
  if (mapData && prevHighlightedRef.current !== highlightedIds) {
    prevHighlightedRef.current = highlightedIds;
    mapData.setStyle(dataStyle);
  }

  // ── Mouse / click handlers ─────────────────────────────────
  const handleMouseOver = useCallback((e: google.maps.Data.MouseEvent) => {
    const iso3 = (
      e.feature.getProperty("ISO3166-1-Alpha-3") ??
      e.feature.getProperty("iso_a3")
    ) as string | undefined;

    if (iso3 && iso3 !== "ATA") setHoveredCountry(iso3);
  }, []);

  const handleMouseOut = useCallback(() => {
    setHoveredCountry(null);
  }, []);

  const handleClick = useCallback((e: google.maps.Data.MouseEvent) => {
    const iso3 = (
      e.feature.getProperty("ISO3166-1-Alpha-3") ??
      e.feature.getProperty("iso_a3")
    ) as string | undefined;

    if (!iso3 || iso3 === "ATA") return;

    setSelectedCountries((prev) =>
      prev.includes(iso3) ? prev.filter((c) => c !== iso3) : [...prev, iso3]
    );
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  if (!pollingData || pollingData.state !== "done") {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#203D8E] mx-auto" />
          <p className="text-slate-500 font-medium">
            Preparing your market analysis...
          </p>
        </div>
      </div>
    );
  }

  const displayData: any[] =
    pollingData.result?.context?.display_data ?? [];

  const visibleInfoWindows = displayData.filter((country: any) => {
    const iso3 = countryNameToIso3[country.country_name];
    return iso3 && (selectedCountries.includes(iso3) || hoveredCountry === iso3);
  });

  const infoWindowOptions = {
    disableAutoPan: true,
    pixelOffset: pixelOffsetRef.current ?? undefined,
    maxWidth: 240,
  };

  return (
    <div className="w-full h-screen relative">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={MAP_CENTER}
        zoom={2}
        options={MAP_OPTIONS}
      >
        <Data
          onLoad={onDataLoad}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        />

        {visibleInfoWindows.map((country: any) => {
          const coords = COUNTRY_COORDINATES[country.country_name];
          if (!coords) return null;

          const countryCode = countryNameToIso2Lower[country.country_name];

          return (
            <InfoWindow
              key={country.country_name}
              position={coords}
              options={infoWindowOptions}
            >
              <div className="custom-info-box">
                <div className="info-header flex items-center justify-between gap-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://flagcdn.com/w40/${countryCode}.png`}
                      alt={country.country_name}
                      width={20}
                      height={16}
                      className="object-cover rounded-sm border"
                    />
                    <span className="font-bold text-[#111827] text-sm">
                      {country.country_name}
                    </span>
                  </div>
                  <Button
                    variant={"link"}
                    className="p-0 m-0 h-auto min-h-0 leading-none border-0 shadow-none font-semibold text-[#0EA497] text-sm underline"
                    onClick={() =>
                      router.push(`/country-subpage/${country.country_name}`)
                    }
                  >
                    More details
                  </Button>
                </div>

                <div className="info-content">
                  <div className="metric-row">
                    <span className="metric-label text-md">Heat Map Score</span>
                    <span className="metric-value">{country.score}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Market Growth</span>
                    <span className="metric-value text-[#0ea497]">
                      {country.data["MARKET AND ECONOMIC GROWTH"] || 0}%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-label">Stability Score</span>
                    <span className="metric-value">
                      {country.data["POLITICAL STABILITY"] || 0}
                    </span>
                  </div>
                  <div className="metric-row last">
                    <span className="metric-label">Indicators</span>
                    <span className="metric-value">322</span>
                  </div>
                </div>
              </div>
            </InfoWindow>
          );
        })}
      </GoogleMap>
    </div>
  );
}
