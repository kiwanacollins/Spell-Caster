import { ObjectId } from "mongodb";

/**
 * Service Request Status Workflow
 */
export type ServiceRequestStatus = "pending" | "in_progress" | "completed" | "cancelled" | "on_hold";

/**
 * Priority Level
 */
export type PriorityLevel = "low" | "medium" | "high" | "urgent";

/**
 * Request Update Entry for History Tracking
 */
export interface RequestStatusUpdate {
  _id?: ObjectId;
  status: ServiceRequestStatus;
  updatedBy: string; // Admin user ID
  updatedAt: Date;
  notes?: string;
}

/**
 * Ritual Progress Tracking
 */
export interface RitualProgress {
  _id?: ObjectId;
  stepNumber: number;
  stepName: string;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
  photoUrls?: string[]; // URLs to uploaded progress photos/videos
}

/**
 * Service Request Schema
 */
export interface ServiceRequest {
  _id?: ObjectId;
  userId: string; // User who requested the service
  serviceName: string; // Name of the service (e.g., "Love Spell", "Protection Ritual")
  serviceType: string; // Service type from catalog
  description: string; // Client's description of their need
  
  // Status tracking
  status: ServiceRequestStatus;
  priority: PriorityLevel;
  statusHistory: RequestStatusUpdate[];
  
  // Assignment
  assignedTo?: string; // Admin user ID
  assignedAt?: Date;
  
  // Ritual progress
  ritualSteps?: RitualProgress[];
  ritualNotes?: string; // Private notes for admin
  
  // Payment reference
  paymentIntentId?: string; // Stripe payment intent ID
  amountPaid?: number;
  
  // Timing
  requestedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  estimatedCompletionDate?: Date;
  
  // Client preferences
  clientNotes?: string;
  preferredCommunicationMethod?: "email" | "whatsapp" | "messenger";
  
  // Admin tracking
  adminNotes?: string;
  tags?: string[]; // For categorization
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create a new service request
 */
export function createServiceRequest(
  userId: string,
  serviceName: string,
  serviceType: string,
  description: string,
  clientNotes?: string
): ServiceRequest {
  const now = new Date();
  return {
    userId,
    serviceName,
    serviceType,
    description,
    status: "pending",
    priority: "medium",
    statusHistory: [
      {
        status: "pending",
        updatedBy: "system",
        updatedAt: now,
        notes: "Request created",
      },
    ],
    clientNotes,
    requestedAt: now,
    createdAt: now,
    updatedAt: now,
  };
}
