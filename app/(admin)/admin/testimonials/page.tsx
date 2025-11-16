import { getSession, requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminTestimonialPageClient } from '@/components/admin/admin-testimonial-page-client';

export const metadata = {
  title: 'Testimonials Management | Admin Dashboard',
  description: 'Manage and analyze client video testimonials',
};

export default async function TestimonialsPage() {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#F4E8D0]">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Page Decoration */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-[#8B6F47] rounded-full opacity-20" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-[#CC8800] rounded-full opacity-20" />
            <AdminTestimonialPageClient />
          </div>
        </div>
      </div>
    </div>
  );
}
