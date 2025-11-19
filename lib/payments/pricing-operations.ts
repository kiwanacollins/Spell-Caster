/**
 * Dynamic Pricing Operations
 * Handles price quotes from admin after users contact them via WhatsApp/Messenger
 * Users discuss their needs and admin sends custom quotes
 */

import { getMongoClient } from '../mongodb';
import { PriceQuote, ServiceType } from './pricing';
import { ObjectId } from 'mongodb';

const PRICE_QUOTES_COLLECTION = 'price_quotes';

/**
 * Create a price quote for a user
 * Admin creates quote after discussing user's needs via messaging
 */
export async function createPriceQuote(
  userId: string,
  serviceId: ServiceType,
  serviceName: string,
  quotedPrice: number,
  notes?: string,
  validDays: number = 7
): Promise<PriceQuote> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const now = new Date();
  const validUntil = new Date(now.getTime() + validDays * 24 * 60 * 60 * 1000);

  const quote: PriceQuote = {
    userId,
    serviceId,
    serviceName,
    quotedPrice,
    currency: 'usd',
    notes, // e.g., "Complex love situation requires extended ritual", "Legal case has high stakes"
    validUntil,
    accepted: false,
    createdAt: now,
    updatedAt: now,
  };

  const result = await quotesCollection.insertOne(quote);
  quote._id = result.insertedId;

  return quote;
}

/**
 * Get active price quote for a user and service
 */
export async function getUserServiceQuote(
  userId: string,
  serviceId: ServiceType
): Promise<PriceQuote | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const now = new Date();

  return await quotesCollection.findOne({
    userId,
    serviceId,
    rejected: { $exists: false }, // Not rejected by user
    $or: [
      { validUntil: { $exists: false } }, // No expiration
      { validUntil: { $gte: now } }, // Still valid
    ],
  } as any);
}

/**
 * Get all active quotes for a user
 */
export async function getUserQuotes(userId: string): Promise<PriceQuote[]> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const now = new Date();

  return await quotesCollection
    .find({
      userId,
      rejected: { $exists: false },
      $or: [
        { validUntil: { $exists: false } },
        { validUntil: { $gte: now } },
      ],
    } as any)
    .sort({ createdAt: -1 })
    .toArray();
}

/**
 * Accept a price quote
 * User accepts the price and is ready to pay
 */
export async function acceptPriceQuote(quoteId: string): Promise<PriceQuote | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const result = await quotesCollection.findOneAndUpdate(
    { _id: new ObjectId(quoteId) },
    {
      $set: {
        accepted: true,
        acceptedAt: new Date(),
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  );

  return result || null;
}

/**
 * Reject a price quote
 * User declines the quoted price (may negotiate or change mind)
 */
export async function rejectPriceQuote(
  quoteId: string,
  reason?: string
): Promise<PriceQuote | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const result = await quotesCollection.findOneAndUpdate(
    { _id: new ObjectId(quoteId) },
    {
      $set: {
        rejectedAt: new Date(),
        rejectionReason: reason,
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' }
  );

  return result || null;
}

/**
 * Get accepted quotes for a user (for payment processing)
 */
export async function getUserAcceptedQuotes(userId: string): Promise<PriceQuote[]> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  return await quotesCollection
    .find({
      userId,
      accepted: true,
    })
    .sort({ acceptedAt: -1 })
    .toArray();
}

/**
 * Update a price quote
 * Admin can adjust quote if user negotiates
 */
export async function updatePriceQuote(
  quoteId: string,
  newQuotedPrice?: number,
  newNotes?: string,
  extendValidityDays?: number
): Promise<PriceQuote | null> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const updateData: any = {
    updatedAt: new Date(),
  };

  if (newQuotedPrice !== undefined) {
    updateData.quotedPrice = newQuotedPrice;
  }

  if (newNotes !== undefined) {
    updateData.notes = newNotes;
  }

  if (extendValidityDays !== undefined && extendValidityDays > 0) {
    updateData.validUntil = new Date(
      Date.now() + extendValidityDays * 24 * 60 * 60 * 1000
    );
  }

  const result = await quotesCollection.findOneAndUpdate(
    { _id: new ObjectId(quoteId) },
    { $set: updateData },
    { returnDocument: 'after' }
  );

  return result || null;
}

/**
 * Get all pending quotes (awaiting user acceptance)
 */
export async function getPendingQuotes(limit: number = 20): Promise<PriceQuote[]> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const now = new Date();

  return await quotesCollection
    .find({
      accepted: false,
      rejected: { $exists: false },
      $or: [
        { validUntil: { $exists: false } },
        { validUntil: { $gte: now } },
      ],
    } as any)
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

/**
 * Get quote statistics
 */
export async function getQuoteStats(): Promise<{
  totalQuotes: number;
  acceptedQuotes: number;
  pendingQuotes: number;
  rejectedQuotes: number;
}> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const now = new Date();

  const total = await quotesCollection.countDocuments({});
  const accepted = await quotesCollection.countDocuments({ accepted: true });
  const pending = await quotesCollection.countDocuments({
    accepted: false,
    rejected: { $exists: false },
    $or: [
      { validUntil: { $exists: false } },
      { validUntil: { $gte: now } },
    ],
  } as any);
  const rejected = await quotesCollection.countDocuments({
    rejectedAt: { $exists: true },
  });

  return {
    totalQuotes: total,
    acceptedQuotes: accepted,
    pendingQuotes: pending,
    rejectedQuotes: rejected,
  };
}

/**
 * Get recent quotes sent to users (for admin overview)
 */
export async function getRecentQuotesSent(limit: number = 20): Promise<PriceQuote[]> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  return await quotesCollection
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

/**
 * Delete expired quotes (cleanup)
 */
export async function deleteExpiredQuotes(): Promise<{ deletedCount: number }> {
  const client = await getMongoClient();
  const db = client.db('spell_caster');
  const quotesCollection = db.collection<PriceQuote>(PRICE_QUOTES_COLLECTION);

  const now = new Date();

  const result = await quotesCollection.deleteMany({
    accepted: false,
    rejected: { $exists: false },
    validUntil: { $lt: now },
  });

  return { deletedCount: result.deletedCount };
}
