import { useQuery } from "@tanstack/react-query";
import apiFetch from "../api/api";

export const useJobStatus = (jobId: string, isEnabled: boolean) => {
  return useQuery({
    queryKey: ["jobStatus", jobId],
    queryFn: async () => {
      const response = await apiFetch(`/analysis/status/${jobId}`);
      return response.data;
    },
    // Pooling Logic:
    refetchInterval: (query) => {
      // Agar status 'completed' ya 'failed' ho jaye toh pooling rok do
      if (
        query.state.data?.status === "completed" ||
        query.state.data?.status === "failed"
      ) {
        return false;
      }
      return 3000; // Har 3 seconds mein poll karo
    },
    enabled: isEnabled && !!jobId, // Sirf tab start karo jab zaroorat ho
  });
};
