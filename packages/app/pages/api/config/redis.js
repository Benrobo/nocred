import { createClient } from "redis";

const redisClient = createClient({
  host: process.env.UPSTASH_REDIS,
  // legacyMode: true,
});

redisClient
  .connect()
  .then(() => {
    console.log("REDIS CONNECTED");
  })
  .catch((err) => {
    console.log(`REDIS CONNECTION ERROR: ${err.message}`);
  });

// const redisClient = new Redis(process.env.UPSTASH_REDIS);

// redisClient.on("connect", () => {
//   console.log("Connected to Redis");
// });

// redisClient.on("error", (err) => console.log("Redis Client Error", err));

export default redisClient;

export const connectRedis = async () => {
  if (redisClient && redisClient.status === "ready") {
    // If the client is already connected and in a ready state, do nothing.
    return;
  } else if (redisClient && redisClient.status !== "end") {
    // If the client exists but is not in a ready state, close it.
    await redisClient.quit();
  } else {
    await redisClient.connect();
  }
};
