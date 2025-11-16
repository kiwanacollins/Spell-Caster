import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import {
  getUserPendingPayments,
  getUserTotalPendingAmount,
} from '@/lib/db/models/payment-operations';

/**
 * GET /api/payments/pending
 * Fetch pending payments and due amounts for the current user
 */
export async function GET(request: NextRequest) {
  try {
    // Get session
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id || session.user.email;
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID not found' },
        { status: 401 }
      );
    }

    // Fetch pending payments
    const pendingPayments = await getUserPendingPayments(userId);
    const totalAmount = await getUserTotalPendingAmount(userId);

    return NextResponse.json({
      success: true,
      payments: pendingPayments,
      totalAmount,
      count: pendingPayments.length,
    });
  } catch (error) {
    console.error('Error fetching pending payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pending payments' },
      { status: 500 }
    );
  }
}
