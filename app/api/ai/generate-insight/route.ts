import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { generateMysticalInsight } from '@/lib/ai/content-generator';

export async function POST(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const { frequency = 'daily', tone, tags, length } = body || {};
  const data = await generateMysticalInsight({ frequency, tone, tags, length });
  return NextResponse.json({ data });
}
