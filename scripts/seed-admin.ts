/**
 * Admin Seed Script
 * 
 * Promotes a user to admin role. Used to set up the first admin or add additional admins.
 * 
 * Run with: npx tsx scripts/seed-admin.ts [email]
 * 
 * Examples:
 *   npx tsx scripts/seed-admin.ts                           # Promote first/oldest user to admin
 *   npx tsx scripts/seed-admin.ts admin@example.com         # Promote specific user to admin
 *   npx tsx scripts/seed-admin.ts --check admin@example.com # Check if user is admin before promoting
 *   npx tsx scripts/seed-admin.ts --list                    # List all admin users
 *   npx tsx scripts/seed-admin.ts --demote admin@example.com # Demote admin back to user role
 */

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

import { getDatabase } from '../lib/db/mongodb';
import type { UserDocument } from '../lib/db/models/user';

const USER_COLLECTION = 'user';

/**
 * Get user by email
 */
async function getUserByEmail(email: string): Promise<UserDocument | null> {
  const db = await getDatabase();
  const user = await db.collection<UserDocument>(USER_COLLECTION).findOne({
    email: email.toLowerCase(),
  });
  return user;
}

/**
 * Get the oldest user (first user to register)
 */
async function getOldestUser(): Promise<UserDocument | null> {
  const db = await getDatabase();
  const user = await db
    .collection<UserDocument>(USER_COLLECTION)
    .findOne({}, { sort: { createdAt: 1 } });
  return user;
}

/**
 * Promote user to admin
 */
async function promoteToAdmin(userId: string): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        role: 'admin',
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
}

/**
 * Demote admin to user
 */
async function demoteFromAdmin(userId: string): Promise<boolean> {
  const db = await getDatabase();
  const result = await db.collection<UserDocument>(USER_COLLECTION).updateOne(
    { id: userId },
    {
      $set: {
        role: 'user',
        updatedAt: new Date(),
      },
    }
  );
  return result.modifiedCount > 0;
}

/**
 * Get all admin users
 */
async function listAdminUsers(): Promise<UserDocument[]> {
  const db = await getDatabase();
  const admins = await db
    .collection<UserDocument>(USER_COLLECTION)
    .find({ role: 'admin' })
    .sort({ createdAt: 1 })
    .toArray();
  return admins;
}

/**
 * Check if user is already admin
 */
async function isUserAdmin(userId: string): Promise<boolean> {
  const db = await getDatabase();
  const user = await db.collection<UserDocument>(USER_COLLECTION).findOne({
    id: userId,
    role: 'admin',
  });
  return user !== null;
}

/**
 * Get user count by role
 */
async function getRoleStats(): Promise<{ admins: number; users: number; total: number }> {
  const db = await getDatabase();
  const admins = await db
    .collection<UserDocument>(USER_COLLECTION)
    .countDocuments({ role: 'admin' });
  const users = await db
    .collection<UserDocument>(USER_COLLECTION)
    .countDocuments({ role: 'user' });
  const total = await db
    .collection<UserDocument>(USER_COLLECTION)
    .countDocuments({});

  return { admins, users, total };
}

async function main(): Promise<void> {
  console.log('🔑 Admin Seed Script');
  console.log('═'.repeat(60));

  try {
    const args = process.argv.slice(2);
    const command = args[0];
    const email = command?.startsWith('--') ? undefined : command;

    // Check current stats
    const stats = await getRoleStats();
    console.log(`\n📊 Current User Statistics:`);
    console.log(`   Total Users: ${stats.total}`);
    console.log(`   Admins: ${stats.admins}`);
    console.log(`   Regular Users: ${stats.users}\n`);

    if (!command || (!command.startsWith('--') && command)) {
      // Promote specific user or first user to admin
      let targetUser: UserDocument | null = null;

      if (email) {
        // Promote specific user by email
        console.log(`🔍 Searching for user: ${email}`);
        targetUser = await getUserByEmail(email);

        if (!targetUser) {
          console.log(`❌ User not found with email: ${email}\n`);
          process.exit(1);
        }
      } else {
        // Promote oldest (first) user
        console.log(`🔍 Finding first registered user...`);
        targetUser = await getOldestUser();

        if (!targetUser) {
          console.log(`❌ No users found in database!\n`);
          process.exit(1);
        }
      }

      // Check if already admin
      if (targetUser.role === 'admin') {
        console.log(`⚠️  User is already an admin!`);
        console.log(`   Email: ${targetUser.email}`);
        console.log(`   Name: ${targetUser.name}`);
        console.log(`   Created: ${targetUser.createdAt.toLocaleString()}\n`);
        process.exit(0);
      }

      // Promote to admin
      console.log(`\n✨ Promoting user to admin...`);
      console.log(`   Email: ${targetUser.email}`);
      console.log(`   Name: ${targetUser.name}`);
      console.log(`   Current Role: ${targetUser.role}`);

      const success = await promoteToAdmin(targetUser.id);

      if (success) {
        console.log(`\n✅ Successfully promoted to admin!`);
        console.log(`   New Role: admin`);
        console.log(`   User can now access: /admin\n`);

        // Show updated stats
        const updatedStats = await getRoleStats();
        console.log(`📊 Updated Statistics:`);
        console.log(`   Admins: ${updatedStats.admins}`);
        console.log(`   Regular Users: ${updatedStats.users}\n`);
      } else {
        console.log(`❌ Failed to promote user to admin\n`);
        process.exit(1);
      }
    } else if (command === '--list') {
      // List all admin users
      console.log(`📋 Admin Users:`);
      console.log('─'.repeat(60));

      const admins = await listAdminUsers();

      if (admins.length === 0) {
        console.log('   (No admin users yet)\n');
      } else {
        admins.forEach((admin, index) => {
          console.log(`   ${index + 1}. ${admin.name}`);
          console.log(`      Email: ${admin.email}`);
          console.log(`      Created: ${admin.createdAt.toLocaleString()}`);
          console.log(`      Last Updated: ${admin.updatedAt.toLocaleString()}`);
          console.log();
        });
      }
    } else if (command === '--check') {
      // Check if specific user is admin
      const targetEmail = args[1];

      if (!targetEmail) {
        console.log(`❌ Please provide an email address to check:\n`);
        console.log(`   npx tsx scripts/seed-admin.ts --check user@example.com\n`);
        process.exit(1);
      }

      const user = await getUserByEmail(targetEmail);

      if (!user) {
        console.log(`❌ User not found with email: ${targetEmail}\n`);
        process.exit(1);
      }

      console.log(`👤 User Information:`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Is Admin: ${user.role === 'admin' ? '✅ Yes' : '❌ No'}`);
      console.log(`   Created: ${user.createdAt.toLocaleString()}\n`);
    } else if (command === '--demote') {
      // Demote admin back to user
      const targetEmail = args[1];

      if (!targetEmail) {
        console.log(`❌ Please provide an email address to demote:\n`);
        console.log(`   npx tsx scripts/seed-admin.ts --demote admin@example.com\n`);
        process.exit(1);
      }

      const user = await getUserByEmail(targetEmail);

      if (!user) {
        console.log(`❌ User not found with email: ${targetEmail}\n`);
        process.exit(1);
      }

      if (user.role !== 'admin') {
        console.log(`⚠️  User is not an admin!`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Current Role: ${user.role}\n`);
        process.exit(0);
      }

      console.log(`\n🔄 Demoting admin to user...`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);

      const success = await demoteFromAdmin(user.id);

      if (success) {
        console.log(`\n✅ Successfully demoted to user!`);
        console.log(`   New Role: user\n`);

        // Show updated stats
        const updatedStats = await getRoleStats();
        console.log(`📊 Updated Statistics:`);
        console.log(`   Admins: ${updatedStats.admins}`);
        console.log(`   Regular Users: ${updatedStats.users}\n`);
      } else {
        console.log(`❌ Failed to demote user\n`);
        process.exit(1);
      }
    } else if (command === '--help' || command === '-h') {
      console.log(`Usage: npx tsx scripts/seed-admin.ts [command] [email]\n`);
      console.log(`Commands:`);
      console.log(`  (no args)                          Promote first/oldest user to admin`);
      console.log(`  <email>                            Promote specific user to admin`);
      console.log(`  --list                             List all admin users`);
      console.log(`  --check <email>                    Check if user is admin`);
      console.log(`  --demote <email>                   Demote admin back to user role`);
      console.log(`  --help, -h                         Show this help message\n`);
      console.log(`Examples:`);
      console.log(`  npx tsx scripts/seed-admin.ts`);
      console.log(`  npx tsx scripts/seed-admin.ts admin@example.com`);
      console.log(`  npx tsx scripts/seed-admin.ts --list`);
      console.log(`  npx tsx scripts/seed-admin.ts --check user@example.com`);
      console.log(`  npx tsx scripts/seed-admin.ts --demote admin@example.com\n`);
    } else {
      console.log(`❌ Unknown command: ${command}\n`);
      console.log(`Use --help to see available commands\n`);
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Script failed!');
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
