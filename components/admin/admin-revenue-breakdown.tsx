"use client";

import { RevenueBreakdown } from "@/lib/admin/dashboard-data";

interface AdminRevenueBreakdownProps {
  breakdown: RevenueBreakdown[];
}

export function AdminRevenueBreakdown({
  breakdown,
}: AdminRevenueBreakdownProps) {
  const totalRevenue = breakdown.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = breakdown.reduce((sum, item) => sum + item.orderCount, 0);

  if (breakdown.length === 0) {
    return (
      <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
        <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4 uppercase tracking-wider">
          Revenue Breakdown
        </h3>
        <p className="text-[#4A4A4A] font-['Crimson_Text'] text-center py-8">
          No revenue data available this month
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
      <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4 uppercase tracking-wider">
        Revenue Snapshot
      </h3>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b-2 border-[#8B6F47]/30">
        <div>
          <p className="text-sm text-[#4A4A4A] font-['Crimson_Text']">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-[#B8860B]">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-[#4A4A4A] font-['Crimson_Text']">
            Total Orders
          </p>
          <p className="text-2xl font-bold text-[#2C5530]">{totalOrders}</p>
        </div>
      </div>

      {/* Service breakdown */}
      <div className="space-y-3">
        {breakdown.map((item) => (
          <div key={item.serviceName} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-['MedievalSharp'] text-[#1A1A1A] text-sm">
                  {item.serviceName}
                </h4>
                <p className="text-xs text-[#4A4A4A]">
                  {item.orderCount} order{item.orderCount !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#8B6F47]">
                  ${item.revenue.toFixed(2)}
                </p>
                <p className="text-xs text-[#C0C0C0]">{item.percentage}%</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#C0C0C0]/20 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-[#8B6F47] to-[#B8860B]"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Average order value */}
      <div className="mt-6 pt-6 border-t-2 border-[#8B6F47]/30">
        <p className="text-sm text-[#4A4A4A] font-['Crimson_Text']">
          Average Order Value
        </p>
        <p className="text-xl font-bold text-[#2C5530]">
          ${(totalRevenue / totalOrders).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
