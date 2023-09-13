import { CatchErrors } from "../middlewares/error";
import Nocred from "../service/nocred";

const noCredService = new Nocred();

async function handler(req, res, next) {
  if (req.method === "GET") {
    await noCredService.getAllUrl(res, req.body);
  }
}
export default CatchErrors(handler);
