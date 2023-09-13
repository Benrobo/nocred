import { CatchErrors } from "../middlewares/error";
import Nocred from "../service/nocred";

const noCredService = new Nocred();

async function handler(req, res, next) {
  if (req.method === "GET") {
    const param = req.query;
    await noCredService.getUrl(res, param);
  }
}
export default CatchErrors(handler);
