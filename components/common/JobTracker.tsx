"use client";

import { useJobStatus } from "@/lib/hooks/useJobStatus";

export default function JobTracker({ jobId }: { jobId: string }) {
  //   const { data, isLoading, error } = useJobStatus(jobId, true);
  //   if (isLoading) return <p>Checking status...</p>;
  //   if (error) return <p>Error fetching status</p>;
  //   return (
  //     <div className="p-4 border rounded">
  //       <h3>Job ID: {jobId}</h3>
  //       <p>
  //         Current Status:{" "}
  //         <span className="font-bold text-blue-600">{data?.status}</span>
  //       </p>
  //       {data?.status === "processing" && (
  //         <div className="animate-spin h-5 w-5 border-b-2 border-blue-600 rounded-full" />
  //       )}
  //     </div>
  //   );
}
