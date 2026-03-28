# 🚀 Node Production Starter

[![CI](https://github.com/YOUR_USERNAME/node-production-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/node-production-starter/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> A **production-ready Node.js + Express REST API boilerplate** with everything you need to ship fast — authentication, database, caching, Docker, CI/CD, and more. Stop copy-pasting setup code. Start building features.

---

## ✨ Features

- **🔐 JWT Authentication** — Access + Refresh token flow with Redis-backed token rotation
- **👮 Role-Based Access Control (RBAC)** — `user`, `admin`, `moderator` roles out of the box
- **🍃 MongoDB + Mongoose** — Schema validation, indexing, and clean model structure
- **⚡ Redis Caching** — Session management and token blacklisting
- **🛡️ Security** — Helmet, CORS, HPP, XSS-Clean, rate limiting (global + per-route)
- **✅ Input Validation** — Joi schemas with clean error messages
- **📋 Structured Logging** — Winston with file + console transports
- **🐳 Docker Ready** — Multi-stage Dockerfile + Docker Compose with health checks
- **🔄 CI/CD** — GitHub Actions workflow (test → lint → Docker build)
- **🧪 Tests** — Unit + integration tests with Jest + Supertest
- **📦 Clean Architecture** — Controllers → Services → Models layered structure

---

## 📁 Project Structure

```
node-production-starter/
├── src/
│   ├── config/          # App, DB, Redis configuration
│   ├── controllers/     # Route handlers (thin layer)
│   │   ├── auth/
│   │   └── user/
│   ├── middlewares/     # Auth, validation, rate limiting, error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── services/        # Business logic (fat layer)
│   │   ├── auth/
│   │   └── user/
│   ├── utils/           # JWT, logger, response helpers
│   └── app.js           # Express app entry point
├── tests/
│   ├── unit/            # Pure function tests
│   └── integration/     # API endpoint tests
├── .github/workflows/   # CI/CD pipelines
├── docker-compose.yml
├── Dockerfile
└── .env.example
```

---

## 🚀 Quick Start

### Option 1 — Docker (Recommended)

```bash
git clone https://github.com/YOUR_USERNAME/node-production-starter.git
cd node-production-starter
cp .env.example .env
docker compose up --build
```

API is live at `http://localhost:3000/api/v1`

---

### Option 2 — Local

**Prerequisites:** Node.js ≥18, MongoDB, Redis

```bash
git clone https://github.com/YOUR_USERNAME/node-production-starter.git
cd node-production-starter
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and update:

| Variable | Description | Default |
|---|---|---|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/node_starter` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `JWT_ACCESS_SECRET` | Secret for access tokens | — |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | — |
| `JWT_ACCESS_EXPIRES_IN` | Access token TTL | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token TTL | `7d` |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

---

## 📡 API Endpoints

### Health
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Health check |

### Auth
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new user | ❌ |
| `POST` | `/api/v1/auth/login` | Login | ❌ |
| `POST` | `/api/v1/auth/refresh` | Refresh tokens | ❌ |
| `POST` | `/api/v1/auth/logout` | Logout | ✅ |

### Users
| Method | Endpoint | Description | Auth | Role |
|---|---|---|---|---|
| `GET` | `/api/v1/users/me` | Get own profile | ✅ | Any |
| `PATCH` | `/api/v1/users/me` | Update own profile | ✅ | Any |
| `GET` | `/api/v1/users` | List all users | ✅ | Admin |
| `DELETE` | `/api/v1/users/:id` | Delete user | ✅ | Admin |

---

## 📬 Example Requests

**Register**
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

**Login**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

**Access protected route**
```bash
curl -X GET http://localhost:3000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🧪 Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration
```

---

## 🐳 Docker

```bash
# Development
docker compose up

# Production build
docker build --target production -t node-production-starter .
docker run -p 3000:3000 --env-file .env node-production-starter
```

---

## 🔒 Security Features

- **Helmet** — Sets secure HTTP headers
- **CORS** — Configurable cross-origin policy
- **HPP** — HTTP Parameter Pollution protection
- **Rate Limiting** — Global (100 req/15min) + Auth-specific (10 req/15min)
- **JWT Rotation** — Refresh tokens are rotated on each use; reuse is detected and blocked
- **Password Hashing** — bcrypt with 12 salt rounds
- **Input Validation** — All inputs validated and sanitized via Joi
- **Body Size Limit** — 10kb limit on request body

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md) before opening a PR.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT © [Your Name](https://github.com/YOUR_USERNAME)

---

<p align="center">
  If this saved you time, please consider giving it a ⭐
</p>
