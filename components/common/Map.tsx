"use client";

import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Data,
} from "@react-google-maps/api";
import { useGlobalContext } from "@/context/JobContext";
import { useState, useCallback, useMemo } from "react";
import "./Map.css"; // We'll create this for styling the custom InfoWindow
import Image from "next/image";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 5,
  lng: 20, // Africa center
};

// Map options for a cleaner look
const mapOptions = {
  disableDefaultUI: false,
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

const countryCoordinates: Record<string, { lat: number; lng: number }> = {
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

export default function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const { pollingData } = useGlobalContext();
  console.log(
    "Map Component - isLoaded:",
    isLoaded,
    "pollingData:",
    pollingData?.state,
  );

  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  // Memoize highlighted IDs
  const highlightedIds = useMemo(() => {
    if (!pollingData?.result?.context?.country_scores_json) return [];
    return pollingData.result.context.country_scores_json.map((c: any) => c.id);
  }, [pollingData]);

  const onDataLoad = useCallback((data: any) => {
    // Correct GeoJSON for widespread compatibility
    data.loadGeoJson(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json",
    );
  }, []);

  const dataStyle = useCallback(
    (feature: any) => {
      // Robust ISO code lookup
      const id =
        feature.getProperty("id") ||
        feature.getProperty("iso_a2") ||
        feature.getProperty("ISO_A2") ||
        feature.getId();
      const isHighlighted = highlightedIds.includes(id);

      return {
        fillColor: isHighlighted ? "#14d2bd" : "transparent",
        strokeColor: isHighlighted ? "#0ea497" : "transparent",
        strokeWeight: isHighlighted ? 1.5 : 0,
        fillOpacity: isHighlighted ? 0.7 : 0,
        visible: true,
      };
    },
    [highlightedIds],
  );

  if (!isLoaded) return <div>Loading...</div>;

  if (!pollingData || pollingData.state !== "done") {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#203D8E] mx-auto"></div>
          <p className="text-slate-500 font-medium">
            Preparing your market analysis...
          </p>
        </div>
      </div>
    );
  }

  const displayData = pollingData.result?.context?.display_data || [];

  return (
    <div className="w-full h-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={3.5}
        options={mapOptions}
      >
        <Data
          onLoad={(data) => {
            onDataLoad(data);
            data.setStyle(dataStyle);
          }}
          onClick={(e) => {
            const id =
              e.feature.getProperty("id") ||
              e.feature.getProperty("iso_a2") ||
              e.feature.getProperty("ISO_A2") ||
              e.feature.getId();
            const country = displayData.find((d: any) => {
              const scoreData =
                pollingData.result.context.country_scores_json.find(
                  (s: any) => s.id === id,
                );
              return scoreData
                ? d.country_name === scoreData.country_name
                : false;
            });
            if (country && e.latLng) {
              setSelectedCountry({
                ...country,
                id,
                latLng: e.latLng.toJSON(),
              });
            }
          }}
        />

        {displayData.map((country: any, idx: number) => {
          const coords = countryCoordinates[country.country_name];
          if (!coords) return null;

          const countryCode = pollingData.result.context.country_scores_json
            .find((c: any) => c.country_name === country.country_name)
            ?.id?.toLowerCase(); // ISO-2 code

          return (
            <InfoWindow
              key={idx}
              position={coords}
              options={{
                pixelOffset:
                  typeof window !== "undefined" && window.google
                    ? new window.google.maps.Size(0, -10)
                    : undefined,
                maxWidth: 240,
              }}
            >
              <div className="custom-info-box">
                <div className="info-header flex items-center justify-between gap-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagcdn.com/w40/${countryCode}.png`}
                      alt={country.country_name}
                      className="w-5 h-4 object-cover rounded-sm border"
                    />
                    <span className="font-bold text-[#111827] text-sm">
                      {country.country_name}
                    </span>
                  </div>
                  <button className="text-[#0ea497] text-md font-bold underline bg-transparent border-none p-0 cursor-pointer">
                    More details
                  </button>
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
