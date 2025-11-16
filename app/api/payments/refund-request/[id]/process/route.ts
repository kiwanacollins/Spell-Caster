import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getRefundRequestById, updateRefundWithStripeInfo } from '@/lib/db/models';
import { refundPayment } from '@/lib/payments/stripe';

/**
 * POST /api/payments/refund-request/[id]/process
 * Admin endpoint to manually initiate a Stripe refund
 * 
 * This is called by admin AFTER reviewing and approving a refund request
 * The refund is actually processed with Stripe (manual control)
 * 
 * Body:
 * - refundAmount?: number (in cents, optional - defaults to full amount)
 * - reason?: string (optional - reason for Stripe refund)
 * 
 * Returns: Stripe refund object details
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    // Check authentication and admin role
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Get the refund request
    const refundRequest = await getRefundRequestById(id);

    if (!refundRequest) {
      return NextResponse.json(
        { error: 'Refund request not found' },
        { status: 404 }
      );
    }

    if (refundRequest.status !== 'approved') {
      return NextResponse.json(
        {
          error: 'Cannot process refund',
          message: `Refund request must be in 'approved' status. Current status: ${refundRequest.status}`,
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { refundAmount, reason } = body;

    // Determine refund amount (defaults to full amount)
    const amountToRefund = refundAmount || refundRequest.amount;

    if (amountToRefund > refundRequest.amount) {
      return NextResponse.json(
        { error: 'Refund amount cannot exceed original transaction amount' },
        { status: 400 }
      );
    }

    // Call Stripe to process the refund
    // This is where the manual admin control happens
    const stripeRefund = await refundPayment(
      refundRequest.paymentIntentId,
      amountToRefund,
      reason || `Manual refund approved by admin: ${refundRequest.reason}`
    );

    if (!stripeRefund.success || !stripeRefund.refundId) {
      return NextResponse.json(
        {
          error: 'Failed to process Stripe refund',
          message: stripeRefund.error || 'Stripe API error',
        },
        { status: 500 }
      );
    }

    // Update the refund request with Stripe refund details
    const updatedRefund = await updateRefundWithStripeInfo(
      id,
      stripeRefund.refundId,
      session.user.id
    );

    console.log(
      `Stripe refund ${stripeRefund.refundId} processed for refund request ${id} by admin ${session.user.id}`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Refund processed successfully with Stripe',
        refundId: stripeRefund.refundId,
        amount: stripeRefund.amount,
        currency: stripeRefund.currency,
        status: stripeRefund.status,
        refundRequest: updatedRefund,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing Stripe refund:', error);

    return NextResponse.json(
      {
        error: 'Failed to process refund',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
