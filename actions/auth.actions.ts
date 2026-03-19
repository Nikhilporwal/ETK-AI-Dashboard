"use server";

import apiFetch from "@/lib/api/api";
import { cookies } from "next/headers";

export async function loginAction(credentials: any) {
  const res = await apiFetch<any>(`/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  console.log("res", res);

  if (res.success && res.data?.access_token) {
    const cookieStore = await cookies();
    cookieStore.set("auth_token", res.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
  } else {
    throw new Error(res.message || "Login failed");
  }

  return res.data;
}
