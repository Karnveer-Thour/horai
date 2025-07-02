-- AlterTable
INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'hasPermissionAccessEventResource(r.sub,r.res,r.act)', 'eventResource', '(create)|(read)|(update)|(delete)', '', '', '');

INSERT INTO "Role" ("roleId", name, "createdAt", "updatedAt") VALUES ('sv', 'sv', '2022-07-01 15:31:04.000', '2022-07-01 15:31:07.000');
INSERT INTO "Role" ("roleId", name, "createdAt", "updatedAt") VALUES ('smb', 'smb', '2022-07-01 15:31:04.000', '2022-07-01 15:31:07.000');
INSERT INTO "Role" ("roleId", name, "createdAt", "updatedAt") VALUES ('amo', 'amo', '2022-07-01 15:31:04.000', '2022-07-01 15:31:07.000');

INSERT INTO "Resource" ("resourceId", name, "createdAt", "updatedAt") VALUES ('bb9344d4-2250-4345-8ec0-3a22966f0be6', 'eventResource', '2022-07-01 15:40:00.000', '2022-07-01 15:40:02.000');

INSERT INTO "Action" ("actionId", name, "resourceId", "createdAt", "updatedAt") VALUES ('a3222c92-52f1-42ab-91a9-128d8b26b51f', 'create', 'bb9344d4-2250-4345-8ec0-3a22966f0be6', '2022-07-01 15:41:15.000', '2022-07-01 15:41:16.000');
INSERT INTO "Action" ("actionId", name, "resourceId", "createdAt", "updatedAt") VALUES ('9c83a88d-0ac3-4f05-a6cc-d47a0b90611f', 'read', 'bb9344d4-2250-4345-8ec0-3a22966f0be6', '2022-07-01 15:41:15.000', '2022-07-01 15:41:16.000');
INSERT INTO "Action" ("actionId", name, "resourceId", "createdAt", "updatedAt") VALUES ('9d392d0d-57f0-4c32-8006-72c2ac541629', 'update', 'bb9344d4-2250-4345-8ec0-3a22966f0be6', '2022-07-01 15:41:15.000', '2022-07-01 15:41:16.000');
INSERT INTO "Action" ("actionId", name, "resourceId", "createdAt", "updatedAt") VALUES ('e8c5777a-a3e0-41c8-b150-40b6a2b33ad5', 'delete', 'bb9344d4-2250-4345-8ec0-3a22966f0be6', '2022-07-01 15:41:15.000', '2022-07-01 15:41:16.000');


INSERT INTO "RoleAction" ("roleId", "actionId") VALUES ('smb', 'a3222c92-52f1-42ab-91a9-128d8b26b51f');
INSERT INTO "RoleAction" ("roleId", "actionId") VALUES ('smb', '9c83a88d-0ac3-4f05-a6cc-d47a0b90611f');
INSERT INTO "RoleAction" ("roleId", "actionId") VALUES ('smb', '9d392d0d-57f0-4c32-8006-72c2ac541629');
INSERT INTO "RoleAction" ("roleId", "actionId") VALUES ('smb', 'e8c5777a-a3e0-41c8-b150-40b6a2b33ad5');
