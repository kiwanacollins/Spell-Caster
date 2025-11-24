import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getServiceRequest } from "@/lib/db/models";
import { RequestDetailClient } from "@/components/admin/request-detail-client";

interface RequestDetailPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Request Details | Admin - Your Spell Caster",
};

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  // Check authentication and admin role
  try {
    await requireAdmin();
  } catch (_error) {
    redirect("/login");
  }

  // Get request ID from params
  const { id } = await params;

  // Fetch the service request
  let request;
  try {
    request = await getServiceRequest(id);

    if (!request) {
      redirect("/admin/requests");
    }
  } catch (_error) {
    console.error("Error fetching request:");
    redirect("/admin/requests");
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
            Request Details
          </h1>
          <p style={{ color: "#C0C0C0" }} className="mt-2 text-sm">
            Service Request ID: {request._id?.toString() || id}
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
          <RequestDetailClient initialRequest={request} />
        </div>
      </div>
    </div>
  );
}
