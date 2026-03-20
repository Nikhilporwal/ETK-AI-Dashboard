export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export default async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const BASE_URL = process.env.BACKEND_BASE_URL;

  if (!BASE_URL) {
    throw new Error("BACKEND_BASE_URL is not configured.");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}),
    },
  });
  const json = await response.json().catch(() => ({}));

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
