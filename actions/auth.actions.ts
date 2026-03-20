"use server";

import apiFetch from "@/lib/api/api";
import { cookies } from "next/headers";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  message: string;
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

  console.log("Login API Result:", res);

  // if (!res.success || !res.data?.access_token) {
  //   console.error("Login failed or token missing:", res.message);
  //   return { success: false, error: res.message };
  // }

  try {
    await setAuthCookie(res.data.access_token);
    console.log("Login Cookie set successfully");
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
  console.log("API Result in Server Action (res):", res);

  // if (!res.success || !res.data?.access_token) {
  //   console.error("Signup failed or token missing:", res.message);
  //   return { success: false, error: res.message };
  // }

  try {
    await setAuthCookie(res.data.access_token);
    console.log("Cookie set successfully");
  } catch (error) {
    console.error("Error setting cookie:", error);
  }

  return { success: true, data: res.data };
}
