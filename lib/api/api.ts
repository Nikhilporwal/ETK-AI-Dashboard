interface ApiResponse<T> {
  data: T | null;
  message: string;
  success: boolean;
}

export default async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const response = await fetch(`${process.env.BACKEND_BASE_URL}${url}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(options?.headers || {}),
    },
    body: options.body || undefined,
  });

  if (!response.ok) {
    return {
      data: null,
      message: `Error: ${response.statusText}`,
      success: false,
    };
  }

  const data = await response.json();

  return {
    data: data,
    message: data.message || "Response Fetched Successfully",
    success: true,
  };
}
