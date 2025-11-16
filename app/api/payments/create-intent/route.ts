/**
 * POST /api/payments/create-intent
 * Create a Stripe payment intent for a service request
 */

import { NextRequest, NextResponse } from 'next/server';
import { createPaymentIntent, convertToStripeAmount } from '@/lib/payments/stripe';
import { getSession } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    // Get session to verify user is authenticated
    const session = await getSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { serviceId, serviceName, amount, description, metadata } = body;

    // Validate required fields
    if (!serviceId || !serviceName || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceId, serviceName, amount' },
        { status: 400 }
      );
    }

    // Validate amount is positive
    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    // Convert amount to cents
    const amountInCents = convertToStripeAmount(amount);

    // Create payment intent
    const result = await createPaymentIntent({
      amount: amountInCents,
      currency: 'usd',
      description: description || `Payment for ${serviceName}`,
      serviceId,
      serviceName,
      userId: session.user.id,
      userEmail: session.user.email || '',
      userName: session.user.name || 'Anonymous',
      metadata,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
