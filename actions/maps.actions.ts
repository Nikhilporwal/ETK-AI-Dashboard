"use server";

import apiFetch from "@/lib/api/api";
import { ActionResult } from "./auth.actions";
import { JobFormData } from "@/context/JobContext";

const MAPS_BASE_URL = process.env.BACKEND_MAPS_URL || "";

export interface SaveUserInterestsResponse {
  message: string;
}

export interface JobFormDataResponse {
  job_id: string;
}

export type PollingResult = {
  state: "processing" | "done" | "error";
  message: string;
  result?: any;
};

export async function saveUserInterestsAction(
  data: JobFormData,
): Promise<ActionResult<SaveUserInterestsResponse>> {
  const result = await apiFetch<SaveUserInterestsResponse>(`/user-interests`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!result.success) {
    return { success: false, error: result.message };
  }

  return { success: true, data: result.data };
}

export async function getJobIdAction(
  data: JobFormData,
): Promise<ActionResult<{ job_id: string }>> {
  try {
    // Use the existing cookies automatically sent by the browser
    const result = await apiFetch<{ job_id: string }>(
      `/get-context`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-Key": process.env.MAPS_API_KEY || "",
        },
        body: JSON.stringify(data),
      },
      MAPS_BASE_URL,
    );

    if (!result.success || !result.data?.job_id) {
      return { success: false, error: "Failed to get job_id from server" };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: "Network authentication failed" };
  }
}

export async function pollingAction(
  job_id: string,
): Promise<ActionResult<PollingResult>> {
  try {
    if (!job_id) return { success: false, error: "Invalid job_id" };

    const result = await apiFetch<PollingResult>(
      `/jobs/${job_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-API-Key": process.env.MAPS_API_KEY || "",
        },
      },
      MAPS_BASE_URL,
    );

    if (!result.success) {
      return { success: false, error: result.message };
    }

    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: "Polling network/auth failed" };
  }
}
