import { PrismaClient } from "@prisma/client";
import { createClient, RedisClientType, RedisFunctions, RedisScripts, RedisModules } from "redis";

export let prisma: PrismaClient;
export const redisClient = createClient();

export function connectDb(): void {
  prisma = new PrismaClient();
  redisClient.connect();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
  await redisClient?.disconnect();
}
