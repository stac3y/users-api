## Description

App created for CRUD operations with users.

## Installation

```bash
$ yarn install
```

## Environment

You should copy .env.example to .env and fill it with your configs.

```bash
$ cp ./.env.example ./.env
```

## Docker

```bash
$ docker-compose up -d
```

## Database

Before launch you need to run migration to create users table. Also, you can run seed to fill table with 100 users.

```bash
$ yarn run migration:up
$ yarn run seed:up
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

If you used default port value, the service will run on http://127.0.0.1:3300, swagger docs: http://127.0.0.1:3300/docs
