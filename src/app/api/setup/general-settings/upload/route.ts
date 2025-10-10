import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string; // whiteLogo, blackLogo, smallLogo, favicon

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/svg+xml",
            "image/x-icon",
        ];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    error: "Invalid file type. Only JPEG, PNG, SVG, and ICO files are allowed.",
                },
                { status: 400 }
            );
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size too large. Maximum size is 5MB." },
                { status: 400 }
            );
        }

        // Generate unique filename
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileExtension = path.extname(file.name);
        const fileName = `${type}_${Date.now()}${fileExtension}`;
        const uploadDir = path.join(process.cwd(), "public/uploads/logos");

        // In a real application, you'd want to ensure the directory exists
        // For now, we'll return a relative path
        const filePath = `/uploads/logos/${fileName}`;

        // Save file to public directory
        await writeFile(path.join(process.cwd(), "public", filePath), buffer);

        return NextResponse.json({
            success: true,
            filePath: filePath,
            fileName: fileName,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
