import { requireAdmin } from '@/lib/auth';
import { AdminAnalyticsDashboard } from '@/components/admin/admin-analytics-dashboard';
import { ServicePerformanceTracking } from '@/components/admin/service-performance-tracking';

export const metadata = {
  title: 'Analytics & Insights | Admin Dashboard',
  description: 'Platform analytics, service performance, and user behavior tracking',
};

export default async function AnalyticsPage() {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#F4E8D0]">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Analytics Dashboard Section */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-[#8B6F47] rounded-full opacity-20" />
            <AdminAnalyticsDashboard />
          </div>

          {/* Divider */}
          <div className="border-t-2 border-[#8B6F47] my-8" />

          {/* Service Performance Section */}
          <div className="relative">
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-[#CC8800] rounded-full opacity-20" />
            <ServicePerformanceTracking />
          </div>
        </div>
      </div>
    </div>
  );
}
