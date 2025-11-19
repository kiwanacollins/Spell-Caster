import { getCurrentUser, requireAdmin } from '@/lib/auth/session';
import { AdminServicesBrowserClient } from '@/components/admin/admin-services-browser-client';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Services Browser | Admin Dashboard',
  description: 'Browse all spiritual services and create quotes for clients',
};

export default async function AdminServicesBrowserPage() {
  // Require admin authentication
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    redirect('/login');
  }

  return <AdminServicesBrowserClient />;
}
