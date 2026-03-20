import { useState, useEffect } from "react";
import apiFetch from "../api/api";

export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface JobStatusResponse {
  status: JobStatus;
  progress?: number;
}

export const useJobStatus = (jobId: string, isEnabled: boolean) => {
  const [data, setData] = useState<JobStatusResponse | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isEnabled || !jobId) return;

    let isMounted = true;
    let timer: NodeJS.Timeout;

    const fetchStatus = async () => {
      try {
        setIsLoading(true);
        const res = await apiFetch<JobStatusResponse>(`/analysis/status/${jobId}`);

        if (!res.success) throw new Error(res.message);
        if (isMounted) {
          setData(res.data);
          setError(null);

          if (res.data.status !== "completed" && res.data.status !== "failed") {
            timer = setTimeout(fetchStatus, 3000);
          }
        }
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
    };
  }, [jobId, isEnabled]);

  return { data, isLoading, error };
};
