import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { z } from "zod";
import admin from 'firebase-admin';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import '@/lib/firebaseAdmin'; // Ensure Firebase Admin is initialized

const FileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
      {
        message: "File type should be JPEG, PNG, or PDF",
      },
    ),
});

export async function POST(request: Request) {
  // Remove incorrect session check: const session = await auth();

  // if (!session) { - REMOVED Check - Handled by token verification
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // --- Firebase Auth Check ---
  const authorization = request.headers.get("Authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized: Missing or invalid Authorization header" }, { status: 401 });
  }
  const token = authorization.split("Bearer ")[1];
  let userId: string;
  try {
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    userId = decodedToken.uid;
    // userId is available here if needed for associating uploads with users
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
  }
  // --- End Firebase Auth Check ---

  if (request.body === null) {
    return new Response("Request body is empty", { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(", ");

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const filename = file.name;
    const fileBuffer = await file.arrayBuffer();

    try {
      const data = await put(`${filename}`, fileBuffer, {
        access: "public",
      });

      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
