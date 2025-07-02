-- This is an empty migration.
-- DropTable
DROP TABLE "CasbinRule";

-- CreateTable
CREATE TABLE "CasbinRule" (
    "id" SERIAL NOT NULL,
    "ptype" TEXT NOT NULL,
    "v0" TEXT,
    "v1" TEXT,
    "v2" TEXT,
    "v3" TEXT,
    "v4" TEXT,
    "v5" TEXT,

    PRIMARY KEY ("id")
);
INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'hasPermissionAccessEventResource(r.sub,r.res,r.act)', 'eventResource', '(create)|(read)|(update)|(delete)', '', '', '');
DELETE FROM "CasbinRule" WHERE id=1;
INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'smb', 'eventResource', '(create)|(read)|(update)|(delete)', '', '', '');
INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'duy.cao@saigontechnology.com', 'eventResource_data', 'febe7cd7-5afc-4081-9576-43d96c48cf21', '', '', '');
UPDATE "CasbinRule" SET "v2" = '(list)|(update)|(delete)' WHERE "ptype" = 'p' and "v0" = 'smb' and "v1" = 'eventResource';
UPDATE "CasbinRule" SET "v2" = '(list)|(read)|(update)|(delete)' WHERE "ptype" = 'p' and "v0" = 'smb' and "v1" = 'eventResource';


INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'smb', 'locationResource', '(create)|(read)|(update)|(delete)', '', '', '');
INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'smb', 'orderResource', '(create)|(read)|(update)|(delete)', '', '', '');
