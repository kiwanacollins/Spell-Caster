import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/services/service-data";
import ServiceDetailClient from "./client";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Service Detail Page - Server Component
 * Fetches service data, then passes to client for interactivity
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient service={service} />;
}
