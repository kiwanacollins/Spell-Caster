/**
 * GET /api/payments/quotes/[quoteId] - Get quote details
 * PUT /api/payments/quotes/[quoteId] - User accepts/rejects quote or admin updates it
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession, requireAdmin } from '@/lib/auth/session';
import {
  acceptPriceQuote,
  rejectPriceQuote,
  updatePriceQuote,
} from '@/lib/payments/pricing-operations';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: { quoteId: string } }
) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quoteId = params.quoteId;

    // Validate ObjectId format
    if (!ObjectId.isValid(quoteId)) {
      return NextResponse.json({ error: 'Invalid quote ID' }, { status: 400 });
    }

    // Get the quote - TODO: Verify user owns the quote or is admin
    // For now, returning quote details
    return NextResponse.json({
      message: 'Quote details retrieved',
      quoteId,
    });
  } catch (error) {
    console.error('Error fetching quote:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { quoteId: string } }
) {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const quoteId = params.quoteId;

    // Validate ObjectId format
    if (!ObjectId.isValid(quoteId)) {
      return NextResponse.json({ error: 'Invalid quote ID' }, { status: 400 });
    }

    const body = await request.json();
    const { action, newPrice, newNotes, extendValidityDays, rejectionReason } =
      body;

    // User actions: accept or reject
    if (action === 'accept') {
      const updatedQuote = await acceptPriceQuote(quoteId);

      if (!updatedQuote) {
        return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: 'Quote accepted! You can now proceed to payment.',
        quote: updatedQuote,
      });
    }

    if (action === 'reject') {
      const updatedQuote = await rejectPriceQuote(quoteId, rejectionReason);

      if (!updatedQuote) {
        return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: 'Quote rejected. Please contact the healer to discuss pricing.',
        quote: updatedQuote,
      });
    }

    // Admin actions: update quote
    if (action === 'update') {
      await requireAdmin();

      if (newPrice !== undefined && newPrice <= 0) {
        return NextResponse.json(
          { error: 'Price must be greater than 0' },
          { status: 400 }
        );
      }

      const updatedQuote = await updatePriceQuote(
        quoteId,
        newPrice,
        newNotes,
        extendValidityDays
      );

      if (!updatedQuote) {
        return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: 'Quote updated. User will be notified.',
        quote: updatedQuote,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use: accept, reject, or update' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating quote:', error);

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Only admins can update quotes' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}
