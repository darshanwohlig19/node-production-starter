const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const hpp = require('hpp');

const config = require('./config');
const connectDB = require('./config/database');
const { connectRedis } = require('./config/redis');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const { globalLimiter } = require('./middlewares/rateLimiter');
const logger = require('./utils/logger');

const app = express();

// ─── Security Middlewares ─────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(hpp());

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Performance ──────────────────────────────────────────────────────────────
app.use(compression());

// ─── Logging ──────────────────────────────────────────────────────────────────
if (config.env !== 'test') {
  app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
}

// ─── Rate Limiting ────────────────────────────────────────────────────────────
app.use('/api', globalLimiter);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/v1', routes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const start = async () => {
  await connectDB();
  await connectRedis();

  app.listen(config.port, () => {
    logger.info(`🚀 ${config.appName} running in ${config.env} mode on port ${config.port}`);
    logger.info(`📍 Health check: http://localhost:${config.port}/api/v1/health`);
  });
};

start().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;
