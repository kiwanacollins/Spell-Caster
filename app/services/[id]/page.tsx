import { notFound } from "next/navigation";
import { Metadata } from "next";
import { services } from "@/lib/services/services-data";
import ServiceDetailClient from "./client";

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all services
export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id } = await params;
  const service = services.find(s => s.id === id);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.name} | Spiritual Healing Services`,
    description: service.description,
    openGraph: {
      title: service.name,
      description: service.description,
      images: [service.icon],
    },
  };
}

/**
 * Public Service Detail Page - Server Component
 * Displays service information to non-authenticated users
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = services.find(s => s.id === id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
