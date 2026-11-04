# ARVEN Backend — Initial Foundation

This repository contains the initial Node.js and TypeScript Backend foundation for the ARVEN graduation project.

At this stage, the project provides a runnable Express server, a basic Health Check endpoint, structured request logging, a test setup, and lint configuration. It does **not** yet implement the complete mission workflow, database integration, authentication, or robot communication.

## Technology Stack

- Node.js
- TypeScript
- Express
- Pino and pino-http for structured logging
- Vitest and Supertest for testing
- ESLint for code-quality checks

## Requirements

- Node.js 20 or later
- npm

Check your installed versions:

```bash
node --version
npm --version
```

## Installation

Clone the repository, then open its folder:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd arven-backend
```

Install dependencies:

```bash
npm install
```

Create your local environment file:

macOS / Linux:
```bash
cp .env.example .env
```

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

## Run in Development

```bash
npm run dev
```

The server uses port `3000` by default.

## Health Check

Open this URL in a browser:

```text
http://localhost:3000/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "arven-backend"
}
```

You can also test it from a terminal:

```bash
curl http://localhost:3000/health
```

## Run Tests

```bash
npm test
```

The initial test checks that `GET /health` returns HTTP status `200` and the expected JSON response.

## Run Lint

```bash
npm run lint
```

## Build TypeScript

```bash
npm run build
```

The compiled JavaScript files are generated in the `dist/` folder.

## Project Structure

```text
arven-backend/
├── src/
│   ├── utils/
│   │   └── logger.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   └── health.test.ts
├── docs/
│   └── failure-handling.md
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## Initial API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Check whether the Backend service is running. |

## Documentation

See [`docs/failure-handling.md`](docs/failure-handling.md) for the initial failure scenarios, expected responses, recovery strategies, and component responsibilities.

The system workflow and robot/mission state-machine diagrams are maintained as separate design artifacts and should be added to the repository under `docs/` when ready.

## Current Scope and Future Work

The current deliverable is a development foundation only.

Future implementation stages may add:
- Mission management endpoints.
- Robot status and event handling.
- Patient verification and access control.
- Database integration.
- Authentication and role-based access control.
- Secure communication with ROS 2 and other subsystems.

All clinical data used during development must be synthetic or otherwise appropriately authorized and de-identified.
