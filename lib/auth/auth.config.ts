import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import type { BetterAuthOptions } from "better-auth";

/**
 * BetterAuth Configuration
 * 
 * This configuration sets up authentication with:
 * - Email/Password authentication
 * - MongoDB adapter for data persistence
 * - Session management
 * - Future: OAuth providers (Google, Apple)
 */

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Create a MongoDB client for BetterAuth (singleton)
const mongoClient = new MongoClient(process.env.MONGODB_URI);

// Lazy database connection
let dbPromise: Promise<any> | null = null;

function getDb() {
  if (!dbPromise) {
    dbPromise = mongoClient.connect().then(() => mongoClient.db("spell-caster"));
  }
  return dbPromise;
}

export const auth = betterAuth({
  database: async (options: BetterAuthOptions) => {
    const db = await getDb();
    return mongodbAdapter(db, {
      usePlural: false,
      transaction: true,
    })(options);
  },
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day - session updated if older than this
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  // Social providers (to be enabled when OAuth credentials are available)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: false, // Enable when credentials are added
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "",
      enabled: false, // Enable when credentials are added
    },
  },

  advanced: {
    generateId: () => {
      // Generate a custom ID (could use nanoid, uuid, etc.)
      return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    },
  },

  // Security settings
  secret: process.env.BETTER_AUTH_SECRET || "development-secret-change-in-production",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Trust host in production
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
