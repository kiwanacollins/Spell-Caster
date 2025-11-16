'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { FiDownload, FiFilter } from 'react-icons/fi';

interface FinancialReportData {
  period: string;
  revenue: number;
  refunds: number;
  transactions: number;
  averageOrderValue: number;
}

interface ServiceRevenueData {
  name: string;
  revenue: number;
  percentage: number;
}

interface AdminFinancialReportsProps {
  onGenerateReport?: (reportType: string, startDate: Date, endDate: Date) => Promise<void>;
  onExportReport?: (reportType: string, format: string) => void;
}

const monthlyRevenueData: FinancialReportData[] = [
  {
    period: 'January',
    revenue: 8500,
    refunds: 200,
    transactions: 28,
    averageOrderValue: 304,
  },
  {
    period: 'February',
    revenue: 9200,
    refunds: 350,
    transactions: 31,
    averageOrderValue: 297,
  },
  {
    period: 'March',
    revenue: 10100,
    refunds: 280,
    transactions: 34,
    averageOrderValue: 297,
  },
  {
    period: 'April',
    revenue: 9800,
    refunds: 420,
    transactions: 32,
    averageOrderValue: 306,
  },
  {
    period: 'May',
    revenue: 11200,
    refunds: 150,
    transactions: 37,
    averageOrderValue: 303,
  },
  {
    period: 'June',
    revenue: 12500,
    refunds: 450,
    transactions: 41,
    averageOrderValue: 305,
  },
];

const serviceRevenueData: ServiceRevenueData[] = [
  { name: 'Binding Spell', revenue: 3200, percentage: 26 },
  { name: 'Marriage', revenue: 2100, percentage: 17 },
  { name: 'Business Boost', revenue: 1950, percentage: 16 },
  { name: 'Protection', revenue: 1800, percentage: 14 },
  { name: 'Cleansing', revenue: 1550, percentage: 12 },
  { name: 'Others', revenue: 900, percentage: 7 },
];

const COLORS = ['#2C5530', '#CC8800', '#8B6F47', '#C0C0C0', '#8B0000', '#B8860B'];

export function AdminFinancialReports({
  onGenerateReport,
  onExportReport,
}: AdminFinancialReportsProps) {
  const [reportType, setReportType] = useState('monthly');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [startDate, setStartDate] = useState(
    format(subMonths(new Date(), 6), 'yyyy-MM-dd')
  );
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    if (new Date(startDate) >= new Date(endDate)) {
      setError('End date must be after start date');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      await onGenerateReport?.(
        reportType,
        new Date(startDate),
        new Date(endDate)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate report'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    setIsExporting(true);

    try {
      onExportReport?.(reportType, exportFormat);
      setTimeout(() => setIsExporting(false), 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to export report'
      );
      setIsExporting(false);
    }
  };

  const totalRevenue = monthlyRevenueData.reduce((sum, m) => sum + m.revenue, 0);
  const totalRefunds = monthlyRevenueData.reduce((sum, m) => sum + m.refunds, 0);
  const totalTransactions = monthlyRevenueData.reduce(
    (sum, m) => sum + m.transactions,
    0
  );
  const avgOrderValue = Math.round(totalRevenue / totalTransactions);

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] flex items-center gap-2">
            <FiFilter className="w-5 h-5" />
            Report Filters
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            Customize report generation parameters
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Report Type */}
            <div className="space-y-2">
              <Label htmlFor="report-type" className="text-[#1A1A1A]">
                Report Type
              </Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger
                  id="report-type"
                  className="bg-white border-[#8B6F47]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#8B6F47]">
                  <SelectItem value="monthly">Monthly Revenue</SelectItem>
                  <SelectItem value="service">By Service</SelectItem>
                  <SelectItem value="customer">By Customer</SelectItem>
                  <SelectItem value="refunds">Refund Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-[#1A1A1A]">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border-[#8B6F47]"
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-[#1A1A1A]">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white border-[#8B6F47]"
              />
            </div>

            {/* Export Format */}
            <div className="space-y-2">
              <Label htmlFor="export-format" className="text-[#1A1A1A]">
                Export Format
              </Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger
                  id="export-format"
                  className="bg-white border-[#8B6F47]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#8B6F47]">
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <Alert className="border-[#8B0000] bg-[#FFE5E5]">
              <AlertDescription className="text-[#8B0000]">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="bg-[#2C5530] text-white hover:bg-[#1e3d22]"
            >
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              variant="outline"
              className="border-[#8B6F47] text-[#8B6F47]"
            >
              <FiDownload className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">
              ${totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              Last 6 months period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Total Refunds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#8B0000]">
              ${totalRefunds.toLocaleString()}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              {((totalRefunds / totalRevenue) * 100).toFixed(1)}% of revenue
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">
              {totalTransactions}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              Total completed sales
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-[#8B6F47]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#4A4A4A]">
              Avg Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold text-[#1A1A1A]">
              ${avgOrderValue}
            </div>
            <p className="text-xs text-[#4A4A4A] mt-1">
              Per transaction average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Monthly Revenue
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              Revenue trends over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#8B6F47"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="period"
                  stroke="#4A4A4A"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#4A4A4A" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                  }}
                  cursor={{ fill: 'rgba(139, 111, 71, 0.1)' }}
                />
                <Legend wrapperStyle={{ color: '#4A4A4A' }} />
                <Bar
                  dataKey="revenue"
                  fill="#2C5530"
                  name="Revenue"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="refunds"
                  fill="#8B0000"
                  name="Refunds"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Revenue Distribution */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Revenue by Service
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              Distribution of revenue across services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceRevenueData as any}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }: any) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {serviceRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Trends */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Transaction Volume
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              Number of transactions per month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#8B6F47"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="period"
                  stroke="#4A4A4A"
                  style={{ fontSize: '12px' }}
                />
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
                  dataKey="transactions"
                  stroke="#2C5530"
                  strokeWidth={2}
                  dot={{ fill: '#2C5530', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Transactions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Order Value Trend */}
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardHeader>
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
              Avg Order Value
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              Average transaction value over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#8B6F47"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="period"
                  stroke="#4A4A4A"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#4A4A4A" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F4E8D0',
                    border: '2px solid #8B6F47',
                  }}
                  formatter={(value) => `$${value}`}
                />
                <Legend wrapperStyle={{ color: '#4A4A4A' }} />
                <Line
                  type="monotone"
                  dataKey="averageOrderValue"
                  stroke="#CC8800"
                  strokeWidth={2}
                  dot={{ fill: '#CC8800', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="AOV"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Service Revenue Table */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader>
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
            Service Revenue Breakdown
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            Detailed revenue by service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {serviceRevenueData.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white border-l-4 rounded"
                style={{ borderLeftColor: COLORS[index % COLORS.length] }}
              >
                <div className="flex-1">
                  <p className="font-semibold text-[#1A1A1A]">{service.name}</p>
                  <p className="text-xs text-[#4A4A4A]">{service.percentage}% of total</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#1A1A1A]">
                    ${service.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
