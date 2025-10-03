import { PrismaClient, Role, Permission } from "@prisma/client";

export async function seedRolePermissions(prisma: PrismaClient) {
    console.log("Seeding role permissions...");

    // Get all permissions and roles
    const allPermissions: Permission[] = await prisma.permission.findMany();
    const roles: Role[] = await prisma.role.findMany();

    const superAdminRole = roles.find((r: Role) => r.name === "SUPER_ADMIN");
    const adminRole = roles.find((r: Role) => r.name === "ADMIN");
    const subAdminRole = roles.find((r: Role) => r.name === "SUB_ADMIN");
    const employeeRole = roles.find((r: Role) => r.name === "EMPLOYEE");

    if (!superAdminRole || !adminRole || !subAdminRole || !employeeRole) {
        throw new Error("Required roles not found");
    }

    // SUPER_ADMIN gets all permissions
    for (const permission of allPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: superAdminRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: superAdminRole.id,
                permissionId: permission.id,
            },
        });
    }

    // ADMIN gets most permissions except system-level ones
    const adminPermissions = allPermissions.filter(
        (p: Permission) =>
            !["user-role", "database-backup", "advanced-settings"].includes(
                p.name
            )
    );

    for (const permission of adminPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: adminRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: adminRole.id,
                permissionId: permission.id,
            },
        });
    }

    // SUB_ADMIN gets limited permissions
    const subAdminPermissions = allPermissions.filter((p: Permission) =>
        [
            "account-summery",
            "top-clients",
            "top-plans",
            "user-management",
            "update-profile",
            "payments",
        ].includes(p.name)
    );

    for (const permission of subAdminPermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: subAdminRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: subAdminRole.id,
                permissionId: permission.id,
            },
        });
    }

    // EMPLOYEE gets basic permissions
    const employeePermissions = allPermissions.filter((p: Permission) =>
        ["account-summery", "update-profile"].includes(p.name)
    );

    for (const permission of employeePermissions) {
        await prisma.rolePermission.upsert({
            where: {
                roleId_permissionId: {
                    roleId: employeeRole.id,
                    permissionId: permission.id,
                },
            },
            update: {},
            create: {
                roleId: employeeRole.id,
                permissionId: permission.id,
            },
        });
    }

    console.log("Role permissions seeded successfully!");
}
