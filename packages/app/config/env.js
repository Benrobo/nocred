const env = {
  api:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : "https://nocred.vercel.app/api",
};

export default env;
