"use server";

import { UserDetails } from "@/context/JobContext";
import apiFetch from "@/lib/api/api";
import { cookies } from "next/headers";

export interface AuthCredentials {
  email: string;
  password: string;
}

export type AuthData = {
  access_token: string;
  user_id: string;
  email: string;
};

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
} as const;

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, AUTH_COOKIE_OPTIONS);
}

export async function loginAction(
  credentials: AuthCredentials,
): Promise<ActionResult<AuthData>> {

  const res = await apiFetch<AuthData>("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!res.success || !res.data?.access_token) {
    return { success: false, error: res.message };
  }

  try {
    await setAuthCookie(res.data.access_token);
  } catch (error) {
    console.error("Error setting login cookie:", error);
  }

  return { success: true, data: res.data };
}

export async function signupAction(
  credentials: AuthCredentials,
): Promise<ActionResult<AuthData>> {

  const res = await apiFetch<AuthData>("/signup", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!res.success || !res.data?.access_token) {
    return { success: false, error: res.message };
  }

  try {
    await setAuthCookie(res.data.access_token);
  } catch (error) {
    console.error("Error setting cookie:", error);
  }

  return { success: true, data: res.data };
}


export async function getUserIdAction(): Promise<ActionResult<UserDetails>> {
  try {
    const res = await apiFetch<UserDetails>(
      `/get-user-id`
    );

    if (!res.success) {
      return { success: false, error: res.message };
    }

    return { success: true, data: res.data };

  } catch (error) {
    return { success: false, error: "Failed to fetch user details" };
  }
}

export async function forgotPasswordAction(
  data: { email: string }
): Promise<ActionResult<UserDetails>> {
  try {
    const res = await apiFetch<UserDetails>(
      `/forgot-password`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!res.success) {
      return { success: false, error: res.message };
    }

    return { success: true, data: res.data };

  } catch (error) {
    return { success: false, error: "Failed to reset password" };
  }
}

export async function verifyOtpAction(
  data: {
    email: string
    otp: string
    new_password: string
  }
): Promise<ActionResult<UserDetails>> {
  try {
    const res = await apiFetch<UserDetails>(
      `/reset-password`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (!res.success) {
      return { success: false, error: res.message };
    }

    return { success: true, data: res.data };

  } catch (error) {
    return { success: false, error: "Failed to verify otp & reset password" };
  }
}