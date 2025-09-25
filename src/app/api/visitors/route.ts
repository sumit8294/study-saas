// src/app/api/visitors/route.ts
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Visitors API route is working!" });
}
