"use client";

import { useGlobalContext } from "@/context/JobContext";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CountrySubPage() {
  const { pollingData } = useGlobalContext();
  const params = useParams<{ id: string }>();
  const countryName = params.id;

  if (!countryName || !pollingData) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8F9FB]">
        <div className="text-xl font-medium text-slate-500">Loading...</div>
      </div>
    );
  }

  const progress = pollingData?.progress;
  const result = pollingData?.result;

  const countryCode = result?.context?.country_scores_json
    ?.find((c: any) => c.country_name === countryName)
    ?.id?.toLowerCase();

  const score = progress?.display_scores[countryName]?.score || 0;
  const countryInfo = progress?.country_information[countryName] || "";
  const indicatorDesc = progress?.indicator_description || "";
  const industries = result?.context?.industries || [];

  const opportunities = progress?.selected_indicators || [];
  const risks = progress?.pros_and_cons?.[countryName] || [];

  return (
    <div className="min-h-screen w-full bg-[#F5F8FE] text-[#111827] pb-12 font-sans">
      {/* ✅ FULL WIDTH HEADER */}
      <div className="bg-white border border-slate-200 p-5 md:p-8 shadow-sm">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between gap-8">
          {/* LEFT */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              {countryCode && (
                <div className="relative w-12 h-8">
                  <Image
                    src={`https://flagcdn.com/w80/${countryCode}.png`}
                    alt={countryName}
                    fill
                    className="object-cover rounded border border-slate-100"
                  />
                </div>
              )}
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {countryName}
              </h1>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-3xl font-medium">
              {countryInfo}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Share",
                "Compare countries",
                "Add to watchlist",
                "Set alert",
                "Speak to expert",
              ].map((btn) => (
                <button
                  key={btn}
                  className="px-4 py-2 border border-slate-200 rounded-lg bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex gap-8 sm:gap-12 shrink-0 md:border-l md:border-slate-100 md:pl-12 items-center">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                Score
              </div>
              <div className="text-4xl font-bold">{score}/100</div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto space-y-10 mt-10 px-4">
        {/* CPI Indicators Section */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">CPI indicators</h2>
            <p className="text-slate-500 max-w-4xl text-sm leading-relaxed font-medium">
              {indicatorDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {result?.context?.data?.map((arr: string[], idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2"
              >
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {arr?.[0] || "Indicator"}
                </h3>
                <div className="text-2xl font-bold">
                  {arr?.[1] || 0}/100
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities & Risks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* <div className="space-y-4 font-semibold">
            <h2 className="text-lg font-semibold ml-1">
              Opportunities & Demand
            </h2>
            <div className="bg-white rounded border border-slate-200 h-[400px] overflow-hidden flex flex-col shadow-xs">
              <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
                {opportunities.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-100 bg-[#F8FAFF] space-y-2"
                  >
                    {Object.entries(item).map(([key, value]) => (
                      <p
                        key={key}
                        className="text-xs text-slate-500 font-medium"
                      >
                        <span className="font-semibold text-slate-600 capitalize">
                          {key}:
                        </span>{" "}
                        {String(value)}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div> */}

          {/* <div className="space-y-4">
            <h2 className="text-lg font-semibold ml-1">Risks & Mitigations</h2>

            <div className="bg-white rounded border border-slate-200 h-[400px] overflow-hidden flex flex-col shadow-xs">
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                {risks.map((arr: any, idx: number) => {
                  const positive = arr?.[0] || "";
                  const negative = arr?.[1] || "";

                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-red-100 bg-red-50 p-4 space-y-3"
                    >
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {negative}
                      </p>

                      <div className="bg-white border border-slate-200 rounded-lg p-3">
                        <div className="text-[11px] font-semibold text-slate-500 mb-1">
                          🛡 Mitigation(s)
                        </div>

                        <ul className="list-disc ml-4 text-xs text-slate-600 space-y-1">
                          <li>{positive}</li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div> */}

          <div className="space-y-4">
            <h2 className="text-lg font-semibold ml-1">Risks & Mitigations</h2>

            <div className="bg-white rounded border border-slate-200 h-[380px] overflow-hidden flex flex-col shadow-sm">
              <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                {risks.map((arr: string[], idx: number) => {
                  const positive = arr?.[0] || "";
                  const negative = arr?.[1] || "";

                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-red-100 bg-red-50 p-4"
                    >
                      <ul className="list-disc ml-4 text-xs text-slate-600 space-y-2">
                        {negative && <li>{negative}</li>}
                        {positive && <li>{positive}</li>}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Industry Analysis
            </h2>

            <div className="bg-white rounded-sm border border-slate-200 p-4 shadow-sm">
              <ul className="flex flex-wrap gap-3 text-sm text-slate-700">
                {industries.map((ind: string, idx: number) => (
                  <li
                    key={idx}
                    className="bg-red-50 border border-red-100 rounded-full px-4 py-1.5 hover:bg-red-100 transition whitespace-nowrap"
                  >
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Industry Analysis */}
        {/* <div className="space-y-6">
          <h2 className="text-lg font-semibold">Industry analysis</h2>

          <div className="space-y-6">
            <div>
              <div className="text-[12px] uppercase font-bold text-slate-400 tracking-wider">
                Score
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{score}/100</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {industries.map((ind: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs min-w-[200px] flex-1"
                >
                  <h3 className="text-sm font-semibold text-slate-800">
                    {ind}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}
