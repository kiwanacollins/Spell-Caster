"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  image?: string;
  createdAt: string;
  isActive?: boolean;
  isSuspended?: boolean;
}

export default function AdminUsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [newRole, setNewRole] = useState<"user" | "admin">("user");
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users when search or role filter changes
  useEffect(() => {
    let filtered = users;

    // Apply role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchQuery, roleFilter]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUser) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`/api/users/${selectedUser.id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update role");
      }

      const data = await response.json();
      setSuccessMessage(`${selectedUser.email} is now ${newRole}`);

      // Update local user in list
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, role: newRole } : u
        )
      );

      setShowRoleDialog(false);
      setSelectedUser(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setIsUpdating(false);
    }
  };

  const openRoleDialog = (user: User, targetRole: "user" | "admin") => {
    setSelectedUser(user);
    setNewRole(targetRole);
    setShowRoleDialog(true);
  };

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-parchment-light border-2 border-aged-bronze/40 rounded p-4">
          <p className="text-sm text-ink-700 font-serif">Total Users</p>
          <p className="text-3xl font-bold text-ink-900">{users.length}</p>
        </div>
        <div className="bg-parchment-light border-2 border-aged-bronze/40 rounded p-4">
          <p className="text-sm text-ink-700 font-serif">Admins</p>
          <p className="text-3xl font-bold text-blood-moon-red">{adminCount}</p>
        </div>
        <div className="bg-parchment-light border-2 border-aged-bronze/40 rounded p-4">
          <p className="text-sm text-ink-700 font-serif">Regular Users</p>
          <p className="text-3xl font-bold text-enchanted-emerald">{userCount}</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <Alert variant="destructive">
          <AiOutlineCloseCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {successMessage && (
        <Alert className="bg-enchanted-emerald/10 border-enchanted-emerald/50">
          <AiOutlineCheckCircle className="h-4 w-4 text-enchanted-emerald" />
          <AlertDescription className="text-enchanted-emerald">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-xs"
        />
        <Select
          value={roleFilter}
          onValueChange={(value) => setRoleFilter(value as "all" | "user" | "admin")}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">Users</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="border-2 border-aged-bronze/40 rounded overflow-hidden bg-parchment-light/50">
        <Table>
          <TableHeader className="bg-aged-bronze/20">
            <TableRow>
              <TableHead className="font-serif text-ink-900">Name</TableHead>
              <TableHead className="font-serif text-ink-900">Email</TableHead>
              <TableHead className="font-serif text-ink-900">Role</TableHead>
              <TableHead className="font-serif text-ink-900">Status</TableHead>
              <TableHead className="font-serif text-ink-900">Joined</TableHead>
              <TableHead className="text-right font-serif text-ink-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-spin">✦</span>
                    Loading users...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-ink-600">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-aged-bronze/10">
                  <TableCell className="font-serif">{user.name}</TableCell>
                  <TableCell className="font-serif text-sm">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "destructive" : "secondary"}
                      className={
                        user.role === "admin"
                          ? "bg-blood-moon-red text-parchment-light"
                          : "bg-aged-bronze/30 text-ink-900"
                      }
                    >
                      {user.role === "admin" ? "Admin" : "User"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.isSuspended ? "destructive" : "secondary"}
                      className={
                        user.isSuspended
                          ? "bg-blood-moon-red/30 text-blood-moon-red"
                          : "bg-enchanted-emerald/30 text-enchanted-emerald"
                      }
                    >
                      {user.isSuspended ? "Suspended" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-ink-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <BsThreeDots className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.role === "user" ? (
                          <DropdownMenuItem
                            onClick={() => openRoleDialog(user, "admin")}
                            className="cursor-pointer"
                          >
                            Promote to Admin
                          </DropdownMenuItem>
                        ) : adminCount > 1 ? (
                          <DropdownMenuItem
                            onClick={() => openRoleDialog(user, "user")}
                            className="cursor-pointer text-blood-moon-red"
                          >
                            Demote to User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem disabled className="text-ink-400">
                            Cannot demote last admin
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled className="text-ink-400">
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled className="text-ink-400">
                          Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Role Change Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent className="border-2 border-aged-bronze/40 bg-parchment-light">
          <DialogHeader>
            <DialogTitle className="font-medieval text-xl">
              Change User Role
            </DialogTitle>
            <DialogDescription className="font-serif text-ink-700">
              Update {selectedUser?.email}'s role
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm font-serif text-ink-800 mb-2">New Role:</p>
              <Badge
                className={
                  newRole === "admin"
                    ? "bg-blood-moon-red text-parchment-light"
                    : "bg-aged-bronze/30 text-ink-900"
                }
              >
                {newRole === "admin" ? "Admin" : "User"}
              </Badge>
            </div>

            <div className="bg-aged-bronze/10 border-l-4 border-aged-bronze p-4 rounded">
              <p className="text-sm font-serif text-ink-700">
                {newRole === "admin"
                  ? "This user will have full admin privileges and access to the admin dashboard."
                  : "This user will be reverted to a regular user with standard dashboard access."}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRoleDialog(false)}
              disabled={isUpdating}
              className="border-aged-bronze/40"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRoleChange}
              disabled={isUpdating}
              className="bg-mystical-amber hover:bg-mystical-amber/90"
            >
              {isUpdating ? (
                <>
                  <span className="animate-spin mr-2">✦</span>
                  Updating...
                </>
              ) : (
                "Update Role"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
