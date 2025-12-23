## Mini-DPS

Mini-DPS is a small full-stack project built to practice backend, frontend, testing, and CI/CD concepts.

The project demonstrates how a real application is structured, tested, and automated using modern tools.

## Features
NestJS backend (API)
Next.js frontend (Web)
PostgreSQL database
Automated unit and end-to-end tests
GitHub Actions CI pipeline

## Tech Stack
Backend
NestJS
TypeORM
PostgreSQL
Jest (unit tests and e2e tests)

Frontend
Next.js
React
Jest + Testing Library

 DevOps
Docker
Docker Compose
GitHub Actions (CI)

 ## Project Structure

mini-dps
apps
 api  (NestJS backend)
 web  (Next.js frontend)
infra  (Docker Compose: DB + API + Web)
.github
 workflows (CI pipeline)

## Run the Application (DEV)

Start the full system (database, backend, frontend) using Docker Compose.

Commands:
cd infra
docker compose up -d
docker compose ps

Open in browser:
Frontend: http://localhost:3000
Backend health check: http://localhost:3001/health

## Databases and Environments

This project uses two separate databases.

DEV database
Database name: mini_dps
Used when running the application normally
Contains demo data (customers and projects)
Used for development and presentation

TEST database
Database name: mini_dps_test
Used only for automated end-to-end tests
Data is reset between test runs

This separation ensures that automated tests never delete or affect real development data.

## Database Migrations (TypeORM)

Database schema is managed using TypeORM migrations.
Migrations ensure the database structure can be recreated on any machine.

## Run migrations for DEV database:
cd apps/api
DATABASE_URL=postgresql://app:app@localhost:5432/mini_dps npm run migration:run

## Run migrations for TEST database:
cd apps/api
DATABASE_URL=postgresql://app:app@localhost:5433/mini_dps_test npm run migration:run

If the message says “No migrations are pending”, the schema is already up to date.

## Running Tests
Backend unit tests
These test business logic without needing the full system.
cd apps/api
npm run test

Backend end-to-end tests (real database)
These tests run against the TEST database only.
cd apps/api
DATABASE_URL=postgresql://app:app@localhost:5433/mini_dps_test npx jest -c test/jest-e2e.json

Frontend tests
These verify that the frontend renders correctly.

cd apps/web
npm run test

## CI Pipeline (GitHub Actions)

On every push to the main branch, GitHub Actions automatically:
Starts a PostgreSQL service
Runs backend unit tests
Runs backend e2e tests with migrations
Runs frontend tests
Builds both backend and frontend applications
A green CI status means the project works on a clean machine and is safe to merge or submit.
Release

The current stable version of the project is tagged as:
v1.0

This tag represents the current submission state of the project.

Author
Built by Elijah
AWS / Backend / DevOps student