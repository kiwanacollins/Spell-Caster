import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { AdminPaymentsPageClient } from '@/components/admin/admin-payments-page-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Admin Payments Management Page
 * Provides comprehensive payment and pricing management interface
 * Includes: Dashboard metrics, transaction history, financial reports, pricing management
 */

export const metadata = {
  title: 'Payments Management - Spell Caster Admin',
  description: 'Manage payments, transactions, pricing, and financial reports',
};

export default async function AdminPaymentsPage() {
  // Server-side authentication check
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
          Payments & Monetization
        </h1>
        <p className="text-sm md:text-base text-[#4A4A4A]">
          Manage transactions, financial metrics, pricing, and revenue tracking
        </p>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">
              $12,500
            </div>
            <p className="text-xs text-[#2C5530] mt-1">
              ↑ 12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#CC8800]">
              $1,200
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              3 unpaid transactions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Processed Refunds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#8B0000]">
              $450
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              3.6% refund rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Active Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">
              15
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              All services active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Tabbed Interface */}
      <AdminPaymentsPageClient initialTab="dashboard" />
    </div>
  );
}
