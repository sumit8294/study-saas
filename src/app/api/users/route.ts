import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET() {
    try {
        const users = await prisma.tech_users.findMany({
            where: {
                is_deleted: false,
            },
            include: {
                roleRelation: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });

        const formattedUsers = users.map((user) => ({
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            role: user.roleRelation?.name || user.role,
            mobile: user.mobile,
            employee_code: user.employee_code,
            created_at: user.created_at,
        }));

        return NextResponse.json({ success: true, data: formattedUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            password,
            role,
            employee_code,
            mobile,
            country_code,
            sendWelcome,
        } = body;

        // Check if user already exists
        const existingUser = await prisma.tech_users.findFirst({
            where: {
                OR: [{ email }, { employee_code }],
            },
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    error: "User with this email or employee code already exists",
                },
                { status: 400 }
            );
        }

        // Find the role in tech_roles table
        const roleRecord = await prisma.tech_roles.findFirst({
            where: {
                name: role,
            },
        });

        if (!roleRecord) {
            return NextResponse.json(
                { success: false, error: "Invalid role specified" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 12);

        // Create user
        const user = await prisma.tech_users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role as any, // For backward compatibility
                roleId: roleRecord.id,
                employee_code,
                mobile,
                country_code,
                device_type: "web",
                terms_of_use: true,
            },
            include: {
                roleRelation: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        // TODO: Send welcome email if sendWelcome is true

        const responseUser = {
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            role: user.roleRelation?.name || user.role,
            employee_code: user.employee_code,
            mobile: user.mobile,
            created_at: user.created_at,
        };

        return NextResponse.json(
            {
                success: true,
                data: responseUser,
                message: "User created successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create user" },
            { status: 500 }
        );
    }
}
