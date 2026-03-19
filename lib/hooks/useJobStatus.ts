import { useQuery } from "@tanstack/react-query";
import apiFetch from "../api/api";

export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface JobStatusResponse {
  status: JobStatus;
  progress?: number;
}

export const useJobStatus = (jobId: string, isEnabled: boolean) => {
  return useQuery<JobStatusResponse>({
    queryKey: ["jobStatus", jobId],

    queryFn: async () => {
      const res = await apiFetch<JobStatusResponse>(
        `/analysis/status/${jobId}`,
      );

      if (!res.success) {
        throw new Error(res.message);
      }

      return res.data;
    },

    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (status === "completed" || status === "failed") {
        return false;
      }

      return 3000;
    },

    enabled: Boolean(isEnabled && jobId),
  });
};
