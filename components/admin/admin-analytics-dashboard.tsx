'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { FiTrendingUp, FiUsers, FiShoppingCart, FiDollarSign } from 'react-icons/fi';

// Mock data for analytics
const monthlyMetrics = [
  { month: 'Jan', requests: 24, completions: 20, revenue: 2400, conversions: 18 },
  { month: 'Feb', requests: 32, completions: 28, revenue: 3200, conversions: 24 },
  { month: 'Mar', requests: 28, completions: 24, revenue: 2800, conversions: 22 },
  { month: 'Apr', requests: 36, completions: 32, revenue: 3600, conversions: 28 },
  { month: 'May', requests: 42, completions: 38, revenue: 4200, conversions: 35 },
  { month: 'Jun', requests: 48, completions: 44, revenue: 4800, conversions: 42 },
];

const serviceMetrics = [
  { name: 'Love Spell', value: 1450, percentage: 22 },
  { name: 'Protection Ritual', value: 980, percentage: 15 },
  { name: 'Prosperity Blessing', value: 1220, percentage: 18 },
  { name: 'Healing Ceremony', value: 890, percentage: 13 },
  { name: 'Energy Alignment', value: 1340, percentage: 20 },
  { name: 'Other', value: 620, percentage: 12 },
];

const conversionFunnel = [
  { stage: 'Landing', users: 1000, percentage: 100 },
  { stage: 'Service View', users: 780, percentage: 78 },
  { stage: 'Request', users: 450, percentage: 45 },
  { stage: 'Payment', users: 380, percentage: 38 },
  { stage: 'Complete', users: 320, percentage: 32 },
];

const COLORS = ['#2C5530', '#CC8800', '#8B6F47', '#B8860B', '#C0C0C0', '#4A4A4A'];

const PASTELS = ['#5a8560', '#d9a855', '#a68760', '#c9a855', '#d9c9a8', '#6b6b6b'];

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

function KPICard({ title, value, change, trend, icon }: KPICardProps) {
  return (
    <Card className="border-2 border-[#8B6F47] bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#4A4A4A] mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-[#1A1A1A] mb-2">{value}</h3>
          <div className="flex items-center gap-1">
            <span
              className={`text-xs font-semibold ${
                trend === 'up' ? 'text-[#2C5530]' : trend === 'down' ? 'text-[#8B0000]' : 'text-[#4A4A4A]'
              }`}
            >
              {change}
            </span>
            {trend === 'up' && <FiTrendingUp className="w-3 h-3 text-[#2C5530]" />}
          </div>
        </div>
        <div className="text-3xl text-[#CC8800] opacity-30">{icon}</div>
      </div>
    </Card>
  );
}

export function AdminAnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">Analytics & Insights</h2>
        <p className="text-[#4A4A4A]">Comprehensive platform metrics and performance tracking</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Service Requests"
          value="210"
          change="+12% this month"
          trend="up"
          icon={<FiShoppingCart />}
        />
        <KPICard
          title="Completion Rate"
          value="88%"
          change="+3% from last month"
          trend="up"
          icon={<FiTrendingUp />}
        />
        <KPICard
          title="Active Users"
          value="1,234"
          change="+8% this month"
          trend="up"
          icon={<FiUsers />}
        />
        <KPICard
          title="Total Revenue"
          value="$24,500"
          change="+15% this month"
          trend="up"
          icon={<FiDollarSign />}
        />
      </div>

      {/* Tabs for detailed analytics */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <TabsTrigger
            value="performance"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Performance
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Services
          </TabsTrigger>
          <TabsTrigger
            value="funnel"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Conversion
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Insights
          </TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Monthly Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                <XAxis dataKey="month" stroke="#4A4A4A" />
                <YAxis stroke="#4A4A4A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                    borderRadius: '4px',
                  }}
                  formatter={(value) => [value, '']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#CC8800"
                  name="Requests"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="completions"
                  stroke="#2C5530"
                  name="Completions"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#B8860B"
                  name="Conversions"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyMetrics}>
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
                  <Bar dataKey="revenue" fill="#CC8800" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Completion Rate</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyMetrics}>
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
                  <Bar dataKey="completions" fill="#2C5530" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Revenue by Service</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceMetrics}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name }) => {
                      const item = serviceMetrics.find((m) => m.name === name);
                      return item ? `${name}: ${item.percentage}%` : '';
                    }}
                    outerRadius={100}
                    fill="#8B6F47"
                    dataKey="value"
                  >
                    {serviceMetrics.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F4E8D0',
                      border: '2px solid #8B6F47',
                      borderRadius: '4px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Service Breakdown</h3>
              <div className="space-y-3">
                {serviceMetrics.map((service, index) => (
                  <div key={service.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#1A1A1A] font-medium">{service.name}</span>
                      <Badge className="bg-[#F4E8D0] text-[#1A1A1A] border border-[#8B6F47]">
                        ${service.value.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="w-full bg-[#F4E8D0] rounded-full h-2 border border-[#8B6F47]">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${service.percentage * 2}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#4A4A4A]">{service.percentage}% of total</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Conversion Funnel Tab */}
        <TabsContent value="funnel" className="space-y-6">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-6">Conversion Funnel</h3>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#1A1A1A]">{stage.stage}</span>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#2C5530]">{stage.users.toLocaleString()}</p>
                      <p className="text-xs text-[#4A4A4A]">{stage.percentage}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-[#F4E8D0] rounded-full h-8 border-2 border-[#8B6F47] overflow-hidden">
                    <div
                      className="h-8 bg-linear-to-r transition-all flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        width: `${stage.percentage}%`,
                        backgroundImage: `linear-gradient(to right, ${PASTELS[index % PASTELS.length]} 0%, ${COLORS[index % COLORS.length]} 100%)`,
                      }}
                    >
                      {stage.percentage}%
                    </div>
                  </div>
                  {index < conversionFunnel.length - 1 && (
                    <p className="text-xs text-[#8B0000]">
                      Drop-off: {conversionFunnel[index].users - conversionFunnel[index + 1].users} users
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Insights */}
            <div className="mt-6 p-4 bg-[#E8D8C0] border-l-4 border-[#CC8800] rounded space-y-2">
              <p className="text-sm font-semibold text-[#1A1A1A]">Key Insights:</p>
              <ul className="text-xs text-[#1A1A1A] space-y-1 list-disc list-inside">
                <li>22% drop-off from Service View to Request (primary friction point)</li>
                <li>11% drop-off from Request to Payment (checkout optimization needed)</li>
                <li>16% drop-off from Payment to Complete (delivery/fulfillment issue)</li>
                <li>Overall conversion rate: 32% (target: 40%)</li>
              </ul>
            </div>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-3">Peak Activity Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">8 PM - 10 PM</span>
                  <Badge className="bg-[#2C5530] text-white">45% of traffic</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">10 PM - 12 AM</span>
                  <Badge className="bg-[#CC8800] text-white">28% of traffic</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">6 PM - 8 PM</span>
                  <Badge className="bg-[#B8860B] text-white">18% of traffic</Badge>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-3">User Retention</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Day 1 Retention</span>
                  <Badge className="bg-[#2C5530] text-white">92%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Day 7 Retention</span>
                  <Badge className="bg-[#CC8800] text-white">67%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Day 30 Retention</span>
                  <Badge className="bg-[#B8860B] text-white">38%</Badge>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-3">Top Referral Sources</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Organic Search</span>
                  <Badge className="bg-[#2C5530] text-white">42%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Direct Traffic</span>
                  <Badge className="bg-[#CC8800] text-white">28%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Social Media</span>
                  <Badge className="bg-[#B8860B] text-white">22%</Badge>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-3">Device Distribution</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Mobile</span>
                  <Badge className="bg-[#2C5530] text-white">58%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Desktop</span>
                  <Badge className="bg-[#CC8800] text-white">38%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#F4E8D0] rounded">
                  <span className="text-sm text-[#1A1A1A]">Tablet</span>
                  <Badge className="bg-[#B8860B] text-white">4%</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Recommendations */}
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
                <p className="text-sm font-semibold text-[#1A1A1A]">Optimize Mobile Experience</p>
                <p className="text-xs text-[#4A4A4A] mt-1">
                  58% of traffic is mobile. Ensure checkout is mobile-friendly to reduce drop-off.
                </p>
              </div>
              <div className="p-3 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
                <p className="text-sm font-semibold text-[#1A1A1A]">Improve Service Request Form</p>
                <p className="text-xs text-[#4A4A4A] mt-1">
                  22% drop from service view to request. Simplify form or add help tooltips.
                </p>
              </div>
              <div className="p-3 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
                <p className="text-sm font-semibold text-[#1A1A1A]">Peak Hours Email Campaign</p>
                <p className="text-xs text-[#4A4A4A] mt-1">
                  Send promotional emails at 8 PM when traffic peaks for maximum engagement.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
