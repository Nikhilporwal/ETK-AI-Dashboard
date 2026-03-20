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

export type ActionResponse = AuthResponse | { error: string };

export async function loginAction(
  credentials: AuthCredentials,
): Promise<ActionResponse> {
  const res = await apiFetch<AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!res.success || !res.data?.access_token) {
    return { error: res.message || "Login failed" };
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_token", res.data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res.data;
}

export async function signupAction(
  data: AuthCredentials,
): Promise<ActionResponse> {
  console.log("res");
  const res = await apiFetch<AuthResponse>("/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
  console.log(res);

  if (!res.success || !res.data?.access_token) {
    return { error: res.message || "Registration failed" };
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_token", res.data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return res.data;
}
