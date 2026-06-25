import { Redis } from '@upstash/redis'

// Initializes the Upstash Redis client.
// Falls back to a mock in-memory cache if env vars are missing for local dev without a Redis URL.
export const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : {
      // Fallback for development if Redis is not configured
      get: async (key: string) => null,
      set: async (key: string, value: any, options?: any) => "OK",
    } as any;
