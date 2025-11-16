'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FiTrendingUp, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface AnalyticsData {
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  cancelledRequests: number;
  averageCompletionTime: number; // in hours
  completionRate: number; // percentage
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
    averageTime: number; // in hours
    requestCount: number;
  }[];
}

interface AdminRequestAnalyticsProps {
  data: AnalyticsData;
}

export function AdminRequestAnalytics({ data }: AdminRequestAnalyticsProps) {
  const COLORS = ['#2C5530', '#8B6F47', '#CC8800', '#8B0000', '#C0C0C0'];
  const STATUS_COLORS: { [key: string]: string } = {
    pending: '#CC8800',
    in_progress: '#B8860B',
    completed: '#2C5530',
    cancelled: '#8B0000',
    on_hold: '#4A4A4A',
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A] font-['MedievalSharp']">Total Requests</p>
              <p className="text-3xl font-bold text-[#1A1A1A]">{data.totalRequests}</p>
            </div>
            <div className="bg-[#8B6F47]/20 p-3 rounded">
              <FiTrendingUp className="w-6 h-6 text-[#8B6F47]" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A] font-['MedievalSharp']">Completion Rate</p>
              <p className="text-3xl font-bold text-[#2C5530]">{data.completionRate.toFixed(1)}%</p>
            </div>
            <div className="bg-[#2C5530]/20 p-3 rounded">
              <FiCheckCircle className="w-6 h-6 text-[#2C5530]" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A] font-['MedievalSharp']">Avg. Completion Time</p>
              <p className="text-3xl font-bold text-[#8B6F47]">{data.averageCompletionTime.toFixed(1)}h</p>
            </div>
            <div className="bg-[#8B6F47]/20 p-3 rounded">
              <FiClock className="w-6 h-6 text-[#8B6F47]" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A] font-['MedievalSharp']">Pending</p>
              <p className="text-3xl font-bold text-[#CC8800]">{data.pendingRequests}</p>
            </div>
            <div className="bg-[#CC8800]/20 p-3 rounded">
              <FiAlertCircle className="w-6 h-6 text-[#CC8800]" />
            </div>
          </div>
        </Card>
      </div>

      {/* Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
          <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4">
            Requests by Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.requestsByStatus}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.requestsByStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.status] || COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value} requests`}
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '2px solid #8B6F47',
                  borderRadius: '4px',
                }}
                labelStyle={{ color: '#F4E8D0' }}
              />
              <Legend wrapperStyle={{ color: '#1A1A1A' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
          <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4">
            Revenue by Service
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.revenueByService}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#8B6F47" />
              <XAxis
                dataKey="serviceName"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fill: '#1A1A1A', fontSize: 12 }}
              />
              <YAxis tick={{ fill: '#1A1A1A' }} />
              <Tooltip
                formatter={(value: any) => `$${Number(value).toFixed(2)}`}
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '2px solid #8B6F47',
                  borderRadius: '4px',
                }}
                labelStyle={{ color: '#F4E8D0' }}
              />
              <Bar dataKey="revenue" fill="#8B6F47" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
        <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4">
          Request Completion Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.completionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8B6F47" />
            <XAxis dataKey="date" tick={{ fill: '#1A1A1A' }} />
            <YAxis tick={{ fill: '#1A1A1A' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '2px solid #8B6F47',
                borderRadius: '4px',
              }}
              labelStyle={{ color: '#F4E8D0' }}
            />
            <Legend wrapperStyle={{ color: '#1A1A1A' }} />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#2C5530"
              strokeWidth={2}
              dot={{ fill: '#2C5530' }}
              name="Completed"
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#CC8800"
              strokeWidth={2}
              dot={{ fill: '#CC8800' }}
              name="Pending"
            />
            <Line
              type="monotone"
              dataKey="cancelled"
              stroke="#8B0000"
              strokeWidth={2}
              dot={{ fill: '#8B0000' }}
              name="Cancelled"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Service Performance */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
        <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4">
          Service Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#8B6F47]">
                <th className="text-left py-2 px-4 font-['MedievalSharp'] text-[#1A1A1A]">Service</th>
                <th className="text-center py-2 px-4 font-['MedievalSharp'] text-[#1A1A1A]">
                  Total Requests
                </th>
                <th className="text-center py-2 px-4 font-['MedievalSharp'] text-[#1A1A1A]">
                  Completed
                </th>
                <th className="text-center py-2 px-4 font-['MedievalSharp'] text-[#1A1A1A]">
                  Completion %
                </th>
              </tr>
            </thead>
            <tbody>
              {data.requestsByService.map((service, index) => {
                const completionPct =
                  service.count > 0 ? ((service.completed / service.count) * 100).toFixed(1) : '0';
                return (
                  <tr
                    key={`${service.serviceName}-${index}`}
                    className="border-b border-[#8B6F47]/30 hover:bg-[#FFF9E6]"
                  >
                    <td className="py-3 px-4 text-[#1A1A1A]">{service.serviceName}</td>
                    <td className="text-center py-3 px-4 text-[#4A4A4A]">{service.count}</td>
                    <td className="text-center py-3 px-4">
                      <Badge className="bg-[#2C5530] text-[#F4E8D0]">{service.completed}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-24 bg-[#8B6F47]/20 rounded h-2">
                          <div
                            className="bg-[#2C5530] h-2 rounded"
                            style={{ width: `${completionPct}%` }}
                          />
                        </div>
                        <span className="text-[#2C5530] font-semibold">{completionPct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Response Time Data */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
        <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4">
          Admin Response Time Analysis
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.responseTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8B6F47" />
            <XAxis dataKey="timeRange" tick={{ fill: '#1A1A1A' }} />
            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} tick={{ fill: '#1A1A1A' }} />
            <Tooltip
              formatter={(value: any) => `${Number(value).toFixed(1)} hours`}
              contentStyle={{
                backgroundColor: '#1A1A1A',
                border: '2px solid #8B6F47',
                borderRadius: '4px',
              }}
              labelStyle={{ color: '#F4E8D0' }}
            />
            <Bar dataKey="averageTime" fill="#8B6F47" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
