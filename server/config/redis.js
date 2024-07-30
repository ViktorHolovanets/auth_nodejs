import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const client = redis.createClient({
  url: REDIS_URL
});

client.on('error', (err) => {
  console.error('Redis client error', err);
});

await client.connect();

export default client;

