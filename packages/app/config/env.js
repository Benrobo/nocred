const env = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api"
      : process.env.API_URL,
};

export default env;
