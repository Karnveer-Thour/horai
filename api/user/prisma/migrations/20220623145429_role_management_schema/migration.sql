-- CreateTable
CREATE TABLE "Resource" (
    "resourceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("resourceId")
);

-- CreateTable
CREATE TABLE "EndPointPermission" (
    "endPointPermissionId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "api" TEXT NOT NULL,
    "method" Text NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("endPointPermissionId")
);

-- CreateTable
CREATE TABLE "Action" (
    "actionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("actionId")
);

-- CreateTable
CREATE TABLE "Role" (
    "roleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "RoleAction" (
    "roleId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PermissionGroup" (
    "permissionGroupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("permissionGroupId")
);

-- CreateTable
CREATE TABLE "PermissionGroupAction" (
    "permissionGroupId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserPermissionGroup" (
    "email" TEXT NOT NULL,
    "permissionGroupId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleAction.roleId_actionId_unique" ON "RoleAction"("roleId", "actionId");

-- CreateIndex
CREATE UNIQUE INDEX "PermissionGroupAction.permissionGroupId_actionId_unique" ON "PermissionGroupAction"("permissionGroupId", "actionId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermissionGroup.email_permissionGroupId_unique" ON "UserPermissionGroup"("email", "permissionGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPermissionGroup_email_unique" ON "UserPermissionGroup"("email");

-- AddForeignKey
ALTER TABLE "EndPointPermission" ADD FOREIGN KEY ("resourceId") REFERENCES "Resource"("resourceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD FOREIGN KEY ("resourceId") REFERENCES "Resource"("resourceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleAction" ADD FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleAction" ADD FOREIGN KEY ("actionId") REFERENCES "Action"("actionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroupAction" ADD FOREIGN KEY ("permissionGroupId") REFERENCES "PermissionGroup"("permissionGroupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionGroupAction" ADD FOREIGN KEY ("actionId") REFERENCES "Action"("actionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissionGroup" ADD FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPermissionGroup" ADD FOREIGN KEY ("permissionGroupId") REFERENCES "PermissionGroup"("permissionGroupId") ON DELETE CASCADE ON UPDATE CASCADE;
