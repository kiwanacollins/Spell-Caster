"use client";

import { ServiceRequest, ServiceRequestStatus } from "@/lib/db/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import Link from "next/link";
import { FiMoreVertical } from "react-icons/fi";

interface AdminServiceQueueProps {
  requests: ServiceRequest[];
  onStatusChange?: (requestId: string, newStatus: ServiceRequestStatus) => void;
  onPriorityChange?: (requestId: string, priority: string) => void;
  loading?: boolean;
}

export function AdminServiceQueue({
  requests,
  onStatusChange,
  onPriorityChange,
  loading = false,
}: AdminServiceQueueProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getPriorityColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      urgent: "bg-[#8B0000] text-[#F4E8D0]",
      high: "bg-[#CC8800] text-[#1A1A1A]",
      medium: "bg-[#8B6F47] text-[#F4E8D0]",
      low: "bg-[#2C5530] text-[#F4E8D0]",
    };
    return colors[priority] || "bg-[#4A4A4A] text-[#F4E8D0]";
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

  return (
    <div className="bg-[#F4E8D0] border-2 border-[#8B6F47] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b-2 border-[#8B6F47]">
        <h2 className="text-2xl font-['MedievalSharp'] text-[#1A1A1A]">
          Service Request Queue
        </h2>
        <p className="text-sm text-[#4A4A4A] mt-1">
          {requests.length} request{requests.length !== 1 ? "s" : ""} pending
          review
        </p>
      </div>

      {/* Table */}
      {requests.length === 0 ? (
        <div className="p-12 text-center text-[#4A4A4A] font-['Crimson_Text']">
          No service requests to display
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#8B6F47]/10">
              <TableRow className="hover:bg-transparent border-b-2 border-[#8B6F47]">
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                  Service
                </TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                  Client
                </TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                  Status
                </TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                  Priority
                </TableHead>
                <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                  Requested
                </TableHead>
                <TableHead className="text-center text-[#1A1A1A] font-['MedievalSharp']">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow
                  key={request._id?.toString()}
                  className="border-b border-[#8B6F47]/30 hover:bg-[#FFF9E6] transition-colors"
                >
                  {/* Service Name */}
                  <TableCell className="font-['MedievalSharp'] text-[#1A1A1A]">
                    <Link
                      href={`/admin/requests/${request._id}`}
                      className="hover:text-[#CC8800] hover:underline"
                    >
                      {request.serviceName}
                    </Link>
                  </TableCell>

                  {/* Client Name */}
                  <TableCell className="text-[#4A4A4A]">
                    <div className="text-sm">{request.userId}</div>
                    {request.clientNotes && (
                      <p className="text-xs text-[#8B6F47] truncate">
                        &quot;{request.clientNotes}&quot;
                      </p>
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Select
                      value={request.status}
                      onValueChange={(newStatus) => {
                        if (onStatusChange) {
                          onStatusChange(
                            request._id?.toString() || "",
                            newStatus as ServiceRequestStatus
                          );
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`w-[140px] ${getStatusColor(request.status)}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Priority */}
                  <TableCell>
                    <Select
                      value={request.priority}
                      onValueChange={(newPriority) => {
                        if (onPriorityChange) {
                          onPriorityChange(
                            request._id?.toString() || "",
                            newPriority
                          );
                        }
                      }}
                    >
                      <SelectTrigger
                        className={`w-[100px] ${getPriorityColor(request.priority)}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  {/* Requested Date */}
                  <TableCell className="text-sm text-[#4A4A4A]">
                    {formatDistanceToNow(request.requestedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <FiMoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/requests/${request._id}`}
                            className="cursor-pointer"
                          >
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setExpandedId(
                              expandedId === request._id?.toString()
                                ? null
                                : request._id?.toString() || null
                            )
                          }
                        >
                          {expandedId === request._id?.toString()
                            ? "Hide Notes"
                            : "Show Notes"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
