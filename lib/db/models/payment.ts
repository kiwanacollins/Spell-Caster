import { ObjectId } from 'mongodb';

/**
 * Database collection name for payments
 */
export const PAYMENT_COLLECTION = 'payments';

/**
 * Payment Status
 */
export type PaymentStatus = 'pending' | 'scheduled' | 'partially_paid' | 'completed' | 'overdue' | 'cancelled';

/**
 * Payment Plan Type
 */
export type PaymentPlanType = 'one_time' | 'installment' | 'subscription';

/**
 * Payment Installment
 */
export interface PaymentInstallment {
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  paidAmount: number;
  status: 'pending' | 'scheduled' | 'partial' | 'paid' | 'overdue';
  paidDate?: Date;
  notes?: string;
}

/**
 * Payment Record
 * Tracks payments, pending amounts, and payment plans for services
 */
export interface Payment {
  _id?: ObjectId;
  userId: string; // Reference to user
  serviceRequestId: string; // Reference to service request
  serviceName: string;
  serviceType: string;
  totalAmount: number; // Total cost of the service
  amountPaid: number; // Amount already paid
  amountDue: number; // Amount still owed
  paymentPlanType: PaymentPlanType;
  status: PaymentStatus;
  
  // One-time payment fields
  paymentIntentId?: string; // Stripe payment intent ID
  stripeChargeId?: string; // Stripe charge ID
  
  // Installment plan fields (for services > $200)
  installments?: PaymentInstallment[];
  currentInstallmentNumber?: number;
  
  // Subscription fields
  subscriptionId?: string; // Stripe subscription ID
  subscriptionFrequency?: 'monthly' | 'quarterly' | 'yearly';
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  nextBillingDate?: Date;
  
  // General payment fields
  paymentMethod: string; // 'card', 'bank_transfer', etc.
  lastFourDigits?: string; // Last 4 digits of card
  currency: string; // 'usd', etc.
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  
  // Tracking
  dueDate: Date;
  overdueBy?: number; // Days overdue
  notes?: string;
  reminders?: {
    sent: boolean;
    sendDate?: Date;
  };
}

/**
 * Create a new payment record
 */
export function createPayment(
  userId: string,
  serviceRequestId: string,
  serviceName: string,
  serviceType: string,
  totalAmount: number,
  paymentPlanType: PaymentPlanType = 'one_time',
  dueDate: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  paymentMethod: string = 'card'
): Payment {
  const now = new Date();
  
  return {
    userId,
    serviceRequestId,
    serviceName,
    serviceType,
    totalAmount,
    amountPaid: 0,
    amountDue: totalAmount,
    paymentPlanType,
    status: 'pending',
    paymentMethod,
    currency: 'usd',
    createdAt: now,
    updatedAt: now,
    dueDate,
    notes: `Payment for ${serviceName}`,
    reminders: {
      sent: false,
    },
  };
}

/**
 * Create installment payment schedule for services over $200
 */
export function createInstallmentSchedule(
  numberOfInstallments: number,
  totalAmount: number,
  startDate: Date = new Date()
): PaymentInstallment[] {
  const installments: PaymentInstallment[] = [];
  const installmentAmount = totalAmount / numberOfInstallments;
  
  for (let i = 1; i <= numberOfInstallments; i++) {
    const dueDate = new Date(startDate);
    // Due every 30 days (adjustable based on preference)
    dueDate.setDate(dueDate.getDate() + i * 30);
    
    installments.push({
      installmentNumber: i,
      dueDate,
      amount: installmentAmount,
      paidAmount: 0,
      status: 'pending',
      notes: `Installment ${i} of ${numberOfInstallments}`,
    });
  }
  
  return installments;
}

/**
 * Calculate if payment is overdue
 */
export function isPaymentOverdue(dueDate: Date): boolean {
  return new Date() > dueDate;
}

/**
 * Calculate days overdue
 */
export function getDaysOverdue(dueDate: Date): number {
  const now = new Date();
  if (now <= dueDate) return 0;
  
  const diffTime = Math.abs(now.getTime() - dueDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculate payment progress percentage
 */
export function getPaymentProgress(amountPaid: number, totalAmount: number): number {
  if (totalAmount === 0) return 0;
  return Math.round((amountPaid / totalAmount) * 100);
}
