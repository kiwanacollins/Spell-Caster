'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GiPentacle } from 'react-icons/gi';
import { IoInformation } from 'react-icons/io5';

// Type definitions (no server imports)
type RefundStatus = 'pending' | 'approved' | 'denied' | 'processed' | 'failed';
type RefundReason =
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
  _id: string;
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
  requestedAt: string | Date;
  reviewedAt?: string | Date;
  processedAt?: string | Date;
  completedAt?: string | Date;
}

/**
 * User Refund Status Tracker
 * 
 * Displays user's refund requests and their current status
 * Shows notifications about refund status changes
 */
export function UserRefundStatusTracker() {
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/payments/refund-request');

        if (!response.ok) {
          throw new Error('Failed to fetch refund requests');
        }

        const data = await response.json();
        setRefunds(data.refundRequests || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load refunds');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRefunds();
  }, []);

  if (refunds.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-['MedievalSharp'] text-[#F4E8D0] text-lg">
        📜 Your Refund Requests
      </h3>

      {error && (
        <Alert className="border-2 border-[#CC8800]/50 bg-[#CC8800]/10">
          <IoInformation className="h-4 w-4 text-[#CC8800]" />
          <AlertDescription className="text-[#F4E8D0] font-['Crimson_Text'] ml-2">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <p className="font-['Crimson_Text'] text-[#8B6F47]">Loading refund requests...</p>
      ) : refunds.length === 0 ? (
        <p className="font-['Crimson_Text'] text-[#8B6F47]">No refund requests yet</p>
      ) : (
        <div className="space-y-3">
          {refunds.map((refund) => (
            <Card
              key={refund._id.toString()}
              className="border-2 border-[#8B6F47]/30 bg-[#2C2416]"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-['Crimson_Text'] text-[#F4E8D0] text-base">
                      {refund.serviceName}
                    </CardTitle>
                    <CardDescription className="font-['Crimson_Text'] text-[#8B6F47] text-xs">
                      {new Date(refund.requestedAt).toLocaleDateString()} •{' '}
                      ${(refund.amount / 100).toFixed(2)}
                    </CardDescription>
                  </div>
                  <Badge className={REFUND_STATUS_COLORS[refund.status]}>
                    {REFUND_STATUS_LABELS[refund.status]}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-['Crimson_Text'] text-[#8B6F47]">Reason</p>
                    <p className="font-['Crimson_Text'] text-[#F4E8D0]">
                      {REFUND_REASON_LABELS[refund.reason]}
                    </p>
                  </div>
                  <div>
                    <p className="font-['Crimson_Text'] text-[#8B6F47]">Status</p>
                    <p className="font-['Crimson_Text'] text-[#F4E8D0] capitalize">
                      {refund.status}
                    </p>
                  </div>
                </div>

                {refund.userMessage && (
                  <div className="border-t border-[#8B6F47]/20 pt-2">
                    <p className="font-['Crimson_Text'] text-xs text-[#8B6F47]">
                      Your message:
                    </p>
                    <p className="font-['Crimson_Text'] text-sm text-[#E8DCC0]">
                      {refund.userMessage}
                    </p>
                  </div>
                )}

                {refund.adminNotes && (
                  <div className="border-t border-[#8B6F47]/20 pt-2 bg-[#1A1A1A] p-2 rounded">
                    <p className="font-['Crimson_Text'] text-xs text-[#8B6F47]">
                      Admin Response:
                    </p>
                    <p className="font-['Crimson_Text'] text-sm text-[#F4E8D0]">
                      {refund.adminNotes}
                    </p>
                  </div>
                )}

                {refund.refundIntentId && (
                  <Alert className="border-2 border-[#2C5530]/50 bg-[#2C5530]/10">
                    <GiPentacle className="h-4 w-4 text-[#2C5530]" />
                    <AlertDescription className="text-[#F4E8D0] font-['Crimson_Text'] ml-2 text-xs">
                      Refund ID: {refund.refundIntentId}
                    </AlertDescription>
                  </Alert>
                )}

                {refund.status === 'processed' && (
                  <Alert className="border-2 border-[#2C5530]/50 bg-[#2C5530]/10">
                    <GiPentacle className="h-4 w-4 text-[#2C5530]" />
                    <AlertDescription className="text-[#F4E8D0] font-['Crimson_Text'] ml-2 text-xs">
                      Your refund has been initiated and should appear in your account within 5-10 business days
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
