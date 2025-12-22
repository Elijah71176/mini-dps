 README.md (Mini-DPS)
# Mini-DPS

Mini-DPS is a small full-stack project built to practice backend, frontend, testing, and CI/CD concepts.

## Features
The project includes:
A NestJS backend (API)
A Next.js frontend (Web)
PostgreSQL database
Automated tests
GitHub Actions CI pipeline

## Tech Stack
Backend
NestJS
TypeORM
PostgreSQL
Jest (unit + e2e tests)

## Frontend
Next.js
React
Jest + Testing Library

## DevOps
Docker & Docker Compose
GitHub Actions (CI)

## Project Structure
mini-dps/
├─ apps/
│  ├─ api/        # NestJS backend
│  └─ web/        # Next.js frontend
├─ infra/         # Docker Compose (DB + API + Web)
└─ .github/
   └─ workflows/  # CI pipeline

## Run the application (DEV)

From the infra folder:
cd infra
docker compose up -d
Open in browser:
Frontend: http://localhost:3000
Backend health: http://localhost:3001/health

 ## Databases (Important)
This project uses two separate databases:
DEV database
Used when running the app normally
Contains demo data (customers & projects)

Name: mini_dps
TEST database
Used only by automated tests
Data is reset between test runs

Name: mini_dps_test
This separation ensures tests never delete real dev data.

 Running Tests
Backend tests
cd apps/api
npm run test

Backend e2e tests (real DB)
cd apps/api
DATABASE_URL=postgresql://app:app@localhost:5433/mini_dps_test npm run test:e2e

Frontend tests
cd apps/web
npm run test

 ## CI Pipeline (GitHub Actions)

On every push to main, CI automatically:
Starts PostgreSQL
Runs backend unit tests
Runs backend e2e tests with migrations
Runs frontend tests
Builds both applications
Green CI  means the project works on a clean machine.

 ## Release
The current stable version is tagged as:
v1.0


This tag represents the final submission state of the project.

✍️ Author

Built by Elijah
AWS / Backend / DevOps student