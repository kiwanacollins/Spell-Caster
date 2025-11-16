"use client";

import { useState, useEffect } from "react";
import { RequestTemplate } from "@/lib/db/models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MysticalLoader } from "@/components/ui/mystical-loader";
import { FiPlus, FiMoreVertical, FiTrash2, FiEdit2 } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";

export function TemplateManagementClient() {
  const [templates, setTemplates] = useState<RequestTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    serviceType: "",
    serviceName: "",
    description: "",
    category: "",
    estimatedPrice: "",
    estimatedCompletionDays: "",
    priority: "medium",
    prefilledNotes: "",
    clientTips: "",
  });

  // Fetch templates
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (filterServiceType) params.append("serviceType", filterServiceType);

      const response = await fetch(`/api/templates?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!formData.name || !formData.serviceType || !formData.serviceName) {
      return;
    }

    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          estimatedPrice: formData.estimatedPrice
            ? parseInt(formData.estimatedPrice)
            : undefined,
          estimatedCompletionDays: formData.estimatedCompletionDays
            ? parseInt(formData.estimatedCompletionDays)
            : undefined,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTemplates([data.data, ...templates]);
        setFormData({
          name: "",
          serviceType: "",
          serviceName: "",
          description: "",
          category: "",
          estimatedPrice: "",
          estimatedCompletionDays: "",
          priority: "medium",
          prefilledNotes: "",
          clientTips: "",
        });
        setIsCreateOpen(false);
      }
    } catch (error) {
      console.error("Failed to create template:", error);
    }
  };

  const handleDeleteTemplate = async (templateId: string | undefined) => {
    if (!templateId) return;

    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTemplates(templates.filter((t) => t._id?.toString() !== templateId));
      }
    } catch (error) {
      console.error("Failed to delete template:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-['MedievalSharp'] text-[#1A1A1A]">
            Request Templates
          </h1>
          <p className="text-[#4A4A4A] mt-1 font-['Crimson_Text']">
            Create templates for frequently requested services
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#2C5530] hover:bg-[#1a3621] text-[#F4E8D0] border-2 border-[#2C5530] font-['MedievalSharp']">
              <FiPlus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47] max-w-2xl max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-[#1A1A1A] font-['MedievalSharp']">
                Create New Template
              </DialogTitle>
              <DialogDescription className="text-[#4A4A4A]">
                Define a reusable template for common service requests
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                    Template Name
                  </label>
                  <Input
                    placeholder="e.g., Love Spell - New Relationship"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                    Category
                  </label>
                  <Input
                    placeholder="e.g., Love, Protection, Prosperity"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                    Service Type
                  </label>
                  <Input
                    placeholder="e.g., love_spell"
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceType: e.target.value })
                    }
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                    Service Name
                  </label>
                  <Input
                    placeholder="e.g., Love Spell Ritual"
                    value={formData.serviceName}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceName: e.target.value })
                    }
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Detailed description of the service..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                    Estimated Price
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.estimatedPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedPrice: e.target.value })
                    }
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                    Est. Completion (Days)
                  </label>
                  <Input
                    type="number"
                    placeholder="7"
                    value={formData.estimatedCompletionDays}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedCompletionDays: e.target.value,
                      })
                    }
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                  Admin Notes (Prefilled)
                </label>
                <Textarea
                  placeholder="Notes for admins working on this request..."
                  value={formData.prefilledNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, prefilledNotes: e.target.value })
                  }
                  className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                  Client Tips/Guidance
                </label>
                <Textarea
                  placeholder="Guidance or tips for clients using this template..."
                  value={formData.clientTips}
                  onChange={(e) =>
                    setFormData({ ...formData, clientTips: e.target.value })
                  }
                  className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  rows={2}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                className="border-[#8B6F47] text-[#1A1A1A]"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#2C5530] hover:bg-[#1a3621] text-[#F4E8D0]"
                onClick={handleCreateTemplate}
              >
                Create Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F4E8D0] border-2 border-[#8B6F47] p-4">
        <Input
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={() => fetchTemplates()}
          className="border-[#8B6F47] bg-white text-[#1A1A1A]"
        />
        <Input
          placeholder="Filter by service type..."
          value={filterServiceType}
          onChange={(e) => setFilterServiceType(e.target.value)}
          onKeyUp={() => fetchTemplates()}
          className="border-[#8B6F47] bg-white text-[#1A1A1A]"
        />
      </div>

      {/* Templates Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <MysticalLoader />
        </div>
      ) : templates.length === 0 ? (
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <CardContent className="py-12 text-center text-[#4A4A4A] font-['Crimson_Text']">
            No templates found. Create your first template to get started.
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#8B6F47]/10">
                <TableRow className="hover:bg-transparent border-b-2 border-[#8B6F47]">
                  <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                    Template Name
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                    Service
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                    Category
                  </TableHead>
                  <TableHead className="text-[#1A1A1A] font-['MedievalSharp']">
                    Usage
                  </TableHead>
                  <TableHead className="text-center text-[#1A1A1A] font-['MedievalSharp']">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow
                    key={template._id?.toString()}
                    className="border-b border-[#8B6F47]/30 hover:bg-[#FFF9E6] transition-colors"
                  >
                    <TableCell className="font-['MedievalSharp'] text-[#1A1A1A]">
                      {template.name}
                    </TableCell>
                    <TableCell className="text-[#4A4A4A]">
                      {template.serviceName}
                    </TableCell>
                    <TableCell>
                      {template.category && (
                        <Badge className="bg-[#8B6F47] text-[#F4E8D0]">
                          {template.category}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-[#4A4A4A]">
                      {template.usageCount} times
                    </TableCell>
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
                          <DropdownMenuItem
                            onClick={() =>
                              handleDeleteTemplate(template._id?.toString())
                            }
                            className="text-[#8B0000] cursor-pointer"
                          >
                            <FiTrash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Stats */}
      {templates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                Total Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-['MedievalSharp'] text-[#8B6F47]">
                {templates.length}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                Total Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-['MedievalSharp'] text-[#B8860B]">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                Most Popular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-['MedievalSharp'] text-[#1A1A1A] truncate">
                {templates.length > 0
                  ? templates.reduce((max, t) =>
                      t.usageCount > max.usageCount ? t : max
                    ).name
                  : "N/A"}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
