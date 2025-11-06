"use client";

import { createAuthClient } from "better-auth/react";

/**
 * Client-side authentication client
 * Use this in Client Components for authentication actions
 * 
 * Available methods:
 * - signIn.email({ email, password })
 * - signUp.email({ email, password, name })
 * - signOut()
 * - useSession() - React hook for current session
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;
