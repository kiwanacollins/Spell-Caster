'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  ComposedChart,
} from 'recharts';
import { FiArrowDown, FiTrendingUp } from 'react-icons/fi';

interface FunnelStage {
  stage: string;
  users: number;
  percentage: number;
  dropOff: number;
  avgTimeSpent: number;
  previousStage: string;
}

interface FunnelTrend {
  week: string;
  landing: number;
  serviceView: number;
  requestSubmit: number;
  checkout: number;
  completion: number;
}

const funnelStages: FunnelStage[] = [
  {
    stage: 'Landing',
    users: 10000,
    percentage: 100,
    dropOff: 0,
    avgTimeSpent: 2.3,
    previousStage: 'N/A',
  },
  {
    stage: 'Service Browsing',
    users: 7800,
    percentage: 78,
    dropOff: 2200,
    avgTimeSpent: 4.5,
    previousStage: 'Landing',
  },
  {
    stage: 'Service Details',
    users: 4500,
    percentage: 45,
    dropOff: 3300,
    avgTimeSpent: 6.2,
    previousStage: 'Service Browsing',
  },
  {
    stage: 'Request Submission',
    users: 3800,
    percentage: 38,
    dropOff: 700,
    avgTimeSpent: 5.8,
    previousStage: 'Service Details',
  },
  {
    stage: 'Checkout',
    users: 3200,
    percentage: 32,
    dropOff: 600,
    avgTimeSpent: 3.1,
    previousStage: 'Request Submission',
  },
  {
    stage: 'Payment Confirmation',
    users: 3000,
    percentage: 30,
    dropOff: 200,
    avgTimeSpent: 2.8,
    previousStage: 'Checkout',
  },
];

const weeklyFunnelTrends: FunnelTrend[] = [
  { week: 'W1', landing: 1420, serviceView: 1108, requestSubmit: 640, checkout: 512, completion: 480 },
  { week: 'W2', landing: 1580, serviceView: 1232, requestSubmit: 711, checkout: 569, completion: 533 },
  { week: 'W3', landing: 1650, serviceView: 1287, requestSubmit: 743, checkout: 594, completion: 556 },
  { week: 'W4', landing: 1750, serviceView: 1365, requestSubmit: 788, checkout: 630, completion: 590 },
];

const funnelOptimizationTips = [
  {
    stage: 'Landing → Browsing',
    dropOff: '22%',
    reason: 'Users not finding services interesting',
    solution: 'Improve hero section CTA clarity and add service preview cards',
  },
  {
    stage: 'Browsing → Details',
    dropOff: '42%',
    reason: 'Service listings not compelling enough',
    solution: 'Add customer testimonials, ratings, and success rate badges',
  },
  {
    stage: 'Details → Request',
    dropOff: '15%',
    reason: 'Form complexity and information overload',
    solution: 'Simplify request form with progressive disclosure',
  },
  {
    stage: 'Request → Checkout',
    dropOff: '16%',
    reason: 'Unexpected costs or payment friction',
    solution: 'Add transparent pricing, multiple payment methods',
  },
  {
    stage: 'Checkout → Confirmation',
    dropOff: '6%',
    reason: 'Payment processing issues or technical errors',
    solution: 'Improve error handling and add payment retry logic',
  },
];

export function ConversionFunnelTracking() {
  const totalDropOff = funnelStages[funnelStages.length - 1].dropOff;
  const totalConversion = (
    (funnelStages[funnelStages.length - 1].users / funnelStages[0].users) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">Conversion Funnel Tracking</h2>
        <p className="text-[#4A4A4A]">Detailed conversion pipeline analysis and optimization opportunities</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Overall Conversion Rate</p>
          <p className="text-3xl font-bold text-[#1A1A1A]">{totalConversion}%</p>
          <p className="text-xs text-[#2C5530] mt-1">Target: 35% (+5%)</p>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Total Drop-offs</p>
          <p className="text-3xl font-bold text-[#1A1A1A]">7,000</p>
          <p className="text-xs text-[#8B0000] mt-1">70% of visitors</p>
        </Card>

        <Card className="border-2 border-[#8B6F47] bg-white p-4">
          <p className="text-sm text-[#4A4A4A] mb-1">Biggest Drop-off</p>
          <p className="text-3xl font-bold text-[#1A1A1A]">42%</p>
          <p className="text-xs text-[#8B0000] mt-1">Browsing → Details</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="funnel" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <TabsTrigger
            value="funnel"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Funnel Visualization
          </TabsTrigger>
          <TabsTrigger
            value="analysis"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Drop-off Analysis
          </TabsTrigger>
          <TabsTrigger
            value="trends"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Weekly Trends
          </TabsTrigger>
          <TabsTrigger
            value="optimize"
            className="data-[state=active]:bg-[#E8D8C0] data-[state=active]:text-[#1A1A1A]"
          >
            Optimization
          </TabsTrigger>
        </TabsList>

        {/* Funnel Visualization */}
        <TabsContent value="funnel" className="space-y-6">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-6">Sales Funnel Pipeline</h3>
            <div className="space-y-3">
              {funnelStages.map((stage, index) => {
                const width = (stage.percentage * 3) + 100;
                const prevStage = index > 0 ? funnelStages[index - 1] : null;
                return (
                  <div key={stage.stage} className="space-y-1">
                    {/* Stage Label */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#1A1A1A]">{stage.stage}</span>
                        <Badge className="bg-[#F4E8D0] text-[#1A1A1A] border border-[#8B6F47]">
                          {stage.users.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#CC8800]">{stage.percentage}%</p>
                        {stage.dropOff > 0 && (
                          <p className="text-xs text-[#8B0000]">↓ {stage.dropOff.toLocaleString()} drop</p>
                        )}
                      </div>
                    </div>

                    {/* Funnel Bar */}
                    <div className="flex items-center gap-2">
                      <div
                        className="h-10 rounded transition-all"
                        style={{
                          width: `${stage.percentage * 3}%`,
                          backgroundColor: index === 0 ? '#2C5530' : `#${(200 - index * 30).toString(16)}${(200 - index * 30).toString(16)}${(200 - index * 30).toString(16)}`,
                          background: `linear-gradient(90deg, #2C5530 0%, #CC8800 100%)`,
                          opacity: 1 - index * 0.08,
                        }}
                      />
                      <span className="text-xs text-[#4A4A4A]">{stage.avgTimeSpent}min</span>
                    </div>

                    {/* Drop-off Info */}
                    {prevStage && (
                      <div className="text-xs text-[#8B0000] ml-2">
                        <FiArrowDown className="inline w-3 h-3 mr-1" />
                        Drop-off: {(((prevStage.users - stage.users) / prevStage.users) * 100).toFixed(1)}% (
                        {(prevStage.users - stage.users).toLocaleString()} users)
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
              <p className="text-sm font-semibold text-[#1A1A1A]">Funnel Summary</p>
              <p className="text-xs text-[#4A4A4A] mt-1">
                Out of {funnelStages[0].users.toLocaleString()} initial visitors,{' '}
                {funnelStages[funnelStages.length - 1].users.toLocaleString()} completed the journey (
                {totalConversion}%). Largest drop occurs at Browsing → Details with 42% attrition.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Drop-off Analysis */}
        <TabsContent value="analysis" className="space-y-6">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Stage-by-Stage Drop-off</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={funnelStages.map((s) => ({
                  stage: s.stage.split(' ')[0],
                  users: s.users,
                  dropOff: s.dropOff,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                <XAxis dataKey="stage" stroke="#4A4A4A" />
                <YAxis stroke="#4A4A4A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                <Bar dataKey="users" fill="#2C5530" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dropOff" fill="#8B0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Drop-off Rate by Stage</h3>
              <div className="space-y-2">
                {funnelStages.slice(1).map((stage, index) => {
                  const prevStage = funnelStages[index];
                  const dropOffRate = ((( prevStage.users - stage.users) / prevStage.users) * 100).toFixed(1);
                  const isHighDropOff = parseFloat(dropOffRate) > 20;
                  return (
                    <div key={stage.stage} className={`p-3 rounded border-l-4 ${isHighDropOff ? 'bg-[#FFE8E8] border-[#8B0000]' : 'bg-[#E8F4E8] border-[#2C5530]'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-[#1A1A1A]">
                          {prevStage.stage} → {stage.stage}
                        </span>
                        <Badge className={`${isHighDropOff ? 'bg-[#8B0000] text-white' : 'bg-[#2C5530] text-white'}`}>
                          {dropOffRate}%
                        </Badge>
                      </div>
                      <p className="text-xs text-[#4A4A4A]">
                        {(prevStage.users - stage.users).toLocaleString()} users lost
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="border-2 border-[#8B6F47] bg-white p-6">
              <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Time Spent by Stage</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={funnelStages}>
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
                  <Bar dataKey="avgTimeSpent" fill="#B8860B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </TabsContent>

        {/* Weekly Trends */}
        <TabsContent value="trends" className="space-y-6">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Funnel Performance Over Time</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={weeklyFunnelTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
                <XAxis dataKey="week" stroke="#4A4A4A" />
                <YAxis stroke="#4A4A4A" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                    borderRadius: '4px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="landing" stroke="#2C5530" strokeWidth={2} name="Landing" />
                <Line type="monotone" dataKey="serviceView" stroke="#CC8800" strokeWidth={2} name="Service View" />
                <Line type="monotone" dataKey="requestSubmit" stroke="#8B6F47" strokeWidth={2} name="Request" />
                <Line type="monotone" dataKey="checkout" stroke="#B8860B" strokeWidth={2} name="Checkout" />
                <Line type="monotone" dataKey="completion" stroke="#4A4A4A" strokeWidth={2} name="Completion" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Optimization */}
        <TabsContent value="optimize" className="space-y-6">
          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-4">Optimization Recommendations</h3>
            <div className="space-y-3">
              {funnelOptimizationTips.map((tip, index) => (
                <div key={tip.stage} className="p-4 bg-[#E8D8C0] rounded border-l-4 border-[#CC8800]">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">{tip.stage}</p>
                      <p className="text-xs text-[#4A4A4A] mt-1">Drop-off rate: <span className="text-[#8B0000] font-bold">{tip.dropOff}</span></p>
                    </div>
                    <Badge className="bg-[#8B0000] text-white">Priority #{index + 1}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-[#1A1A1A] mb-1">Why:</p>
                      <p className="text-[#4A4A4A]">{tip.reason}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] mb-1">Fix:</p>
                      <p className="text-[#4A4A4A]">{tip.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-2 border-[#8B6F47] bg-white p-6">
            <h3 className="font-['MedievalSharp'] text-[#1A1A1A] mb-3">Expected Impact</h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#E8F4E8] rounded border-l-4 border-[#2C5530]">
                <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Scenario: Reduce Browsing → Details drop-off from 42% to 25%</p>
                <p className="text-xs text-[#2C5530]">
                  <FiTrendingUp className="inline w-3 h-3 mr-1" />
                  <strong>Impact:</strong> +3,825 additional users reaching details page (+42% improvement)
                </p>
              </div>

              <div className="p-3 bg-[#E8F4E8] rounded border-l-4 border-[#2C5530]">
                <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Scenario: Reduce Request → Checkout drop-off from 16% to 10%</p>
                <p className="text-xs text-[#2C5530]">
                  <FiTrendingUp className="inline w-3 h-3 mr-1" />
                  <strong>Impact:</strong> +456 additional completed transactions (+15% revenue increase)
                </p>
              </div>

              <div className="p-3 bg-[#E8F4E8] rounded border-l-4 border-[#2C5530]">
                <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Scenario: Implement all recommendations</p>
                <p className="text-xs text-[#2C5530]">
                  <FiTrendingUp className="inline w-3 h-3 mr-1" />
                  <strong>Impact:</strong> Conversion rate from 30% to 42% (+40% overall improvement)
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
