import { CatchErrors } from "../middlewares/error";
import Nocred from "../service/nocred";
import { connectRedis } from "../config/redis";

const noCredService = new Nocred();

async function handler(req, res, next) {
  if (req.method === "POST") {
    await connectRedis();
    await noCredService.createUrl(res, req.body);
  }
}
export default CatchErrors(handler);
