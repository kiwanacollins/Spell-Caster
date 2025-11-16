"use client";

import { useState } from "react";
import { AdminRequestDetail } from "./admin-request-detail";
import { RequestActionControls } from "./request-action-controls";
import { ServiceRequest, ServiceRequestStatus } from "@/lib/db/models";
import { useRouter } from "next/navigation";

interface RequestDetailClientProps {
  initialRequest: ServiceRequest;
}

export function RequestDetailClient({
  initialRequest,
}: RequestDetailClientProps) {
  const [request, setRequest] = useState<ServiceRequest>(initialRequest);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: ServiceRequestStatus) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/service-requests/${request._id?.toString()}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setRequest(updated);
        router.refresh();
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriorityChange = async (priority: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/service-requests/${request._id?.toString()}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priority }),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setRequest(updated);
        router.refresh();
      } else {
        console.error("Failed to update priority");
      }
    } catch (error) {
      console.error("Error updating priority:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotesChange = async (notes: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/service-requests/${request._id?.toString()}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminNotes: notes }),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setRequest(updated);
        router.refresh();
      } else {
        console.error("Failed to update notes");
      }
    } catch (error) {
      console.error("Error updating notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (acceptNotes?: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/service-requests/${request._id?.toString()}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "in_progress",
            adminNotes: acceptNotes ? `[ACCEPTED] ${acceptNotes}` : "[ACCEPTED]",
          }),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setRequest(updated);
        router.refresh();
      } else {
        console.error("Failed to accept request");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = async (reason: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/service-requests/${request._id?.toString()}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "cancelled",
            adminNotes: `[DECLINED] ${reason}`,
          }),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setRequest(updated);
        router.refresh();
      } else {
        console.error("Failed to decline request");
      }
    } catch (error) {
      console.error("Error declining request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (adminId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/service-requests/${request._id?.toString()}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assignedTo: adminId }),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setRequest(updated);
        router.refresh();
      } else {
        console.error("Failed to assign request");
      }
    } catch (error) {
      console.error("Error assigning request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <AdminRequestDetail
          request={request}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onNotesChange={handleNotesChange}
          loading={loading}
        />
      </div>
      <div>
        <RequestActionControls
          request={request}
          onAccept={handleAccept}
          onDecline={handleDecline}
          onAssign={handleAssign}
          loading={loading}
        />
      </div>
    </div>
  );
}
