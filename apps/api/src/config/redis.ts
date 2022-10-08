import Redis from "ioredis";
import { REDIS_URL } from "./env";
export const redisClient = new Redis(REDIS_URL as string);
