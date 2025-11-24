import { getSession, requireAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminTestimonialPageClient } from '@/components/admin/admin-testimonial-page-client';

export const metadata = {
  title: 'Testimonials Management | Admin Dashboard - Your Spell Caster',
  description: 'Manage and analyze client video testimonials',
};

export default async function TestimonialsPage() {
  await requireAdmin();

  return (
    <div className="bg-[#F4E8D0]">
      <div className="px-4 md:px-8 py-6 md:py-8">
        <div className="space-y-8">
          {/* Page Decoration */}
          <div className="relative">
            <div className="absolute -top-2 md:-top-4 -left-2 md:-left-4 w-16 md:w-20 h-16 md:h-20 border-2 border-[#8B6F47] rounded-full opacity-20" />
            <div className="absolute -bottom-2 md:-bottom-4 -right-2 md:-right-4 w-12 md:w-16 h-12 md:h-16 border-2 border-[#CC8800] rounded-full opacity-20" />
            <AdminTestimonialPageClient />
          </div>
        </div>
      </div>
    </div>
  );
}
