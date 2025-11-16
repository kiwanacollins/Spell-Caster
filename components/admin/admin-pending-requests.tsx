"use client";

import { PendingRequest } from "@/lib/admin/dashboard-data";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface AdminPendingRequestsProps {
  requests: PendingRequest[];
}

export function AdminPendingRequests({
  requests,
}: AdminPendingRequestsProps) {
  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      high: "#8B0000",
      medium: "#CC8800",
      low: "#2C5530",
    };
    return colors[priority] || "#4A4A4A";
  };

  const getPriorityBadge = (priority: string) => {
    const badges: { [key: string]: string } = {
      high: "🔴 High",
      medium: "🟡 Medium",
      low: "🟢 Low",
    };
    return badges[priority] || priority;
  };

  if (requests.length === 0) {
    return (
      <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] uppercase tracking-wider">
            Pending Service Requests
          </h3>
          <Badge className="bg-[#2C5530] text-[#F4E8D0]">0</Badge>
        </div>
        <p className="text-[#4A4A4A] font-['Crimson_Text'] text-center py-8">
          All caught up! No pending requests to review.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] uppercase tracking-wider">
          Pending Service Requests
        </h3>
        <Badge className="bg-[#8B0000] text-[#F4E8D0]">
          {requests.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {requests.slice(0, 10).map((request) => (
          <Link
            key={request.id}
            href={`/admin/requests/${request.id}`}
            className="block"
          >
            <div className="border border-[#8B6F47]/30 p-4 hover:border-[#CC8800] hover:bg-[#FFF9E6] transition-all group">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-['MedievalSharp'] text-[#1A1A1A] group-hover:text-[#CC8800]">
                    {request.serviceName}
                  </h4>
                  <p className="text-sm text-[#4A4A4A] truncate">
                    {request.userName} ({request.userEmail})
                  </p>
                </div>
                <Badge
                  style={{
                    backgroundColor: getPriorityColor(request.priority) + "20",
                    color: getPriorityColor(request.priority),
                    borderColor: getPriorityColor(request.priority),
                  }}
                  variant="outline"
                  className="shrink-0"
                >
                  {getPriorityBadge(request.priority)}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs">
                <p className="text-[#8B6F47]">
                  Status: <span className="font-semibold">{request.status}</span>
                </p>
                <p className="text-[#C0C0C0]">
                  {formatDistanceToNow(request.requestedAt, {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {requests.length > 10 && (
        <Link
          href="/admin/requests"
          className="block text-center mt-4 text-[#CC8800] hover:text-[#8B6F47] font-['MedievalSharp'] hover:underline"
        >
          View all {requests.length} pending requests →
        </Link>
      )}
    </div>
  );
}
