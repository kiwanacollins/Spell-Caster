/**
 * MongoDB Connection Test
 * Run with: npx tsx scripts/test-mongodb.ts
 */

// Load environment variables
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

import { getDatabase } from '../lib/db/mongodb';

async function testMongoDBConnection() {
  console.log('Testing MongoDB connection...\n');
  
  try {
    const db = await getDatabase();
    console.log('✅ Successfully connected to MongoDB!');
    console.log(`Database name: ${db.databaseName}\n`);
    
    // List collections
    const collections = await db.listCollections().toArray();
    console.log('📚 Available collections:');
    if (collections.length === 0) {
      console.log('  (No collections yet - this is normal for a new database)');
    } else {
      collections.forEach((col: { name: string }) => {
        console.log(`  - ${col.name}`);
      });
    }
    
    // Test inserting a document
    console.log('\n🧪 Testing insert operation...');
    const testCollection = db.collection('connection_test');
    const result = await testCollection.insertOne({
      test: true,
      timestamp: new Date(),
      message: 'MongoDB connection test'
    });
    console.log('✅ Insert successful!');
    console.log(`Inserted ID: ${result.insertedId}`);
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('🧹 Cleaned up test document\n');
    
    console.log('✨ MongoDB is working correctly!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        console.error('\n⚠️  MongoDB server is not reachable.');
        console.error('   Make sure MongoDB is running and the connection string is correct.');
      } else if (error.message.includes('authentication failed')) {
        console.error('\n⚠️  Authentication failed.');
        console.error('   Check your MongoDB username and password.');
      } else if (error.message.includes('MONGODB_URI')) {
        console.error('\n⚠️  MONGODB_URI environment variable is not set.');
        console.error('   Make sure .env.local exists and contains MONGODB_URI.');
      }
    }
    
    process.exit(1);
  }
}

testMongoDBConnection();
