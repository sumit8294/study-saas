import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        const user = await prisma.tech_users.findFirst({
            where: {
                id,
                is_deleted: false,
            },
            include: {
                roleRelation: {
                    select: {
                        id: true,
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
            roleId: user.roleId,
            employee_code: user.employee_code,
            mobile: user.mobile,
            country_code: user.country_code,
        };

        return NextResponse.json({ success: true, data: userData });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch user" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();
        const {
            name,
            email,
            role,
            employee_code,
            mobile,
            country_code,
            password,
        } = body;

        // Check if user exists
        const existingUser = await prisma.tech_users.findFirst({
            where: {
                id,
                is_deleted: false,
            },
        });

        if (!existingUser) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        // Check if email is already taken by another user
        if (email !== existingUser.email) {
            const emailExists = await prisma.tech_users.findFirst({
                where: {
                    email,
                    id: { not: id },
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

        // Prepare update data
        const updateData: any = {
            name,
            email,
            role: role as any,
            roleId: roleRecord.id,
            employee_code,
            mobile,
            country_code,
        };

        // Update password if provided
        if (password) {
            updateData.password = await hash(password, 12);
        }

        const updatedUser = await prisma.tech_users.update({
            where: { id },
            data: updateData,
            include: {
                roleRelation: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const responseUser = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.roleRelation?.name || updatedUser.role,
            employee_code: updatedUser.employee_code,
            mobile: updatedUser.mobile,
        };

        return NextResponse.json({
            success: true,
            data: responseUser,
            message: "User updated successfully",
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update user" },
            { status: 500 }
        );
    }
}

// export async function DELETE(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         const id = parseInt(params.id);

//         // Soft delete user
//         await prisma.tech_users.update({
//             where: { id },
//             data: {
//                 is_deleted: true,
//                 email: `${existingUser.email}_deleted_${Date.now()}`, // De-duplicate email
//                 employee_code: `${
//                     existingUser.employee_code
//                 }_deleted_${Date.now()}`,
//             },
//         });

//         return NextResponse.json({
//             success: true,
//             message: "User deleted successfully",
//         });
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return NextResponse.json(
//             { success: false, error: "Failed to delete user" },
//             { status: 500 }
//         );
//     }
// }
