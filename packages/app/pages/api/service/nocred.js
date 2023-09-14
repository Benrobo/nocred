import redisClient from "../config/redis";
import { calculateExpirationTimestamp, decrypt, encrypt } from "../helper";
import SendResponse from "../helper/sendResponse";
import { uuid } from "../helper/index";
import { createUrlSchema, getUrlSchema } from "../helper/validate";

export default class Nocred extends SendResponse {
  constructor() {
    super();
  }

  async createUrl(res, payload) {
    console.log({ payload });
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

  async getUrl(res, payload) {
    const { error } = getUrlSchema.validate(payload);
    if (error) {
      return this.error(res, "--getUrl/invalid-field", error?.message, 400);
    }

    const { id } = payload;
    const urlInfo = await redisClient.get(id);

    if (urlInfo === null) {
      return this.error(
        res,
        "--getUrl/notfound",
        "The URL is either not found or has expired.",
        404
      );
    }

    const data = JSON.parse(urlInfo);
    let sessionId;

    try {
      sessionId = decrypt(data?.encSession);
    } catch (e) {
      console.log(`[DECRYPTION ERROR]: ${e.message}`);
      this.error(res, "--getUrl/invalid-session", "Invalid session data.", 500);
      return;
    }

    this.success(res, "--getUrl/success", "successfully fetched url", 200, {
      sessionId,
      userId: data.userId,
    });
  }

  async deleteUrl() {}
}
