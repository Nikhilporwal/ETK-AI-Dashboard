import { cookies } from "next/headers";

export default async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  baseUrl?: string
): Promise<{ data: T; message: string; success: boolean }> {
  const FINAL_BASE_URL = baseUrl || process.env.BACKEND_BASE_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!FINAL_BASE_URL) throw new Error("API Base URL is not configured.");

  try {
    const response = await fetch(`${FINAL_BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...((options.headers as Record<string, string>) || {}),
      },
    });

    const json = await response.json().catch(() => ({}));

    // Don't check success for passionlabs API
    if (FINAL_BASE_URL.includes("https://etk-api.passionlabs.ai")) {
      return {
        data: json as T,
        message: json?.message || "Success",
        success: response.ok,
      };
    }

    const isSuccess = response.ok && (typeof json.success === "boolean" ? json.success : true);

    return {
      data: (json.data ?? {}) as T,
      message: json?.message || (isSuccess ? "Success" : "Something went wrong"),
      success: isSuccess,
    };
  } catch (error: any) {
    return {
      data: {} as T,
      message: error?.message || "Network error. Please try again.",
      success: false,
    };
  }
}