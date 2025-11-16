import { NextRequest, NextResponse } from 'next/server';
import { createInsightOp, listInsights } from '@/lib/db/models/insight-operations';
import { requireAdmin, getCurrentUser } from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const frequency = url.searchParams.get('frequency') as any;
  const active = url.searchParams.get('active');
  const filters: any = {};
  if (frequency) filters.frequency = frequency;
  if (active) filters.active = active === 'true';
  const data = await listInsights(filters);
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  await requireAdmin();
  const body = await request.json();
  const { title, content, frequency = 'daily', tags = [], previewText } = body;
  if (!title || !content) {
    return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
  }
  const user = await getCurrentUser();
  const createdBy = user?.id ?? (user as any)?._id ?? undefined;
  const created = await createInsightOp(title, content, frequency, createdBy, {
    tags,
    previewText,
  });
  return NextResponse.json({ data: created }, { status: 201 });
}
