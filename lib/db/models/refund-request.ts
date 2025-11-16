import { ObjectId } from "mongodb";

/**
 * Refund Request Schema
 * 
 * Manages refund requests initiated by users with manual admin review and processing.
 * Users can request refunds, admins review and manually initiate Stripe refunds.
 */

export type RefundStatus = "pending" | "approved" | "denied" | "processed" | "failed";
export type RefundReason = "service_unsatisfactory" | "duplicate_charge" | "service_not_completed" | "changed_mind" | "other";

export interface RefundRequest {
  _id: ObjectId;
  
  // User & Payment Information
  userId: string; // BetterAuth user ID
  paymentIntentId: string; // Stripe payment intent ID
  transactionId?: string; // Internal transaction ID
  
  // Amount & Service Details
  amount: number; // Amount in cents (Stripe format)
  currency: string; // "usd" or other
  serviceName: string; // Name of the service that was paid for
  serviceType: string; // Service category for tracking
  
  // Refund Request Details
  reason: RefundReason; // Why the user wants a refund
  userMessage?: string; // Additional message from user (max 500 chars)
  
  // Admin Review Details
  status: RefundStatus; // Current status of the refund request
  adminNotes?: string; // Notes from admin during review
  adminId?: string; // Admin who processed the refund
  
  // Refund Processing
  refundIntentId?: string; // Stripe refund ID (populated after manual processing)
  refundedAmount?: number; // Amount actually refunded (may differ from request)
  refundMethod?: "original_payment_method" | "store_credit"; // How refund will be issued
  
  // Timestamps
  requestedAt: Date; // When user submitted refund request
  reviewedAt?: Date; // When admin reviewed the request
  processedAt?: Date; // When Stripe refund was manually initiated
  completedAt?: Date; // When refund was completed by Stripe (webhook timestamp)
  
  // Status Tracking
  stripeRefundStatus?: "succeeded" | "failed" | "pending" | null;
  stripeRefundError?: string; // Error message if Stripe refund failed
  
  // Audit Trail
  statusHistory?: Array<{
    status: RefundStatus;
    timestamp: Date;
    changedBy?: string; // Admin ID or "system"
    reason?: string;
  }>;
}

/**
 * Refund Request Creation Input
 * User provides these details when requesting a refund
 */
export interface CreateRefundRequestInput {
  paymentIntentId: string;
  reason: RefundReason;
  userMessage?: string;
}

/**
 * Refund Request Admin Update Input
 * Admin provides these details when reviewing/processing a refund
 */
export interface UpdateRefundRequestInput {
  status: RefundStatus;
  adminNotes?: string;
  refundAmount?: number; // Can refund partial amounts
  refundMethod?: "original_payment_method" | "store_credit";
}

/**
 * Refund collection name
 */
export const REFUND_REQUEST_COLLECTION = "refund_requests";

/**
 * Helper function to create a new refund request document
 */
export function createRefundRequest(
  userId: string,
  paymentIntentId: string,
  amount: number,
  serviceName: string,
  serviceType: string,
  reason: RefundReason,
  userMessage?: string
): Omit<RefundRequest, "_id"> {
  return {
    userId,
    paymentIntentId,
    amount,
    currency: "usd",
    serviceName,
    serviceType,
    reason,
    userMessage: userMessage?.slice(0, 500), // Cap at 500 chars
    status: "pending",
    requestedAt: new Date(),
    statusHistory: [
      {
        status: "pending",
        timestamp: new Date(),
        changedBy: "user",
        reason: "Refund request submitted",
      },
    ],
  };
}

/**
 * Refund reason labels for display
 */
export const REFUND_REASON_LABELS: Record<RefundReason, string> = {
  service_unsatisfactory: "Service Did Not Meet Expectations",
  duplicate_charge: "Duplicate Charge",
  service_not_completed: "Service Was Not Completed",
  changed_mind: "Changed My Mind",
  other: "Other Reason",
};

/**
 * Refund status labels for display
 */
export const REFUND_STATUS_LABELS: Record<RefundStatus, string> = {
  pending: "Awaiting Admin Review",
  approved: "Approved - Processing",
  denied: "Request Denied",
  processed: "Refund Initiated",
  failed: "Refund Failed",
};

/**
 * Refund status colors for UI (Tailwind classes)
 */
export const REFUND_STATUS_COLORS: Record<RefundStatus, string> = {
  pending: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  approved: "bg-blue-500/20 text-blue-700 border-blue-500/30",
  denied: "bg-red-500/20 text-red-700 border-red-500/30",
  processed: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30",
  failed: "bg-red-500/20 text-red-700 border-red-500/30",
};
