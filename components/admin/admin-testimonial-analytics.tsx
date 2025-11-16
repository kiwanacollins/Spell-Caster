'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TestimonialStats {
  totalTestimonials: number;
  averageRating: number;
  approvalRate: number;
  featuredCount: number;
}

interface ServiceTestimonialData {
  service: string;
  count: number;
  avgRating: number;
  revenue: number;
}

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

interface AdminTestimonialAnalyticsProps {
  stats?: TestimonialStats;
  serviceData?: ServiceTestimonialData[];
  ratingDistribution?: RatingDistribution[];
}

const mockStats: TestimonialStats = {
  totalTestimonials: 47,
  averageRating: 4.6,
  approvalRate: 85,
  featuredCount: 8,
};

const mockServiceData: ServiceTestimonialData[] = [
  { service: 'Binding Spell', count: 12, avgRating: 4.8, revenue: 4200 },
  { service: 'Business Boost', count: 8, avgRating: 4.7, revenue: 2392 },
  { service: 'Marriage', count: 7, avgRating: 4.9, revenue: 3150 },
  { service: 'Protection', count: 6, avgRating: 4.5, revenue: 1800 },
  { service: 'Cleansing', count: 5, avgRating: 4.4, revenue: 975 },
  { service: 'Wealth Flow', count: 4, avgRating: 4.6, revenue: 1396 },
  { service: 'Other', count: 5, avgRating: 4.3, revenue: 1495 },
];

const mockRatingDistribution: RatingDistribution[] = [
  { rating: 5, count: 32, percentage: 68 },
  { rating: 4, count: 10, percentage: 21 },
  { rating: 3, count: 4, percentage: 9 },
  { rating: 2, count: 1, percentage: 2 },
  { rating: 1, count: 0, percentage: 0 },
];

const monthlyData = [
  { month: 'Jan', testimonials: 3, approved: 3, featured: 1 },
  { month: 'Feb', testimonials: 4, approved: 3, featured: 1 },
  { month: 'Mar', testimonials: 5, approved: 4, featured: 1 },
  { month: 'Apr', testimonials: 6, approved: 5, featured: 2 },
  { month: 'May', testimonials: 8, approved: 7, featured: 2 },
  { month: 'Jun', testimonials: 12, approved: 10, featured: 3 },
];

const COLORS = ['#2C5530', '#CC8800', '#8B6F47', '#C0C0C0', '#8B0000'];

export function AdminTestimonialAnalytics({
  stats = mockStats,
  serviceData = mockServiceData,
  ratingDistribution = mockRatingDistribution,
}: AdminTestimonialAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">Total Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[#1A1A1A]">{stats.totalTestimonials}</div>
            <p className="text-xs text-[#666] mt-1">Video submissions</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">Avg Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-semibold text-[#B8860B]">{stats.averageRating}</div>
              <span className="text-xl">⭐</span>
            </div>
            <p className="text-xs text-[#666] mt-1">Out of 5 stars</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[#2C5530]">{stats.approvalRate}%</div>
            <Progress value={stats.approvalRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-[#CC8800]">{stats.featuredCount}</div>
            <p className="text-xs text-[#666] mt-1">Premium testimonials</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Testimonials by Service */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Testimonials by Service
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">Top performing services</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#8B6F47" opacity={0.3} />
                <XAxis dataKey="service" stroke="#4A4A4A" style={{ fontSize: '12px' }} />
                <YAxis stroke="#4A4A4A" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                  }}
                />
                <Bar dataKey="count" fill="#2C5530" name="Testimonials" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Distribution */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Rating Distribution
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">Client satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ratingDistribution as any}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ rating, percentage }: any) => `${rating}★ ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                  }}
                  formatter={(value) => `${value} testimonials`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            Testimonial Trends
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            6-month submission and approval history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#8B6F47" opacity={0.3} />
              <XAxis dataKey="month" stroke="#4A4A4A" style={{ fontSize: '12px' }} />
              <YAxis stroke="#4A4A4A" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#F4E8D0',
                  border: '2px solid #8B6F47',
                }}
              />
              <Legend wrapperStyle={{ color: '#4A4A4A' }} />
              <Line
                type="monotone"
                dataKey="testimonials"
                stroke="#2C5530"
                strokeWidth={2}
                dot={{ fill: '#2C5530', r: 4 }}
                name="Submitted"
              />
              <Line
                type="monotone"
                dataKey="approved"
                stroke="#CC8800"
                strokeWidth={2}
                dot={{ fill: '#CC8800', r: 4 }}
                name="Approved"
              />
              <Line
                type="monotone"
                dataKey="featured"
                stroke="#B8860B"
                strokeWidth={2}
                dot={{ fill: '#B8860B', r: 4 }}
                name="Featured"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Service Revenue Impact */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            Revenue Impact by Service
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            Services with most testimonials generate more revenue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white border-l-4 rounded"
              style={{ borderLeftColor: COLORS[index % COLORS.length] }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-[#1A1A1A]">{service.service}</p>
                  <Badge className="bg-[#E8D8C0] text-[#1A1A1A]">
                    {service.count} testimonials
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[#666]">Avg Rating: {service.avgRating.toFixed(1)} ⭐</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#1A1A1A]">
                  ${service.revenue.toLocaleString()}
                </p>
                <p className="text-xs text-[#666]">estimated revenue</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
