/**
 * User Role Migration Script
 * 
 * This script ensures all existing users have the role field set.
 * New registrations will have role: "user" by default from BetterAuth config.
 * 
 * Run with: npx tsx scripts/migrate-user-roles.ts
 * 
 * Usage:
 *   npx tsx scripts/migrate-user-roles.ts                    # Initialize all users without role
 *   npx tsx scripts/migrate-user-roles.ts --check            # Check users without role
 *   npx tsx scripts/migrate-user-roles.ts --status           # Show role distribution
 */

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

import { getDatabase } from '../lib/db/mongodb';
import type { UserDocument } from '../lib/db/models/user';

const USER_COLLECTION = 'user';

async function checkUsersWithoutRole(): Promise<number> {
  const db = await getDatabase();
  const count = await db
    .collection<UserDocument>(USER_COLLECTION)
    .countDocuments({ role: { $exists: false } });
  return count;
}

async function migrateUserRoles(): Promise<{ modifiedCount: number }> {
  const db = await getDatabase();
  
  const result = await db
    .collection<UserDocument>(USER_COLLECTION)
    .updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user', updatedAt: new Date() } }
    );

  return {
    modifiedCount: result.modifiedCount,
  };
}

async function showRoleDistribution(): Promise<void> {
  const db = await getDatabase();
  
  const pipeline = [
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ];

  const distribution = await db
    .collection<UserDocument>(USER_COLLECTION)
    .aggregate(pipeline)
    .toArray();

  const noRoleCount = await checkUsersWithoutRole();

  console.log('\n📊 User Role Distribution:');
  console.log('─'.repeat(40));
  
  distribution.forEach((item: any) => {
    const role = item._id || '(no role)';
    console.log(`  ${role.padEnd(15)} : ${item.count} users`);
  });

  if (noRoleCount > 0) {
    console.log(`  ${'(undefined)'.padEnd(15)} : ${noRoleCount} users`);
  }

  const totalCount = await db
    .collection<UserDocument>(USER_COLLECTION)
    .countDocuments({});
  
  console.log('─'.repeat(40));
  console.log(`  Total: ${totalCount} users`);
}

async function main(): Promise<void> {
  console.log('🔐 User Role Migration Script');
  console.log('═'.repeat(50));

  try {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === '--check') {
      // Check how many users don't have a role
      console.log('\n🔍 Checking for users without role field...');
      const count = await checkUsersWithoutRole();
      
      if (count === 0) {
        console.log('✅ All users have a role assigned!\n');
      } else {
        console.log(`⚠️  Found ${count} users without role field\n`);
        console.log('Run without --check flag to initialize roles:\n');
        console.log('  npx tsx scripts/migrate-user-roles.ts\n');
      }
    } else if (command === '--status') {
      // Show current role distribution
      await showRoleDistribution();
      console.log();
    } else {
      // Perform migration
      console.log('\n🚀 Starting migration...\n');
      
      // Check first
      const usersWithoutRole = await checkUsersWithoutRole();
      
      if (usersWithoutRole === 0) {
        console.log('✅ All users already have a role assigned!');
        console.log('No migration needed.\n');
      } else {
        console.log(`Found ${usersWithoutRole} users without role...\n`);
        
        const result = await migrateUserRoles();
        
        console.log(`✅ Migration completed!`);
        console.log(`Modified: ${result.modifiedCount} users`);
        console.log(`All users now have role: "user"\n`);
      }

      // Show final distribution
      await showRoleDistribution();
      console.log();
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed!');
    console.error('Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        console.error('\n⚠️  MongoDB server is not reachable.');
        console.error('   Make sure MongoDB is running and the connection string is correct.');
      } else if (error.message.includes('authentication failed')) {
        console.error('\n⚠️  Authentication failed.');
        console.error('   Check your MongoDB username and password.');
      }
    }
    
    process.exit(1);
  }
}

main();
