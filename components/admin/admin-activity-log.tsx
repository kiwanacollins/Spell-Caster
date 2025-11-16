'use client';

import { useMemo } from 'react';
import { UserDocument } from '@/lib/db/models/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, format, subDays, isAfter } from 'date-fns';
import {
  FiActivity,
  FiShield,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
} from 'react-icons/fi';

interface ActivityLogEntry {
  id: string;
  admin: UserDocument;
  action: 'login' | 'suspend' | 'promote' | 'demote' | 'refund' | 'promote_to_admin' | 'demote_from_admin';
  target: string;
  timestamp: Date;
  details?: string;
}

interface AdminActivityLogProps {
  admins: UserDocument[];
  daysToShow?: number;
}

export function AdminActivityLog({
  admins,
  daysToShow = 30,
}: AdminActivityLogProps) {
  // Generate activity log from admin lastActivity data
  const activityLog = useMemo(() => {
    const entries: ActivityLogEntry[] = [];

    admins.forEach((admin) => {
      // Add last updated activity (represents last activity)
      if (admin.updatedAt) {
        const lastActivityDate = new Date(admin.updatedAt);
        if (
          isAfter(
            lastActivityDate,
            subDays(new Date(), daysToShow)
          )
        ) {
          entries.push({
            id: `${admin.id}-updated`,
            admin,
            action: 'login',
            target: admin.name,
            timestamp: lastActivityDate,
            details: 'Last activity',
          });
        }
      }

      // Add creation activity
      if (admin.createdAt) {
        entries.push({
          id: `${admin.id}-created`,
          admin,
          action: 'promote_to_admin',
          target: admin.name,
          timestamp: new Date(admin.createdAt),
          details: 'Promoted to admin',
        });
      }
    });

    // Sort by timestamp descending
    return entries.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }, [admins, daysToShow]);

  const getActionIcon = (action: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      login: <FiUser className="w-4 h-4" />,
      suspend: <FiAlertCircle className="w-4 h-4" />,
      promote: <FiCheckCircle className="w-4 h-4" />,
      demote: <FiX className="w-4 h-4" />,
      refund: <FiCheckCircle className="w-4 h-4" />,
      promote_to_admin: <FiShield className="w-4 h-4" />,
      demote_from_admin: <FiUser className="w-4 h-4" />,
    };
    return icons[action] || <FiActivity className="w-4 h-4" />;
  };

  const getActionColor = (action: string): string => {
    const colors: { [key: string]: string } = {
      login: 'text-[#4A4A4A]',
      suspend: 'text-[#8B0000]',
      promote: 'text-[#2C5530]',
      demote: 'text-[#CC8800]',
      refund: 'text-[#2C5530]',
      promote_to_admin: 'text-[#B8860B]',
      demote_from_admin: 'text-[#CC8800]',
    };
    return colors[action] || 'text-[#4A4A4A]';
  };

  const getActionBadgeColor = (action: string): string => {
    const colors: { [key: string]: string } = {
      login: 'bg-[#E8D8C0] text-[#4A4A4A]',
      suspend: 'bg-[#8B0000]/10 text-[#8B0000]',
      promote: 'bg-[#2C5530]/10 text-[#2C5530]',
      demote: 'bg-[#CC8800]/10 text-[#CC8800]',
      refund: 'bg-[#2C5530]/10 text-[#2C5530]',
      promote_to_admin: 'bg-[#B8860B]/10 text-[#B8860B]',
      demote_from_admin: 'bg-[#CC8800]/10 text-[#CC8800]',
    };
    return colors[action] || 'bg-[#E8D8C0] text-[#4A4A4A]';
  };

  const getActionLabel = (action: string): string => {
    const labels: { [key: string]: string } = {
      login: 'Login',
      suspend: 'Suspended User',
      promote: 'Promoted',
      demote: 'Demoted',
      refund: 'Issued Refund',
      promote_to_admin: 'Promoted to Admin',
      demote_from_admin: 'Demoted from Admin',
    };
    return labels[action] || action;
  };

  return (
    <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
      <CardHeader>
        <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] flex items-center gap-2">
          <FiActivity className="w-5 h-5" />
          Admin Activity Log
        </CardTitle>
        <CardDescription className="text-[#4A4A4A]">
          Last {daysToShow} days of admin activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activityLog.length === 0 ? (
          <div className="text-center py-12 text-[#4A4A4A]">
            <FiActivity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No activity recorded</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activityLog.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border-2 border-[#E8D8C0] rounded p-4 flex items-start gap-4"
              >
                {/* Timeline Dot */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#F4E8D0] border-2 border-[#8B6F47] flex items-center justify-center ${getActionColor(entry.action)}`}
                >
                  {getActionIcon(entry.action)}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-[#1A1A1A]">
                        {entry.admin.name}
                      </p>
                      <p className="text-sm text-[#4A4A4A]">
                        {entry.details || getActionLabel(entry.action)} •{' '}
                        <span
                          title={format(
                            entry.timestamp,
                            'PPpp'
                          )}
                        >
                          {formatDistanceToNow(entry.timestamp, {
                            addSuffix: true,
                          })}
                        </span>
                      </p>
                    </div>

                    <Badge
                      className={getActionBadgeColor(entry.action)}
                      variant="outline"
                    >
                      {getActionLabel(entry.action)}
                    </Badge>
                  </div>

                  {/* Target Info */}
                  {entry.target && (
                    <div className="mt-2 text-xs text-[#666] bg-[#FAF8F4] rounded p-2 border-l-2 border-[#8B6F47]">
                      Target: <span className="font-mono">{entry.target}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
