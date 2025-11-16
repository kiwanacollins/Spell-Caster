'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FiCheck, FiX, FiClock, FiAlertCircle } from 'react-icons/fi';
import { ServiceRequestStatus, PriorityLevel } from '@/lib/db/models/service-request';

interface BulkActionsToolbarProps {
  selectedCount: number;
  onStatusChange: (status: ServiceRequestStatus, notes?: string) => Promise<void>;
  onPriorityChange: (priority: PriorityLevel) => Promise<void>;
  onAssignAdmin: (adminId: string) => Promise<void>;
  isLoading: boolean;
}

export function BulkActionsToolbar({
  selectedCount,
  onStatusChange,
  onPriorityChange,
  onAssignAdmin,
  isLoading,
}: BulkActionsToolbarProps) {
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [statusNotes, setStatusNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions: { value: ServiceRequestStatus; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'in_progress', label: 'In Progress', icon: <FiClock className="w-4 h-4" />, color: 'text-blue-600' },
    { value: 'completed', label: 'Completed', icon: <FiCheck className="w-4 h-4" />, color: 'text-green-600' },
    { value: 'cancelled', label: 'Cancelled', icon: <FiX className="w-4 h-4" />, color: 'text-red-600' },
    { value: 'on_hold', label: 'On Hold', icon: <FiAlertCircle className="w-4 h-4" />, color: 'text-yellow-600' },
  ];

  const priorityOptions: PriorityLevel[] = ['low', 'medium', 'high', 'urgent'];

  const handleStatusChange = async () => {
    if (!selectedStatus) return;
    setIsSubmitting(true);
    try {
      await onStatusChange(selectedStatus as ServiceRequestStatus, statusNotes);
      setShowStatusDialog(false);
      setStatusNotes('');
      setSelectedStatus('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePriorityChange = async (priority: PriorityLevel) => {
    try {
      await onPriorityChange(priority);
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="mb-4 p-4 bg-gradient-to-r from-[#8B6F47] via-transparent to-transparent rounded-lg border border-[#8B6F47]/30">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#F4E8D0] font-semibold">{selectedCount} request{selectedCount !== 1 ? 's' : ''} selected</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Status Update */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStatusDialog(true)}
              disabled={isLoading || isSubmitting}
              className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/10"
            >
              Update Status
            </Button>

            {/* Priority Update */}
            <Select onValueChange={(value) => handlePriorityChange(value as PriorityLevel)} disabled={isLoading}>
              <SelectTrigger className="w-40 border-[#8B6F47] text-[#8B6F47]">
                <SelectValue placeholder="Change Priority" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-[#8B6F47]">
                {priorityOptions.map((priority) => (
                  <SelectItem key={priority} value={priority} className="text-[#F4E8D0] capitalize">
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Export Placeholder - Future Enhancement */}
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47]/10"
              title="Export selected requests (coming soon)"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Status Update Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="bg-[#1A1A1A] border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="text-[#F4E8D0]">Update Status for {selectedCount} Request{selectedCount !== 1 ? 's' : ''}</DialogTitle>
            <DialogDescription className="text-[#C0C0C0]">
              Choose a new status and optionally add notes for the client.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Status Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F4E8D0]">New Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-[#2A2A2A] border-[#8B6F47] text-[#F4E8D0]">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#8B6F47]">
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-[#F4E8D0]">
                      <div className="flex items-center gap-2">
                        <span className={option.color}>{option.icon}</span>
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes Section */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F4E8D0]">Notes (Optional)</label>
              <Textarea
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                placeholder="Add notes for the client about this status change..."
                className="bg-[#2A2A2A] border-[#8B6F47] text-[#F4E8D0] placeholder:text-[#8B6F47]/50 min-h-24"
              />
            </div>

            {/* Warning for Cancellations */}
            {selectedStatus === 'cancelled' && (
              <Alert className="bg-red-900/20 border-red-700">
                <AlertDescription className="text-red-300">
                  Cancelling requests may trigger refunds. Admin review recommended.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowStatusDialog(false)}
              disabled={isSubmitting}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusChange}
              disabled={!selectedStatus || isSubmitting}
              className="bg-[#8B6F47] text-[#1A1A1A] hover:bg-[#9B7F57]"
            >
              {isSubmitting ? 'Updating...' : 'Apply Status Change'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
