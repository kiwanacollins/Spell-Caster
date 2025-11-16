import { ObjectId } from "mongodb";

/**
 * Admin Invite Schema
 * 
 * Used to track one-time setup links for inviting new admins
 * Supports both email and one-time token-based access
 */
export interface AdminInvite {
  _id?: ObjectId;
  id?: string;
  email: string;
  token: string; // Unique token for one-time link
  role: "user" | "admin"; // Role to assign when invite is accepted
  createdBy: string; // User ID of admin who created invite
  createdAt: Date;
  expiresAt: Date; // Invite expires after 7 days by default
  acceptedAt?: Date; // When the invite was accepted
  acceptedBy?: string; // User ID who accepted the invite
  status: "pending" | "accepted" | "expired"; // Status of invite
  metadata?: {
    customMessage?: string;
    inviteSource?: "manual" | "bulk";
  };
}

/**
 * Create index for admin invites collection
 */
export async function createAdminInviteIndexes(db: any) {
  const collection = db.collection("admin_invites");
  
  await collection.createIndex({ token: 1 }, { unique: true });
  await collection.createIndex({ email: 1 });
  await collection.createIndex({ expiresAt: 1 });
  await collection.createIndex({ createdAt: -1 });
  await collection.createIndex({ status: 1 });
}
