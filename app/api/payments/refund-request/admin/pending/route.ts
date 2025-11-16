import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getPendingRefundRequests } from '@/lib/db/models';

/**
 * GET /api/payments/refund-request/admin/pending
 * Get all pending refund requests for admin review
 * 
 * Query params:
 * - limit?: number (default: 50, max: 100)
 * - status?: 'pending' | 'approved' (default: both)
 * 
 * Returns: Array of pending RefundRequest documents
 */
export async function GET(request: NextRequest) {
  try {
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

    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    // Get pending refund requests
    const pendingRefunds = await getPendingRefundRequests(limit);

    return NextResponse.json(
      {
        success: true,
        count: pendingRefunds.length,
        refundRequests: pendingRefunds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching pending refund requests:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch pending refund requests',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
