import { requireAdmin } from '@/lib/auth/session';
import { AdminLayoutClient } from '@/components/admin/admin-layout-client';
import { AdminInsightsEditor } from '@/components/admin/admin-insights-editor';

export const metadata = {
  title: 'Admin CMS | Your Spell Caster',
};

export default async function AdminCMSPage() {
  await requireAdmin();

  return (
    <AdminLayoutClient>
      <div className="p-3 md:p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-['MedievalSharp']">Content Management</h1>
        <section>
          <h2 className="text-lg md:text-xl font-semibold">Mystical Insights & Guidance</h2>
          {/* @ts-ignore Server Component: AdminInsightsEditor is client-only */}
          <AdminInsightsEditor />
        </section>
      </div>
    </AdminLayoutClient>
  );
}
