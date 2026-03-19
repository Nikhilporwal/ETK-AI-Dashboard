"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define form shape
type JobFormData = {
  company_profile: string;
  countries: string[];
  company_intentions: string[];
  industries: string[];
};

// 2. Context type
type JobContextType = {
  formData: JobFormData;
  updateData: <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K],
  ) => void;
};

// 3. Create context safely
const JobContext = createContext<JobContextType | undefined>(undefined);

// 4. Custom hook with safety check
export const useJobForm = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobForm must be used within ContextProvider");
  }
  return context;
};

// 5. Props type
type Props = {
  children: ReactNode;
};

export default function ContextProvider({ children }: Props) {
  const [formData, setFormData] = useState<JobFormData>({
    company_profile: "",
    countries: [],
    company_intentions: [],
    industries: [],
  });

  const updateData = <K extends keyof JobFormData>(
    key: K,
    value: JobFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <JobContext.Provider value={{ formData, updateData }}>
      {children}
    </JobContext.Provider>
  );
}
