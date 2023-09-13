export const CatchErrors = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.log(`[ERROR]: ${err.message}`);
      res.status(500).json({
        errorStatus: true,
        statusCode: 500,
        code: "--api/server-error",
        message: "Something went wrong",
        details: {
          stacks: process.env.NODE_ENV !== "production" && err,
        },
      });
    }
  };
};
