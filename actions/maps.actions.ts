"use server";

import apiFetch from "@/lib/api/api";
import { ActionResult } from "./auth.actions";
import { JobFormData } from "@/context/JobContext";

const MAPS_BASE_URL = process.env.BACKEND_MAPS_URL || "";

// types
export type SaveUserInterestsResponse = {
  message: string;
};

export type JobFormDataResponse = {
  job_id: string;
};

export type PollingResult = {
  state: "processing" | "done" | "error";
  message: string;
  result?: any;
  progress?: any;
};

export type GetUserDataResponse = {
  user_id: string;
  email: string;
  profile: JobFormData;
};

// save interests
export async function saveUserInterestsAction(
  data: JobFormData,
): Promise<ActionResult<SaveUserInterestsResponse>> {

  const res = await apiFetch<SaveUserInterestsResponse>(`/user-interests`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.success) {
    return { success: false, error: res.message };
  }

  return { success: true, data: res.data };
}

// get user data 
export async function getUserInterestsDataAction(
  user_id: string,
): Promise<ActionResult<GetUserDataResponse>> {
  try {
    const res = await apiFetch<GetUserDataResponse>(
      `/get-user-interests/${user_id}`
    );

    if (!res.success) {
      return { success: false, error: res.message };
    }

    return { success: true, data: res.data };

  } catch (error) {
    return { success: false, error: "Failed to fetch user data" };
  }
}

// get job id
export async function getJobIdAction(
  data: JobFormData,
): Promise<ActionResult<JobFormDataResponse>> {
  try {
    const res = await apiFetch<JobFormDataResponse>(
      `/get-context`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-API-Key": process.env.MAPS_API_KEY || "",
        },
        body: JSON.stringify(data),
      },
      MAPS_BASE_URL,
    );

    if (!res.success || !res.data?.job_id) {
      return { success: false, error: res.message || "Failed to get job_id" };
    }

    return { success: true, data: res.data };

  } catch (error) {
    return { success: false, error: "Network error while fetching job_id" };
  }
}

// polling
export async function pollingAction(
  job_id: string,
): Promise<ActionResult<PollingResult>> {
  try {
    if (!job_id) {
      return { success: false, error: "Invalid job_id" };
    }

    const res = await apiFetch<PollingResult>(
      `/jobs/${job_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-Key": process.env.MAPS_API_KEY || "",
        },
      },
      MAPS_BASE_URL,
    );

    if (!res.success) {
      return { success: false, error: res.message };
    }

    return { success: true, data: res.data };

  } catch (error) {
    return { success: false, error: "Polling failed" };
  }
}