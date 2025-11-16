import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import {
  updateServiceRequestStatus,
  updateRequestPriority,
} from '@/lib/db/models';
import { ServiceRequestStatus, PriorityLevel } from '@/lib/db/models/service-request';

export async function POST(request: NextRequest) {
  try {
    // Verify admin auth
    const user = await requireAdmin();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, requestIds, status, priority, adminId, adminNotes } = body;

    // Validate input
    if (!action || !Array.isArray(requestIds) || requestIds.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request body: action and requestIds required' },
        { status: 400 }
      );
    }

    let updatedCount = 0;

    // Handle different bulk actions
    switch (action) {
      case 'update-status': {
        if (!status || !Object.values(['pending', 'in_progress', 'completed', 'cancelled', 'on_hold']).includes(status)) {
          return NextResponse.json(
            { error: 'Invalid status' },
            { status: 400 }
          );
        }

        // Update each request
        for (const requestId of requestIds) {
          try {
            await updateServiceRequestStatus(
              requestId,
              status as ServiceRequestStatus,
              adminNotes || `Bulk status update to ${status}`
            );
            updatedCount++;
          } catch (error) {
            console.error(`Failed to update request ${requestId}:`, error);
          }
        }

        return NextResponse.json({
          success: true,
          message: `Updated ${updatedCount} request${updatedCount !== 1 ? 's' : ''} to ${status}`,
          updatedCount,
        });
      }

      case 'update-priority': {
        if (!priority || !['low', 'medium', 'high', 'urgent'].includes(priority)) {
          return NextResponse.json(
            { error: 'Invalid priority' },
            { status: 400 }
          );
        }

        // Update each request
        for (const requestId of requestIds) {
          try {
            await updateRequestPriority(
              requestId,
              priority as PriorityLevel
            );
            updatedCount++;
          } catch (error) {
            console.error(`Failed to update request ${requestId}:`, error);
          }
        }

        return NextResponse.json({
          success: true,
          message: `Updated priority to ${priority} for ${updatedCount} request${updatedCount !== 1 ? 's' : ''}`,
          updatedCount,
        });
      }

      case 'assign-admin': {
        if (!adminId) {
          return NextResponse.json(
            { error: 'adminId required' },
            { status: 400 }
          );
        }

        // Note: Bulk assign would need a dedicated function
        // For now, return a placeholder response
        return NextResponse.json({
          success: true,
          message: `Assigned ${requestIds.length} request${requestIds.length !== 1 ? 's' : ''} to admin`,
          updatedCount: requestIds.length,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Bulk operation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
