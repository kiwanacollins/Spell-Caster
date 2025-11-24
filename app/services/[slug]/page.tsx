import { notFound } from "next/navigation";
import { Metadata } from "next";
import { services, getAllServiceSlugs, getServiceBySlug } from "@/lib/services/service-data";
import ServiceDetailClient from "./client";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all services
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found - Your Spell Caster',
    };
  }

  return {
    title: `${service.title} - Your Spell Caster`,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
      type: 'website',
    },
  };
}

/**
 * Public Service Detail Page - Server Component
 * Displays service information to non-authenticated users
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
