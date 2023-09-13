import { createClient } from "redis";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_SERVER}`,
  password: process.env.REDIS_PWD,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export default redisClient;

export const connectRedis = async () => {
  await redisClient.connect();
};
