-- This is an empty migration.
UPDATE "CasbinRule" SET "v2" = '(list)|(read)|(update)|(delete)' WHERE "ptype" = 'p' and "v0" = 'smb' and "v1" = 'locationResource';
UPDATE "CasbinRule" SET "v2" = '(list)|(read)|(update)|(delete)' WHERE "ptype" = 'p' and "v0" = 'smb' and "v1" = 'orderResource';
UPDATE "CasbinRule" SET "v2" = '(list)|(read)|(update)|(delete)' WHERE "ptype" = 'p' and "v0" = 'smb' and "v1" = 'customerResource';
