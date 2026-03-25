export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export default async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
  baseUrl?: string
): Promise<ApiResponse<T>> {

  const FINAL_BASE_URL = baseUrl || process.env.BACKEND_BASE_URL;

  if (!FINAL_BASE_URL) {
    throw new Error("API Base URL is not configured.");
  }

  const response = await fetch(`${FINAL_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    },
  });

  const json = await response.json().catch(() => ({}));
  console.log("json:", json);

  if (!response.ok) {
    return {
      data: {} as T,
      message: json?.message || response.statusText || "Something went wrong.",
      success: false,
    };
  }

  return {
    data: json as T,
    message: json?.message ?? "Success",
    success: true,
  };
}
