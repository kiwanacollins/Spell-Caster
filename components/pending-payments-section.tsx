'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  GiCoinsPile,
  GiHourglass,
  GiCheckMark,
} from "react-icons/gi";
import { IoWarning, IoAlertCircle, IoCheckmarkCircle } from "react-icons/io5";
import { useState, useEffect } from "react";

interface Installment {
  installmentNumber: number;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: 'pending' | 'scheduled' | 'partial' | 'paid' | 'overdue';
}

interface PendingPayment {
  _id: string;
  serviceName: string;
  serviceType: string;
  totalAmount: number;
  amountPaid: number;
  amountDue: number;
  status: 'pending' | 'scheduled' | 'partially_paid' | 'overdue';
  dueDate: string;
  overdueBy?: number;
  paymentPlanType: 'one_time' | 'installment' | 'subscription';
  installments?: Installment[];
  currentInstallmentNumber?: number;
}

export function PendingPaymentsSection() {
  const [pendingPayments, setPendingPayments] = useState<PendingPayment[]>([]);
  const [totalPending, setTotalPending] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingPayments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/payments/pending');
        
        if (!response.ok) {
          throw new Error('Failed to fetch pending payments');
        }
        
        const data = await response.json();
        setPendingPayments(data.payments || []);
        setTotalPending(data.totalAmount || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingPayments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-[#CC8800] text-[#1A1A1A]';
      case 'scheduled':
        return 'bg-[#8B6F47] text-[#F4E8D0]';
      case 'partially_paid':
        return 'bg-[#2C5530] text-[#F4E8D0]';
      case 'overdue':
        return 'bg-[#8B0000] text-[#F4E8D0]';
      default:
        return 'bg-[#4A4A4A] text-[#F4E8D0]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <IoWarning className="w-4 h-4" />;
      case 'scheduled':
        return <GiHourglass className="w-4 h-4" />;
      case 'partially_paid':
        return <GiCheckMark className="w-4 h-4" />;
      case 'overdue':
        return <IoAlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getPaymentProgress = (amountPaid: number, totalAmount: number): number => {
    if (totalAmount === 0) return 0;
    return Math.round((amountPaid / totalAmount) * 100);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] flex items-center gap-2">
            <GiCoinsPile className="w-6 h-6 text-[#CC8800]" />
            Loading pending payments...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert className="border-2 border-[#8B0000] bg-[#1A1A1A] text-[#F4E8D0]">
        <IoAlertCircle className="h-4 w-4 text-[#8B0000]" />
        <AlertDescription className="font-['Crimson_Text']">
          Error loading pending payments: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (pendingPayments.length === 0) {
    return (
      <Card className="border-2 border-[#2C5530] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] flex items-center gap-2">
            <IoCheckmarkCircle className="w-6 h-6 text-[#2C5530]" />
            All Payments Current
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-['Crimson_Text'] text-[#8B6F47]">
            ✨ You have no pending payments. Your spiritual account is in perfect alignment.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-[#CC8800] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] flex items-center gap-2 text-lg">
              <GiCoinsPile className="w-6 h-6 text-[#CC8800]" />
              Amount Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-['MedievalSharp'] text-[#CC8800] mb-2">
              ${totalPending.toFixed(2)}
            </p>
            <p className="text-sm font-['Crimson_Text'] text-[#E8DCC0]">
              {pendingPayments.length} payment{pendingPayments.length !== 1 ? 's' : ''} pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <CardHeader className="pb-3">
            <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0] flex items-center gap-2 text-lg">
              <GiHourglass className="w-6 h-6 text-[#B8860B]" />
              Next Due
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingPayments.length > 0 && (
              <>
                <p className="text-2xl font-['MedievalSharp'] text-[#B8860B] mb-2">
                  {formatDate(pendingPayments[0].dueDate)}
                </p>
                <p className="text-sm font-['Crimson_Text'] text-[#E8DCC0]">
                  {pendingPayments[0].serviceName}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Pending Payments Details */}
      <Card className="border-2 border-[#B8860B] bg-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#F4E8D0]">
            Pending Payments & Payment Plans
          </CardTitle>
          <CardDescription className="font-['Crimson_Text'] text-[#8B6F47]">
            Manage your payment obligations and installment schedules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {pendingPayments.map((payment) => (
            <div
              key={payment._id}
              className="border-2 border-[#8B6F47]/30 rounded-lg p-4 bg-[#2C2416] hover:border-[#B8860B] transition-colors space-y-4"
            >
              {/* Payment Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-['Crimson_Text'] text-[#F4E8D0] font-semibold text-lg">
                    {payment.serviceName}
                  </h4>
                  <p className="font-['Crimson_Text'] text-sm text-[#8B6F47]">
                    {payment.serviceType}
                  </p>
                </div>
                <Badge className={`font-['Crimson_Text'] text-xs flex items-center gap-1 w-fit ${getStatusColor(payment.status)}`}>
                  {getStatusIcon(payment.status)}
                  {payment.status === 'partially_paid' ? 'Partial' : payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </Badge>
              </div>

              {/* Payment Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] mb-1">Total Amount</p>
                  <p className="font-['MedievalSharp'] text-[#B8860B]">
                    ${payment.totalAmount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] mb-1">Amount Due</p>
                  <p className="font-['MedievalSharp'] text-[#CC8800]">
                    ${payment.amountDue.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] mb-1">Amount Paid</p>
                  <p className="font-['MedievalSharp'] text-[#2C5530]">
                    ${payment.amountPaid.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="font-['Crimson_Text'] text-xs text-[#8B6F47] mb-1">Due Date</p>
                  <p className="font-['Crimson_Text'] text-[#F4E8D0]">
                    {formatDate(payment.dueDate)}
                  </p>
                  {payment.overdueBy && (
                    <p className="font-['Crimson_Text'] text-xs text-[#8B0000] mt-1">
                      {payment.overdueBy} days overdue
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-['Crimson_Text'] text-sm text-[#8B6F47]">Payment Progress</span>
                  <span className="font-['MedievalSharp'] text-sm text-[#B8860B]">
                    {getPaymentProgress(payment.amountPaid, payment.totalAmount)}%
                  </span>
                </div>
                <Progress
                  value={getPaymentProgress(payment.amountPaid, payment.totalAmount)}
                  className="h-2 bg-[#1A1A1A] rounded"
                />
              </div>

              {/* Installment Details (if applicable) */}
              {payment.paymentPlanType === 'installment' && payment.installments && payment.installments.length > 0 && (
                <div className="border-t border-[#8B6F47]/20 pt-4">
                  <p className="font-['Crimson_Text'] text-sm text-[#8B6F47] mb-3">
                    Payment Plan: {payment.installments.length} installments
                  </p>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {payment.installments.map((inst) => (
                      <div
                        key={inst.installmentNumber}
                        className="flex items-center justify-between text-xs bg-[#1A1A1A] p-2 rounded border border-[#8B6F47]/20"
                      >
                        <div>
                          <span className="font-['Crimson_Text'] text-[#F4E8D0]">
                            Installment {inst.installmentNumber}
                          </span>
                          <span className="font-['Crimson_Text'] text-[#8B6F47] mx-2">•</span>
                          <span className="font-['Crimson_Text'] text-[#8B6F47]">
                            Due: {formatDate(inst.dueDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-['MedievalSharp'] text-[#B8860B]">
                            ${inst.amount.toFixed(2)}
                          </span>
                          <Badge className={`text-xs font-['Crimson_Text'] ${
                            inst.status === 'paid' ? 'bg-[#2C5530] text-[#F4E8D0]' :
                            inst.status === 'partial' ? 'bg-[#B8860B] text-[#1A1A1A]' :
                            inst.status === 'overdue' ? 'bg-[#8B0000] text-[#F4E8D0]' :
                            'bg-[#8B6F47] text-[#F4E8D0]'
                          }`}>
                            {inst.status.charAt(0).toUpperCase() + inst.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="border-t border-[#8B6F47]/20 pt-4 flex gap-2">
                <Button
                  className="flex-1 bg-[#B8860B] hover:bg-[#CC8800] text-[#1A1A1A] font-['Crimson_Text']"
                >
                  Make Payment
                </Button>
                <Button
                  variant="outline"
                  className="border-[#8B6F47] text-[#8B6F47] hover:bg-[#8B6F47] hover:text-[#1A1A1A] font-['Crimson_Text']"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Information Alert */}
      <Alert className="border-2 border-[#B8860B] bg-[#2C2416] text-[#F4E8D0]">
        <GiHourglass className="h-4 w-4 text-[#B8860B]" />
        <AlertDescription className="font-['Crimson_Text']">
          <strong>Payment Plans:</strong> Services costing more than $200 can be split into installments. Contact the healer to set up a flexible payment schedule aligned with your spiritual journey.
        </AlertDescription>
      </Alert>
    </div>
  );
}
