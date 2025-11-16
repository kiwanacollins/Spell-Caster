'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FiDollarSign, FiTrendingUp, FiShoppingCart, FiAlertCircle } from 'react-icons/fi';

interface PaymentMetrics {
  totalRevenue: number;
  pendingAmount: number;
  refundedAmount: number;
  averageOrderValue: number;
  totalTransactions: number;
  completedTransactions: number;
  refundedTransactions: number;
  revenueByService: { [service: string]: number };
  monthlyRevenue: number;
  completionRate: number;
}

interface AdminPaymentsDashboardProps {
  metrics?: PaymentMetrics;
}

export function AdminPaymentsDashboard({ metrics }: AdminPaymentsDashboardProps) {
  // Default metrics if not provided
  const defaultMetrics: PaymentMetrics = {
    totalRevenue: 12500,
    pendingAmount: 1200,
    refundedAmount: 450,
    averageOrderValue: 285,
    totalTransactions: 45,
    completedTransactions: 38,
    refundedTransactions: 3,
    revenueByService: {
      'Binding Spell': 2500,
      'Business Boost': 2200,
      'Protection': 1800,
      'Cleansing': 1200,
      'Love Spells': 2000,
      'Marriage': 1300,
      'Other': 1500,
    },
    monthlyRevenue: 3500,
    completionRate: 84,
  };

  const data = metrics || defaultMetrics;

  // Calculate trends
  const trends = useMemo(() => {
    return {
      revenueGrowth: 12, // 12% month-over-month
      transactionGrowth: 8, // 8% month-over-month
      refundRate: ((data.refundedTransactions / data.totalTransactions) * 100).toFixed(1),
    };
  }, [data]);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-2">
              <FiDollarSign className="w-4 h-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-[#1A1A1A]">
                ${data.totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="w-3 h-3 text-[#2C5530]" />
                <span className="text-xs text-[#2C5530] font-semibold">
                  +{trends.revenueGrowth}% this month
                </span>
              </div>
              <p className="text-xs text-[#4A4A4A]">Monthly: ${data.monthlyRevenue}</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Amount */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-2">
              <FiAlertCircle className="w-4 h-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-[#CC8800]">
                ${data.pendingAmount.toLocaleString()}
              </p>
              <p className="text-xs text-[#4A4A4A]">Awaiting payment</p>
            </div>
          </CardContent>
        </Card>

        {/* Refunded Amount */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-2">
              <FiShoppingCart className="w-4 h-4" />
              Refunded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-[#8B0000]">
                ${data.refundedAmount.toLocaleString()}
              </p>
              <p className="text-xs text-[#4A4A4A]">
                {trends.refundRate}% refund rate
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-[#1A1A1A] flex items-center gap-2">
              <FiDollarSign className="w-4 h-4" />
              Avg Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-[#1A1A1A]">
                ${data.averageOrderValue}
              </p>
              <p className="text-xs text-[#4A4A4A]">Per transaction</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Stats and Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Stats */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Transaction Statistics
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              Overview of transaction activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Total Transactions */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#1A1A1A] font-semibold">
                  Total Transactions
                </span>
                <Badge className="bg-[#8B6F47] text-white">
                  {data.totalTransactions}
                </Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            {/* Completed Transactions */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#1A1A1A] font-semibold">
                  Completed
                </span>
                <Badge className="bg-[#2C5530] text-white">
                  {data.completedTransactions}
                </Badge>
              </div>
              <Progress
                value={data.completionRate}
                className="h-2"
              />
              <p className="text-xs text-[#4A4A4A]">
                {data.completionRate}% completion rate
              </p>
            </div>

            {/* Refunded Transactions */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#1A1A1A] font-semibold">
                  Refunded
                </span>
                <Badge className="bg-[#8B0000] text-white">
                  {data.refundedTransactions}
                </Badge>
              </div>
              <Progress
                value={(data.refundedTransactions / data.totalTransactions) * 100}
                className="h-2"
              />
              <p className="text-xs text-[#4A4A4A]">
                {trends.refundRate}% of total
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Service */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Revenue by Service
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              Top performing services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(data.revenueByService)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([service, amount]) => {
                const percentage =
                  (amount / data.totalRevenue) * 100;
                return (
                  <div key={service} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#1A1A1A] font-medium">
                        {service}
                      </span>
                      <Badge
                        variant="outline"
                        className="border-[#8B6F47] text-[#8B6F47]"
                      >
                        {percentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <Progress value={percentage} className="h-1.5" />
                    <p className="text-xs text-[#4A4A4A]">
                      ${amount.toLocaleString()}
                    </p>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            Payment Overview
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            Key financial metrics at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border-2 border-[#8B6F47] rounded p-3">
              <p className="text-xs text-[#4A4A4A] font-semibold">
                Conversion Rate
              </p>
              <p className="text-2xl font-bold text-[#1A1A1A] mt-1">
                {((data.completedTransactions / data.totalTransactions) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-[#666] mt-1">
                {data.completedTransactions} of {data.totalTransactions} completed
              </p>
            </div>

            <div className="bg-white border-2 border-[#8B6F47] rounded p-3">
              <p className="text-xs text-[#4A4A4A] font-semibold">
                Monthly Average
              </p>
              <p className="text-2xl font-bold text-[#1A1A1A] mt-1">
                ${(data.monthlyRevenue / 4).toFixed(0)}
              </p>
              <p className="text-xs text-[#666] mt-1">
                Per week estimate
              </p>
            </div>

            <div className="bg-white border-2 border-[#8B6F47] rounded p-3">
              <p className="text-xs text-[#4A4A4A] font-semibold">
                Outstanding Balance
              </p>
              <p className="text-2xl font-bold text-[#CC8800] mt-1">
                ${data.pendingAmount.toLocaleString()}
              </p>
              <p className="text-xs text-[#666] mt-1">
                Requires action
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
