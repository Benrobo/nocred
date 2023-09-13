import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_SERVER,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export const connectRedis = async () => {
  await redisClient.connect();
};
