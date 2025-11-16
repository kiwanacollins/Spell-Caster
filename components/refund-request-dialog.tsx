'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IoWarning } from 'react-icons/io5';

// Type definitions (no server imports)
export type RefundReason =
  | 'service_unsatisfactory'
  | 'duplicate_charge'
  | 'service_not_completed'
  | 'changed_mind'
  | 'other';

const REFUND_REASON_LABELS: Record<RefundReason, string> = {
  service_unsatisfactory: 'Service Did Not Meet Expectations',
  duplicate_charge: 'Duplicate Charge',
  service_not_completed: 'Service Was Not Completed',
  changed_mind: 'Changed My Mind',
  other: 'Other Reason',
};

interface RefundRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    id: string;
    service: string;
    amount: number;
    date: string;
    paymentMethod: string;
    status: string;
  } | null;
  onSubmit: (refundRequest: RefundRequestInput) => Promise<void>;
}

export interface RefundRequestInput {
  paymentIntentId: string;
  reason: RefundReason;
  userMessage?: string;
}

/**
 * Refund Request Dialog Component
 * 
 * Allows users to submit refund requests with reason and optional message
 * Dialog handles validation and submission
 */
export function RefundRequestDialog({
  isOpen,
  onClose,
  transaction,
  onSubmit,
}: RefundRequestDialogProps) {
  const [selectedReason, setSelectedReason] = useState<RefundReason | ''>('');
  const [userMessage, setUserMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!transaction || !selectedReason) {
      setSubmitError('Please select a reason for your refund request');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit({
        paymentIntentId: transaction.id,
        reason: selectedReason as RefundReason,
        userMessage: userMessage || undefined,
      });

      // Reset form
      setSelectedReason('');
      setUserMessage('');
      onClose();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit refund request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSelectedReason('');
      setUserMessage('');
      setSubmitError(null);
      onClose();
    }
  };

  if (!transaction) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
        <DialogHeader className="border-b border-[#8B6F47]/30 pb-4">
          <DialogTitle className="font-['MedievalSharp'] text-[#F4E8D0] text-xl">
            Request a Refund
          </DialogTitle>
          <DialogDescription className="font-['Crimson_Text'] text-[#8B6F47]">
            We're here to help. Tell us why you'd like a refund for this service.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Transaction Summary */}
          <Card className="border-2 border-[#8B6F47]/30 bg-[#2C2416] p-4">
            <div className="space-y-2">
              <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] uppercase">
                Service Transaction
              </p>
              <p className="font-['Crimson_Text'] text-[#F4E8D0] font-semibold">
                {transaction.service}
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-[#8B6F47]/20">
                <p className="font-['Crimson_Text'] text-sm text-[#8B6F47]">
                  Amount: ${transaction.amount.toFixed(2)}
                </p>
                <p className="font-['Crimson_Text'] text-xs text-[#8B6F47]">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          {/* Warning Alert */}
          <Alert className="border-2 border-[#CC8800]/50 bg-[#CC8800]/10">
            <IoWarning className="h-4 w-4 text-[#CC8800]" />
            <AlertDescription className="font-['Crimson_Text'] text-sm text-[#F4E8D0] ml-2">
              Refunds are processed manually by our admin team within 3-5 business days
            </AlertDescription>
          </Alert>

          {/* Reason Selection */}
          <div className="space-y-2">
            <label className="font-['MedievalSharp'] text-[#F4E8D0] text-sm">
              Reason for Refund <span className="text-[#CC8800]">*</span>
            </label>
            <Select value={selectedReason} onValueChange={(value) => setSelectedReason(value as RefundReason)}>
              <SelectTrigger className="border-2 border-[#8B6F47] bg-[#2C2416] text-[#F4E8D0] font-['Crimson_Text']">
                <SelectValue placeholder="Select a reason..." />
              </SelectTrigger>
              <SelectContent className="bg-[#2C2416] border-2 border-[#8B6F47]">
                {Object.entries(REFUND_REASON_LABELS).map(([key, label]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="text-[#F4E8D0] font-['Crimson_Text']"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="font-['MedievalSharp'] text-[#F4E8D0] text-sm">
              Additional Message <span className="text-[#8B6F47]">(optional)</span>
            </label>
            <Textarea
              placeholder="Help us understand your request better... (max 500 characters)"
              value={userMessage}
              onChange={(e) =>
                setUserMessage(e.target.value.slice(0, 500))
              }
              className="border-2 border-[#8B6F47] bg-[#2C2416] text-[#F4E8D0] font-['Crimson_Text'] placeholder:text-[#8B6F47]/60 focus:border-[#B8860B]"
              rows={4}
            />
            <p className="text-xs font-['Crimson_Text'] text-[#8B6F47]">
              {userMessage.length}/500 characters
            </p>
          </div>

          {/* Error Message */}
          {submitError && (
            <Alert className="border-2 border-[#8B0000]/50 bg-[#8B0000]/10">
              <IoWarning className="h-4 w-4 text-[#8B0000]" />
              <AlertDescription className="font-['Crimson_Text'] text-sm text-[#F4E8D0] ml-2">
                {submitError}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="border-t border-[#8B6F47]/30 pt-4 flex gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-[#1A1A1A] font-['Crimson_Text']"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedReason || isSubmitting}
            className="bg-[#2C5530] hover:bg-[#2C5530]/80 text-[#F4E8D0] font-['MedievalSharp'] border-2 border-[#2C5530]"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
