<<<<<<< HEAD
# api/user

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Requirement

-   Node 14
-   npm 6
-   Docker 19

## Initialize

    npm i

## Serve

    npm run serve

## Run tests

    npm run serve
    npm t

## Connect to DB

    npm run connect:db

## Update database schema

1. Edit prisma/schema.prisma.
1. Run below to create migration file and apply.

    # ex) name: create_user_table

    npx prisma migrate dev --name create_user_table

[Prisma Migrate Cli](https://www.prisma.io/docs/reference/api-reference/command-reference#prisma-migrate-preview)

## Reset data

    npx prisma migrate reset

## Run migrate

    npx prisma migrate dev

## Dev Server

### connect database

_needs postgres password_

```
gcloud sql connect api-services
```
=======
- [Horai project notes](#horai-project-notes)
  - [Admin console](#admin-console)
  - [Commit message convention](#commit-message-convention)
  - [Postgres commands](#postgres-commands)
  - [Kill port 8080](#kill-port-8080)
  - [Prisma](#prisma)
  - [Project layers](#project-layers)
  - [Manually start local development environment](#manually-start-local-development-environment)
  - [Log & monitoring on GCP](#log--monitoring-on-gcp)
## Horai project notes

### Admin console
Login URL: https://admin-console-horai-dev.web.app/sign-in
SMB: 
- id: shikata.hiromi+smb1@gmail.com
- pass: Icecream@31

AMO:
- id: shikata.hiromi+amo1@gmail.com
- pass: Icecream@31

### Commit message convention
- The project is setup with commit lint, your commit message need to follow commit message conventions. The commit messages must be prefixed with one of these prefix: `fix:, feat:, build:, chore:, ci:, docs:, style:, refactor:, perf:, test:`
- Example: `feat(api/reservation): add new api`.
  
### Postgres commands
- connect database: `npm run connect:db`
- list database: `\l`
- change working database: `\c database_name`
- list tables in a databse: `\dt`
- describe a table: `select column_name, data_type, character_maximum_length, column_default, is_nullable from INFORMATION_SCHEMA.COLUMNS where table_name = name_of_table;`

### Kill port 8080
-  kill -9 `lsof -w -n -i tcp:8080| awk '{print $2}'|awk 'END{print}'`

### Prisma
- Migrate `npx prisma migrate dev --preview-feature`
- Prisma studio: some time you need to view data in postgres database. Prisma provides a friendly UI for users to nagivate and view tables and data using Prisma Studio. To open prisma studio, from an api directory, e.g: api/reservation, run `npx prisma studio`. Loom video https://www.loom.com/share/cde290bf59284a518d5665e7c91dbc53

### Project layers
- handler -> usecases -> repos

### Manually start local development environment
If you don't want to run `npm run serve`, you can do these steps manually
- Start database: `npm run serve:db`. This run docker contains for posgres db.
- When you update openapi.yaml, run `npm run generate:openapi`. This generates code from openapi schema and also format your code.
- When you update schema.prisma, run `npx prisma migrate dev --preview-feature`. This will apply migrations to database and also automatically run `npx prisma generate` for you.
- Build app: `npm run build`
- Serve app: `npm run serve:app`. If the port 8080 is in use, use kill port command above to kill it

### Log & monitoring on GCP
- Check server logs for horai services
  - From GCP console, from left menu, choose Logging -> Logs Explorer
  - In resource type, choose GAE Application.
  - There are subfilters, one of which is Module Id (e.g: api-reservation, api-coupon, api-skeleton). Choose the api you want to view
  - Now the logs for specific api are displayed, you can check it or extend time to view log in the past
  - Loom video: https://www.loom.com/share/a2f762153a8f4a04a145c5a5d228a201
>>>>>>> d914bf8 (first commit)
# horai
# horai
# horai
# horai
# horai
