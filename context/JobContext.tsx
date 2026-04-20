"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { PollingResult } from "@/actions/maps.actions";

// 1. Define Form Shape (Preserved from old JobContext)
export type JobFormData = {
  user_id?: string;
  company_profile: string;
  countries: string[];
  company_intentions: string[];
  industries: string[];
};

export type UserDetails = {
  user_id: string;
  email: string;
};

type ModalConfig = {
  isOpen: boolean;
  content: React.ReactNode | null;
  title?: string;
  noPadding?: boolean;
};

// 2. Main Context Type
type GlobalContextType = {
  formData: JobFormData;
  updateData: <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K],
  ) => void;
  setFormData: (data: JobFormData) => void;

  pollingData: PollingResult | null;
  setPollingData: (data: PollingResult | null) => void;

  userDetails: UserDetails | null;
  setUserDetails: (data: UserDetails | null) => void;

  isLoading: boolean;
  showLoader: (message?: string) => void;
  hideLoader: () => void;

  modalConfig: ModalConfig;
  setModalConfig: (config: ModalConfig) => void;

  openModal: (
    content: React.ReactNode,
    title?: string,
    noPadding?: boolean,
  ) => void;
  closeModal: () => void;
};

// 3. Create Context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 4. Custom Hook
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within GlobalProvider");
  }
  return context;
};

// 5. Provider Component
export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<JobFormData>({
    company_profile: "",
    countries: [],
    company_intentions: [],
    industries: [],
  });
  const [pollingData, setPollingData] = useState<PollingResult | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    content: null,
    title: "",
    noPadding: false,
  });

  const updateData = <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const openModal = (
    content: React.ReactNode,
    title?: string,
    noPadding?: boolean,
  ) => {
    setModalConfig({
      isOpen: true,
      content: content,
      title: title,
      noPadding: noPadding,
    });
  };

  const closeModal = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // UI States
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
        openModal,
        closeModal,
        modalConfig,
        setModalConfig,
      }}
    >
      {/* Global Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm animate-in fade-in duration-300">
          <Loader2 className="w-12 h-12 animate-spin text-[#203E93] drop-shadow-md" />
          {loaderMessage && (
            <p className="mt-4 text-base font-semibold text-[#111827] drop-shadow-sm">
              {loaderMessage}
            </p>
          )}
        </div>
      )}

      {children}
    </GlobalContext.Provider>
  );
}
