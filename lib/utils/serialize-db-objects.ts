/**
 * Database Object Serialization Utilities
 *
 * Converts MongoDB documents and other database objects to plain JavaScript objects
 * that can be safely passed from Server Components to Client Components in Next.js.
 *
 * MongoDB ObjectId and other non-serializable types are converted to strings.
 */

import { ObjectId } from 'mongodb';

/**
 * Recursively converts MongoDB documents and other non-serializable objects
 * to plain JavaScript objects that can be passed to client components.
 *
 * Handles:
 * - ObjectId → string
 * - Date → ISO string
 * - Nested objects and arrays
 * - null and undefined values
 */
export function serializeObject<T = any>(obj: any): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof ObjectId) {
    return obj.toString() as any;
  }

  if (obj instanceof Date) {
    return obj.toISOString() as any;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => serializeObject(item)) as any;
  }

  if (typeof obj === 'object' && obj !== null) {
    const serialized: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        serialized[key] = serializeObject(obj[key]);
      }
    }
    return serialized as T;
  }

  return obj;
}

/**
 * Serializes an array of database documents.
 */
export function serializeArray<T = any>(arr: any[]): T[] {
  return arr.map((item) => serializeObject(item));
}

/**
 * Serializes a key-value mapping of document arrays (e.g., userId -> [ServiceRequest])
 */
export function serializeMapping<T = any>(
  mapping: { [key: string]: any[] }
): { [key: string]: T[] } {
  const serialized: { [key: string]: T[] } = {};
  for (const key in mapping) {
    if (Object.prototype.hasOwnProperty.call(mapping, key)) {
      serialized[key] = serializeArray<T>(mapping[key]);
    }
  }
  return serialized;
}
