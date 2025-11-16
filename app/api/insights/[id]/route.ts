import { NextRequest, NextResponse } from 'next/server';
import { getInsightById, updateInsightOp, deleteInsightOp, setActiveInsight } from '@/lib/db/models/insight-operations';
import { requireAdmin } from '@/lib/auth/session';

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const insight = await getInsightById(params.id);
  if (!insight) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: insight });
}

export async function PUT(request: NextRequest, context: any) {
  const { params } = context;
  await requireAdmin();
  const body = await request.json();
  // If setting active true, use setActiveInsight to ensure uniqueness per frequency
  let updated = null;
  if (body?.active === true) {
    updated = await setActiveInsight(params.id);
  } else {
    updated = await updateInsightOp(params.id, body);
  }
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: updated });
}

export async function DELETE(request: NextRequest, context: any) {
  const { params } = context;
  await requireAdmin();
  const deleted = await deleteInsightOp(params.id);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: { deleted: true } });
}
