import redisClient from "../config/redis";
import { calculateExpirationTimestamp, decrypt, encrypt } from "../helper";
import SendResponse from "../helper/sendResponse";
import { uuid } from "../helper/index";
import { createUrlSchema } from "../helper/validate";

export default class Nocred extends SendResponse {
  constructor() {
    super();
  }

  async createUrl(res, payload) {
    const { error, value } = createUrlSchema.validate(payload);

    if (error) {
      return this.error(res, "--createUrl/invalid-field", error.message, 400);
    }

    // check if expiry is valid
    const validExp = ["1day", "1week", "3weeks"];
    if (!validExp.includes(payload?.expiration?.exp)) {
      return this.error(
        res,
        "--createUrl/invalid-expiry",
        "expiry field is invalid.",
        400
      );
    }

    const expiration = calculateExpirationTimestamp(
      payload?.expiration?.date,
      payload?.expiration?.exp
    );

    const userId = payload?.userId;
    const urlId = uuid(8);
    const cacheKey = `${userId}_${urlId}`; // [userid, urlId]
    const cacheData = {
      userId,
      urlId,
      expiration,
      encSession: encrypt(payload?.sessionId),
    };

    console.log(cacheData, cacheKey);

    redisClient.set(
      cacheKey,
      JSON.stringify(cacheData),
      {
        EX: expiration,
      },
      (err) => {
        if (err) {
          return this.error(
            res,
            "--createUrl/redis-server",
            "failed to save url.",
            400
          );
        }
        this.success(
          res,
          "--createUrl/success",
          "secure url created successsfully",
          200
        );
      }
    );
  }

  async getAllUrl() {}

  async deleteUrl() {}
}
