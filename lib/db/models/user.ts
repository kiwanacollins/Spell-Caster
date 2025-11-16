import { ObjectId } from "mongodb";

/**
 * User Profile Schema
 * 
 * Extends BetterAuth's base user model with additional spiritual profile fields.
 * BetterAuth provides: id, email, emailVerified, name, image, createdAt, updatedAt
 * 
 * This schema adds spiritual journey tracking and personalization data.
 */

export interface SpiritualProfile {
  // Birth information for astrological readings
  birthDate?: Date;
  birthTime?: string; // Format: "HH:mm"
  birthPlace?: {
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };

  // Zodiac information (can be auto-calculated from birthDate)
  zodiacSign?: string;
  moonSign?: string;
  risingSign?: string;

  // Spiritual preferences and journey
  spiritualInterests?: string[]; // e.g., ["Tarot", "Astrology", "Energy Healing", "Protection Spells"]
  experienceLevel?: "Beginner" | "Intermediate" | "Advanced" | "Master";
  primaryIntentions?: string[]; // e.g., ["Love", "Career", "Healing", "Protection"]
  
  // Energy alignment tracking
  energyAlignment?: number; // 0-100 percentage
  lastEnergyReading?: Date;

  // Spiritual journey milestones
  joinedCircle?: Date; // When they became a member
  spiritualLevel?: "Novice" | "Seeker" | "Practitioner" | "Adept" | "Master";
  spiritualPoints?: number; // Gamification points for engagement
  badges?: string[]; // Achievement badge IDs

  // Personal spiritual notes (visible to admin only)
  notes?: string;
}

export interface UserPreferences {
  // Notification preferences
  notifications?: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    whatsapp?: boolean;
    messenger?: boolean;
  };

  // Channel preferences
  preferredChannel?: "email" | "whatsapp" | "messenger" | "in-app";

  // Communication preferences
  communicationStyle?: "concise" | "detailed" | "mystical";
  language?: string; // ISO language code (e.g., "en", "es")

  // Accessibility
  reducedMotion?: boolean;
  fontSize?: "small" | "medium" | "large";
  darkMode?: boolean;
}

export interface UserLocation {
  // Current location
  city?: string;
  state?: string;
  country?: string;
  timezone?: string; // IANA timezone (e.g., "America/New_York")
}

export interface UserStats {
  // Activity statistics
  totalSpellsRequested?: number;
  activeSpells?: number;
  completedSpells?: number;
  
  totalConsultations?: number;
  upcomingConsultations?: number;
  pastConsultations?: number;

  unreadMessages?: number;
  
  // Engagement
  lastLoginAt?: Date;
  lastActivityAt?: Date;
  joinedAt?: Date;
  
  // Financial
  lifetimeValue?: number; // Total spent
  subscriptionStatus?: "none" | "active" | "cancelled" | "paused";
  
  // Referrals
  referralCode?: string;
  referredBy?: string; // User ID who referred them
  referralCount?: number; // Number of successful referrals
}

/**
 * Extended User Document
 * 
 * Complete user profile including BetterAuth fields and custom extensions
 */
export interface UserDocument {
  _id: ObjectId;
  
  // BetterAuth base fields
  id: string; // BetterAuth uses string IDs
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;

  // Custom fields
  phone?: string;
  location?: UserLocation;
  spiritualProfile?: SpiritualProfile;
  preferences?: UserPreferences;
  stats?: UserStats;

  // Role and permissions
  role: "user" | "admin"; // Role-based access control (default: "user")
  isActive?: boolean;
  isSuspended?: boolean;
  suspensionReason?: string;

  // Internal admin notes
  adminNotes?: string;
  
  // Security
  twoFactorEnabled?: boolean;
  twoFactorSecret?: string;
}

/**
 * User creation input (registration)
 */
export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
  phone?: string;
  birthDate?: Date;
  location?: {
    city?: string;
    country?: string;
  };
}

/**
 * User update input (profile editing)
 */
export interface UpdateUserProfileInput {
  name?: string;
  phone?: string;
  birthDate?: Date;
  birthTime?: string;
  birthPlace?: {
    city: string;
    country: string;
  };
  location?: UserLocation;
  spiritualInterests?: string[];
  primaryIntentions?: string[];
  preferences?: UserPreferences;
}

/**
 * User collection name
 */
export const USER_COLLECTION = "user"; // BetterAuth uses singular "user"

/**
 * Helper function to initialize a new user's spiritual profile
 */
export function initializeSpiritualProfile(): SpiritualProfile {
  return {
    spiritualInterests: [],
    experienceLevel: "Beginner",
    primaryIntentions: [],
    energyAlignment: 50, // Start at neutral alignment
    lastEnergyReading: new Date(),
    joinedCircle: new Date(),
    spiritualLevel: "Novice",
    spiritualPoints: 0,
    badges: [],
  };
}

/**
 * Helper function to initialize user stats
 */
export function initializeUserStats(): UserStats {
  return {
    totalSpellsRequested: 0,
    activeSpells: 0,
    completedSpells: 0,
    totalConsultations: 0,
    upcomingConsultations: 0,
    pastConsultations: 0,
    unreadMessages: 0,
    joinedAt: new Date(),
    lastLoginAt: new Date(),
    lastActivityAt: new Date(),
    lifetimeValue: 0,
    subscriptionStatus: "none",
    referralCount: 0,
  };
}

/**
 * Helper function to initialize default preferences
 */
export function initializeUserPreferences(): UserPreferences {
  return {
    notifications: {
      email: true,
      sms: false,
      push: true,
      whatsapp: false,
      messenger: false,
    },
    preferredChannel: "email",
    communicationStyle: "detailed",
    language: "en",
    reducedMotion: false,
    fontSize: "medium",
    darkMode: false,
  };
}

/**
 * Helper function to create a new user document with default values
 * All new registrations default to 'user' role
 */
export function createDefaultUserDocument(
  id: string,
  email: string,
  name: string,
  image?: string
): Partial<UserDocument> {
  return {
    id,
    email,
    emailVerified: false,
    name,
    image,
    role: "user", // Default: all new users are regular users
    isActive: true,
    isSuspended: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    spiritualProfile: initializeSpiritualProfile(),
    preferences: initializeUserPreferences(),
    stats: initializeUserStats(),
  };
}
