import { getCurrentUser } from '@/lib/auth';
import { isAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminRequestAnalytics } from '@/components/admin/admin-request-analytics';
import { getRequestAnalytics } from '@/lib/analytics/request-analytics';

export const metadata = {
  title: 'Request Analytics | Admin Portal',
  description: 'View service request analytics and insights',
};

export default async function RequestAnalyticsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const userIsAdmin = await isAdmin();

  if (!userIsAdmin) {
    redirect('/dashboard');
  }

  const analyticsData = await getRequestAnalytics();

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="bg-[#F4E8D0] border-4 border-[#8B6F47] rounded-sm p-8">
          <h1 className="text-4xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Request Analytics
          </h1>
          <p className="text-[#4A4A4A] font-['Crimson_Text'] text-lg">
            Comprehensive insights into service request performance, completion rates, and revenue
          </p>
        </div>

        {/* Analytics Dashboard */}
        <AdminRequestAnalytics data={analyticsData} />
      </div>
    </div>
  );
}
