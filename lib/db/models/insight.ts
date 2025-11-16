import { ObjectId } from 'mongodb';

export type InsightFrequency = 'daily' | 'weekly' | 'monthly';

export interface Insight {
  _id?: ObjectId;
  title: string;
  content: string; // Markdown or HTML
  frequency: InsightFrequency;
  locale?: string;
  tags?: string[];
  previewText?: string;
  active?: boolean;
  createdBy?: string; // user id
  createdAt?: Date;
  updatedAt?: Date;
}

export function createInsight(
  title: string,
  content: string,
  frequency: InsightFrequency,
  createdBy?: string,
  options?: Partial<Insight>
): Insight {
  const now = new Date();
  return {
    title,
    content,
    frequency,
    locale: options?.locale ?? 'en-US',
    tags: options?.tags ?? [],
    previewText: options?.previewText ?? content.slice(0, 180),
    active: options?.active ?? false,
    createdBy,
    createdAt: now,
    updatedAt: now,
  } as Insight;
}
