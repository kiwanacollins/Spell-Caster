'use client';

import { useState } from 'react';
import { UserDocument } from '@/lib/db/models/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FiAlertCircle, FiShield, FiTrash2 } from 'react-icons/fi';

interface BulkUserActionsProps {
  selectedCount: number;
  onSuspendBulk?: (userIds: string[], reason: string) => Promise<void>;
  onPromoteAdminBulk?: (userIds: string[]) => Promise<void>;
  isLoading?: boolean;
}

export function BulkUserActionsToolbar({
  selectedCount,
  onSuspendBulk,
  onPromoteAdminBulk,
  isLoading = false,
}: BulkUserActionsProps) {
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [showPromoteDialog, setShowPromoteDialog] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (selectedCount === 0) return null;

  const handleSuspendBulk = async () => {
    if (!suspensionReason.trim()) {
      alert('Please provide a suspension reason');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSuspendBulk?.(selectedUserIds, suspensionReason);
      setShowSuspendDialog(false);
      setSuspensionReason('');
      setSelectedUserIds([]);
    } catch (error) {
      console.error('Error suspending users:', error);
      alert('Failed to suspend users');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePromoteAdminBulk = async () => {
    setIsSubmitting(true);
    try {
      await onPromoteAdminBulk?.(selectedUserIds);
      setShowPromoteDialog(false);
      setSelectedUserIds([]);
    } catch (error) {
      console.error('Error promoting users:', error);
      alert('Failed to promote users');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="mb-4 p-4 bg-gradient-to-r from-[#8B6F47] via-transparent to-transparent rounded-lg border border-[#8B6F47]/30">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#F4E8D0] font-semibold">
              {selectedCount} user{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Suspend Bulk */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSuspendDialog(true)}
              disabled={isLoading || isSubmitting}
              className="border-red-700 text-red-700 hover:bg-red-900/10"
            >
              <FiAlertCircle className="w-4 h-4 mr-2" />
              Suspend Selected
            </Button>

            {/* Promote to Admin Bulk */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPromoteDialog(true)}
              disabled={isLoading || isSubmitting}
              className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/10"
            >
              <FiShield className="w-4 h-4 mr-2" />
              Promote to Admin
            </Button>
          </div>
        </div>
      </div>

      {/* Suspend Dialog */}
      <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
        <DialogContent className="bg-[#1A1A1A] border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="text-[#F4E8D0]">
              Suspend {selectedCount} User{selectedCount !== 1 ? 's' : ''}
            </DialogTitle>
            <DialogDescription className="text-[#C0C0C0]">
              This will disable access for all selected users.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert className="bg-red-900/20 border-red-700">
              <FiAlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-300 ml-2">
                All selected users will be immediately suspended.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F4E8D0]">Suspension Reason</label>
              <textarea
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                placeholder="Enter reason for bulk suspension..."
                className="w-full bg-[#2A2A2A] border border-[#8B6F47] text-[#F4E8D0] placeholder:text-[#8B6F47]/50 rounded p-2 focus:outline-none focus:border-[#B8860B]"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSuspendDialog(false)}
              disabled={isSubmitting}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSuspendBulk}
              disabled={isSubmitting || !suspensionReason.trim()}
              className="bg-red-900 text-white hover:bg-red-800"
            >
              {isSubmitting ? 'Suspending...' : 'Suspend All'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Promote to Admin Dialog */}
      <Dialog open={showPromoteDialog} onOpenChange={setShowPromoteDialog}>
        <DialogContent className="bg-[#1A1A1A] border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="text-[#F4E8D0]">
              Promote {selectedCount} User{selectedCount !== 1 ? 's' : ''} to Admin
            </DialogTitle>
            <DialogDescription className="text-[#C0C0C0]">
              Selected users will gain admin privileges immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Alert className="bg-[#8B6F47]/20 border-[#8B6F47]">
              <FiShield className="h-4 w-4 text-[#B8860B]" />
              <AlertDescription className="text-[#F4E8D0] ml-2">
                Admin users can manage the platform, create services, manage requests, and invite
                other admins.
              </AlertDescription>
            </Alert>

            <Alert className="bg-yellow-900/20 border-yellow-700">
              <FiAlertCircle className="h-4 w-4 text-yellow-500" />
              <AlertDescription className="text-yellow-300 ml-2">
                This action cannot be undone easily. Ensure you trust these users before
                promoting.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPromoteDialog(false)}
              disabled={isSubmitting}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePromoteAdminBulk}
              disabled={isSubmitting}
              className="bg-[#8B0000] text-white hover:bg-[#9B1010]"
            >
              {isSubmitting ? 'Promoting...' : 'Promote to Admin'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
