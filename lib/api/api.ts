// lib/types/api.ts
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
    throw new Error("Missing BACKEND_BASE_URL");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ?? undefined,
  });

  const json = await response.json().catch(() => ({}));

  console.log("json", json);

  if (!response.ok) {
    return {
      data: {} as T,
      message: json?.message || response.statusText,
      success: false,
    };
  }

  return {
    data: json as T,
    message: json?.message ?? "Success",
    success: true,
  };
}
