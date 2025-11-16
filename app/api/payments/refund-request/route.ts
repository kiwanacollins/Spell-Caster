import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { createRefundRequest, getUserRefundRequests } from '@/lib/db/models';
import { CreateRefundRequestInput } from '@/lib/db/models';

/**
 * POST /api/payments/refund-request
 * Create a new refund request from a user
 * 
 * Body:
 * - paymentIntentId: string (Stripe payment intent ID or transaction ID)
 * - reason: RefundReason
 * - userMessage?: string (optional)
 * 
 * Returns: Created RefundRequest document
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    // Check authentication
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - You must be logged in to request a refund' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { paymentIntentId, reason, userMessage } = body as CreateRefundRequestInput;

    // Validate required fields
    if (!paymentIntentId || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields: paymentIntentId and reason' },
        { status: 400 }
      );
    }

    // Validate reason is one of the allowed values
    const validReasons = [
      'service_unsatisfactory',
      'duplicate_charge',
      'service_not_completed',
      'changed_mind',
      'other',
    ];

    if (!validReasons.includes(reason)) {
      return NextResponse.json(
        { error: 'Invalid refund reason provided' },
        { status: 400 }
      );
    }

    // Validate message length if provided
    if (userMessage && userMessage.length > 500) {
      return NextResponse.json(
        { error: 'User message exceeds maximum length of 500 characters' },
        { status: 400 }
      );
    }

    // TODO: Look up the transaction to get amount and service details
    // This would typically come from your database or Stripe
    // For now, we'll need to pass this info or fetch it
    const mockTransaction = {
      amount: 25000, // cents
      serviceName: 'Spiritual Service',
      serviceType: 'general',
    };

    // Create refund request in database
    const refundRequest = await createRefundRequest(
      session.user.id,
      paymentIntentId,
      mockTransaction.amount,
      mockTransaction.serviceName,
      mockTransaction.serviceType,
      reason as any,
      userMessage
    );

    console.log(`Refund request created: ${refundRequest._id} for user ${session.user.id}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Refund request submitted successfully',
        refundRequestId: refundRequest._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating refund request:', error);

    return NextResponse.json(
      {
        error: 'Failed to create refund request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/payments/refund-request
 * Get refund requests for the current user
 * 
 * Query params:
 * - limit?: number (default: 10)
 * 
 * Returns: Array of RefundRequest documents
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    // Check authentication
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);

    // Get user's refund requests
    const refundRequests = await getUserRefundRequests(session.user.id, limit);

    return NextResponse.json(
      {
        success: true,
        refundRequests,
        count: refundRequests.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching refund requests:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch refund requests',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
