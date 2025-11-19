import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const users = await db.collection('users').find(
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      },
      { projection: { _id: 1, name: 1, email: 1 } }
    ).limit(10).toArray();

    return NextResponse.json({
      users: users.map((user) => ({
        _id: user._id?.toString(),
        name: user.name,
        email: user.email,
      })),
    });
  } catch (error) {
    console.error('User search error:', error);
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    );
  }
}
