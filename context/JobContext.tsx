"use client";

import { createContext, useContext, useState } from "react";

export const JobContext = createContext(null);

export const useJobForm = () => useContext(JobContext);

export default function ContextProvider({ children }) {
  const [formData, setFormData] = useState({
    company_profile: "",
    countries: [],
    company_intentions: [],
    indutries: [],
  });

  const updateData = (key: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <JobContext.Provider value={{ formData, updateData }}>
      {children}
    </JobContext.Provider>
  );
}
