"use client";

import { useState, useEffect } from "react";
import { AdminServiceQueue } from "@/components/admin/admin-service-queue";
import { ServiceRequest, ServiceRequestStatus } from "@/lib/db/models";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ServiceRequestsQueueClient() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.append("status", statusFilter);
        if (priorityFilter !== "all") params.append("priority", priorityFilter);
        if (searchTerm) params.append("search", searchTerm);

        const response = await fetch(
          `/api/service-requests?${params.toString()}`
        );
        if (response.ok) {
          const data = await response.json();
          setRequests(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [statusFilter, priorityFilter, searchTerm]);

  const handleStatusChange = async (
    requestId: string,
    newStatus: ServiceRequestStatus
  ) => {
    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updated = await response.json();
        setRequests((prev) =>
          prev.map((r) =>
            r._id?.toString() === requestId ? updated : r
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handlePriorityChange = async (
    requestId: string,
    priority: string
  ) => {
    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority }),
      });

      if (response.ok) {
        const updated = await response.json();
        setRequests((prev) =>
          prev.map((r) =>
            r._id?.toString() === requestId ? updated : r
          )
        );
      }
    } catch (error) {
      console.error("Failed to update priority:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
        <div>
          <label className="block text-sm font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Search
          </label>
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border-[#8B6F47]"
          />
        </div>

        <div>
          <label className="block text-sm font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Status
          </label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Priority
          </label>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Queue Table */}
      <AdminServiceQueue
        requests={requests}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
        loading={loading}
      />
    </div>
  );
}
