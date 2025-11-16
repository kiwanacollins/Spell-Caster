/**
 * Layout for Service Detail Page with SEO metadata
 */

import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services/service-data";
import type { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate static params for all services
 */
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} - Spiritual Healing Services`,
    description: service.shortDescription,
  };
}

export default function Layout({ children }: LayoutProps) {
  return children;
}
