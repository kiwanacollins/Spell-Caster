"use client";

import { ServiceRequest, ServiceRequestStatus } from "@/lib/db/models";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatDistanceToNow, format } from "date-fns";
import { useState } from "react";

interface AdminRequestDetailProps {
  request: ServiceRequest;
  onStatusChange?: (newStatus: ServiceRequestStatus) => void;
  onNotesChange?: (notes: string) => void;
  onPriorityChange?: (priority: string) => void;
  loading?: boolean;
}

export function AdminRequestDetail({
  request,
  onStatusChange,
  onNotesChange,
  onPriorityChange,
  loading = false,
}: AdminRequestDetailProps) {
  const [editingNotes, setEditingNotes] = useState(request.adminNotes || "");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const handleSaveNotes = async () => {
    if (editingNotes === request.adminNotes) return;

    setIsSavingNotes(true);
    try {
      if (onNotesChange) {
        onNotesChange(editingNotes);
      }
    } finally {
      setIsSavingNotes(false);
    }
  };

  const getStatusColor = (status: ServiceRequestStatus) => {
    const colors: { [key: string]: string } = {
      pending: "bg-[#CC8800]/20 text-[#CC8800] border-[#CC8800]",
      in_progress: "bg-[#B8860B]/20 text-[#B8860B] border-[#B8860B]",
      completed: "bg-[#2C5530]/20 text-[#2C5530] border-[#2C5530]",
      cancelled: "bg-[#8B0000]/20 text-[#8B0000] border-[#8B0000]",
      on_hold: "bg-[#4A4A4A]/20 text-[#4A4A4A] border-[#4A4A4A]",
    };
    return colors[status] || "";
  };

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      urgent: "bg-[#8B0000] text-[#F4E8D0]",
      high: "bg-[#CC8800] text-[#1A1A1A]",
      medium: "bg-[#8B6F47] text-[#F4E8D0]",
      low: "bg-[#2C5530] text-[#F4E8D0]",
    };
    return colors[priority] || "bg-[#4A4A4A] text-[#F4E8D0]";
  };

  const statusLabel = (status: ServiceRequestStatus) => {
    const labels: { [key: string]: string } = {
      pending: "Pending Review",
      in_progress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
      on_hold: "On Hold",
    };
    return labels[status] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-['MedievalSharp'] text-[#1A1A1A]">
              {request.serviceName}
            </h1>
            <p className="text-[#4A4A4A] font-['Crimson_Text'] mt-2">
              Request ID: {request._id?.toString().slice(-8)}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Badge className={getPriorityColor(request.priority)}>
              {request.priority.toUpperCase()}
            </Badge>
            <Badge className={getStatusColor(request.status)}>
              {statusLabel(request.status)}
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
              Requested
            </p>
            <p className="font-semibold text-[#1A1A1A]">
              {formatDistanceToNow(request.requestedAt, { addSuffix: true })}
            </p>
          </div>
          {request.startedAt && (
            <div>
              <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                Started
              </p>
              <p className="font-semibold text-[#1A1A1A]">
                {format(request.startedAt, "MMM d, yyyy")}
              </p>
            </div>
          )}
          {request.estimatedCompletionDate && (
            <div>
              <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                Est. Completion
              </p>
              <p className="font-semibold text-[#1A1A1A]">
                {format(request.estimatedCompletionDate, "MMM d, yyyy")}
              </p>
            </div>
          )}
          {request.completedAt && (
            <div>
              <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                Completed
              </p>
              <p className="font-semibold text-[#1A1A1A]">
                {format(request.completedAt, "MMM d, yyyy")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Request Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
            <CardHeader className="border-b-2 border-[#8B6F47]">
              <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                  User ID
                </p>
                <p className="text-[#1A1A1A]">{request.userId}</p>
              </div>
              {request.preferredCommunicationMethod && (
                <div>
                  <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                    Preferred Contact Method
                  </p>
                  <Badge className="bg-[#8B6F47] text-[#F4E8D0]">
                    {request.preferredCommunicationMethod.toUpperCase()}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
            <CardHeader className="border-b-2 border-[#8B6F47]">
              <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
                Service Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                  Service Type
                </p>
                <p className="text-[#1A1A1A]">{request.serviceType}</p>
              </div>
              <div>
                <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                  Description
                </p>
                <p className="text-[#1A1A1A] whitespace-pre-wrap">
                  {request.description}
                </p>
              </div>
              {request.clientNotes && (
                <div>
                  <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                    Client Notes
                  </p>
                  <p className="text-[#4A4A4A] italic whitespace-pre-wrap">
                    {request.clientNotes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
            <CardHeader className="border-b-2 border-[#8B6F47]">
              <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
                Admin Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <Textarea
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="Add internal notes about this request..."
                className="bg-white border-[#8B6F47] font-['Crimson_Text'] min-h-[120px]"
              />
              <Button
                onClick={handleSaveNotes}
                disabled={isSavingNotes || editingNotes === request.adminNotes}
                className="bg-[#8B6F47] text-[#F4E8D0] hover:bg-[#6B5437]"
              >
                {isSavingNotes ? "Saving..." : "Save Notes"}
              </Button>
            </CardContent>
          </Card>

          {/* Status History */}
          {request.statusHistory && request.statusHistory.length > 0 && (
            <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
              <CardHeader className="border-b-2 border-[#8B6F47]">
                <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A]">
                  Status History
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {request.statusHistory.map((update, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b border-[#8B6F47]/20 last:border-b-0"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{
                          backgroundColor: getStatusColor(update.status).split(" ")[0].replace("bg-", "#"),
                        }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1A1A1A]">
                          {statusLabel(update.status)}
                        </p>
                        <p className="text-xs text-[#8B6F47]">
                          {format(update.updatedAt, "MMM d, yyyy HH:mm")}
                        </p>
                        {update.notes && (
                          <p className="text-sm text-[#4A4A4A] mt-1">
                            {update.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Actions & Status Management */}
        <div className="space-y-6">
          {/* Status Manager */}
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
            <CardHeader className="border-b-2 border-[#8B6F47]">
              <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] text-lg">
                Update Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                  New Status
                </label>
                <Select
                  value={request.status}
                  onValueChange={(newStatus) => {
                    if (onStatusChange) {
                      onStatusChange(newStatus as ServiceRequestStatus);
                    }
                  }}
                >
                  <SelectTrigger className="bg-white border-[#8B6F47]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                  Priority
                </label>
                <Select
                  value={request.priority}
                  onValueChange={(newPriority) => {
                    if (onPriorityChange) {
                      onPriorityChange(newPriority);
                    }
                  }}
                >
                  <SelectTrigger className="bg-white border-[#8B6F47]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Request Summary */}
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
            <CardHeader className="border-b-2 border-[#8B6F47]">
              <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] text-lg">
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div>
                <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                  Current Status
                </p>
                <Badge className={getStatusColor(request.status)}>
                  {statusLabel(request.status)}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                  Priority Level
                </p>
                <Badge className={getPriorityColor(request.priority)}>
                  {request.priority.toUpperCase()}
                </Badge>
              </div>
              {request.assignedTo && (
                <div>
                  <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                    Assigned To
                  </p>
                  <p className="text-[#1A1A1A]">{request.assignedTo}</p>
                </div>
              )}
              {request.tags && request.tags.length > 0 && (
                <div>
                  <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp']">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {request.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[#8B6F47] border-[#8B6F47]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
