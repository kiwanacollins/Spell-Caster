import { NextRequest, NextResponse } from "next/server";
import {
  getRequestTemplate,
  updateRequestTemplate,
  deleteRequestTemplate,
} from "@/lib/db/models";
import { requireAdminMiddleware } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const template = await getRequestTemplate(id);
    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    console.error("Error fetching template:", error);
    return NextResponse.json(
      { error: "Failed to fetch template" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin role
    const authError = await requireAdminMiddleware(request);
    if (authError) {
      return NextResponse.json(authError, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await updateRequestTemplate(id, {
      ...body,
      updatedAt: new Date(),
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json(
      { error: "Failed to update template" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin role
    const authError = await requireAdminMiddleware(request);
    if (authError) {
      return NextResponse.json(authError, { status: 401 });
    }

    const { id } = await params;

    const deleted = await deleteRequestTemplate(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json(
      { error: "Failed to delete template" },
      { status: 500 }
    );
  }
}
