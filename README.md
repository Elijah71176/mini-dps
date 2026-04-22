## Mini-DPS

Mini-DPS is a full-stack cloud application demonstrating modern software development practices including backend APIs, frontend UI, testing, CI, and AWS deployment.

The project showcases how a real-world system is built, containerized, deployed to AWS, and validated through automated pipelines.

---

##  Features

* NestJS backend (REST API)
* Next.js frontend (static export)
* PostgreSQL database (AWS RDS)
* Dockerized backend deployment (AWS EC2)
* Static frontend hosting (AWS S3)
* Automated testing (unit + e2e)
* GitHub Actions CI pipeline

---

##  Architecture

```
Frontend (S3 Static Hosting)
        ↓
Backend API (EC2 + Docker)
        ↓
Database (AWS RDS PostgreSQL)
```

* Frontend is deployed as static files on **Amazon S3**
* Backend runs inside a Docker container on **Amazon EC2**
* Database is managed by **Amazon RDS**
* CI is handled by **GitHub Actions**

---

##  Tech Stack

### Backend

* NestJS
* TypeORM
* PostgreSQL
* Jest (unit & e2e)

### Frontend

* Next.js (static export)
* React
* Jest + Testing Library

### DevOps & Cloud

* Docker
* AWS EC2
* AWS S3
* AWS RDS
* GitHub Actions (CI)

---

##  Project Structure

```
mini-dps
 ┣ apps
 ┃ ┣ api      (NestJS backend)
 ┃ ┗ web      (Next.js frontend)
 ┣ infra      (Docker Compose for local dev)
 ┗ .github
   ┗ workflows (CI pipeline)
```

---

##  Run Locally (Development)

### Option 1 — Docker (recommended)

```bash
cd infra
docker compose up -d
```

Check services:

```bash
docker compose ps
```

Access:

* Frontend: http://localhost:3000
* Backend: http://localhost:3001/health

---

### Option 2 — Without Docker

Backend:

```bash
cd apps/api
npm install
npm run start:dev
```

Frontend:

```bash
cd apps/web
npm install
npm run dev
```

---

##  Environment Variables

Example `.env` for local development:

```env
DATABASE_URL=postgresql://app:app@localhost:5432/mini_dps
PORT=3001
NODE_ENV=development
```

---

##  Running Tests

### Backend unit tests

```bash
cd apps/api
npm run test
```

### Backend e2e tests

```bash
cd apps/api
DATABASE_URL=postgresql://app:app@localhost:5432/mini_dps npx jest -c test/jest-e2e.json
```

### Frontend tests

```bash
cd apps/web
npm run test
```

---

##  CI Pipeline (GitHub Actions)

On every push to `main`, CI automatically:

* Starts PostgreSQL service
* Runs backend unit tests
* Runs backend e2e tests
* Runs frontend tests
* Builds backend and frontend

✔️ CI status must be green before deployment

---

##  Production Deployment (AWS)

### Frontend

* Hosted on **Amazon S3 (Static Website Hosting)**
* Built using Next.js static export (`output: 'export'`)
* Publicly accessible via S3 website endpoint

### Backend

* Deployed on **Amazon EC2**
* Runs inside a **Docker container**
* Exposes API on port `3001`

### Database

* Hosted on **Amazon RDS (PostgreSQL)**
* Secure connection from EC2 backend

---

## 🌐 Live Endpoints

Frontend:

```
http://mini-dps-frontend-elijah.s3-website.eu-north-1.amazonaws.com/
```

Backend API:

```
http://13.60.17.29:3001
```

---

##  Notes

* CORS is configured to allow S3 frontend to communicate with EC2 backend
* Dynamic routes were removed to support static hosting on S3
* SSL is enabled only in production (RDS), disabled in CI/test

---

##  Release

Current stable version:

```
v1.0
```

---

##  Author

Elijah
AWS Cloud Developer Student
