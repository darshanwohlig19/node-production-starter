const Redis = require('ioredis');
const config = require('./index');
const logger = require('../utils/logger');

let client;

const connectRedis = () => {
  client = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
    lazyConnect: true,
    retryStrategy: (times) => Math.min(times * 100, 3000),
  });

  client.on('connect', () => logger.info('Redis connected'));
  client.on('error', (err) => logger.error(`Redis error: ${err.message}`));
  client.on('close', () => logger.warn('Redis connection closed'));

  return client.connect();
};

const getRedis = () => {
  if (!client) throw new Error('Redis not initialized. Call connectRedis() first.');
  return client;
};

module.exports = { connectRedis, getRedis };
