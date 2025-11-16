'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  GiCheckMark,
  GiCancel,
  GiPentacle,
} from 'react-icons/gi';
import { IoWarning, IoCheckmarkCircle, IoClose } from 'react-icons/io5';

// Type definitions (no server imports)
export type RefundStatus = 'pending' | 'approved' | 'denied' | 'processed' | 'failed';
export type RefundReason =
  | 'service_unsatisfactory'
  | 'duplicate_charge'
  | 'service_not_completed'
  | 'changed_mind'
  | 'other';

const REFUND_STATUS_LABELS: Record<RefundStatus, string> = {
  pending: 'Awaiting Admin Review',
  approved: 'Approved - Processing',
  denied: 'Request Denied',
  processed: 'Refund Initiated',
  failed: 'Refund Failed',
};

const REFUND_STATUS_COLORS: Record<RefundStatus, string> = {
  pending: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
  approved: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
  denied: 'bg-red-500/20 text-red-700 border-red-500/30',
  processed: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
  failed: 'bg-red-500/20 text-red-700 border-red-500/30',
};

const REFUND_REASON_LABELS: Record<RefundReason, string> = {
  service_unsatisfactory: 'Service Did Not Meet Expectations',
  duplicate_charge: 'Duplicate Charge',
  service_not_completed: 'Service Was Not Completed',
  changed_mind: 'Changed My Mind',
  other: 'Other Reason',
};

interface RefundRequest {
  _id: any;
  userId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  serviceName: string;
  serviceType: string;
  reason: RefundReason;
  userMessage?: string;
  status: RefundStatus;
  adminNotes?: string;
  adminId?: string;
  refundIntentId?: string;
  refundedAmount?: number;
  refundMethod?: string;
  requestedAt: Date;
  reviewedAt?: Date;
  processedAt?: Date;
  completedAt?: Date;
}

interface AdminRefundManagementProps {
  initialRefunds?: RefundRequest[];
}

/**
 * Admin Refund Management Interface
 * 
 * Allows admin to:
 * - View all pending refund requests
 * - Review refund details
 * - Approve/deny refunds with notes
 * - Manually process Stripe refunds
 * - View refund history and status
 */
export function AdminRefundManagement({ initialRefunds = [] }: AdminRefundManagementProps) {
  const [refunds, setRefunds] = useState<RefundRequest[]>(initialRefunds);
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isProcessingDialogOpen, setIsProcessingDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('pending');

  // Fetch pending refunds
  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/payments/refund-request/admin/pending?limit=50`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch refund requests');
        }

        const data = await response.json();
        setRefunds(data.refundRequests || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load refund requests'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRefunds();
  }, []);

  // Handle refund review (approve/deny)
  const handleReviewRefund = async (status: 'approved' | 'denied') => {
    if (!selectedRefund) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `/api/payments/refund-request/${selectedRefund._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status,
            adminNotes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update refund request');
      }

      const data = await response.json();
      setSuccess(`Refund request ${status}`);
      setIsReviewDialogOpen(false);
      setAdminNotes('');
      setSelectedRefund(null);

      // Update refunds list
      setRefunds((prev) =>
        prev.map((r) =>
          r._id === selectedRefund._id ? data.refundRequest : r
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Stripe refund processing
  const handleProcessRefund = async () => {
    if (!selectedRefund) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `/api/payments/refund-request/${selectedRefund._id}/process`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refundAmount: refundAmount ? parseInt(refundAmount) * 100 : undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to process Stripe refund');
      }

      const data = await response.json();
      setSuccess(`Refund processed successfully: ${data.refundId}`);
      setIsProcessingDialogOpen(false);
      setRefundAmount('');
      setSelectedRefund(null);

      // Update refunds list
      setRefunds((prev) =>
        prev.map((r) =>
          r._id === selectedRefund._id ? data.refundRequest : r
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRefunds = refunds.filter((r) => {
    if (filterStatus === 'pending') return r.status === 'pending';
    if (filterStatus === 'approved') return r.status === 'approved';
    if (filterStatus === 'processed') return r.status === 'processed';
    if (filterStatus === 'denied') return r.status === 'denied';
    return true;
  });

  const pendingCount = refunds.filter((r) => r.status === 'pending').length;
  const approvedCount = refunds.filter((r) => r.status === 'approved').length;
  const processedCount = refunds.filter((r) => r.status === 'processed').length;
  const deniedCount = refunds.filter((r) => r.status === 'denied').length;

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-[#B8860B] bg-[#1A1A1A]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-['MedievalSharp'] text-[#CC8800]">
              {pendingCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#B8860B] bg-[#1A1A1A]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-['MedievalSharp'] text-[#2C5530]">
              {approvedCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#B8860B] bg-[#1A1A1A]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">
              Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-['MedievalSharp'] text-[#2C5530]">
              {processedCount}
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#B8860B] bg-[#1A1A1A]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">
              Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-['MedievalSharp'] text-[#8B0000]">
              {deniedCount}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Refund Requests List */}
      <Card className="border-2 border-[#B8860B] bg-[#1A1A1A]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
                Refund Requests
              </CardTitle>
              <CardDescription className="font-['Crimson_Text'] text-[#8B6F47]">
                Manage user refund requests and Stripe processing
              </CardDescription>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px] border-[#8B6F47] bg-[#2C2416] text-[#F4E8D0]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#2C2416] border-[#8B6F47]">
                <SelectItem value="pending" className="text-[#F4E8D0]">
                  Pending
                </SelectItem>
                <SelectItem value="approved" className="text-[#F4E8D0]">
                  Approved
                </SelectItem>
                <SelectItem value="processed" className="text-[#F4E8D0]">
                  Processed
                </SelectItem>
                <SelectItem value="denied" className="text-[#F4E8D0]">
                  Denied
                </SelectItem>
                <SelectItem value="all" className="text-[#F4E8D0]">
                  All
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert className="border-2 border-[#8B0000]/50 bg-[#8B0000]/10 mb-4">
              <IoWarning className="h-4 w-4 text-[#8B0000]" />
              <AlertDescription className="text-[#F4E8D0] font-['Crimson_Text'] ml-2">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-2 border-[#2C5530]/50 bg-[#2C5530]/10 mb-4">
              <IoCheckmarkCircle className="h-4 w-4 text-[#2C5530]" />
              <AlertDescription className="text-[#F4E8D0] font-['Crimson_Text'] ml-2">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {isLoading && filteredRefunds.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-['Crimson_Text'] text-[#8B6F47]">
                Loading refund requests...
              </p>
            </div>
          ) : filteredRefunds.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-['Crimson_Text'] text-[#8B6F47]">
                No refund requests found
              </p>
            </div>
          ) : (
            <div className="rounded-lg border-2 border-[#8B6F47]/30 overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#2C2416]">
                  <TableRow className="border-b-2 border-[#8B6F47]/30">
                    <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">
                      Date
                    </TableHead>
                    <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">
                      User
                    </TableHead>
                    <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">
                      Service
                    </TableHead>
                    <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">
                      Amount
                    </TableHead>
                    <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">
                      Reason
                    </TableHead>
                    <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">
                      Status
                    </TableHead>
                    <TableHead className="font-['MedievalSharp'] text-[#F4E8D0]">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRefunds.map((refund) => (
                    <TableRow
                      key={refund._id.toString()}
                      className="border-b border-[#8B6F47]/20 hover:bg-[#2C2416]/50"
                    >
                      <TableCell className="font-['Crimson_Text'] text-[#E8DCC0]">
                        {new Date(refund.requestedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-['Crimson_Text'] text-[#F4E8D0]">
                        {refund.userId.slice(0, 8)}...
                      </TableCell>
                      <TableCell className="font-['Crimson_Text'] text-[#F4E8D0]">
                        {refund.serviceName}
                      </TableCell>
                      <TableCell className="font-['MedievalSharp'] text-[#B8860B]">
                        ${(refund.amount / 100).toFixed(2)}
                      </TableCell>
                      <TableCell className="font-['Crimson_Text'] text-[#8B6F47]">
                        {REFUND_REASON_LABELS[refund.reason] || refund.reason}
                      </TableCell>
                      <TableCell>
                        <Badge className={REFUND_STATUS_COLORS[refund.status]}>
                          {REFUND_STATUS_LABELS[refund.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-[#1A1A1A] font-['Crimson_Text']"
                          onClick={() => {
                            setSelectedRefund(refund);
                            if (refund.status === 'pending') {
                              setIsReviewDialogOpen(true);
                            } else if (refund.status === 'approved') {
                              setRefundAmount(((refund.amount) / 100).toString());
                              setIsProcessingDialogOpen(true);
                            }
                          }}
                        >
                          {refund.status === 'pending'
                            ? 'Review'
                            : refund.status === 'approved'
                              ? 'Process'
                              : 'View'}
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

      {/* Review Refund Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-md border-2 border-[#B8860B] bg-[#1A1A1A]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
              Review Refund Request
            </DialogTitle>
            <DialogDescription className="font-['Crimson_Text'] text-[#8B6F47]">
              {selectedRefund?.serviceName} - ${(selectedRefund?.amount || 0) / 100}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-[#2C2416] p-3 rounded border border-[#8B6F47]/30">
              <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] uppercase mb-2">
                Reason
              </p>
              <p className="font-['Crimson_Text'] text-[#F4E8D0]">
                {selectedRefund && REFUND_REASON_LABELS[selectedRefund.reason]}
              </p>
            </div>

            {selectedRefund?.userMessage && (
              <div className="bg-[#2C2416] p-3 rounded border border-[#8B6F47]/30">
                <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] uppercase mb-2">
                  User Message
                </p>
                <p className="font-['Crimson_Text'] text-[#E8DCC0] text-sm">
                  {selectedRefund.userMessage}
                </p>
              </div>
            )}

            <div>
              <label className="font-['MedievalSharp'] text-[#F4E8D0] text-sm">
                Admin Notes
              </label>
              <Textarea
                placeholder="Add notes for this refund decision..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="border-2 border-[#8B6F47] bg-[#2C2416] text-[#F4E8D0] font-['Crimson_Text'] mt-1"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              onClick={() => handleReviewRefund('denied')}
              disabled={isLoading}
              className="bg-[#8B0000] hover:bg-[#A50000] text-[#F4E8D0] font-['Crimson_Text']"
            >
              <IoClose className="w-4 h-4 mr-2" />
              Deny
            </Button>
            <Button
              onClick={() => handleReviewRefund('approved')}
              disabled={isLoading}
              className="bg-[#2C5530] hover:bg-[#2C5530]/80 text-[#F4E8D0] font-['Crimson_Text']"
            >
              <IoCheckmarkCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Process Stripe Refund Dialog */}
      <Dialog open={isProcessingDialogOpen} onOpenChange={setIsProcessingDialogOpen}>
        <DialogContent className="max-w-md border-2 border-[#B8860B] bg-[#1A1A1A]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
              Process Stripe Refund
            </DialogTitle>
            <DialogDescription className="font-['Crimson_Text'] text-[#8B6F47]">
              Initiate manual refund for {selectedRefund?.serviceName}
            </DialogDescription>
          </DialogHeader>

          <Alert className="border-2 border-[#CC8800]/50 bg-[#CC8800]/10">
            <IoWarning className="h-4 w-4 text-[#CC8800]" />
            <AlertDescription className="text-[#F4E8D0] font-['Crimson_Text'] ml-2 text-sm">
              This will immediately process the refund with Stripe to the original payment method
            </AlertDescription>
          </Alert>

          <div className="space-y-4 py-4">
            <div>
              <label className="font-['MedievalSharp'] text-[#F4E8D0] text-sm">
                Refund Amount ($)
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max={(selectedRefund?.amount || 0) / 100}
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="border-2 border-[#8B6F47] bg-[#2C2416] text-[#F4E8D0] font-['Crimson_Text'] mt-1"
                placeholder="Full amount"
              />
              <p className="text-xs font-['Crimson_Text'] text-[#8B6F47] mt-1">
                Max: ${(selectedRefund?.amount || 0) / 100}
              </p>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsProcessingDialogOpen(false)}
              disabled={isLoading}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleProcessRefund}
              disabled={isLoading}
              className="bg-[#2C5530] hover:bg-[#2C5530]/80 text-[#F4E8D0] font-['Crimson_Text']"
            >
              {isLoading ? 'Processing...' : 'Process Refund'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
