/*
  Warnings:

  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EndPointPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PermissionGroupAction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoleAction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPermissionGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "EndPointPermission" DROP CONSTRAINT "EndPointPermission_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionGroupAction" DROP CONSTRAINT "PermissionGroupAction_actionId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionGroupAction" DROP CONSTRAINT "PermissionGroupAction_permissionGroupId_fkey";

-- DropForeignKey
ALTER TABLE "RoleAction" DROP CONSTRAINT "RoleAction_actionId_fkey";

-- DropForeignKey
ALTER TABLE "RoleAction" DROP CONSTRAINT "RoleAction_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserPermissionGroup" DROP CONSTRAINT "UserPermissionGroup_email_fkey";

-- DropForeignKey
ALTER TABLE "UserPermissionGroup" DROP CONSTRAINT "UserPermissionGroup_permissionGroupId_fkey";

-- DropTable
DROP TABLE "Action";

-- DropTable
DROP TABLE "EndPointPermission";

-- DropTable
DROP TABLE "PermissionGroup";

-- DropTable
DROP TABLE "PermissionGroupAction";

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "RoleAction";

-- DropTable
DROP TABLE "UserPermissionGroup";

DELETE FROM "CasbinRule" WHERE id=1;
INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'smb', 'eventResource', '(create)|(read)|(update)|(delete)', '', '', '');
INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'duy.cao@saigontechnology.com', 'eventResource_data', 'febe7cd7-5afc-4081-9576-43d96c48cf21', '', '', '');
