-- This is an empty migration.
UPDATE "CasbinRule" SET "v2" = '(list)|(update)|(delete)' WHERE "ptype" = 'p' and "v0" = 'smb' and "v1" = 'eventResource';

--INSERT INTO "CasbinRule" (ptype, v0, v1, v2, v3, v4, v5) VALUES ('p', 'amo', 'eventResource', '(list)|(create)|(read)|(update)|(delete)', '', '', '');
