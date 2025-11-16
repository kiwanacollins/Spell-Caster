"use client";

import { ActivityFeedItem } from "@/lib/admin/dashboard-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface AdminActivityFeedProps {
  activities: ActivityFeedItem[];
}

export function AdminActivityFeed({ activities }: AdminActivityFeedProps) {
  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      service_request: "📜",
      payment: "💰",
      user_signup: "👤",
      admin_action: "⚙️",
    };
    return icons[type] || "•";
  };

  return (
    <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
      <h3 className="text-xl font-['MedievalSharp'] text-[#1A1A1A] mb-4 uppercase tracking-wider">
        Recent Activity
      </h3>

      {activities.length === 0 ? (
        <p className="text-[#4A4A4A] font-['Crimson_Text'] text-center py-8">
          No recent activity to display
        </p>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 pb-4 border-b border-[#8B6F47]/20 last:border-b-0"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl"
                  style={{
                    backgroundColor: activity.color + "20",
                    color: activity.color,
                  }}
                >
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-['MedievalSharp'] text-[#1A1A1A] font-semibold">
                      {activity.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-1 shrink-0"
                    >
                      {activity.type.replace(/_/g, " ")}
                    </Badge>
                  </div>

                  <p className="text-sm text-[#4A4A4A] font-['Crimson_Text'] truncate">
                    {activity.description}
                  </p>

                  {activity.userName && (
                    <p className="text-xs text-[#8B6F47] mt-1">
                      {activity.userName}
                      {activity.userEmail && ` (${activity.userEmail})`}
                    </p>
                  )}

                  <p className="text-xs text-[#C0C0C0] mt-2">
                    {formatDistanceToNow(activity.timestamp, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
