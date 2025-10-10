import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcryptjs";

export async function GET() {
    try {
        // Get the current user from session (you'll need to implement authentication)
        // For now, let's assume we get user ID from session
        const session = await getServerSession();
        // In real implementation, you'd get user ID from session
        // const userId = session.user.id;

        // For demo, using the first user - replace with actual session user ID
        const user = await prisma.tech_users.findFirst({
            where: {
                is_deleted: false,
                role: "SUPER_ADMIN", //Temporary
            },
            include: {
                roleRelation: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleRelation?.name || user.role,
            mobile: user.mobile,
            country_code: user.country_code,
            employee_code: user.employee_code,
            image: user.image,
            created_at: user.created_at,
        };

        return NextResponse.json({ success: true, data: userData });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name,
            email,
            currentPassword,
            newPassword,
            mobile,
            country_code,
        } = body;

        // Get current user ID - replace with actual session user ID
        // const userId = session.user.id;
        const user = await prisma.tech_users.findFirst({
            where: {
                is_deleted: false,
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        const userId = user.id;

        // Check if email is already taken by another user
        if (email !== user.email) {
            const emailExists = await prisma.tech_users.findFirst({
                where: {
                    email,
                    id: { not: userId },
                    is_deleted: false,
                },
            });

            if (emailExists) {
                return NextResponse.json(
                    { success: false, error: "Email already taken" },
                    { status: 400 }
                );
            }
        }

        // If password change is requested
        if (currentPassword && newPassword) {
            // Verify current password
            const isCurrentPasswordValid = await compare(
                currentPassword,
                user.password || ""
            );

            if (!isCurrentPasswordValid) {
                return NextResponse.json(
                    { success: false, error: "Current password is incorrect" },
                    { status: 400 }
                );
            }

            // Validate new password
            if (newPassword.length < 8) {
                return NextResponse.json(
                    {
                        success: false,
                        error: "New password must be at least 8 characters long",
                    },
                    { status: 400 }
                );
            }

            // Hash new password
            const hashedPassword = await hash(newPassword, 12);

            // Update user with new password
            const updatedUser = await prisma.tech_users.update({
                where: { id: userId },
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    mobile,
                    country_code,
                },
                include: {
                    roleRelation: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            const responseData = {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.roleRelation?.name || updatedUser.role,
                mobile: updatedUser.mobile,
                country_code: updatedUser.country_code,
            };

            return NextResponse.json({
                success: true,
                data: responseData,
                message: "Profile and password updated successfully",
            });
        }

        // Update profile without password change
        const updatedUser = await prisma.tech_users.update({
            where: { id: userId },
            data: {
                name,
                email,
                mobile,
                country_code,
            },
            include: {
                roleRelation: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const responseData = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.roleRelation?.name || updatedUser.role,
            mobile: updatedUser.mobile,
            country_code: updatedUser.country_code,
        };

        return NextResponse.json({
            success: true,
            data: responseData,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
