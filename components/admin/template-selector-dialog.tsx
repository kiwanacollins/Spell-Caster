"use client";

import { useState, useEffect } from "react";
import { RequestTemplate } from "@/lib/db/models";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MysticalLoader } from "@/components/ui/mystical-loader";
import { FiSearch } from "react-icons/fi";
import { GiSpellBook } from "react-icons/gi";

interface TemplateSelector {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: RequestTemplate) => void;
  serviceType?: string;
}

export function TemplateSelectorDialog({
  isOpen,
  onClose,
  onSelectTemplate,
  serviceType,
}: TemplateSelector) {
  const [templates, setTemplates] = useState<RequestTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchTemplates();
    }
  }, [isOpen]);

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (serviceType) {
        params.append("serviceType", serviceType);
      }
      if (searchTerm) {
        params.append("search", searchTerm);
      }

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

  const handleSelectTemplate = async (template: RequestTemplate) => {
    // Increment usage count
    try {
      await fetch(`/api/templates/${template._id?.toString()}/use`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to increment usage:", error);
    }

    onSelectTemplate(template);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47] max-w-2xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1A1A1A] font-['MedievalSharp'] flex items-center gap-2">
            <GiSpellBook className="text-[#B8860B]" />
            Select a Template
          </DialogTitle>
          <DialogDescription className="text-[#4A4A4A]">
            Choose a template to prefill your request with common patterns
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 h-4 w-4 text-[#8B6F47]" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={fetchTemplates}
            className="pl-9 border-[#8B6F47] bg-white text-[#1A1A1A]"
          />
        </div>

        {/* Templates List */}
        {loading ? (
          <div className="flex justify-center py-8">
            <MysticalLoader />
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-8 text-[#4A4A4A] font-['Crimson_Text']">
            No templates available
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {templates.map((template) => (
              <Card
                key={template._id?.toString()}
                className="bg-white border-2 border-[#8B6F47]/30 hover:border-[#8B6F47] cursor-pointer transition-all"
                onClick={() => handleSelectTemplate(template)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="text-xs text-[#8B6F47] mt-1">
                        {template.serviceName}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {template.category && (
                        <Badge className="bg-[#8B6F47]/20 text-[#8B6F47] text-xs">
                          {template.category}
                        </Badge>
                      )}
                      <Badge className="bg-[#B8860B]/20 text-[#B8860B] text-xs">
                        {template.usageCount} used
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {template.description && (
                    <p className="text-xs text-[#4A4A4A] line-clamp-2">
                      {template.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {template.estimatedPrice && (
                      <div className="bg-[#F4E8D0] p-2 rounded border border-[#8B6F47]/20">
                        <p className="text-[#8B6F47] font-['MedievalSharp'] uppercase text-[10px]">
                          Price
                        </p>
                        <p className="text-[#1A1A1A] font-bold">
                          ${template.estimatedPrice}
                        </p>
                      </div>
                    )}

                    {template.estimatedCompletionDays && (
                      <div className="bg-[#F4E8D0] p-2 rounded border border-[#8B6F47]/20">
                        <p className="text-[#8B6F47] font-['MedievalSharp'] uppercase text-[10px]">
                          Time
                        </p>
                        <p className="text-[#1A1A1A] font-bold">
                          {template.estimatedCompletionDays} days
                        </p>
                      </div>
                    )}
                  </div>

                  {template.clientTips && (
                    <div className="bg-[#E8DCC8] p-2 rounded border-l-4 border-[#B8860B]">
                      <p className="text-xs text-[#4A4A4A] italic">
                        💡 {template.clientTips}
                      </p>
                    </div>
                  )}

                  <Button
                    className="w-full bg-[#2C5530] hover:bg-[#1a3621] text-[#F4E8D0] text-xs h-8"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
