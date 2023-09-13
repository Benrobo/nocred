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
    const url_Id = uuid(8);
    const cacheKey = url_Id; // [userid, urlId]
    const cacheData = {
      userId,
      url_Id,
      expiration,
      encSession: encrypt(payload?.sessionId),
    };

    // console.log(cacheData, cacheKey);

    await redisClient.set(cacheKey, JSON.stringify(cacheData), {
      EX: new Date(expiration).getTime(),
    });

    // console.log({ data: await redisClient.get(cacheKey) });

    this.success(
      res,
      "--createUrl/success",
      "secure url created successsfully",
      200,
      cacheData
    );
  }

  async getAllUrl() {}

  async deleteUrl() {}
}
