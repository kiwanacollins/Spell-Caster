import { getDatabase } from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";
import { RequestTemplate, createRequestTemplate } from "./request-template";

/**
 * Request Template Database Operations
 */

/**
 * Create a new request template
 */
export async function createRequestTemplateOp(
  name: string,
  serviceType: string,
  serviceName: string,
  description: string,
  createdBy: string,
  options?: {
    ritualSteps?: RequestTemplate["ritualSteps"];
    estimatedPrice?: number;
    estimatedCompletionDays?: number;
    priority?: "low" | "medium" | "high" | "urgent";
    category?: string;
    prefilledNotes?: string;
    clientTips?: string;
  }
): Promise<RequestTemplate> {
  const db = await getDatabase();
  const template = createRequestTemplate(
    name,
    serviceType,
    serviceName,
    description,
    createdBy
  );

  if (options) {
    if (options.ritualSteps) template.ritualSteps = options.ritualSteps;
    if (options.estimatedPrice) template.estimatedPrice = options.estimatedPrice;
    if (options.estimatedCompletionDays)
      template.estimatedCompletionDays = options.estimatedCompletionDays;
    if (options.priority) template.priority = options.priority;
    if (options.category) template.category = options.category;
    if (options.prefilledNotes) template.prefilledNotes = options.prefilledNotes;
    if (options.clientTips) template.clientTips = options.clientTips;
  }

  const result = await db.collection("requestTemplate").insertOne(template as any);
  return { ...template, _id: result.insertedId };
}

/**
 * Get template by ID
 */
export async function getRequestTemplate(
  templateId: string
): Promise<RequestTemplate | null> {
  const db = await getDatabase();
  return (await db.collection("requestTemplate").findOne({
    _id: new ObjectId(templateId),
  })) as RequestTemplate | null;
}

/**
 * Get all active templates
 */
export async function getActiveTemplates(): Promise<RequestTemplate[]> {
  const db = await getDatabase();
  return (await db
    .collection("requestTemplate")
    .find({ active: true })
    .sort({ usageCount: -1, createdAt: -1 })
    .toArray()) as RequestTemplate[];
}

/**
 * Get templates by service type
 */
export async function getTemplatesByServiceType(
  serviceType: string
): Promise<RequestTemplate[]> {
  const db = await getDatabase();
  return (await db
    .collection("requestTemplate")
    .find({ serviceType, active: true })
    .sort({ usageCount: -1, createdAt: -1 })
    .toArray()) as RequestTemplate[];
}

/**
 * Get templates by category
 */
export async function getTemplatesByCategory(
  category: string
): Promise<RequestTemplate[]> {
  const db = await getDatabase();
  return (await db
    .collection("requestTemplate")
    .find({ category, active: true })
    .sort({ usageCount: -1, createdAt: -1 })
    .toArray()) as RequestTemplate[];
}

/**
 * Update template
 */
export async function updateRequestTemplate(
  templateId: string,
  updates: Partial<RequestTemplate>
): Promise<RequestTemplate | null> {
  const db = await getDatabase();
  const { _id, ...updateData } = updates;

  const result = await db.collection("requestTemplate").findOneAndUpdate(
    { _id: new ObjectId(templateId) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result.value as RequestTemplate | null;
}

/**
 * Increment usage count when template is used
 */
export async function incrementTemplateUsage(
  templateId: string
): Promise<RequestTemplate | null> {
  const db = await getDatabase();

  const result = await db.collection("requestTemplate").findOneAndUpdate(
    { _id: new ObjectId(templateId) },
    {
      $inc: { usageCount: 1 },
      $set: {
        lastUsedAt: new Date(),
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result.value as RequestTemplate | null;
}

/**
 * Delete template (soft delete by marking inactive)
 */
export async function deleteRequestTemplate(
  templateId: string
): Promise<RequestTemplate | null> {
  const db = await getDatabase();

  const result = await db.collection("requestTemplate").findOneAndUpdate(
    { _id: new ObjectId(templateId) },
    {
      $set: {
        active: false,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );

  return result.value as RequestTemplate | null;
}

/**
 * Get templates count
 */
export async function getTemplateCount(
  serviceType?: string
): Promise<number> {
  const db = await getDatabase();
  const query = { active: true };
  if (serviceType) {
    (query as any).serviceType = serviceType;
  }
  return await db.collection("requestTemplate").countDocuments(query);
}

/**
 * Search templates by name or category
 */
export async function searchTemplates(
  searchTerm: string
): Promise<RequestTemplate[]> {
  const db = await getDatabase();
  return (await db
    .collection("requestTemplate")
    .find({
      active: true,
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { serviceName: { $regex: searchTerm, $options: "i" } },
      ],
    })
    .sort({ usageCount: -1, createdAt: -1 })
    .toArray()) as RequestTemplate[];
}
