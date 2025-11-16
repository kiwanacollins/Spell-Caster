import { NextRequest, NextResponse } from "next/server";
import {
  getActiveTemplates,
  getTemplatesByServiceType,
  searchTemplates,
  createRequestTemplateOp,
} from "@/lib/db/models";
import { requireAdminMiddleware } from "@/lib/auth";
import { RequestTemplate } from "@/lib/db/models";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceType = searchParams.get("serviceType");
    const search = searchParams.get("search");

    let templates: RequestTemplate[];

    if (search) {
      templates = await searchTemplates(search);
    } else if (serviceType) {
      templates = await getTemplatesByServiceType(serviceType);
    } else {
      templates = await getActiveTemplates();
    }

    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check admin role
    const authError = await requireAdminMiddleware(request);
    if (authError) {
      return NextResponse.json(authError, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      serviceType,
      serviceName,
      description,
      ritualSteps,
      estimatedPrice,
      estimatedCompletionDays,
      priority,
      category,
      prefilledNotes,
      clientTips,
    } = body;

    if (!name || !serviceType || !serviceName || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get admin ID from session (basic implementation)
    const createdBy = "admin"; // In production, get from session

    const template = await createRequestTemplateOp(
      name,
      serviceType,
      serviceName,
      description,
      createdBy,
      {
        ritualSteps,
        estimatedPrice,
        estimatedCompletionDays,
        priority,
        category,
        prefilledNotes,
        clientTips,
      }
    );

    return NextResponse.json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}
