import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get all roles with their permissions
export async function GET() {
    try {
        const roles = await prisma.tech_roles.findMany({
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Format the response
        const formattedRoles = roles.map((role) => ({
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
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
        }));

        return NextResponse.json(formattedRoles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        return NextResponse.json(
            { error: "Failed to fetch roles" },
            { status: 500 }
        );
    }
}

// POST - Create new role with permissions
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Check if role name already exists
        const existingRole = await prisma.tech_roles.findUnique({
            where: { name: body.name },
        });

        if (existingRole) {
            return NextResponse.json(
                { error: "Role name already exists" },
                { status: 400 }
            );
        }

        // Create the role
        const role = await prisma.tech_roles.create({
            data: {
                name: body.name,
                description: body.description,
                isSystem: false,
            },
        });

        // Create role-permission relationships if permissions are provided
        if (body.permissionIds && body.permissionIds.length > 0) {
            const rolePermissions = body.permissionIds.map(
                (permissionId: string) => ({
                    roleId: role.id,
                    permissionId: permissionId,
                })
            );

            await prisma.tech_role_permissions.createMany({
                data: rolePermissions,
            });
        }

        // Return the created role with permissions
        const createdRole = await prisma.tech_roles.findUnique({
            where: { id: role.id },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });

        const formattedRole = createdRole
            ? {
                  id: createdRole.id,
                  name: createdRole.name,
                  description: createdRole.description,
                  isSystem: createdRole.isSystem,
                  permissions: createdRole.permissions.map((rp) => ({
                      id: rp.permission.id,
                      name: rp.permission.name,
                      category: rp.permission.category,
                      description: rp.permission.description,
                  })),
              }
            : null;

        return NextResponse.json(formattedRole, { status: 201 });
    } catch (error) {
        console.error("Error creating role:", error);
        return NextResponse.json(
            { error: "Failed to create role" },
            { status: 500 }
        );
    }
}
