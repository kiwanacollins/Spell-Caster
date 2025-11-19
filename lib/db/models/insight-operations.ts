import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Insight, createInsight, InsightFrequency } from './insight';

export async function createInsightOp(
  title: string,
  content: string,
  frequency: InsightFrequency,
  createdBy?: string,
  options?: Partial<Insight>
): Promise<Insight> {
  const db = await getDatabase();
  const insight = createInsight(title, content, frequency, createdBy, options);
  const result = await db.collection('insights').insertOne(insight as any);
  return { ...insight, _id: result.insertedId };
}

export async function getInsightById(id: string): Promise<Insight | null> {
  const db = await getDatabase();
  return (await db.collection('insights').findOne({ _id: new ObjectId(id) })) as Insight | null;
}

export async function updateInsightOp(id: string, updates: Partial<Insight>): Promise<Insight | null> {
  const db = await getDatabase();
  const updatesToSet = { ...updates, updatedAt: new Date() };
  const result = await db
    .collection('insights')
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatesToSet }, { returnDocument: 'after' });
  return result?.value as Insight | null;
}

export async function deleteInsightOp(id: string): Promise<boolean> {
  const db = await getDatabase();
  const { deletedCount } = await db.collection('insights').deleteOne({ _id: new ObjectId(id) });
  return deletedCount === 1;
}

export async function listInsights(filters?: Partial<Insight>): Promise<Insight[]> {
  const db = await getDatabase();
  const q: any = {};
  if (filters?.frequency) q.frequency = filters.frequency;
  if (filters?.active !== undefined) q.active = filters.active;
  if (filters?.locale) q.locale = filters.locale;
  if (filters?.tags && filters?.tags.length) q.tags = { $in: filters.tags };
  return (await db.collection('insights').find(q).sort({ createdAt: -1 }).toArray()) as Insight[];
}

export async function getActiveInsight(frequency: InsightFrequency = 'daily'): Promise<Insight | null> {
  const db = await getDatabase();
  return (await db.collection('insights').findOne({ active: true, frequency })) as Insight | null;
}

export async function setActiveInsight(id: string): Promise<Insight | null> {
  const db = await getDatabase();
  const insight = await db.collection('insights').findOne({ _id: new ObjectId(id) });
  if (!insight) return null;
  await db.collection('insights').updateMany({ frequency: insight.frequency, active: true }, { $set: { active: false, updatedAt: new Date() } });
  const result = await db
    .collection('insights')
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { active: true, updatedAt: new Date() } }, { returnDocument: 'after' });
  return result?.value as Insight | null;
}
