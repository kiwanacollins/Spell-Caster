/**
 * POST /api/payments/webhook
 * Stripe webhook handler for payment events
 * Handles payment_intent.succeeded and payment_intent.payment_failed events
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/payments/stripe';

/**
 * Process webhook events from Stripe
 */
export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get('stripe-signature');
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    const body = await request.text();

    // Verify webhook signature
    const event = verifyWebhookSignature(body, signature);
    if (!event) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        return handlePaymentSucceeded(event.data.object);

      case 'payment_intent.payment_failed':
        return handlePaymentFailed(event.data.object);

      case 'charge.refunded':
        return handleRefund(event.data.object as any);

      default:
        // Acknowledge unknown event types
        return NextResponse.json({ received: true });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(paymentIntent: any) {
  try {
    const { id, amount, currency, metadata, customer } = paymentIntent;

    console.log('Payment succeeded:', {
      paymentIntentId: id,
      amount,
      currency,
      serviceName: metadata?.serviceName,
      userId: metadata?.userId,
    });

    // TODO: Here you would:
    // 1. Update service request status in database
    // 2. Send confirmation email to user
    // 3. Create transaction record
    // 4. Update user's payment history
    // 5. Send mystical ritual start notification

    // Example structure (implement with your database):
    /*
    const transaction = await db.transactions.create({
      paymentIntentId: id,
      amount: amount / 100,
      currency,
      status: 'completed',
      serviceId: metadata?.serviceId,
      serviceName: metadata?.serviceName,
      userId: metadata?.userId,
      paymentMethod: paymentIntent.payment_method,
      timestamp: new Date(),
    });

    const serviceRequest = await db.serviceRequests.updateOne(
      { _id: metadata?.serviceRequestId },
      {
        paymentStatus: 'paid',
        transactionId: transaction._id,
        paidAt: new Date(),
      }
    );

    // Send confirmation email
    await sendPaymentConfirmationEmail({
      userEmail: paymentIntent.receipt_email,
      serviceName: metadata?.serviceName,
      amount: amount / 100,
      invoiceId: transaction._id,
    });
    */

    return NextResponse.json({
      received: true,
      message: 'Payment processed successfully',
    });
  } catch (error) {
    console.error('Payment succeeded handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment confirmation' },
      { status: 500 }
    );
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(paymentIntent: any) {
  try {
    const { id, last_payment_error, metadata } = paymentIntent;

    console.error('Payment failed:', {
      paymentIntentId: id,
      error: last_payment_error?.message,
      serviceName: metadata?.serviceName,
      userId: metadata?.userId,
    });

    // TODO: Here you would:
    // 1. Update service request status to payment_failed
    // 2. Send failure notification email to user
    // 3. Optionally send retry instructions

    /*
    await db.serviceRequests.updateOne(
      { _id: metadata?.serviceRequestId },
      {
        paymentStatus: 'failed',
        failureReason: last_payment_error?.message,
        updatedAt: new Date(),
      }
    );

    await sendPaymentFailureEmail({
      userEmail: paymentIntent.receipt_email,
      serviceName: metadata?.serviceName,
      error: last_payment_error?.message,
    });
    */

    return NextResponse.json({
      received: true,
      message: 'Payment failure processed',
    });
  } catch (error) {
    console.error('Payment failed handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment failure' },
      { status: 500 }
    );
  }
}

/**
 * Handle refund event
 */
async function handleRefund(charge: any) {
  try {
    console.log('Refund processed:', {
      chargeId: charge.id,
      refundId: charge.refunds?.data?.[0]?.id,
      amount: charge.amount_refunded,
    });

    // TODO: Update transaction status to refunded
    /*
    await db.transactions.updateOne(
      { paymentIntentId: charge.payment_intent },
      {
        status: 'refunded',
        refundedAmount: charge.amount_refunded / 100,
        refundedAt: new Date(),
      }
    );
    */

    return NextResponse.json({
      received: true,
      message: 'Refund processed',
    });
  } catch (error) {
    console.error('Refund handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process refund' },
      { status: 500 }
    );
  }
}
