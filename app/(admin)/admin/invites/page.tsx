"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GiPentacle, GiCheckMark, GiTrashCan } from "react-icons/gi";
import { FiCopy, FiLoader, FiPlus, FiMoreVertical, FiAlertCircle } from "react-icons/fi";
import { format } from "date-fns";

interface AdminInvite {
  id: string;
  email: string;
  role: "user" | "admin";
  status: "pending" | "accepted" | "expired";
  createdAt: string;
  expiresAt: string;
  acceptedAt?: string;
}

interface InviteStats {
  pending: number;
  accepted: number;
  expired: number;
}

export default function AdminInvitesPage() {
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [stats, setStats] = useState<InviteStats>({ pending: 0, accepted: 0, expired: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [newInviteOpen, setNewInviteOpen] = useState(false);
  const [newInviteLoading, setNewInviteLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state for creating new invite
  const [formData, setFormData] = useState({
    email: "",
    role: "user" as "user" | "admin",
    customMessage: "",
  });

  // Load invites on mount
  useEffect(() => {
    loadInvites();
  }, []);

  const loadInvites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/invites?limit=100");

      if (!response.ok) {
        throw new Error("Failed to load invites");
      }

      const data = await response.json();
      setInvites(data.data || []);
      setStats(data.stats || { pending: 0, accepted: 0, expired: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load invites");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewInviteLoading(true);
    setError(null);
    setInviteLink(null);

    try {
      const response = await fetch("/api/admin/invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          role: formData.role,
          customMessage: formData.customMessage || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create invite");
      }

      const data = await response.json();
      setSuccess(`Invite created for ${formData.email}`);
      setInviteLink(data.invite.inviteLink);

      // Reset form
      setFormData({ email: "", role: "user", customMessage: "" });

      // Reload invites
      await loadInvites();

      // Close dialog after 2 seconds
      setTimeout(() => {
        setNewInviteOpen(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create invite");
    } finally {
      setNewInviteLoading(false);
    }
  };

  const handleCopyLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId("link");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      setError("Failed to copy link");
    }
  };

  const handleRevokeInvite = async (token: string) => {
    if (!window.confirm("Are you sure you want to revoke this invite?")) return;

    try {
      const response = await fetch(`/api/admin/invites/${token}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to revoke invite");
      }

      setSuccess("Invite revoked successfully");
      await loadInvites();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to revoke invite");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "default",
      accepted: "secondary",
      expired: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F4E8D0] flex items-center gap-2">
            <GiPentacle className="text-[#B8860B]" />
            Admin Invites
          </h1>
          <p className="text-[#C0C0C0] mt-1">Manage email invitations for admin users</p>
        </div>
        <Dialog open={newInviteOpen} onOpenChange={setNewInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#B8860B] hover:bg-[#8B6F47] text-[#1A1A1A]">
              <FiPlus className="mr-2 h-4 w-4" />
              Create Invite
            </Button>
          </DialogTrigger>
          <DialogContent className="border-[#8B6F47] bg-[#2A2A2A]">
            <DialogHeader>
              <DialogTitle className="text-[#F4E8D0]">Create Admin Invite</DialogTitle>
              <DialogDescription className="text-[#C0C0C0]">
                Send an invitation to a user to become an admin
              </DialogDescription>
            </DialogHeader>

            {inviteLink && (
              <div className="space-y-2">
                <Alert className="border-[#B8860B] bg-[#3A3A3A]">
                  <GiCheckMark className="h-4 w-4 text-[#B8860B]" />
                  <AlertDescription className="text-[#F4E8D0]">
                    Invite created successfully! Share this link with the user:
                  </AlertDescription>
                </Alert>
                <div className="flex gap-2">
                  <Input
                    value={inviteLink}
                    readOnly
                    className="bg-[#1A1A1A] border-[#8B6F47] text-[#F4E8D0]"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleCopyLink(inviteLink)}
                    className="bg-[#B8860B] hover:bg-[#8B6F47]"
                  >
                    <FiCopy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {!inviteLink && (
              <form onSubmit={handleCreateInvite} className="space-y-4">
                <div>
                  <label className="text-[#F4E8D0] text-sm font-medium">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="user@example.com"
                    required
                    className="bg-[#1A1A1A] border-[#8B6F47] text-[#F4E8D0] mt-1"
                  />
                </div>

                <div>
                  <label className="text-[#F4E8D0] text-sm font-medium">Role *</label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value as "user" | "admin" })}>
                    <SelectTrigger className="bg-[#1A1A1A] border-[#8B6F47] text-[#F4E8D0] mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-[#8B6F47] bg-[#2A2A2A]">
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-[#F4E8D0] text-sm font-medium">Custom Message (Optional)</label>
                  <Textarea
                    value={formData.customMessage}
                    onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                    placeholder="Add a personal message to the invite..."
                    rows={3}
                    className="bg-[#1A1A1A] border-[#8B6F47] text-[#F4E8D0] mt-1"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={newInviteLoading}
                  className="w-full bg-[#B8860B] hover:bg-[#8B6F47] text-[#1A1A1A]"
                >
                  {newInviteLoading ? (
                    <>
                      <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Invite"
                  )}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-[#8B6F47] bg-[#2A2A2A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#C0C0C0]">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#B8860B]">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="border-[#8B6F47] bg-[#2A2A2A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#C0C0C0]">Accepted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2C5530]">{stats.accepted}</div>
          </CardContent>
        </Card>

        <Card className="border-[#8B6F47] bg-[#2A2A2A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#C0C0C0]">Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#8B0000]">{stats.expired}</div>
          </CardContent>
        </Card>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="border-[#8B0000] bg-[#3A2A2A]">
          <FiAlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && !inviteLink && (
        <Alert className="border-[#2C5530] bg-[#2A3A2A]">
          <GiCheckMark className="h-4 w-4 text-[#2C5530]" />
          <AlertDescription className="text-[#2C5530]">{success}</AlertDescription>
        </Alert>
      )}

      {/* Invites Table */}
      <Card className="border-[#8B6F47] bg-[#1A1A1A]">
        <CardHeader>
          <CardTitle className="text-[#F4E8D0]">Invites</CardTitle>
          <CardDescription className="text-[#C0C0C0]">
            {loading ? "Loading..." : `${invites.length} invites`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <FiLoader className="h-6 w-6 animate-spin text-[#B8860B]" />
            </div>
          ) : invites.length === 0 ? (
            <div className="py-8 text-center text-[#C0C0C0]">
              <p>No invites yet. Create one to get started!</p>
            </div>
          ) : (
            <ScrollArea className="h-full rounded-lg border border-[#8B6F47]">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#8B6F47]">
                    <TableHead className="text-[#C0C0C0]">Email</TableHead>
                    <TableHead className="text-[#C0C0C0]">Role</TableHead>
                    <TableHead className="text-[#C0C0C0]">Status</TableHead>
                    <TableHead className="text-[#C0C0C0]">Created</TableHead>
                    <TableHead className="text-[#C0C0C0]">Expires</TableHead>
                    <TableHead className="text-right text-[#C0C0C0]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invites.map((invite) => (
                    <TableRow key={invite.id} className="border-[#8B6F47]">
                      <TableCell className="text-[#F4E8D0]">{invite.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-[#B8860B] text-[#B8860B]">
                          {invite.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(invite.status)}</TableCell>
                      <TableCell className="text-[#C0C0C0] text-sm">
                        {new Date(invite.createdAt).toLocaleDateString()} {new Date(invite.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell className="text-[#C0C0C0] text-sm">
                        {new Date(invite.expiresAt).toLocaleDateString()} {new Date(invite.expiresAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell className="text-right">
                        {invite.status === "pending" && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-[#B8860B]">
                                <FiMoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-[#8B6F47] bg-[#2A2A2A]">
                              <DropdownMenuItem
                                onClick={() => handleRevokeInvite(invite.id)}
                                className="text-[#8B0000] focus:bg-[#3A2A2A]"
                              >
                                <GiTrashCan className="mr-2 h-4 w-4" />
                                Revoke
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
