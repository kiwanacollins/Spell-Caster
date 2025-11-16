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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow, format } from 'date-fns';
import { FiShield, FiUser, FiCheckCircle } from 'react-icons/fi';

interface AdminUsersListViewProps {
  admins: UserDocument[];
  onSelectAdmin?: (admin: UserDocument) => void;
}

export function AdminUsersListView({ admins, onSelectAdmin }: AdminUsersListViewProps) {
  const getRoleColor = (role: string): string => {
    const colors: { [key: string]: string } = {
      admin: 'bg-[#B8860B] text-white',
      user: 'bg-[#8B6F47] text-white',
    };
    return colors[role] || 'bg-[#8B6F47] text-white';
  };

  const getRoleLabel = (role: string): string => {
    const labels: { [key: string]: string } = {
      admin: 'Admin',
      user: 'User',
    };
    return labels[role] || role;
  };

  return (
    <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] flex items-center gap-2">
              <FiShield className="w-5 h-5" />
              Admin Users List
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              {admins.length} admin{admins.length !== 1 ? 's' : ''} on the platform
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {admins.length === 0 ? (
          <div className="text-center py-12 text-[#4A4A4A]">
            <FiUser className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No admin users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto border-2 border-[#8B6F47] rounded">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E8D8C0] border-b-2 border-[#8B6F47]">
                  <TableHead className="text-[#1A1A1A] font-semibold">Name</TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">Email</TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">Role</TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">Status</TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">Joined</TableHead>
                  <TableHead className="text-[#1A1A1A] font-semibold">Activity</TableHead>
                  <TableHead className="text-center text-[#1A1A1A] font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin, index) => (
                  <TableRow
                    key={admin.id}
                    className={`border-b-2 border-[#E8D8C0] hover:bg-[#F9F3E6] transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F4]'
                    }`}
                  >
                    <TableCell className="font-semibold text-[#1A1A1A]">
                      {admin.name}
                    </TableCell>
                    <TableCell className="text-[#4A4A4A]">{admin.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(admin.role || 'user')}>
                        {getRoleLabel(admin.role || 'user')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {admin.isSuspended ? (
                        <Badge variant="outline" className="border-[#8B0000] text-[#8B0000]">
                          Suspended
                        </Badge>
                      ) : (
                        <div className="flex items-center gap-1 text-[#2C5530]">
                          <FiCheckCircle className="w-4 h-4" />
                          <span>Active</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-[#4A4A4A]">
                      <span title={format(new Date(admin.createdAt || ''), 'PPpp')}>
                        {formatDistanceToNow(new Date(admin.createdAt || ''), {
                          addSuffix: true,
                        })}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#4A4A4A]">
                      <span title={format(new Date(admin.updatedAt || ''), 'PPpp')}>
                        {formatDistanceToNow(
                          new Date(admin.updatedAt || new Date()),
                          {
                            addSuffix: true,
                          }
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onSelectAdmin?.(admin)}
                        className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#F4E8D0]"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
