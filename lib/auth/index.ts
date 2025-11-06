// Session management utilities (server-side)
export {
  getSession,
  getCurrentUser,
  requireAuth,
  requireAdmin,
  isAdmin,
  signOut,
} from "./session";

// Client-side auth helpers
export {
  authClient,
  signIn,
  signUp,
  useSession,
} from "./client";

// Client-side hooks
export {
  useUser,
  useRequireAuth,
  useIsAdmin,
} from "./hooks";
