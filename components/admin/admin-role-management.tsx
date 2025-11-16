'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { UserDocument } from '@/lib/db/models/user';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FiShield, FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';

interface AdminRolePermission {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'requests' | 'content' | 'platform';
}

const ROLE_PERMISSIONS: { [key: string]: AdminRolePermission[] } = {
  admin: [
    {
      id: 'manage-admins',
      name: 'Manage Admin Roles',
      description: 'Promote/demote other admins',
      category: 'platform',
    },
    {
      id: 'manage-users',
      name: 'Manage All Users',
      description: 'Suspend, reactivate, refund users',
      category: 'users',
    },
    {
      id: 'manage-requests',
      name: 'Manage Service Requests',
      description: 'Assign, cancel, complete requests',
      category: 'requests',
    },
    {
      id: 'view-analytics',
      name: 'View Analytics',
      description: 'Access all analytics dashboards',
      category: 'platform',
    },
    {
      id: 'edit-system',
      name: 'Edit System Settings',
      description: 'Modify platform settings and configurations',
      category: 'platform',
    },
  ],
  user: [
    {
      id: 'view-profile',
      name: 'View Profile',
      description: 'Access personal profile and account',
      category: 'users',
    },
    {
      id: 'view-requests',
      name: 'View Requests',
      description: 'View their service requests',
      category: 'requests',
    },
  ],
};

interface AdminRoleManagementProps {
  admins: UserDocument[];
  onPromote?: (userId: string, role: string) => Promise<void>;
  onDemote?: (userId: string) => Promise<void>;
}

export function AdminRoleManagement({
  admins,
  onPromote,
  onDemote,
}: AdminRoleManagementProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('admin');
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<UserDocument | null>(null);
  const [newRoleValue, setNewRoleValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePromoteClick = useCallback(
    (admin: UserDocument) => {
      setSelectedAdmin(admin);
      setNewRoleValue('');
      setShowRoleDialog(true);
    },
    []
  );

  const handlePromoteConfirm = useCallback(async () => {
    if (!selectedAdmin || !newRoleValue) return;

    setIsLoading(true);
    try {
      if (onPromote) {
        await onPromote(selectedAdmin.id, newRoleValue);
      } else {
        const response = await fetch(`/api/users/${selectedAdmin.id}/role`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: newRoleValue }),
        });

        if (!response.ok) throw new Error('Failed to update role');
      }

      router.refresh();
      setShowRoleDialog(false);
      setSelectedAdmin(null);
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    } finally {
      setIsLoading(false);
    }
  }, [selectedAdmin, newRoleValue, onPromote, router]);

  const handleDemote = useCallback(
    async (admin: UserDocument) => {
      if (
        !confirm(
          `Demote ${admin.name} from admin? They will lose all admin privileges.`
        )
      )
        return;

      setIsLoading(true);
      try {
        if (onDemote) {
          await onDemote(admin.id);
        } else {
          const response = await fetch(`/api/users/${admin.id}/role`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: 'user' }),
          });

          if (!response.ok) throw new Error('Failed to demote user');
        }

        router.refresh();
      } catch (error) {
        console.error('Error demoting user:', error);
        alert('Failed to demote user');
      } finally {
        setIsLoading(false);
      }
    },
    [onDemote, router]
  );

  const getRoleLabel = (role: string): string => {
    const labels: { [key: string]: string } = {
      admin: 'Admin',
      user: 'User',
    };
    return labels[role] || role;
  };

  const getRoleColor = (role: string): string => {
    const colors: { [key: string]: string } = {
      admin: 'bg-[#B8860B] text-white',
      user: 'bg-[#8B6F47] text-white',
    };
    return colors[role] || 'bg-[#8B6F47] text-white';
  };

  return (
    <div className="space-y-6">
      {/* Permissions Guide */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] flex items-center gap-2">
            <FiShield className="w-5 h-5" />
            Role Permissions Guide
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            Admin roles and their assigned permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => (
              <div
                key={role}
                className="bg-white border-2 border-[#8B6F47] rounded p-4"
              >
                <h3 className="font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-sm ${getRoleColor(role)}`}>
                    {getRoleLabel(role)}
                  </span>
                </h3>
                <ul className="space-y-2">
                  {permissions.map((perm) => (
                    <li key={perm.id} className="text-sm text-[#4A4A4A]">
                      <div className="flex items-start gap-2">
                        <FiCheck className="w-4 h-4 text-[#2C5530] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-[#1A1A1A]">
                            {perm.name}
                          </p>
                          <p className="text-xs text-[#666]">{perm.description}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Admins List */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            Current Admin Users
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            {admins.length} admin{admins.length !== 1 ? 's' : ''} on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          {admins.length === 0 ? (
            <div className="text-center py-8 text-[#4A4A4A]">
              <p>No admin users found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="bg-white border-2 border-[#8B6F47] rounded p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#1A1A1A]">{admin.name}</p>
                    <p className="text-sm text-[#4A4A4A]">{admin.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getRoleColor(admin.role || 'user')}>
                        {getRoleLabel(admin.role || 'user')}
                      </Badge>
                      <Badge variant="outline" className="border-[#CC8800]">
                        Joined {new Date(admin.createdAt || '').toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAdmin(admin);
                        setShowPermissionsDialog(true);
                      }}
                      className="border-[#8B6F47] text-[#8B6F47]"
                    >
                      View Permissions
                    </Button>

                    {admin.role !== 'admin' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePromoteClick(admin)}
                          className="border-[#2C5530] text-[#2C5530]"
                        >
                          Make Admin
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDemote(admin)}
                          className="border-[#8B0000] text-[#8B0000]"
                          disabled={isLoading}
                        >
                          Remove Admin
                        </Button>
                      </>
                    )}

                    {admin.role === 'admin' && (
                      <Badge variant="outline" className="border-[#B8860B]">
                        Admin User
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Change Role Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Change Admin Role
            </DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              Change the role for {selectedAdmin?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert className="bg-[#FFF5E1] border-2 border-[#CC8800]">
              <FiAlertCircle className="h-4 w-4 text-[#CC8800]" />
              <AlertDescription className="text-[#4A4A4A]">
                Changing an admin's role will affect their access to platform features.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#1A1A1A]">
                New Role
              </label>
              <Select value={newRoleValue} onValueChange={setNewRoleValue}>
                <SelectTrigger className="bg-white border-2 border-[#8B6F47]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-[#8B6F47]">
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User (Remove Admin)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRoleDialog(false)}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePromoteConfirm}
              disabled={!newRoleValue || isLoading}
              className="bg-[#8B6F47] text-white hover:bg-[#6B4F27]"
            >
              {isLoading ? 'Updating...' : 'Update Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      {selectedAdmin && (
        <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
          <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
                {selectedAdmin.name}'s Permissions
              </DialogTitle>
              <DialogDescription className="text-[#4A4A4A]">
                Role: {getRoleLabel(selectedAdmin.role || 'user')}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {selectedAdmin.role &&
              ROLE_PERMISSIONS[selectedAdmin.role] ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ROLE_PERMISSIONS[selectedAdmin.role].map((perm) => (
                    <div
                      key={perm.id}
                      className="bg-white border-2 border-[#8B6F47] rounded p-3"
                    >
                      <div className="flex items-start gap-2">
                        <FiCheck className="w-4 h-4 text-[#2C5530] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-[#1A1A1A]">
                            {perm.name}
                          </p>
                          <p className="text-xs text-[#666] mt-1">
                            {perm.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#4A4A4A]">No special permissions</p>
              )}
            </div>

            <DialogFooter>
              <Button
                onClick={() => setShowPermissionsDialog(false)}
                className="bg-[#8B6F47] text-white hover:bg-[#6B4F27]"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
