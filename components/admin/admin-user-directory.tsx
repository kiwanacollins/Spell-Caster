'use client';

import { UserDocument } from '@/lib/db/models/user';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';
import { FiMoreVertical, FiShield, FiAlertCircle, FiStar } from 'react-icons/fi';

// Helper to safely parse dates that may be strings or Date objects
function getDate(dateValue: unknown): Date {
  if (!dateValue) return new Date();
  if (dateValue instanceof Date) return dateValue;
  if (typeof dateValue === 'string') {
    const parsed = new Date(dateValue);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return new Date();
}

interface AdminUserDirectoryProps {
  users: UserDocument[];
  onUserSelect?: (userId: string) => void;
  onSuspendUser?: (userId: string) => void;
  onReactivateUser?: (userId: string) => void;
  onPromoteAdmin?: (userId: string) => void;
  onDemoteAdmin?: (userId: string) => void;
}

function getUserSegmentation(user: UserDocument): {
  badge: string;
  color: string;
  icon: React.ReactNode;
} {
  const stats = user.stats;
  const lifetimeValue = stats?.lifetimeValue || 0;
  const completedSpells = stats?.completedSpells || 0;

  if (user.role === 'admin') {
    return { badge: 'Admin', color: 'bg-[#8B0000] text-[#F4E8D0]', icon: <FiShield /> };
  }

  if (user.isSuspended) {
    return { badge: 'Suspended', color: 'bg-[#4A4A4A] text-[#F4E8D0]', icon: <FiAlertCircle /> };
  }

  if (lifetimeValue > 1000 && completedSpells > 10) {
    return { badge: 'VIP', color: 'bg-[#B8860B] text-[#1A1A1A]', icon: <FiStar /> };
  }

  if (lifetimeValue > 500) {
    return { badge: 'High Value', color: 'bg-[#8B6F47] text-[#F4E8D0]', icon: <FiStar /> };
  }

  if (completedSpells > 5) {
    return { badge: 'Frequent', color: 'bg-[#2C5530] text-[#F4E8D0]', icon: <FiStar /> };
  }

  return { badge: 'Regular', color: 'bg-[#C0C0C0] text-[#1A1A1A]', icon: null };
}

export function AdminUserDirectory({
  users,
  onUserSelect,
  onSuspendUser,
  onReactivateUser,
  onPromoteAdmin,
  onDemoteAdmin,
}: AdminUserDirectoryProps) {
  const sortedUsers = [...users].sort((a, b) => {
    const dateA = getDate(a.createdAt);
    const dateB = getDate(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b-2 border-[#8B6F47]">
        <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">User Directory</h2>
        <p className="text-sm text-[#4A4A4A] mt-1">
          {users.length} user{users.length !== 1 ? 's' : ''} in the system
        </p>
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <div className="p-12 text-center text-[#4A4A4A] font-['Crimson_Text']">
          No users found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#8B6F47]/10">
              <TableRow className="hover:bg-transparent border-b-2 border-[#8B6F47]">
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">Name</TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">Email</TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">Status</TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">Segment</TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                  Lifetime Value
                </TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">Joined</TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-['MedievalSharp']">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user, index) => {
                const segmentation = getUserSegmentation(user);
                const lifetimeValue = user.stats?.lifetimeValue || 0;
                // Use user.id as primary key, fallback to email, fallback to index
                const key = user.id || user.email || `user-${index}`;

                return (
                  <TableRow
                    key={key}
                    className="border-b border-[#8B6F47]/30 hover:bg-[#FFF9E6] transition-colors cursor-pointer"
                    onClick={() => onUserSelect?.(user.id)}
                  >
                    {/* Name */}
                    <TableCell className="font-['MedievalSharp'] text-[#1A1A1A]">
                      {user.name}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-[#4A4A4A] text-sm">{user.email}</TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        className={`${
                          user.isSuspended
                            ? 'bg-red-900 text-[#F4E8D0]'
                            : 'bg-[#2C5530] text-[#F4E8D0]'
                        }`}
                      >
                        {user.isSuspended ? 'Suspended' : 'Active'}
                      </Badge>
                    </TableCell>

                    {/* User Segment */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {segmentation.icon && <span className="text-lg">{segmentation.icon}</span>}
                        <Badge className={segmentation.color}>{segmentation.badge}</Badge>
                      </div>
                    </TableCell>

                    {/* Lifetime Value */}
                    <TableCell className="text-[#8B6F47] font-semibold">
                      ${lifetimeValue.toFixed(2)}
                    </TableCell>

                    {/* Joined */}
                    <TableCell className="text-sm text-[#4A4A4A]">
                      {formatDistanceToNow(getDate(user.createdAt), { addSuffix: true })}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <FiMoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-[#8B6F47]">
                          {/* Role Management */}
                          {user.role === 'user' && (
                            <>
                              <DropdownMenuItem
                                onClick={() => onPromoteAdmin?.(user.id)}
                                className="text-[#F4E8D0] cursor-pointer hover:bg-[#8B6F47]/20"
                              >
                                <FiShield className="w-4 h-4 mr-2" />
                                Promote to Admin
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-[#8B6F47]/30" />
                            </>
                          )}

                          {user.role === 'admin' && (
                            <>
                              <DropdownMenuItem
                                onClick={() => onDemoteAdmin?.(user.id)}
                                className="text-[#F4E8D0] cursor-pointer hover:bg-[#8B6F47]/20"
                              >
                                <FiShield className="w-4 h-4 mr-2" />
                                Demote from Admin
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-[#8B6F47]/30" />
                            </>
                          )}

                          {/* Suspension Status */}
                          {!user.isSuspended && user.role === 'user' && (
                            <DropdownMenuItem
                              onClick={() => onSuspendUser?.(user.id)}
                              className="text-red-400 cursor-pointer hover:bg-[#8B6F47]/20"
                            >
                              <FiAlertCircle className="w-4 h-4 mr-2" />
                              Suspend User
                            </DropdownMenuItem>
                          )}

                          {user.isSuspended && (
                            <DropdownMenuItem
                              onClick={() => onReactivateUser?.(user.id)}
                              className="text-green-400 cursor-pointer hover:bg-[#8B6F47]/20"
                            >
                              <FiShield className="w-4 h-4 mr-2" />
                              Reactivate User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
