import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getAllUsers } from '@/lib/db/models/user-operations';
import { getAdminServiceRequests } from '@/lib/db/models/service-request-operations';
import { AdminUsersManagementClient } from '@/components/admin/admin-users-management-client';
import {
  serializeArray,
  serializeMapping,
} from '@/lib/utils/serialize-db-objects';

export const metadata = {
  title: 'User Management | Admin',
  description: 'Manage platform users, roles, and accounts',
};

export default async function UsersManagementPage() {
  // Server-side auth check
  const session = await getSession();

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  // Fetch all users
  const users = await getAllUsers();

  // Fetch service requests for each user for context
  const userServiceRequests: { [userId: string]: any[] } = {};
  for (const user of users) {
    const requests = await getAdminServiceRequests({}, 10, 0);
    userServiceRequests[user.id] = requests.filter(
      (r: any) => r.userId === user.id
    );
  }

  // Serialize MongoDB documents to plain objects for client component
  const serializedUsers = serializeArray(users);
  const serializedRequests = serializeMapping(userServiceRequests);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header */}
      <div className="border-b-2 border-[#8B6F47] pb-4 md:pb-6">
        <h1 className="font-['UnifrakturMaguntia'] text-3xl md:text-4xl text-[#1A1A1A] mb-2">
          User Management
        </h1>
        <p className="text-sm md:text-base text-[#4A4A4A]">
          Manage platform users, roles, accounts, and access
        </p>
      </div>

      {/* Client Component */}
      <AdminUsersManagementClient
        initialUsers={serializedUsers}
        userServiceRequests={serializedRequests}
      />
    </div>
  );
}
