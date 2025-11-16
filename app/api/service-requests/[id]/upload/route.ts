import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { requireAdminMiddleware } from "@/lib/auth";
import { getServiceRequest, updateRitualSteps } from "@/lib/db/models";
import { ObjectId } from "mongodb";

export async function POST(
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
    const formData = await request.formData();
    const stepIndex = parseInt(formData.get("stepIndex") as string, 10);
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    // Fetch the service request
    const serviceRequest = await getServiceRequest(id);
    if (!serviceRequest) {
      return NextResponse.json(
        { error: "Service request not found" },
        { status: 404 }
      );
    }

    // Validate step index
    if (!serviceRequest.ritualSteps || stepIndex >= serviceRequest.ritualSteps.length) {
      return NextResponse.json(
        { error: "Invalid step index" },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "ritual-progress");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Save files and collect URLs
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const filename = `${id}_step${stepIndex}_${timestamp}_${file.name}`;
      const filepath = join(uploadsDir, filename);

      // Save file
      await writeFile(filepath, buffer);

      // Add URL to collection
      const url = `/uploads/ritual-progress/${filename}`;
      uploadedUrls.push(url);
    }

    // Update the service request with new photo URLs
    const updatedSteps = serviceRequest.ritualSteps.map((step, idx) => {
      if (idx === stepIndex) {
        return {
          ...step,
          photoUrls: [...(step.photoUrls || []), ...uploadedUrls],
        };
      }
      return step;
    });

    const updated = await updateRitualSteps(id, updatedSteps);

    return NextResponse.json({
      success: true,
      data: updated,
      uploadedUrls,
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}
