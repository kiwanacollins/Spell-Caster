'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UserDocument } from '@/lib/db/models/user';
import { ServiceRequest } from '@/lib/db/models/service-request';
import { AdminUserDirectory } from '@/components/admin/admin-user-directory';
import { AdminUserProfile } from '@/components/admin/admin-user-profile';
import { UserActions } from '@/components/admin/user-actions';
import { BulkUserActionsToolbar } from '@/components/admin/bulk-user-actions-toolbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FiX, FiSearch } from 'react-icons/fi';

interface AdminUsersManagementClientProps {
  initialUsers: UserDocument[];
  userServiceRequests?: { [userId: string]: ServiceRequest[] };
}

export function AdminUsersManagementClient({
  initialUsers,
  userServiceRequests = {},
}: AdminUsersManagementClientProps) {
  const router = useRouter();
  const [users, setUsers] = useState<UserDocument[]>(initialUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUser = users.find((u) => u.id === selectedUserId);

  // Wrapper handlers for directory (simple userId)
  const handleDirectorySuspendUser = useCallback(
    async (userId: string) => {
      const reason = prompt(
        'Enter suspension reason (required):',
        'Violation of terms'
      );
      if (!reason) return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}/suspend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason }),
        });

        if (!response.ok) throw new Error('Failed to suspend user');

        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? { ...u, isSuspended: true, suspensionReason: reason }
              : u
          )
        );

        router.refresh();
      } catch (error) {
        console.error('Error suspending user:', error);
        alert('Failed to suspend user');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const handleDirectoryReactivateUser = useCallback(
    async (userId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}/reactivate`, {
          method: 'POST',
        });

        if (!response.ok) throw new Error('Failed to reactivate user');

        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? { ...u, isSuspended: false, suspensionReason: undefined }
              : u
          )
        );

        router.refresh();
      } catch (error) {
        console.error('Error reactivating user:', error);
        alert('Failed to reactivate user');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const handleDirectoryPromoteAdmin = useCallback(
    async (userId: string) => {
      if (
        !confirm(
          'Are you sure? This user will have full admin access to the platform.'
        )
      )
        return;

      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}/role`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: 'admin' }),
        });

        if (!response.ok) throw new Error('Failed to promote user');

        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: 'admin' } : u))
        );

        router.refresh();
      } catch (error) {
        console.error('Error promoting user:', error);
        alert('Failed to promote user');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const handleDirectoryDemoteAdmin = useCallback(
    async (userId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}/role`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: 'user' }),
        });

        if (!response.ok) throw new Error('Failed to demote user');

        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: 'user' } : u))
        );

        router.refresh();
      } catch (error) {
        console.error('Error demoting user:', error);
        alert('Failed to demote user');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Handlers for UserActions component
  const handleSuspendUserWithReason = useCallback(
    async (userId: string, reason: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}/suspend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reason }),
        });

        if (!response.ok) throw new Error('Failed to suspend user');

        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? { ...u, isSuspended: true, suspensionReason: reason }
              : u
          )
        );

        router.refresh();
      } catch (error) {
        console.error('Error suspending user:', error);
        alert('Failed to suspend user');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const handleRefund = useCallback(
    async (userId: string, amount: number, reason: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}/refund`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, reason }),
        });

        if (!response.ok) throw new Error('Failed to process refund');

        alert(`Refund of $${amount.toFixed(2)} issued`);
        router.refresh();
      } catch (error) {
        console.error('Error issuing refund:', error);
        alert('Failed to issue refund');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const handleGrantCredits = useCallback(
    async (userId: string, amount: number, reason: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}/credits`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, reason }),
        });

        if (!response.ok) throw new Error('Failed to grant credits');

        alert(`${amount.toFixed(2)} credits granted`);
        router.refresh();
      } catch (error) {
        console.error('Error granting credits:', error);
        alert('Failed to grant credits');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  // Bulk operations
  const handleBulkSuspend = useCallback(
    async (userIds: string[], reason: string) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/users/bulk/suspend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userIds, reason }),
        });

        if (!response.ok) throw new Error('Failed to suspend users');

        setUsers((prev) =>
          prev.map((u) =>
            userIds.includes(u.id)
              ? { ...u, isSuspended: true, suspensionReason: reason }
              : u
          )
        );

        setSelectedUserIds(new Set());
        router.refresh();
      } catch (error) {
        console.error('Error suspending users:', error);
        alert('Failed to suspend users');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const handleBulkPromoteAdmin = useCallback(
    async (userIds: string[]) => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/users/bulk/promote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userIds }),
        });

        if (!response.ok) throw new Error('Failed to promote users');

        setUsers((prev) =>
          prev.map((u) => (userIds.includes(u.id) ? { ...u, role: 'admin' } : u))
        );

        setSelectedUserIds(new Set());
        router.refresh();
      } catch (error) {
        console.error('Error promoting users:', error);
        alert('Failed to promote users');
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-4 rounded-lg">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 w-5 h-5 text-[#8B6F47]" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-[#8B6F47]"
          />
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedUserIds.size > 0 && (
        <BulkUserActionsToolbar
          selectedCount={selectedUserIds.size}
          onSuspendBulk={handleBulkSuspend}
          onPromoteAdminBulk={handleBulkPromoteAdmin}
          isLoading={isLoading}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Directory */}
        <div className="lg:col-span-2">
          <AdminUserDirectory
            users={filteredUsers}
            onUserSelect={setSelectedUserId}
            onSuspendUser={handleDirectorySuspendUser}
            onReactivateUser={handleDirectoryReactivateUser}
            onPromoteAdmin={handleDirectoryPromoteAdmin}
            onDemoteAdmin={handleDirectoryDemoteAdmin}
          />
        </div>

        {/* Detail Panel */}
        {selectedUser && (
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['MedievalSharp'] text-[#1A1A1A]">Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedUserId(null)}
                  className="h-6 w-6 p-0"
                >
                  <FiX className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* User Actions */}
                <UserActions
                  user={selectedUser}
                  onSuspend={handleSuspendUserWithReason}
                  onReactivate={handleDirectoryReactivateUser}
                  onRefund={handleRefund}
                  onGrantCredits={handleGrantCredits}
                />
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Full Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto hidden lg:hidden">
          <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="bg-[#1A1A1A] border-2 border-[#8B6F47] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-end mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedUserId(null)}
                  className="h-6 w-6 p-0"
                >
                  <FiX className="w-4 h-4" />
                </Button>
              </div>
              <AdminUserProfile
                user={selectedUser}
                serviceRequests={userServiceRequests[selectedUser.id] || []}
              />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
