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

# horai
