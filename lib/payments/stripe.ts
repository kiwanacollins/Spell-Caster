/**
 * Stripe Payment Utilities
 * Handles Stripe client initialization, payment intent creation, and payment processing
 */

import Stripe from 'stripe';
import { env } from '@/lib/env';

/**
 * Initialize Stripe server-side client
 * Only used in API routes (server-side)
 */
export function getStripeClient(): Stripe {
  const secretKey = env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not defined');
  }
  return new Stripe(secretKey, {
    apiVersion: '2024-10-28.acacia',
  });
}

/**
 * Get Stripe public key for client-side use
 */
export function getStripePublicKey(): string {
  const publicKey = env.STRIPE_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error('STRIPE_PUBLIC_KEY environment variable is not defined');
  }
  return publicKey;
}

/**
 * Payment Intent Data Structure
 */
export interface PaymentIntentData {
  amount: number; // Amount in cents
  currency?: string;
  description: string;
  serviceId: string;
  serviceName: string;
  userId: string;
  userEmail: string;
  userName: string;
  metadata?: Record<string, string>;
}

/**
 * Payment Response Structure
 */
export interface PaymentResponse {
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
  errorCode?: string;
}

/**
 * Create a payment intent for a service request
 * Returns client secret for Stripe Payment Element
 */
export async function createPaymentIntent(
  data: PaymentIntentData
): Promise<PaymentResponse> {
  try {
    const stripe = getStripeClient();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency || 'usd',
      description: data.description,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        serviceId: data.serviceId,
        serviceName: data.serviceName,
        userId: data.userId,
        userName: data.userName,
        ...data.metadata,
      },
      receipt_email: data.userEmail,
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret || '',
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    const stripeError = error as Stripe.errors.StripeError;
    console.error('Payment intent creation error:', stripeError);

    return {
      success: false,
      error: stripeError.message || 'Failed to create payment intent',
      errorCode: stripeError.code || 'unknown_error',
    };
  }
}

/**
 * Retrieve payment intent details
 */
export async function getPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent | null> {
  try {
    const stripe = getStripeClient();
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    return null;
  }
}

/**
 * Confirm payment completion in database
 * Called from webhook after successful payment
 */
export interface PaymentConfirmationData {
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'processing' | 'requires_action';
  serviceId: string;
  userId: string;
  paymentMethod?: string;
}

/**
 * Payment webhook event handler
 */
export interface WebhookEvent {
  type: string;
  data: {
    object: Stripe.PaymentIntent;
  };
}

/**
 * Verify and parse Stripe webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string
): WebhookEvent | null {
  try {
    const stripe = getStripeClient();
    const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET environment variable is not defined');
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    ) as WebhookEvent;

    return event;
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return null;
  }
}

/**
 * Format amount for display (cents to dollars)
 */
export function formatPaymentAmount(amountInCents: number): string {
  return (amountInCents / 100).toFixed(2);
}

/**
 * Convert dollars to cents for Stripe
 */
export function convertToStripeAmount(amountInDollars: number): number {
  return Math.round(amountInDollars * 100);
}

/**
 * Get payment method display name
 */
export function getPaymentMethodDisplay(paymentMethod: Stripe.PaymentMethod): string {
  if (paymentMethod.card) {
    return `${paymentMethod.card.brand.toUpperCase()} •••• ${paymentMethod.card.last4}`;
  }
  return paymentMethod.type;
}

/**
 * Refund a payment
 */
export async function refundPayment(
  paymentIntentId: string,
  amount?: number
): Promise<{ success: boolean; refundId?: string; error?: string }> {
  try {
    const stripe = getStripeClient();

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      ...(amount && { amount }),
    });

    return {
      success: true,
      refundId: refund.id,
    };
  } catch (error) {
    const stripeError = error as Stripe.errors.StripeError;
    console.error('Refund error:', stripeError);

    return {
      success: false,
      error: stripeError.message || 'Failed to process refund',
    };
  }
}
