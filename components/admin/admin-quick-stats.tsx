"use client";

import { QuickStat } from "@/lib/admin/dashboard-data";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

interface AdminQuickStatsProps {
  stats: QuickStat[];
}

export function AdminQuickStats({ stats }: AdminQuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6 hover:border-[#CC8800] transition-all hover:shadow-lg"
        >
          {/* Header with trend */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-sm font-['MedievalSharp'] text-[#1A1A1A] uppercase tracking-wider">
              {stat.label}
            </h3>
            {stat.trend && stat.trend !== "neutral" && (
              <span
                className={`flex items-center gap-1 text-xs font-bold ${
                  stat.trend === "up"
                    ? "text-[#2C5530]"
                    : "text-[#8B0000]"
                }`}
              >
                {stat.trend === "up" ? (
                  <FiArrowUp className="w-3 h-3" />
                ) : (
                  <FiArrowDown className="w-3 h-3" />
                )}
              </span>
            )}
          </div>

          {/* Main value */}
          <div className="mb-3">
            <p className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
          </div>

          {/* Subtext */}
          {stat.subtext && (
            <p className="text-xs text-[#4A4A4A] font-['Crimson_Text']">
              {stat.subtext}
            </p>
          )}

          {/* Decorative element */}
          <div className="mt-4 h-1 bg-linear-to-r from-[#8B6F47] to-transparent opacity-30"></div>
        </div>
      ))}
    </div>
  );
}
