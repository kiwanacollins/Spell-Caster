"use client";

import { ServiceRequest } from "@/lib/db/models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { GiHearts } from "react-icons/gi";
import { FiCheck, FiX, FiClock } from "react-icons/fi";

interface RequestActionControlsProps {
  request: ServiceRequest;
  onAccept?: (notes?: string) => void;
  onDecline?: (reason: string) => void;
  onAssign?: (adminId: string) => void;
  loading?: boolean;
}

export function RequestActionControls({
  request,
  onAccept,
  onDecline,
  onAssign,
  loading = false,
}: RequestActionControlsProps) {
  const [declineReason, setDeclineReason] = useState("");
  const [assignAdminId, setAssignAdminId] = useState("");
  const [acceptNotes, setAcceptNotes] = useState("");
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const handleAccept = () => {
    if (onAccept) {
      onAccept(acceptNotes);
      setAcceptNotes("");
    }
  };

  const handleDecline = () => {
    if (onDecline && declineReason.trim()) {
      onDecline(declineReason);
      setDeclineReason("");
      setIsDeclineOpen(false);
    }
  };

  const handleAssign = () => {
    if (onAssign && assignAdminId.trim()) {
      onAssign(assignAdminId);
      setAssignAdminId("");
      setIsAssignOpen(false);
    }
  };

  const isPending = request.status === "pending";
  const isInProgress = request.status === "in_progress";

  return (
    <div className="space-y-4">
      {/* Status-Specific Actions */}
      {isPending && (
        <Card className="bg-[#FFF9E6] border-2 border-[#CC8800]">
          <CardHeader className="border-b-2 border-[#CC8800]">
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] text-lg flex items-center gap-2">
              <FiClock className="text-[#CC8800]" />
              Pending Action Required
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              This request is awaiting your decision
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Accept Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-[#2C5530] hover:bg-[#1a3621] text-[#F4E8D0] border-2 border-[#2C5530] font-['MedievalSharp']"
                    disabled={loading}
                  >
                    <FiCheck className="mr-2 h-4 w-4" />
                    Accept Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
                  <DialogHeader>
                    <DialogTitle className="text-[#1A1A1A] font-['MedievalSharp']">
                      Accept Service Request
                    </DialogTitle>
                    <DialogDescription className="text-[#4A4A4A]">
                      Accept this request and add any initial notes for the client.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Add acceptance notes (optional)..."
                      value={acceptNotes}
                      onChange={(e) => setAcceptNotes(e.target.value)}
                      className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                      rows={4}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      className="border-[#8B6F47] text-[#1A1A1A]"
                      onClick={() => setAcceptNotes("")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-[#2C5530] hover:bg-[#1a3621] text-[#F4E8D0]"
                      onClick={handleAccept}
                      disabled={loading}
                    >
                      Confirm Accept
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Decline Button */}
              <Dialog open={isDeclineOpen} onOpenChange={setIsDeclineOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10 font-['MedievalSharp']"
                    disabled={loading}
                  >
                    <FiX className="mr-2 h-4 w-4" />
                    Decline Request
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
                  <DialogHeader>
                    <DialogTitle className="text-[#1A1A1A] font-['MedievalSharp']">
                      Decline Service Request
                    </DialogTitle>
                    <DialogDescription className="text-[#4A4A4A]">
                      Please provide a reason for declining this request. The client will be
                      notified.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Alert className="bg-[#8B0000]/10 border-[#8B0000]">
                      <AlertDescription className="text-[#8B0000]">
                        This action cannot be undone. The request will be marked as cancelled and
                        the client will receive a refund if applicable.
                      </AlertDescription>
                    </Alert>
                    <Textarea
                      placeholder="Reason for declining (required)..."
                      value={declineReason}
                      onChange={(e) => setDeclineReason(e.target.value)}
                      className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                      rows={4}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      className="border-[#8B6F47] text-[#1A1A1A]"
                      onClick={() => {
                        setDeclineReason("");
                        setIsDeclineOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-[#8B0000] hover:bg-[#6B0000] text-[#F4E8D0]"
                      onClick={handleDecline}
                      disabled={loading || !declineReason.trim()}
                    >
                      Confirm Decline
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assignment Section */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader className="border-b-2 border-[#8B6F47]">
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] text-lg">
            Assignment
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {request.assignedTo ? (
              <div>
                <p className="text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                  Currently Assigned To
                </p>
                <Badge className="bg-[#2C5530] text-[#F4E8D0]">
                  {request.assignedTo}
                </Badge>
              </div>
            ) : (
              <p className="text-sm text-[#4A4A4A] italic">Not yet assigned</p>
            )}

            <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-[#8B6F47] text-[#1A1A1A] hover:bg-[#8B6F47]/10 font-['MedievalSharp']"
                  disabled={loading}
                >
                  {request.assignedTo ? "Reassign" : "Assign Admin"}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
                <DialogHeader>
                  <DialogTitle className="text-[#1A1A1A] font-['MedievalSharp']">
                    Assign Request to Admin
                  </DialogTitle>
                  <DialogDescription className="text-[#4A4A4A]">
                    Enter the admin email or ID to assign this request.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Admin email or ID"
                    value={assignAdminId}
                    onChange={(e) => setAssignAdminId(e.target.value)}
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-[#8B6F47] text-[#1A1A1A]"
                    onClick={() => {
                      setAssignAdminId("");
                      setIsAssignOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-[#8B6F47] hover:bg-[#6B5435] text-[#F4E8D0]"
                    onClick={handleAssign}
                    disabled={loading || !assignAdminId.trim()}
                  >
                    Assign
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* In Progress Actions */}
      {isInProgress && (
        <Card className="bg-[#F4E8D0] border-2 border-[#B8860B]">
          <CardHeader className="border-b-2 border-[#B8860B]">
            <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] text-lg flex items-center gap-2">
              <GiHearts className="text-[#B8860B]" />
              Active Ritual
            </CardTitle>
            <CardDescription className="text-[#4A4A4A]">
              This request is currently being worked on
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-[#4A4A4A] mb-4">
              Use the status selector above to mark progress or complete the ritual.
            </p>
            <div className="space-y-2 text-xs text-[#4A4A4A]">
              <p>• Move to "On Hold" if awaiting client information</p>
              <p>• Move to "Completed" when the ritual is finished</p>
              <p>• Move to "Cancelled" if the client requests cancellation</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
