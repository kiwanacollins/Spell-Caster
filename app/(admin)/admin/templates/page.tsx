import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { TemplateManagementClient } from "@/components/admin/template-management-client";

export const metadata: Metadata = {
  title: "Request Templates | Admin",
};

export default async function TemplatesPage() {
  // Check admin role
  try {
    await requireAdmin();
  } catch (_error) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1A1A1A" }}>
      {/* Header */}
      <div
        className="border-b px-8 py-6"
        style={{
          borderColor: "#8B6F47",
          backgroundColor: "#0F0F0F",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-3xl font-bold"
            style={{
              color: "#F4E8D0",
              fontFamily: "UnifrakturMaguntia, serif",
            }}
          >
            Request Templates Management
          </h1>
          <p style={{ color: "#C0C0C0" }} className="mt-2 text-sm">
            Create and manage templates for common service requests
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className="px-8 py-8"
        style={{
          backgroundColor: "#1A1A1A",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <TemplateManagementClient />
        </div>
      </div>
    </div>
  );
}
