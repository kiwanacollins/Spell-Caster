import { NextResponse } from 'next/server';
import { getActiveInsight } from '@/lib/db/models/insight-operations';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const frequency = (url.searchParams.get('frequency') || 'daily') as any;
  const insight = await getActiveInsight(frequency);
  return NextResponse.json({ data: insight });
}
