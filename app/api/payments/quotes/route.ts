/**
 * GET /api/payments/quotes - Get user's price quotes
 * POST /api/payments/quotes - Admin creates a price quote for a user
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession, requireAdmin } from '@/lib/auth/session';
import {
  getUserQuotes,
  createPriceQuote,
  getPendingQuotes,
  getQuoteStats,
} from '@/lib/payments/pricing-operations';
import { getServiceConfig } from '@/lib/payments/pricing';

export async function GET(request: NextRequest) {
  try {
    // Get current user session
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view'); // 'user' or 'admin'

    // Admin views all pending quotes or statistics
    if (view === 'admin') {
      await requireAdmin();

      const statsQuery = searchParams.get('stats');
      if (statsQuery === 'true') {
        const stats = await getQuoteStats();
        return NextResponse.json(stats);
      }

      const limit = parseInt(searchParams.get('limit') || '20');
      const quotes = await getPendingQuotes(limit);
      return NextResponse.json({ quotes, count: quotes.length });
    }

    // User views their own quotes
    const quotes = await getUserQuotes(session.user.id);
    return NextResponse.json({ quotes, count: quotes.length });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Only admin can create quotes
    await requireAdmin();

    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, serviceId, quotedPrice, notes, validDays } = body;

    // Validate required fields
    if (!userId || !serviceId || !quotedPrice) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, serviceId, quotedPrice' },
        { status: 400 }
      );
    }

    // Validate service exists
    try {
      getServiceConfig(serviceId);
    } catch {
      return NextResponse.json(
        { error: `Invalid service: ${serviceId}` },
        { status: 400 }
      );
    }

    // Validate price is positive
    if (quotedPrice <= 0) {
      return NextResponse.json(
        { error: 'Quoted price must be greater than 0' },
        { status: 400 }
      );
    }

    // Create the quote
    const quote = await createPriceQuote(
      userId,
      serviceId,
      getServiceConfig(serviceId).name,
      quotedPrice,
      notes,
      validDays || 7
    );

    return NextResponse.json(
      {
        success: true,
        message: `Price quote created for user. They can view and accept it in the app or via WhatsApp/Messenger.`,
        quote,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating quote:', error);

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json(
        { error: 'Only admins can create quotes' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}
