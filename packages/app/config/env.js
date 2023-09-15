const env = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api"
      : "https://nocred.vercel.app/api",
};

export default env;
