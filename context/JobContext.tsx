"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { PollingResult } from "@/actions/maps.actions";

export type JobFormData = {
  user_id?: string;
  company_profile: string;
  countries: string[];
  company_intentions: string[];
  industries: string[];

  business_type: string[];
  business_stage: string[];
  business_turnover: string[];

  business_timeline: string[];

  business_clients: string[];
  business_deal_size: string[];
  business_product_adaptation: string[];

  business_international_experience: string[];
  business_international_enquiries: string[];

  business_budget: string[];
  business_growth_export_team: string[];

  business_preferences: string[];
  business_risk_appetite: string[];

  business_local_partners: string[];
  business_type_of_support: string[];
};

export type UserDetails = {
  user_id: string;
  email: string;
};

type GlobalContextType = {
  formData: JobFormData;
  updateData: <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K]
  ) => void;
  setFormData: (data: JobFormData) => void;

  pollingData: PollingResult | null;
  setPollingData: (data: PollingResult | null) => void;

  userDetails: UserDetails | null;
  setUserDetails: (data: UserDetails | null) => void;

  isLoading: boolean;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<JobFormData>({
    company_profile: "",
    countries: [],
    company_intentions: [],
    industries: [],

    business_type: [],
    business_stage: [],
    business_turnover: [],
    business_timeline: [],
    business_clients: [],
    business_deal_size: [],
    business_product_adaptation: [],
    business_international_experience: [],
    business_international_enquiries: [],
    business_budget: [],
    business_growth_export_team: [],
    business_preferences: [],
    business_risk_appetite: [],
    business_local_partners: [],
    business_type_of_support: [],
  });

  const [pollingData, setPollingData] = useState<PollingResult | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const updateData = <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("");

  const showLoader = (message = "Please wait...") => {
    setLoaderMessage(message);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
    setLoaderMessage("");
  };

  return (
    <GlobalContext.Provider
      value={{
        formData,
        updateData,
        pollingData,
        setPollingData,
        isLoading,
        showLoader,
        hideLoader,
        userDetails,
        setUserDetails,
        setFormData,
      }}
    >
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}
      {children}
    </GlobalContext.Provider>
  );
}