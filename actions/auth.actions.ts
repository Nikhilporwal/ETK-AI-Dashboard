"use server";

import apiFetch from "@/lib/api/api";
import { cookies } from "next/headers";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    access_token: string;
    message: string;
  }
}

// Discriminated union — success or a typed error, never a thrown exception
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
} as const;

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, AUTH_COOKIE_OPTIONS);
}

export async function loginAction(
  credentials: AuthCredentials,
): Promise<ActionResult<AuthResponse>> {
  const res = await apiFetch<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!res.success || !res.data?.data?.access_token) {
    console.error("Login failed or token missing:", res.message);
    return { success: false, error: res.message };
  }

  try {
    await setAuthCookie(res.data?.data?.access_token);
  } catch (error) {
    console.error("Error setting login cookie:", error);
  }

  return { success: true, data: res.data };
}

export async function signupAction(
  credentials: AuthCredentials,
): Promise<ActionResult<AuthResponse>> {
  const res = await apiFetch<AuthResponse>("/signup", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!res.success || !res.data?.data?.access_token) {
    console.error("Signup failed or token missing:", res.message);
    return { success: false, error: res.message };
  }

  try {
    await setAuthCookie(res.data.data.access_token);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }

  return { success: true, data: res.data };
}
