import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import {
  getPendingRefundRequests,
  getRefundRequestById,
  updateRefundRequest,
  updateRefundWithStripeInfo,
} from '@/lib/db/models';
import { refundPayment } from '@/lib/payments/stripe';

/**
 * GET /api/payments/refund-request/[id]
 * Get a specific refund request (admin only)
 */
export async function GET(
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

    const refundRequest = await getRefundRequestById(id);

    if (!refundRequest) {
      return NextResponse.json(
        { error: 'Refund request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        refundRequest,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching refund request:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch refund request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/payments/refund-request/[id]
 * Update a refund request (admin only)
 * 
 * Body:
 * - status: 'approved' | 'denied' | 'processed' | 'failed'
 * - adminNotes?: string
 * - refundAmount?: number (in cents)
 * - refundMethod?: 'original_payment_method' | 'store_credit'
 */
export async function PUT(
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

    const body = await request.json();
    const { status, adminNotes, refundAmount, refundMethod } = body;

    // Validate status
    const validStatuses = ['approved', 'denied', 'processed', 'failed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status provided' },
        { status: 400 }
      );
    }

    // Update the refund request
    const updatedRefund = await updateRefundRequest(id, session.user.id, {
      status: status as any,
      adminNotes,
      refundAmount,
      refundMethod: refundMethod || 'original_payment_method',
    });

    console.log(`Refund request ${id} updated to status: ${status}`);

    return NextResponse.json(
      {
        success: true,
        message: `Refund request ${status}`,
        refundRequest: updatedRefund,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating refund request:', error);

    return NextResponse.json(
      {
        error: 'Failed to update refund request',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
