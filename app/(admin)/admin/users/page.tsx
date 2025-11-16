import { getCurrentUser, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminUsersManagement from "@/components/admin/admin-users-management";

export const metadata = {
  title: "User Management | Admin Portal",
  description: "Manage users and assign admin roles",
};

export default async function AdminUsersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userIsAdmin = await isAdmin();

  if (!userIsAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-parchment-light border-4 border-aged-bronze/40 rounded p-8 relative">
        {/* Decorative corner flourishes */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-sacred-gold/60" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-sacred-gold/60" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-sacred-gold/60" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sacred-gold/60" />

        <h1 className="text-4xl font-medieval text-ink-900 mb-2">
          User Management
        </h1>
        <p className="text-ink-700 font-serif text-lg">
          Manage users and assign admin roles
        </p>
      </div>

      {/* User Management Component */}
      <AdminUsersManagement />
    </div>
  );
}
