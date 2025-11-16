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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts';
import { FiZap, FiAtSign, FiClock, FiTarget } from 'react-icons/fi';

interface UserJourneyStage {
  stage: string;
  users: number;
  avgTimeSpent: number;
  conversionRate: number;
  bounceRate: number;
  nextAction: string;
}

interface UserSegment {
  segment: string;
  users: number;
  avgOrderValue: number;
  conversionRate: number;
  retentionRate: number;
  lifetime: number;
}

interface UserBehaviorData {
  day: string;
  sessions: number;
  avgSessionDuration: number;
  pageViews: number;
  bounceRate: number;
  newUsers: number;
}

const userJourneyData: UserJourneyStage[] = [
  {
    stage: 'Landing Page',
    users: 1000,
    avgTimeSpent: 2.3,
    conversionRate: 78,
    bounceRate: 22,
    nextAction: 'Browse Services',
  },
  {
    stage: 'Service Browse',
    users: 780,
    avgTimeSpent: 4.5,
    conversionRate: 57.7,
    bounceRate: 20,
    nextAction: 'View Service Detail',
  },
  {
    stage: 'Service Detail',
    users: 450,
    avgTimeSpent: 6.2,
    conversionRate: 84.4,
    bounceRate: 8,
    nextAction: 'Request Service',
  },
  {
    stage: 'Service Request',
    users: 380,
    avgTimeSpent: 5.8,
    conversionRate: 84.2,
    bounceRate: 12,
    nextAction: 'Checkout',
  },
  {
    stage: 'Checkout',
    users: 320,
    avgTimeSpent: 3.1,
    conversionRate: 100,
    bounceRate: 0,
    nextAction: 'Confirmation',
  },
];

const userSegments: UserSegment[] = [
  {
    segment: 'First-Time Buyers',
    users: 245,
    avgOrderValue: 89.5,
    conversionRate: 32,
    retentionRate: 45,
    lifetime: 2,
  },
  {
    segment: 'Repeat Customers',
    users: 156,
    avgOrderValue: 145.0,
    conversionRate: 68,
    retentionRate: 82,
    lifetime: 8,
  },
  {
    segment: 'VIP/High-Value',
    users: 42,
    avgOrderValue: 325.0,
    conversionRate: 92,
    retentionRate: 95,
    lifetime: 18,
  },
  {
    segment: 'Window Shoppers',
    users: 523,
    avgOrderValue: 0,
    conversionRate: 0,
    retentionRate: 12,
    lifetime: 0.5,
  },
  {
    segment: 'Inactive',
    users: 268,
    avgOrderValue: 0,
    conversionRate: 0,
    retentionRate: 5,
    lifetime: 0,
  },
];

const behaviorTimeline: UserBehaviorData[] = [
  { day: 'Mon', sessions: 520, avgSessionDuration: 4.2, pageViews: 2340, bounceRate: 18, newUsers: 145 },
  { day: 'Tue', sessions: 580, avgSessionDuration: 4.5, pageViews: 2610, bounceRate: 16, newUsers: 168 },
  { day: 'Wed', sessions: 620, avgSessionDuration: 5.1, pageViews: 2890, bounceRate: 14, newUsers: 192 },
  { day: 'Thu', sessions: 680, avgSessionDuration: 5.3, pageViews: 3120, bounceRate: 15, newUsers: 215 },
  { day: 'Fri', sessions: 750, avgSessionDuration: 5.8, pageViews: 3450, bounceRate: 12, newUsers: 268 },
  { day: 'Sat', sessions: 890, avgSessionDuration: 6.2, pageViews: 4120, bounceRate: 10, newUsers: 342 },
  { day: 'Sun', sessions: 920, avgSessionDuration: 6.5, pageViews: 4380, bounceRate: 11, newUsers: 358 },
];

const COLORS = ['#2C5530', '#CC8800', '#8B6F47', '#B8860B', '#C0C0C0'];

export function UserBehaviorAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">User Behavior Analytics</h2>
        <p className="text-[#4A4A4A]">Track user journeys, segment analysis, and behavior patterns</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A] mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">4,960</p>
              <p className="text-xs text-[#2C5530] mt-1">+18% this week</p>
            </div>
            <FiZap className="text-2xl text-[#CC8800] opacity-30" />
          </div>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A] mb-1">Avg Session Duration</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">5.5 min</p>
              <p className="text-xs text-[#2C5530] mt-1">+12% engagement</p>
            </div>
            <FiClock className="text-2xl text-[#CC8800] opacity-30" />
          </div>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A] mb-1">Avg Bounce Rate</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">14.3%</p>
              <p className="text-xs text-[#2C5530] mt-1">↓ Improving</p>
            </div>
            <FiAtSign className="text-2xl text-[#CC8800] opacity-30" />
          </div>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#4A4A4A] mb-1">Active Users</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">1,234</p>
              <p className="text-xs text-[#2C5530] mt-1">This month</p>
            </div>
            <FiTarget className="text-2xl text-[#CC8800] opacity-30" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="journey" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <TabsTrigger
            value="journey"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            User Journey
          </TabsTrigger>
          <TabsTrigger
            value="segments"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Segments
          </TabsTrigger>
          <TabsTrigger
            value="behavior"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Behavior Trends
          </TabsTrigger>
        </TabsList>

        {/* User Journey */}
        <TabsContent value="journey" className="space-y-6">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Customer Journey Map</h3>
            <div className="space-y-4">
              {userJourneyData.map((stage, index) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2C5530] text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">{stage.stage}</p>
                        <p className="text-xs text-[#4A4A4A]">
                          {stage.users.toLocaleString()} users • {stage.avgTimeSpent} min avg
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#CC8800]">{stage.users.toLocaleString()}</p>
                      <p className="text-xs text-[#4A4A4A]">Users</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-2">
                    <div className="flex-1">
                      <div className="text-xs text-[#4A4A4A] mb-1">Conversion: {stage.conversionRate}%</div>
                      <div className="w-full bg-[#F4E8D0] rounded-full h-2 border border-[#8B6F47]">
                        <div
                          className="h-2 rounded-full bg-[#2C5530]"
                          style={{ width: `${stage.conversionRate}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-[#4A4A4A] mb-1">Bounce: {stage.bounceRate}%</div>
                      <div className="w-full bg-[#F4E8D0] rounded-full h-2 border border-[#8B6F47]">
                        <div
                          className="h-2 rounded-full bg-[#8B0000]"
                          style={{ width: `${stage.bounceRate}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {index < userJourneyData.length - 1 && (
                    <div className="flex items-center justify-between mb-3 p-2 bg-[#F4E8D0] rounded border-l-4 border-[#CC8800]">
                      <span className="text-xs text-[#1A1A1A]">Next Step: {stage.nextAction}</span>
                      <span className="text-xs font-bold text-[#CC8800]">
                        {Math.round((userJourneyData[index + 1].users / stage.users) * 100)}% continue
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Time Spent by Stage</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={userJourneyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                  <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} stroke="#4A4A4A" />
                  <YAxis stroke="#4A4A4A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F4E8D0',
                      border: '2px solid #8B6F47',
                      borderRadius: '4px',
                    }}
                  />
                  <Bar dataKey="avgTimeSpent" fill="#2C5530" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Drop-off Analysis</h3>
              <div className="space-y-3">
                {userJourneyData.slice(0, -1).map((stage, index) => {
                  const nextStage = userJourneyData[index + 1];
                  const dropOff = stage.users - nextStage.users;
                  const dropOffRate = ((dropOff / stage.users) * 100).toFixed(1);
                  return (
                    <div key={stage.stage} className="p-2 bg-[#F4E8D0] rounded border-l-4 border-[#8B0000]">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[#1A1A1A]">
                          {stage.stage} → {nextStage.stage}
                        </span>
                        <Badge className="bg-[#8B0000] text-white">
                          {dropOff} users ({dropOffRate}%)
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* User Segments */}
        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">User Segments Overview</h3>
              <div className="space-y-3">
                {userSegments.map((segment, index) => (
                  <div key={segment.segment} className="p-3 bg-[#F4E8D0] rounded border-l-4" style={{ borderLeftColor: COLORS[index % COLORS.length] }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-[#1A1A1A]">{segment.segment}</span>
                      <Badge className="bg-[#E8D8C0] text-[#1A1A1A] border border-[#8B6F47]">
                        {segment.users} users
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-[#4A4A4A]">Conversion</p>
                        <p className="font-bold text-[#1A1A1A]">{segment.conversionRate}%</p>
                      </div>
                      <div>
                        <p className="text-[#4A4A4A]">AOV</p>
                        <p className="font-bold text-[#CC8800]">${segment.avgOrderValue.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-[#4A4A4A]">Retention</p>
                        <p className="font-bold text-[#2C5530]">{segment.retentionRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Segment Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                  <XAxis dataKey="conversionRate" name="Conversion Rate (%)" stroke="#4A4A4A" />
                  <YAxis dataKey="avgOrderValue" name="AOV ($)" stroke="#4A4A4A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F4E8D0',
                      border: '2px solid #8B6F47',
                      borderRadius: '4px',
                    }}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                  <Scatter name="User Segments" data={userSegments} fill="#2C5530" />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Detailed Segment Metrics</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#8B6F47]">
                    <TableHead className="text-[#1A1A1A]">Segment</TableHead>
                    <TableHead className="text-[#1A1A1A]">Users</TableHead>
                    <TableHead className="text-[#1A1A1A]">Avg Order Value</TableHead>
                    <TableHead className="text-[#1A1A1A]">Conversion</TableHead>
                    <TableHead className="text-[#1A1A1A]">Retention</TableHead>
                    <TableHead className="text-[#1A1A1A]">Lifetime (months)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userSegments.map((segment) => (
                    <TableRow
                      key={segment.segment}
                      className="border-[#F4E8D0] hover:bg-[#F9F3E8] transition-colors"
                    >
                      <TableCell className="font-medium text-[#1A1A1A]">{segment.segment}</TableCell>
                      <TableCell className="text-[#1A1A1A]">{segment.users}</TableCell>
                      <TableCell className="text-[#CC8800] font-semibold">${segment.avgOrderValue.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className="bg-[#2C5530] text-white">{segment.conversionRate}%</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-[#B8860B] text-white">{segment.retentionRate}%</Badge>
                      </TableCell>
                      <TableCell className="text-[#1A1A1A]">{segment.lifetime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Behavior Trends */}
        <TabsContent value="behavior" className="space-y-6">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Weekly Behavior Trends</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={behaviorTimeline}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2C5530" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2C5530" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                <XAxis dataKey="day" stroke="#4A4A4A" />
                <YAxis stroke="#4A4A4A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                    borderRadius: '4px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#2C5530"
                  fillOpacity={1}
                  fill="url(#colorSessions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Engagement Metrics</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={behaviorTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                  <XAxis dataKey="day" stroke="#4A4A4A" />
                  <YAxis stroke="#4A4A4A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F4E8D0',
                      border: '2px solid #8B6F47',
                      borderRadius: '4px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgSessionDuration"
                    stroke="#CC8800"
                    name="Avg Duration (min)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="bounceRate"
                    stroke="#8B0000"
                    name="Bounce Rate (%)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">New User Acquisition</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={behaviorTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                  <XAxis dataKey="day" stroke="#4A4A4A" />
                  <YAxis stroke="#4A4A4A" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F4E8D0',
                      border: '2px solid #8B6F47',
                      borderRadius: '4px',
                    }}
                  />
                  <Bar dataKey="newUsers" fill="#B8860B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Insights */}
      <Card className="border-2 border-[#8B6F47] bg-white p-6">
        <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
            <p className="text-sm font-semibold text-[#1A1A1A]">Service Detail Page is a Conversion Hub</p>
            <p className="text-xs text-[#4A4A4A] mt-1">
              84.4% conversion rate from service detail. This is your highest-converting page.
            </p>
          </div>
          <div className="p-3 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
            <p className="text-sm font-semibold text-[#1A1A1A]">Repeat Customers Drive Revenue</p>
            <p className="text-xs text-[#4A4A4A] mt-1">
              Repeat customers have 82% retention and 62% higher AOV. Focus on retention strategy.
            </p>
          </div>
          <div className="p-3 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
            <p className="text-sm font-semibold text-[#1A1A1A]">Weekend Traffic Surge</p>
            <p className="text-xs text-[#4A4A4A] mt-1">
              Saturday/Sunday see 38% more sessions. Align promotional campaigns with weekends.
            </p>
          </div>
          <div className="p-3 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
            <p className="text-sm font-semibold text-[#1A1A1A]">Window Shoppers Need Nurturing</p>
            <p className="text-xs text-[#4A4A4A] mt-1">
              42% of users are window shoppers (0 conversions). Consider retargeting campaigns.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
