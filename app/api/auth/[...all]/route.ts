import { toNextJsHandler } from "better-auth/next-js";

// Force Node.js runtime for BetterAuth (crypto module required)
export const runtime = 'nodejs';

/**
 * BetterAuth API Route Handler
 * 
 * This handles all authentication-related API calls:
 * - POST /api/auth/sign-in
 * - POST /api/auth/sign-up
 * - POST /api/auth/sign-out
 * - GET /api/auth/session
 * - And other BetterAuth endpoints
 * 
 * Note: We lazy-load the auth config to prevent Edge runtime issues
 */

// Lazy load auth config only when needed
let authHandlers: { GET: any; POST: any } | null = null;

async function getAuthHandlers() {
  if (!authHandlers) {
    const { auth } = await import("@/lib/auth/auth.config");
    authHandlers = toNextJsHandler(auth);
  }
  return authHandlers;
}

export async function GET(request: Request) {
  const handlers = await getAuthHandlers();
  return handlers.GET(request);
}

export async function POST(request: Request) {
  const handlers = await getAuthHandlers();
  return handlers.POST(request);
}
