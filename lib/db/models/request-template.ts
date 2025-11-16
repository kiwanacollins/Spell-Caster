import { ObjectId } from "mongodb";

/**
 * Service Request Template for Common Patterns
 * Allows admins to create pre-filled templates for frequently requested services
 */
export interface RequestTemplate {
  _id?: ObjectId;
  name: string; // e.g., "Love Spell - New Relationship"
  serviceType: string; // Link to service catalog
  serviceName: string; // Display name
  description: string; // Pre-filled description for requests
  
  // Template content
  ritualSteps?: {
    stepNumber: number;
    stepName: string;
    notes?: string;
  }[];
  
  // Default values
  estimatedPrice?: number;
  estimatedCompletionDays?: number;
  priority?: "low" | "medium" | "high" | "urgent";
  
  // Usage tracking
  usageCount: number;
  lastUsedAt?: Date;
  
  // Admin management
  createdBy: string; // Admin user ID
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  category?: string; // e.g., "Love", "Protection", "Prosperity"
  
  // Optional guidance
  prefilledNotes?: string; // Additional notes to include
  clientTips?: string; // Guidance for clients using this template
}

/**
 * Create a new request template
 */
export function createRequestTemplate(
  name: string,
  serviceType: string,
  serviceName: string,
  description: string,
  createdBy: string
): RequestTemplate {
  const now = new Date();
  return {
    name,
    serviceType,
    serviceName,
    description,
    createdBy,
    usageCount: 0,
    active: true,
    createdAt: now,
    updatedAt: now,
  };
}
