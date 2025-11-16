'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceRequest, ServiceRequestStatus, PriorityLevel } from '@/lib/db/models';
import { AdminServiceQueue } from './admin-service-queue';
import { BulkActionsToolbar } from './bulk-actions-toolbar';

interface AdminBulkActionsClientProps {
  requests: ServiceRequest[];
  onRefresh?: () => void;
}

export function AdminBulkActionsClient({ requests, onRefresh }: AdminBulkActionsClientProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = useCallback(
    async (status: ServiceRequestStatus, notes?: string) => {
      if (selectedIds.length === 0) return;

      setIsLoading(true);
      try {
        const response = await fetch('/api/service-requests/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update-status',
            requestIds: selectedIds,
            status,
            adminNotes: notes,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update status');
        }

        setSelectedIds([]);
        router.refresh();
        onRefresh?.();
      } catch (error) {
        console.error('Error updating status:', error);
        alert('Failed to update status. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [selectedIds, router, onRefresh]
  );

  const handlePriorityChange = useCallback(
    async (priority: PriorityLevel) => {
      if (selectedIds.length === 0) return;

      setIsLoading(true);
      try {
        const response = await fetch('/api/service-requests/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'update-priority',
            requestIds: selectedIds,
            priority,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update priority');
        }

        router.refresh();
        onRefresh?.();
      } catch (error) {
        console.error('Error updating priority:', error);
        alert('Failed to update priority. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [selectedIds, router, onRefresh]
  );

  const handleAssignAdmin = useCallback(
    async (adminId: string) => {
      if (selectedIds.length === 0) return;

      setIsLoading(true);
      try {
        const response = await fetch('/api/service-requests/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'assign-admin',
            requestIds: selectedIds,
            adminId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to assign admin');
        }

        setSelectedIds([]);
        router.refresh();
        onRefresh?.();
      } catch (error) {
        console.error('Error assigning admin:', error);
        alert('Failed to assign admin. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [selectedIds, router, onRefresh]
  );

  return (
    <div className="space-y-4">
      {selectedIds.length > 0 && (
        <BulkActionsToolbar
          selectedCount={selectedIds.length}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onAssignAdmin={handleAssignAdmin}
          isLoading={isLoading}
        />
      )}

      <AdminServiceQueue
        requests={requests}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    </div>
  );
}
