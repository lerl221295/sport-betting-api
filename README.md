# Sport betting API

## About

API of a betting engine to allow users to create open bets and automatically match them with other users who take the other side of the bet

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Run redis and postgres db with docker compose:

   ```bash
   docker-compose up -d
   ```

3. Create your local config based on the example

   ```bash
   cp ./config/local.env.js.example ./config/local.env.js
   ```

4. Install your dependencies

   ```bash
   npm install
   ```

5. Run db migrations and seeds

   ```bash
   NODE_ENV=local npx knex migrate:latest
   NODE_ENV=local npx knex seed:run
   ```

6. Start your app

   ```bash
   npm run start:local
   ```

7. Stop the db gracefully

   ```bash
   docker-compose down
   ```

## Run with Docker

```bash
   docker build -t wagr:local .
   docker run -p 8080:8080 -d -e NODE_ENV=local --name wagrLocal wagr:local
```

## Docs

Start the app and go to `http://localhost:8080/docs`

## Testing

Simply run `npm run test:local` and all your tests in the `test/` directory will be run.

## Migrations

```bash
    npm install -g knex
    NODE_ENV=local knex migrate:latest # Run all migrations
    NODE_ENV=local knex migrate:down   # Rollback latest migration
    NODE_ENV=local knex migrate:up     # Run next migration
    NODE_ENV=local knex migrate:make   # Generate an empty migration
```
