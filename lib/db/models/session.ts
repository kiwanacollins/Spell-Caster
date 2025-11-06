import { ObjectId } from "mongodb";

/**
 * Session Model Schema
 * 
 * Tracks user login history and active sessions for security monitoring
 * Extends BetterAuth's built-in session management with additional tracking
 */

export interface SessionDevice {
  // Device information
  browser?: string; // e.g., "Chrome 120.0"
  os?: string; // e.g., "macOS 14.1"
  device?: string; // e.g., "Desktop", "Mobile", "Tablet"
  deviceName?: string; // e.g., "MacBook Pro", "iPhone 15"
  
  // User agent
  userAgent?: string;
}

export interface SessionLocation {
  // Geolocation data (from IP)
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  countryCode?: string; // e.g., "US", "GB"
  latitude?: number;
  longitude?: number;
  timezone?: string;
  
  // ISP information
  isp?: string;
  organization?: string;
}

export interface LoginHistoryEntry {
  _id: ObjectId;
  userId: string;
  
  // Session info
  sessionId?: string; // BetterAuth session ID if applicable
  
  // Timestamp
  loginAt: Date;
  logoutAt?: Date;
  
  // Status
  status: "success" | "failed" | "blocked";
  failureReason?: string; // e.g., "Invalid password", "Account suspended", "2FA failed"
  
  // Device and location
  device: SessionDevice;
  location: SessionLocation;
  
  // Security flags
  isSuspicious?: boolean;
  suspiciousReasons?: string[]; // e.g., ["New location", "New device", "Unusual time"]
  
  // Duration
  sessionDuration?: number; // in seconds
}

export interface ActiveSession {
  _id: ObjectId;
  userId: string;
  
  // BetterAuth session ID
  sessionId: string;
  
  // Timestamps
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
  
  // Device and location
  device: SessionDevice;
  location: SessionLocation;
  
  // Status
  isActive: boolean;
  isCurrent?: boolean; // Is this the current session?
  
  // Security
  requiresReauth?: boolean; // Flagged for security review
  trustScore?: number; // 0-100, based on device recognition and behavior
}

/**
 * Collection names
 */
export const LOGIN_HISTORY_COLLECTION = "loginHistory";
export const ACTIVE_SESSIONS_COLLECTION = "activeSessions";

/**
 * Helper function to parse user agent
 */
export function parseUserAgent(userAgent: string): SessionDevice {
  // Simple user agent parsing (can be enhanced with ua-parser-js library)
  const device: SessionDevice = {
    userAgent,
  };

  // Browser detection
  if (userAgent.includes("Chrome")) device.browser = "Chrome";
  else if (userAgent.includes("Firefox")) device.browser = "Firefox";
  else if (userAgent.includes("Safari")) device.browser = "Safari";
  else if (userAgent.includes("Edge")) device.browser = "Edge";

  // OS detection
  if (userAgent.includes("Windows")) device.os = "Windows";
  else if (userAgent.includes("Mac OS")) device.os = "macOS";
  else if (userAgent.includes("Linux")) device.os = "Linux";
  else if (userAgent.includes("Android")) device.os = "Android";
  else if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) 
    device.os = "iOS";

  // Device type
  if (userAgent.includes("Mobile")) device.device = "Mobile";
  else if (userAgent.includes("Tablet") || userAgent.includes("iPad")) device.device = "Tablet";
  else device.device = "Desktop";

  return device;
}

/**
 * Helper function to get IP location (placeholder - requires IP geolocation API)
 */
export async function getLocationFromIP(ip: string): Promise<SessionLocation> {
  // TODO: Integrate with IP geolocation service (ipapi.co, ipstack, etc.)
  // For now, return basic structure
  return {
    ip,
    city: undefined,
    country: undefined,
    countryCode: undefined,
    timezone: undefined,
  };
}

/**
 * Helper function to detect suspicious activity
 */
export function detectSuspiciousActivity(
  userId: string,
  device: SessionDevice,
  location: SessionLocation,
  recentLogins: LoginHistoryEntry[]
): { isSuspicious: boolean; reasons: string[] } {
  const reasons: string[] = [];

  // Check for new location
  const hasLoggedInFromLocation = recentLogins.some(
    (login) => login.location.countryCode === location.countryCode
  );
  if (!hasLoggedInFromLocation && location.countryCode) {
    reasons.push("New location");
  }

  // Check for new device
  const hasLoggedInFromDevice = recentLogins.some(
    (login) => login.device.browser === device.browser && login.device.os === device.os
  );
  if (!hasLoggedInFromDevice) {
    reasons.push("New device");
  }

  // Check for unusual login time (e.g., 2 AM - 5 AM)
  const hour = new Date().getHours();
  if (hour >= 2 && hour < 5) {
    reasons.push("Unusual time");
  }

  // Check for rapid location changes (impossible travel)
  const lastLogin = recentLogins[0];
  if (lastLogin && lastLogin.location.countryCode !== location.countryCode) {
    const timeDiff = Date.now() - lastLogin.loginAt.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    if (hoursDiff < 4) {
      // Less than 4 hours between countries
      reasons.push("Impossible travel");
    }
  }

  return {
    isSuspicious: reasons.length > 0,
    reasons,
  };
}

/**
 * Helper function to calculate trust score
 */
export function calculateTrustScore(
  device: SessionDevice,
  location: SessionLocation,
  recentLogins: LoginHistoryEntry[]
): number {
  let score = 50; // Start with neutral score

  // Familiar device (+30)
  const deviceLogins = recentLogins.filter(
    (login) => login.device.browser === device.browser && login.device.os === device.os
  );
  if (deviceLogins.length > 0) score += 30;

  // Familiar location (+20)
  const locationLogins = recentLogins.filter(
    (login) => login.location.countryCode === location.countryCode
  );
  if (locationLogins.length > 0) score += 20;

  // Recent successful logins (+10)
  const recentSuccessful = recentLogins.filter(
    (login) => login.status === "success" && Date.now() - login.loginAt.getTime() < 7 * 24 * 60 * 60 * 1000
  );
  if (recentSuccessful.length > 3) score += 10;

  // Failed login attempts (-20)
  const recentFailed = recentLogins.filter(
    (login) => login.status === "failed" && Date.now() - login.loginAt.getTime() < 24 * 60 * 60 * 1000
  );
  if (recentFailed.length > 0) score -= 20;

  return Math.max(0, Math.min(100, score));
}
