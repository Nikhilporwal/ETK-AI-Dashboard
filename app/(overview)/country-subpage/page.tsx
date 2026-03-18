import { OverviewHeader } from "@/components/layout/overview-header";
import Image from "next/image";
import { IndicatorCard } from "@/components/ui/indicator-card";
import { CountryInfoCard } from "@/components/ui/country-info-card";
import { OpportunityCard } from "@/components/ui/opportunity-card";
import { RiskCard, type RiskSeverity } from "@/components/ui/risk-card";
import { IndustryAnalysis } from "@/components/ui/industry-analysis";
import { TrendsHistory } from "@/components/ui/trends-history";
import { SimilarCountries } from "@/components/ui/similar-countries";
import { TrendingUp } from "lucide-react";

export default function CountrySubpage() {
  const countryData = {
    flag: "🇹🇬",
    name: "Togo",
    description: `Office ipsum you must be muted. Other agile good already
                  cost requirements criticality explore. Believe looking
                  take high today another. By whatever revision driving
                  asserts shoulder unpack competitors container switch.`,
    score: "60/100",
    trend: 3,
    totalIndicators: 322,
    updatedAt: "Today, 09:41 AM",
    actions: [
      {
        icon: (
          <Image
            src="/icons/shareIcon.png"
            alt=""
            width={18}
            height={18}
            priority
          />
        ),
        label: "Share",
      },
      {
        icon: (
          <Image
            src="/icons/compareIcon.png"
            alt=""
            width={18}
            height={18}
            priority
          />
        ),
        label: "Compare countries",
      },
      {
        icon: (
          <Image
            src="/icons/watchlistIcon.png"
            alt=""
            width={18}
            height={18}
            priority
          />
        ),
        label: "Add to watchlist",
      },
      {
        icon: (
          <Image
            src="/icons/setAlertIcon.png"
            alt=""
            width={18}
            height={18}
            priority
          />
        ),
        label: "Set alert",
      },
      {
        icon: (
          <Image
            src="/icons/speakToExpertIcon.png"
            alt=""
            width={18}
            height={18}
            priority
          />
        ),
        label: "Speak to expert",
      },
    ],
  };

  const indicators = [
    {
      id: 0,
      title: "POLITICAL STABILITY",
      score: "56/100",
      trend: 3,
      rating: "Med-High",
    },
    {
      id: 1,
      title: "MARKET AND ECONOMIC GROWTH",
      score: "65/100",
      trend: 3,
      rating: "Med-High",
    },
    {
      id: 2,
      title: "FINANCE BEHAVIOUR",
      score: "30/100",
      trend: -13,
      rating: "Med-High",
    },
    {
      id: 3,
      title: "FINANCE - GROWTH",
      score: "60/100",
      trend: 3,
      rating: "Med-High",
    },
    {
      id: 4,
      title: "EASE OF DOING BUSINESS",
      score: "30/100",
      trend: -23,
      rating: "Huge",
    },
    {
      id: 5,
      title: "FINANCE - ESG",
      score: "50/100",
      trend: 3,
      rating: "Med-High",
    },
    {
      id: 6,
      title: "FINANCE - LEGAL",
      score: "31/100",
      trend: 3,
      rating: "Strong",
    },
  ];

  const opportunities = [
    {
      title: "Digital payments",
      badgeText: "CAGR +18%",
      description:
        "Office ipsum you must be muted. Other agile good already cost requirements criticality explore. Believe looking take high today another.",
    },
    {
      title: "Digital payments",
      badgeText: "CAGR +18%",
      description:
        "Office ipsum you must be muted. Other agile good already cost requirements criticality explore. Believe looking take high today another.",
    },
    {
      title: "Off-Grid Solar",
      badgeText: "High Demand",
      description:
        "Office ipsum you must be muted. Other agile good already cost requirements criticality explore.",
    },
    {
      title: "Off-Grid Solar",
      badgeText: "High Demand",
      description:
        "Office ipsum you must be muted. Other agile good already cost requirements criticality explore.",
    },
  ];

  const risks: {
    title: string;
    severity: RiskSeverity;
    description: string;
    mitigations?: string[];
  }[] = [
    {
      title: "FX Volatility",
      severity: "Severe",
      description:
        "Office ipsum you must be muted. Other agile good already cost requirements criticality explore. Believe looking take high today another.",
      mitigations: [
        "Office ipsum you must be muted.",
        "Office ipsum you must be muted.",
      ],
    },
    {
      title: "FX Volatility",
      severity: "Severe",
      description:
        "Office ipsum you must be muted. Other agile good already cost requirements criticality explore. Believe looking take high today another.",
      mitigations: [
        "Office ipsum you must be muted.",
        "Office ipsum you must be muted.",
      ],
    },
    {
      title: "Supply Chain Theft",
      severity: "Medium",
      description:
        "Office ipsum you must be muted. Other agile good already cost requirements criticality explore.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f7f8fa]">
      {/* header */}
      <OverviewHeader />

      {/* country info card */}
      <div className="w-full">
        <div className="px-6 pt-0 pb-6">
          <CountryInfoCard {...countryData} />
        </div>

        {/* CPI indicators */}

        <div className="mx-auto max-w-[1350px] px-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">CPI indicators</h2>
            <p className="mt-1  text-sm leading-relaxed text-slate-500">
              Office ipsum you must be muted. Other agile good already cost
              requirements criticality explore. Believe looking take high today
              another. By whatever revision driving asserts shoulder unpack
              competitors container switch.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {indicators.map((indicator, index) => (
              <IndicatorCard key={indicator.id} {...indicator} />
            ))}
          </div>
        </div>

        {/* opportunities and demand / Risks & Mitigations */}

        <div className="mx-auto max-w-[1350px] px-6 py-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg  text-[#10B981]">
                  <TrendingUp size={18} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Opportunities & Demand
                </h2>
              </div>
              <div className="space-y-4">
                {opportunities.map((opportunity, index) => (
                  <OpportunityCard
                    key={opportunity.title + index}
                    {...opportunity}
                  />
                ))}
              </div>
            </div>

            {/* Risks & Mitigations Card Wrapper */}

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7C3.13333 8.86667 2 11.4333 2 14C2 16.5667 3.13333 19.1333 5 21"
                      stroke="#D34B4B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M19 21C20.8667 19.1333 22 16.5667 22 14C22 11.4333 20.8667 8.86667 19 7"
                      stroke="#D34B4B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="14" r="7.5" fill="#FCD2C5" />
                    <rect
                      x="11"
                      y="10.5"
                      width="2"
                      height="4.5"
                      rx="1"
                      fill="#D34B4B"
                    />
                    <circle cx="12" cy="17.5" r="1.1" fill="#D34B4B" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800">
                  Risks & Mitigations
                </h2>
              </div>
              <div className="space-y-4">
                {risks.map((risk, index) => (
                  <RiskCard key={risk.title + index} {...risk} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Industry Analysis Section */}
        <IndustryAnalysis />

        {/* Trends & History Section */}
        <TrendsHistory />

        {/* Similar Countries Section */}
        <SimilarCountries />
      </div>
    </div>
  );
}
