const { default: SendResponse } = require("../helper/sendResponse");

class Nocred extends SendResponse {
  constructor() {
    super();
  }

  async createUrl(res, payload) {
    console.log(payload);
  }

  async getAllUrl() {}

  async deleteUrl() {}
}

module.exports = Nocred;
