import { ServiceRequest } from '@/lib/db/models/service-request';
import { getAdminServiceRequests } from '@/lib/db/models';
import { subDays, format } from 'date-fns';

interface AnalyticsData {
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  cancelledRequests: number;
  averageCompletionTime: number;
  completionRate: number;
  requestsByService: {
    serviceName: string;
    count: number;
    completed: number;
  }[];
  requestsByStatus: {
    status: string;
    count: number;
    revenue: number;
  }[];
  completionTrend: {
    date: string;
    completed: number;
    pending: number;
    cancelled: number;
  }[];
  revenueByService: {
    serviceName: string;
    revenue: number;
  }[];
  responseTimeData: {
    timeRange: string;
    averageTime: number;
    requestCount: number;
  }[];
}

export async function getRequestAnalytics(): Promise<AnalyticsData> {
  try {
    // Fetch all requests (get first 1000 for analytics)
    const allRequests = await getAdminServiceRequests({}, 1000, 0);

    // Calculate basic metrics
    const totalRequests = allRequests.length;
    const completedRequests = allRequests.filter((r) => r.status === 'completed').length;
    const pendingRequests = allRequests.filter((r) => r.status === 'pending').length;
    const cancelledRequests = allRequests.filter((r) => r.status === 'cancelled').length;
    const completionRate = totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0;

    // Calculate average completion time (in hours)
    let totalCompletionTime = 0;
    let completedCount = 0;
    allRequests.forEach((req) => {
      if (req.status === 'completed' && req.completedAt && req.requestedAt) {
        const timeMs = new Date(req.completedAt).getTime() - new Date(req.requestedAt).getTime();
        totalCompletionTime += timeMs / (1000 * 60 * 60); // Convert to hours
        completedCount++;
      }
    });
    const averageCompletionTime = completedCount > 0 ? totalCompletionTime / completedCount : 0;

    // Group by service
    const serviceMap = new Map<string, { total: number; completed: number }>();
    allRequests.forEach((req) => {
      const serviceName = req.serviceName;
      if (!serviceMap.has(serviceName)) {
        serviceMap.set(serviceName, { total: 0, completed: 0 });
      }
      const stats = serviceMap.get(serviceName)!;
      stats.total++;
      if (req.status === 'completed') {
        stats.completed++;
      }
    });

    const requestsByService = Array.from(serviceMap.entries()).map(([serviceName, stats]) => ({
      serviceName,
      count: stats.total,
      completed: stats.completed,
    }));

    // Group by status with revenue estimation
    const statusMap = new Map<string, { count: number; revenue: number }>();
    const statusList = ['pending', 'in_progress', 'completed', 'cancelled', 'on_hold'];
    statusList.forEach((status) => {
      const requests = allRequests.filter((r) => r.status === status);
      const revenue = requests.reduce((sum, r) => sum + (r.amountPaid || 0), 0);
      statusMap.set(status, { count: requests.length, revenue });
    });

    const requestsByStatus = Array.from(statusMap.entries()).map(([status, data]) => ({
      status,
      count: data.count,
      revenue: data.revenue,
    }));

    // Calculate completion trend (last 7 days)
    const completionTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, 'MMM dd');
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));

      const dayRequests = allRequests.filter(
        (r) =>
          new Date(r.requestedAt) >= dayStart && new Date(r.requestedAt) <= dayEnd
      );

      completionTrend.push({
        date: dateStr,
        completed: dayRequests.filter((r) => r.status === 'completed').length,
        pending: dayRequests.filter((r) => r.status === 'pending').length,
        cancelled: dayRequests.filter((r) => r.status === 'cancelled').length,
      });
    }

    // Revenue by service
    const revenueByServiceMap = new Map<string, number>();
    allRequests.forEach((req) => {
      const serviceName = req.serviceName;
      const current = revenueByServiceMap.get(serviceName) || 0;
      revenueByServiceMap.set(serviceName, current + (req.amountPaid || 0));
    });

    const revenueByService = Array.from(revenueByServiceMap.entries()).map(
      ([serviceName, revenue]) => ({
        serviceName,
        revenue,
      })
    );

    // Response time analysis (by completion time buckets)
    const responseTimeData: Array<{
      timeRange: string;
      averageTime: number;
      requestCount: number;
    }> = [];
    const timeRanges = [
      { label: '< 1 hour', min: 0, max: 1 },
      { label: '1-4 hours', min: 1, max: 4 },
      { label: '4-24 hours', min: 4, max: 24 },
      { label: '> 24 hours', min: 24, max: Infinity },
    ];

    timeRanges.forEach(({ label, min, max }) => {
      const matchingRequests = allRequests.filter((req: ServiceRequest) => {
        if (req.status !== 'completed' || !req.completedAt || !req.requestedAt) return false;
        const timeMs = new Date(req.completedAt).getTime() - new Date(req.requestedAt).getTime();
        const timeHours = timeMs / (1000 * 60 * 60);
        return timeHours >= min && timeHours < max;
      });

      let avgTime = 0;
      if (matchingRequests.length > 0) {
        let totalTime = 0;
        matchingRequests.forEach((req: ServiceRequest) => {
          if (req.completedAt && req.requestedAt) {
            const timeMs = new Date(req.completedAt).getTime() - new Date(req.requestedAt).getTime();
            totalTime += timeMs / (1000 * 60 * 60);
          }
        });
        avgTime = totalTime / matchingRequests.length;
      }

      responseTimeData.push({
        timeRange: label,
        averageTime: avgTime,
        requestCount: matchingRequests.length,
      });
    });

    return {
      totalRequests,
      completedRequests,
      pendingRequests,
      cancelledRequests,
      averageCompletionTime,
      completionRate,
      requestsByService,
      requestsByStatus,
      completionTrend,
      revenueByService,
      responseTimeData,
    };
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    // Return empty analytics data on error
    return {
      totalRequests: 0,
      completedRequests: 0,
      pendingRequests: 0,
      cancelledRequests: 0,
      averageCompletionTime: 0,
      completionRate: 0,
      requestsByService: [],
      requestsByStatus: [],
      completionTrend: [],
      revenueByService: [],
      responseTimeData: [],
    };
  }
}
