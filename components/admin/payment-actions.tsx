'use client';

import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { FiMoreVertical, FiDownload, FiRotateCcw, FiCheck } from 'react-icons/fi';
import { format } from 'date-fns';

interface PaymentActionProps {
  transactionId: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  amount: number;
  customerName: string;
  serviceDescription?: string;
  date: Date;
  onRefund?: (transactionId: string, reason: string) => Promise<void>;
  onMarkAsPaid?: (transactionId: string) => Promise<void>;
  onGenerateReceipt?: (transactionId: string) => void;
}

export function PaymentActions({
  transactionId,
  status,
  amount,
  customerName,
  serviceDescription,
  date,
  onRefund,
  onMarkAsPaid,
  onGenerateReceipt,
}: PaymentActionProps) {
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [refundAmount, setRefundAmount] = useState(amount.toString());
  const [isRefunding, setIsRefunding] = useState(false);
  const [refundError, setRefundError] = useState('');
  const [refundSuccess, setRefundSuccess] = useState(false);

  const [markPaidDialogOpen, setMarkPaidDialogOpen] = useState(false);
  const [isMarkingPaid, setIsMarkingPaid] = useState(false);
  const [markPaidError, setMarkPaidError] = useState('');

  const handleRefundClick = async () => {
    if (!refundReason.trim()) {
      setRefundError('Please provide a reason for the refund');
      return;
    }

    const parsedAmount = parseFloat(refundAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > amount) {
      setRefundError('Please enter a valid refund amount');
      return;
    }

    setIsRefunding(true);
    setRefundError('');
    setRefundSuccess(false);

    try {
      await onRefund?.(transactionId, refundReason);
      setRefundSuccess(true);
      setTimeout(() => {
        setRefundDialogOpen(false);
        setRefundReason('');
        setRefundAmount(amount.toString());
        setRefundSuccess(false);
      }, 2000);
    } catch (error) {
      setRefundError(
        error instanceof Error ? error.message : 'Failed to process refund'
      );
    } finally {
      setIsRefunding(false);
    }
  };

  const handleMarkAsPaidClick = async () => {
    setIsMarkingPaid(true);
    setMarkPaidError('');

    try {
      await onMarkAsPaid?.(transactionId);
      setTimeout(() => {
        setMarkPaidDialogOpen(false);
      }, 1500);
    } catch (error) {
      setMarkPaidError(
        error instanceof Error ? error.message : 'Failed to mark as paid'
      );
    } finally {
      setIsMarkingPaid(false);
    }
  };

  const canRefund = status === 'completed' || status === 'pending';
  const canMarkAsPaid = status === 'pending';

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-[#F9F3E6]"
          >
            <FiMoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-[#F4E8D0] border-2 border-[#8B6F47]"
        >
          <DropdownMenuItem
            onClick={() => onGenerateReceipt?.(transactionId)}
            className="cursor-pointer hover:bg-[#E8D8C0]"
          >
            <FiDownload className="w-4 h-4 mr-2" />
            <span>Generate Receipt</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {canMarkAsPaid && (
            <>
              <DropdownMenuItem
                onClick={() => setMarkPaidDialogOpen(true)}
                className="cursor-pointer hover:bg-[#E8D8C0]"
              >
                <FiCheck className="w-4 h-4 mr-2" />
                <span>Mark as Paid</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          {canRefund && (
            <DropdownMenuItem
              onClick={() => setRefundDialogOpen(true)}
              className="cursor-pointer hover:bg-[#E8D8C0]"
            >
              <FiRotateCcw className="w-4 h-4 mr-2" />
              <span>Process Refund</span>
            </DropdownMenuItem>
          )}

          {!canRefund && !canMarkAsPaid && (
            <div className="px-2 py-1.5 text-sm text-[#4A4A4A]">
              No actions available
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Mark as Paid Dialog */}
      <Dialog open={markPaidDialogOpen} onOpenChange={setMarkPaidDialogOpen}>
        <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Mark Payment as Paid
            </DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              Confirm that this payment has been received
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-white border-2 border-[#8B6F47] rounded p-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#4A4A4A]">Transaction ID</p>
                  <p className="font-mono text-[#1A1A1A] font-semibold">
                    {transactionId}
                  </p>
                </div>
                <div>
                  <p className="text-[#4A4A4A]">Amount</p>
                  <p className="font-semibold text-[#1A1A1A]">
                    ${amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[#4A4A4A]">Customer</p>
                  <p className="font-semibold text-[#1A1A1A]">{customerName}</p>
                </div>
                <div>
                  <p className="text-[#4A4A4A]">Date</p>
                  <p className="font-semibold text-[#1A1A1A]">
                    {format(date, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            {markPaidError && (
              <Alert className="border-[#8B0000] bg-[#FFE5E5]">
                <AlertDescription className="text-[#8B0000]">
                  {markPaidError}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setMarkPaidDialogOpen(false)}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleMarkAsPaidClick}
              disabled={isMarkingPaid}
              className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
            >
              {isMarkingPaid ? 'Confirming...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <DialogHeader>
            <DialogTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Process Refund
            </DialogTitle>
            <DialogDescription className="text-[#4A4A4A]">
              Issue a refund to {customerName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Summary Card */}
            <div className="bg-white border-2 border-[#8B6F47] rounded p-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#4A4A4A]">Transaction ID</p>
                  <p className="font-mono text-[#1A1A1A] font-semibold">
                    {transactionId}
                  </p>
                </div>
                <div>
                  <p className="text-[#4A4A4A]">Original Amount</p>
                  <p className="font-semibold text-[#1A1A1A]">
                    ${amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Refund Amount */}
            <div className="space-y-2">
              <Label htmlFor="refund-amount" className="text-[#1A1A1A]">
                Refund Amount
              </Label>
              <Input
                id="refund-amount"
                type="number"
                min="0.01"
                max={amount}
                step="0.01"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="bg-white border-[#8B6F47]"
              />
              <p className="text-xs text-[#4A4A4A]">
                Maximum refund: ${amount.toLocaleString()}
              </p>
            </div>

            {/* Refund Reason */}
            <div className="space-y-2">
              <Label htmlFor="refund-reason" className="text-[#1A1A1A]">
                Reason for Refund
              </Label>
              <Textarea
                id="refund-reason"
                placeholder="Explain why this refund is being issued..."
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="bg-white border-[#8B6F47] resize-none"
                rows={3}
              />
            </div>

            {/* Service Description */}
            {serviceDescription && (
              <div className="bg-white border-2 border-[#E8D8C0] rounded p-2 text-xs">
                <p className="text-[#4A4A4A] mb-1">Service:</p>
                <p className="text-[#1A1A1A] italic">{serviceDescription}</p>
              </div>
            )}

            {/* Error Alert */}
            {refundError && (
              <Alert className="border-[#8B0000] bg-[#FFE5E5]">
                <AlertDescription className="text-[#8B0000]">
                  {refundError}
                </AlertDescription>
              </Alert>
            )}

            {/* Success Message */}
            {refundSuccess && (
              <Alert className="border-[#2C5530] bg-[#E8F5E9]">
                <AlertDescription className="text-[#2C5530]">
                  ✓ Refund processed successfully
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRefundDialogOpen(false)}
              disabled={isRefunding}
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRefundClick}
              disabled={isRefunding}
              className="bg-[#8B0000] text-white hover:bg-[#660000]"
            >
              {isRefunding ? 'Processing...' : 'Process Refund'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
