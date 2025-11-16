'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { FiTrendingUp, FiClock, FiCheckCircle, FiDollarSign } from 'react-icons/fi';

interface ServicePerformanceData {
  serviceId: string;
  serviceName: string;
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  avgCompletionTime: number;
  totalRevenue: number;
  avgRating: number;
  successRate: number;
  trend: number;
}

interface MonthlyServiceData {
  month: string;
  [key: string]: string | number;
}

const mockServicePerformance: ServicePerformanceData[] = [
  {
    serviceId: '1',
    serviceName: 'Love Spell',
    totalRequests: 245,
    completedRequests: 220,
    pendingRequests: 15,
    avgCompletionTime: 7.5,
    totalRevenue: 8750,
    avgRating: 4.8,
    successRate: 89.8,
    trend: 12,
  },
  {
    serviceId: '2',
    serviceName: 'Protection Ritual',
    totalRequests: 189,
    completedRequests: 172,
    pendingRequests: 12,
    avgCompletionTime: 6.2,
    totalRevenue: 6875,
    avgRating: 4.7,
    successRate: 91.0,
    trend: 8,
  },
  {
    serviceId: '3',
    serviceName: 'Prosperity Blessing',
    totalRequests: 213,
    completedRequests: 195,
    pendingRequests: 14,
    avgCompletionTime: 8.1,
    totalRevenue: 7875,
    avgRating: 4.6,
    successRate: 91.5,
    trend: 15,
  },
  {
    serviceId: '4',
    serviceName: 'Healing Ceremony',
    totalRequests: 156,
    completedRequests: 145,
    pendingRequests: 9,
    avgCompletionTime: 5.8,
    totalRevenue: 5850,
    avgRating: 4.9,
    successRate: 92.9,
    trend: 6,
  },
  {
    serviceId: '5',
    serviceName: 'Energy Alignment',
    totalRequests: 198,
    completedRequests: 180,
    pendingRequests: 13,
    avgCompletionTime: 7.2,
    totalRevenue: 6930,
    avgRating: 4.7,
    successRate: 90.9,
    trend: 10,
  },
];

const monthlyServiceTrends: MonthlyServiceData[] = [
  {
    month: 'Jan',
    'Love Spell': 35,
    'Protection Ritual': 28,
    'Prosperity Blessing': 32,
    'Healing Ceremony': 22,
    'Energy Alignment': 28,
  },
  {
    month: 'Feb',
    'Love Spell': 42,
    'Protection Ritual': 35,
    'Prosperity Blessing': 38,
    'Healing Ceremony': 26,
    'Energy Alignment': 32,
  },
  {
    month: 'Mar',
    'Love Spell': 38,
    'Protection Ritual': 32,
    'Prosperity Blessing': 35,
    'Healing Ceremony': 25,
    'Energy Alignment': 30,
  },
  {
    month: 'Apr',
    'Love Spell': 48,
    'Protection Ritual': 38,
    'Prosperity Blessing': 42,
    'Healing Ceremony': 28,
    'Energy Alignment': 35,
  },
  {
    month: 'May',
    'Love Spell': 55,
    'Protection Ritual': 42,
    'Prosperity Blessing': 48,
    'Healing Ceremony': 32,
    'Energy Alignment': 42,
  },
  {
    month: 'Jun',
    'Love Spell': 62,
    'Protection Ritual': 48,
    'Prosperity Blessing': 55,
    'Healing Ceremony': 36,
    'Energy Alignment': 48,
  },
];

const COLORS = ['#2C5530', '#CC8800', '#8B6F47', '#B8860B', '#C0C0C0'];

export function ServicePerformanceTracking() {
  const totalRevenue = mockServicePerformance.reduce((acc, s) => acc + s.totalRevenue, 0);
  const avgSuccessRate = (
    mockServicePerformance.reduce((acc, s) => acc + s.successRate, 0) / mockServicePerformance.length
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">Service Performance</h2>
        <p className="text-[#4A4A4A]">Track requests, completions, and revenue by service type</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Total Requests</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {mockServicePerformance.reduce((acc, s) => acc + s.totalRequests, 0)}
          </p>
          <p className="text-xs text-[#2C5530] mt-1">+8% this month</p>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Completion Rate</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">{avgSuccessRate}%</p>
          <p className="text-xs text-[#2C5530] mt-1">↑ Excellent performance</p>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">${(totalRevenue / 1000).toFixed(1)}k</p>
          <p className="text-xs text-[#2C5530] mt-1">+12% growth</p>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Pending Requests</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">
            {mockServicePerformance.reduce((acc, s) => acc + s.pendingRequests, 0)}
          </p>
          <p className="text-xs text-[#8B0000] mt-1">3 overdue</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <TabsTrigger
            value="table"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Performance Table
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Monthly Trends
          </TabsTrigger>
          <TabsTrigger
            value="breakdown"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Revenue Breakdown
          </TabsTrigger>
        </TabsList>

        {/* Performance Table */}
        <TabsContent value="table" className="space-y-4">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#8B6F47]">
                    <TableHead className="text-[#1A1A1A]">Service Name</TableHead>
                    <TableHead className="text-[#1A1A1A]">Total Requests</TableHead>
                    <TableHead className="text-[#1A1A1A]">Completed</TableHead>
                    <TableHead className="text-[#1A1A1A]">Pending</TableHead>
                    <TableHead className="text-[#1A1A1A]">Avg Time (days)</TableHead>
                    <TableHead className="text-[#1A1A1A]">Success Rate</TableHead>
                    <TableHead className="text-[#1A1A1A]">Revenue</TableHead>
                    <TableHead className="text-[#1A1A1A]">Avg Rating</TableHead>
                    <TableHead className="text-[#1A1A1A]">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockServicePerformance.map((service) => (
                    <TableRow
                      key={service.serviceId}
                      className="border-[#F4E8D0] hover:bg-[#F9F3E8] transition-colors"
                    >
                      <TableCell className="font-medium text-[#1A1A1A]">{service.serviceName}</TableCell>
                      <TableCell className="text-[#1A1A1A]">{service.totalRequests}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#2C5530] text-white">{service.completedRequests}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#F4E8D0] text-[#1A1A1A] border border-[#8B6F47]">
                          {service.pendingRequests}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#1A1A1A]">{service.avgCompletionTime.toFixed(1)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-[#F4E8D0] rounded-full h-2 border border-[#8B6F47]">
                            <div
                              className="h-2 rounded-full bg-[#2C5530]"
                              style={{ width: `${service.successRate}%` }}
                            />
                          </div>
                          <span className="text-xs text-[#1A1A1A] font-semibold">
                            {service.successRate.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#CC8800] font-semibold">
                        ${service.totalRevenue.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {Array(Math.round(service.avgRating))
                            .fill(0)
                            .map((_, i) => (
                              <span key={i} className="text-[#B8860B]">
                                ★
                              </span>
                            ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            service.trend > 10
                              ? 'bg-[#2C5530] text-white'
                              : service.trend > 5
                                ? 'bg-[#CC8800] text-white'
                                : 'bg-[#B8860B] text-white'
                          }`}
                        >
                          <FiTrendingUp className="w-3 h-3 mr-1 inline" />
                          +{service.trend}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Monthly Trends */}
        <TabsContent value="trends" className="space-y-4">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Service Requests by Month</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyServiceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                <XAxis dataKey="month" stroke="#4A4A4A" />
                <YAxis stroke="#4A4A4A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                {['Love Spell', 'Protection Ritual', 'Prosperity Blessing', 'Healing Ceremony', 'Energy Alignment'].map(
                  (service, index) => (
                    <Bar
                      key={service}
                      dataKey={service}
                      fill={COLORS[index % COLORS.length]}
                      radius={[4, 4, 0, 0]}
                    />
                  )
                )}
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Revenue Trend by Service</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyServiceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                <XAxis dataKey="month" stroke="#4A4A4A" />
                <YAxis stroke="#4A4A4A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                {['Love Spell', 'Protection Ritual', 'Prosperity Blessing', 'Healing Ceremony', 'Energy Alignment'].map(
                  (service, index) => (
                    <Line
                      key={service}
                      type="monotone"
                      dataKey={service}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={false}
                    />
                  )
                )}
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Revenue Breakdown */}
        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Revenue per Service</h3>
              <div className="space-y-3">
                {mockServicePerformance
                  .sort((a, b) => b.totalRevenue - a.totalRevenue)
                  .map((service, index) => (
                    <div key={service.serviceId} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-[#1A1A1A]">{service.serviceName}</span>
                        <Badge className="bg-[#F4E8D0] text-[#1A1A1A] border border-[#8B6F47]">
                          ${service.totalRevenue.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="w-full bg-[#F4E8D0] rounded-full h-2 border border-[#8B6F47]">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${(service.totalRevenue / mockServicePerformance[0].totalRevenue) * 100}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="p-3 bg-[#F4E8D0] rounded border-l-4 border-[#2C5530]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1A1A1A] font-medium">Avg Completion Time</span>
                    <Badge className="bg-[#2C5530] text-white">7.0 days</Badge>
                  </div>
                </div>

                <div className="p-3 bg-[#F4E8D0] rounded border-l-4 border-[#CC8800]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1A1A1A] font-medium">Avg Customer Rating</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="text-[#B8860B]">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#F4E8D0] rounded border-l-4 border-[#2C5530]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1A1A1A] font-medium">Avg Revenue per Request</span>
                    <Badge className="bg-[#2C5530] text-white">
                      ${(totalRevenue / mockServicePerformance.reduce((acc, s) => acc + s.totalRequests, 0)).toFixed(2)}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 bg-[#F4E8D0] rounded border-l-4 border-[#CC8800]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1A1A1A] font-medium">Pending Fulfillment</span>
                    <Badge className="bg-[#8B0000] text-white">
                      {mockServicePerformance.reduce((acc, s) => acc + s.pendingRequests, 0)} requests
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
