/**
 * MongoDB Connection Utility
 * 
 * Provides a singleton connection to MongoDB with connection pooling.
 * Uses the native MongoDB Node.js driver with proper error handling.
 * 
 * @module lib/db/mongodb
 */

import { MongoClient, Db, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  // Connection pool settings for optimal performance
  maxPoolSize: 10,
  minPoolSize: 2,
  maxIdleTimeMS: 30000,
  
  // Timeout settings
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  
  // Retry settings
  retryWrites: true,
  retryReads: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In development mode, use a global variable to preserve the connection
// across hot reloads
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * Get the MongoDB client instance
 * @returns Promise resolving to MongoClient
 */
export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

/**
 * Get the database instance
 * @param dbName - Optional database name (defaults to the one in connection string)
 * @returns Promise resolving to Database instance
 */
export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await clientPromise;
  return dbName ? client.db(dbName) : client.db();
}

/**
 * Close the MongoDB connection
 * Use this only when shutting down the application
 */
export async function closeConnection(): Promise<void> {
  const client = await clientPromise;
  await client.close();
}

/**
 * Test the MongoDB connection
 * @returns Promise resolving to true if connection is successful
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = await clientPromise;
    await client.db('admin').command({ ping: 1 });
    console.log('✓ MongoDB connection successful');
    return true;
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error);
    return false;
  }
}

// Export the clientPromise for compatibility with some libraries
export default clientPromise;
