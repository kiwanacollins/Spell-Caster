import { getCurrentUser, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ServiceRequestsQueueClient } from "@/components/admin/service-requests-queue-client";

export const metadata = {
  title: "Service Requests Queue | Admin Portal - Your Spell Caster",
  description: "Manage and track service requests",
};

export default async function ServiceRequestsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userIsAdmin = await isAdmin();

  if (!userIsAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-[#F4E8D0] border-4 border-[#8B6F47] rounded-sm p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-['MedievalSharp'] text-[#1A1A1A] mb-2">
            Service Request Queue
          </h1>
          <p className="text-sm md:text-base text-[#4A4A4A] font-['Crimson_Text']">
            Manage and track all service requests across the platform
          </p>
        </div>

        {/* Client Component */}
        <ServiceRequestsQueueClient />
      </div>
    </div>
  );
}
