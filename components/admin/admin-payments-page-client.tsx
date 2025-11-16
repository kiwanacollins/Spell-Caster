'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminPaymentsDashboard } from './admin-payments-dashboard';
import { AdminTransactionList } from './admin-transaction-list';
import { AdminFinancialReports } from './admin-financial-reports';
import { AdminPricingManagement } from './admin-pricing-management';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FiAlertCircle } from 'react-icons/fi';

interface AdminPaymentsPageClientProps {
  initialTab?: 'dashboard' | 'transactions' | 'reports' | 'pricing';
}

export function AdminPaymentsPageClient({
  initialTab = 'dashboard',
}: AdminPaymentsPageClientProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [error, setError] = useState<string | null>(null);

  // Handlers for payment actions
  const handleRefund = async (transactionId: string, reason: string) => {
    try {
      const response = await fetch('/api/payments/refund-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId,
          reason,
          admin: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process refund');
      }

      // Trigger success notification
      console.log('Refund processed successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process refund';
      setError(message);
      throw err;
    }
  };

  const handleMarkAsPaid = async (transactionId: string) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId,
          status: 'completed',
          markedByAdmin: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to mark payment as paid');
      }

      console.log('Payment marked as paid successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to mark payment as paid';
      setError(message);
      throw err;
    }
  };

  const handleGenerateReceipt = (transactionId: string) => {
    try {
      // Generate receipt and download
      const link = document.createElement('a');
      link.href = `/api/payments/${transactionId}/receipt`;
      link.download = `receipt-${transactionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate receipt';
      setError(message);
    }
  };

  const handleGenerateReport = async (
    reportType: string,
    startDate: Date,
    endDate: Date
  ) => {
    try {
      const response = await fetch('/api/payments/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportType,
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      console.log('Report generated successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate report';
      setError(message);
      throw err;
    }
  };

  const handleExportReport = (reportType: string, format: string) => {
    try {
      const link = document.createElement('a');
      link.href = `/api/payments/reports/export?type=${reportType}&format=${format}`;
      link.download = `report-${reportType}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to export report';
      setError(message);
    }
  };

  const handleUpdatePrice = async (serviceId: string, newPrice: number) => {
    try {
      const response = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          price: newPrice,
          updatedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update service price');
      }

      console.log('Service price updated successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update price';
      setError(message);
      throw err;
    }
  };

  const handleAddService = async (service: any) => {
    try {
      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });

      if (!response.ok) {
        throw new Error('Failed to add service');
      }

      console.log('Service added successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add service';
      setError(message);
      throw err;
    }
  };

  const handleToggleService = async (serviceId: string, isActive: boolean) => {
    try {
      const response = await fetch('/api/services', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          isActive,
          updatedAt: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle service');
      }

      console.log('Service status updated successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to toggle service';
      setError(message);
      throw err;
    }
  };

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert className="border-[#8B0000] bg-[#FFE5E5]">
          <FiAlertCircle className="h-4 w-4 text-[#8B0000]" />
          <AlertDescription className="text-[#8B0000]">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-2 underline text-[#8B0000] hover:opacity-80"
            >
              Dismiss
            </button>
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs Navigation */}
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'dashboard' | 'transactions' | 'reports' | 'pricing')} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <TabsTrigger
            value="dashboard"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="pricing"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Pricing
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <AdminPaymentsDashboard />
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <AdminTransactionList
            onAction={handleGenerateReceipt}
          />
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <AdminFinancialReports
            onGenerateReport={handleGenerateReport}
            onExportReport={handleExportReport}
          />
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <AdminPricingManagement
            onUpdatePrice={handleUpdatePrice}
            onAddService={handleAddService}
            onToggleService={handleToggleService}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
