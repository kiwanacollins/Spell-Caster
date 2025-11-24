import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { TemplateManagementClient } from "@/components/admin/template-management-client";

export const metadata: Metadata = {
  title: "Request Templates | Admin - Your Spell Caster",
};

export default async function TemplatesPage() {
  // Check admin role
  try {
    await requireAdmin();
  } catch (_error) {
    redirect("/login");
  }

  return (
    <div className="bg-[#1A1A1A]">
      {/* Header */}
      <div
        className="border-b px-4 md:px-8 py-4 md:py-6"
        style={{
          borderColor: "#8B6F47",
          backgroundColor: "#0F0F0F",
        }}
      >
        <div className="space-y-2">
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{
              color: "#F4E8D0",
              fontFamily: "UnifrakturMaguntia, serif",
            }}
          >
            Request Templates Management
          </h1>
          <p style={{ color: "#C0C0C0" }} className="text-xs md:text-sm">
            Create and manage templates for common service requests
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="px-4 md:px-8 py-6 md:py-8"
        style={{
          backgroundColor: "#1A1A1A",
        }}
      >
        <div className="space-y-6">
          <TemplateManagementClient />
        </div>
      </div>
    </div>
  );
}
