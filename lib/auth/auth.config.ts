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
  
  /**
   * Email & Password Authentication
   * 
   * Users can register and sign in with email/password.
   * Email verification is disabled in development but should be enabled in production.
   */
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true in production
    autoSignIn: true, // Automatically sign in after registration
    sendResetPassword: async ({ user, url }: { user: any; url: string }) => {
      // TODO: Implement email sending for password reset
      console.log(`Password reset link for ${user.email}: ${url}`);
    },
    sendVerificationEmail: async ({ user, url }: { user: any; url: string }) => {
      // TODO: Implement email sending for verification
      console.log(`Verification link for ${user.email}: ${url}`);
    },
  },

  /**
   * Session Configuration
   * 
   * Sessions expire after 7 days and are updated daily.
   * Cookie cache improves performance by caching session data.
   */
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day - session updated if older than this
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  /**
   * Social OAuth Providers
   * 
   * Google and Apple sign-in support.
   * To enable:
   * 1. Add credentials to .env.local
   * 2. Configure OAuth apps in respective consoles
   */
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // Google OAuth is enabled when credentials are provided
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID || "",
      clientSecret: process.env.APPLE_CLIENT_SECRET || "",
      // Apple OAuth can be enabled by adding credentials to .env.local
    },
  },

  /**
   * User Schema Customization
   * 
   * Define additional user fields beyond the defaults (email, name, etc.)
   */
  user: {
    additionalFields: {
      // Birth date for astrological readings
      birthDate: {
        type: "string",
        required: false,
      },
      // Location for spiritual consultations
      location: {
        type: "string",
        required: false,
      },
      // Phone number for WhatsApp integration
      phoneNumber: {
        type: "string",
        required: false,
      },
      // Spiritual profile preferences
      spiritualProfile: {
        type: "string",
        required: false,
      },
      // User role for role-based access control (values: 'user' or 'admin')
      // All new registrations default to 'user' role
      role: {
        type: "string",
        defaultValue: "user", // Default: all new users are regular users, not admins
      },
      // Account active status
      isActive: {
        type: "boolean",
        defaultValue: true,
      },
      // Account suspended status
      isSuspended: {
        type: "boolean",
        defaultValue: false,
      },
      // Account creation timestamp
      createdAt: {
        type: "date",
        defaultValue: () => new Date(),
      },
    },
  },

  /**
   * Advanced Configuration
   */
  advanced: {
    // Generate custom user IDs
    generateId: () => {
      return `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    },
    // Use secure cookies in production
    useSecureCookies: process.env.NODE_ENV === "production",
    // Cross-site request protection
    crossSubDomainCookies: {
      enabled: false,
    },
  },

  /**
   * Security Settings
   */
  secret: process.env.BETTER_AUTH_SECRET || "development-secret-change-in-production",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  /**
   * Trusted Origins
   * 
   * Add your production domain here
   */
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],
  
  /**
   * Rate Limiting
   * 
   * Prevent brute force attacks
   */
  rateLimit: {
    enabled: true,
    window: 60, // 1 minute window
    max: 10, // Max 10 requests per window
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
