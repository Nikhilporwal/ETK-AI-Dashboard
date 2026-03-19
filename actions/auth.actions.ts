"use server";

import apiFetch from "@/lib/api/api";
import { cookies } from "next/headers";

interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export async function loginAction(credentials: LoginCredentials) {
  const res = await apiFetch<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!res.success || !res.data?.access_token) {
    throw new Error(res.message || "Login failed");
  }

  const cookieStore = await cookies();

  cookieStore.set("auth_token", res.data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/", // good practice
  });

  return res.data;
}
