# ─── Stage 1: Builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# ─── Stage 2: Production ──────────────────────────────────────────────────────
FROM node:20-alpine AS production
RUN addgroup -g 1001 -S nodejs && adduser -S nodeapp -u 1001
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodeapp:nodejs . .

USER nodeapp
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/v1/health || exit 1

CMD ["node", "src/app.js"]
