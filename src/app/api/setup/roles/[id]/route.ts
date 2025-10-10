import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get single role with permissions
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        const role = await prisma.tech_roles.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });

        if (!role) {
            return NextResponse.json(
                { error: "Role not found" },
                { status: 404 }
            );
        }

        const formattedRole = {
            id: role.id,
            name: role.name,
            description: role.description,
            isSystem: role.isSystem,
            permissions: role.permissions.map((rp) => ({
                id: rp.permission.id,
                name: rp.permission.name,
                category: rp.permission.category,
                description: rp.permission.description,
            })),
        };

        return NextResponse.json(formattedRole);
    } catch (error) {
        console.error("Error fetching role:", error);
        return NextResponse.json(
            { error: "Failed to fetch role" },
            { status: 500 }
        );
    }
}

// PUT - Update role with permissions
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();

        // Check if role exists
        const existingRole = await prisma.tech_roles.findUnique({
            where: { id },
        });

        if (!existingRole) {
            return NextResponse.json(
                { error: "Role not found" },
                { status: 404 }
            );
        }

        // Check if name is being changed and if it already exists
        if (body.name && body.name !== existingRole.name) {
            const nameExists = await prisma.tech_roles.findUnique({
                where: { name: body.name },
            });

            if (nameExists) {
                return NextResponse.json(
                    { error: "Role name already exists" },
                    { status: 400 }
                );
            }
        }

        // Update role details
        const role = await prisma.tech_roles.update({
            where: { id },
            data: {
                name: body.name,
                description: body.description,
            },
        });

        // Update permissions if provided
        if (body.permissionIds) {
            // Delete existing role-permission relationships
            await prisma.tech_role_permissions.deleteMany({
                where: { roleId: id },
            });

            // Create new role-permission relationships
            if (body.permissionIds.length > 0) {
                const rolePermissions = body.permissionIds.map(
                    (permissionId: string) => ({
                        roleId: id,
                        permissionId: permissionId,
                    })
                );

                await prisma.tech_role_permissions.createMany({
                    data: rolePermissions,
                });
            }
        }

        // Return updated role with permissions
        const updatedRole = await prisma.tech_roles.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });

        const formattedRole = updatedRole
            ? {
                  id: updatedRole.id,
                  name: updatedRole.name,
                  description: updatedRole.description,
                  isSystem: updatedRole.isSystem,
                  permissions: updatedRole.permissions.map((rp) => ({
                      id: rp.permission.id,
                      name: rp.permission.name,
                      category: rp.permission.category,
                      description: rp.permission.description,
                  })),
              }
            : null;

        return NextResponse.json(formattedRole);
    } catch (error) {
        console.error("Error updating role:", error);
        return NextResponse.json(
            { error: "Failed to update role" },
            { status: 500 }
        );
    }
}

// DELETE - Delete role
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        // Check if role exists
        const existingRole = await prisma.tech_roles.findUnique({
            where: { id },
        });

        if (!existingRole) {
            return NextResponse.json(
                { error: "Role not found" },
                { status: 404 }
            );
        }

        // Prevent deletion of system roles
        if (existingRole.isSystem) {
            return NextResponse.json(
                { error: "Cannot delete system role" },
                { status: 400 }
            );
        }

        // Check if role is assigned to any users
        const usersWithRole = await prisma.tech_users.count({
            where: { roleId: id },
        });

        if (usersWithRole > 0) {
            return NextResponse.json(
                { error: "Cannot delete role that is assigned to users" },
                { status: 400 }
            );
        }

        await prisma.tech_roles.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error("Error deleting role:", error);
        return NextResponse.json(
            { error: "Failed to delete role" },
            { status: 500 }
        );
    }
}
