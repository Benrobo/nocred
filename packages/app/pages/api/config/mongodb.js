import mongoose from "mongoose";

export default function connectMongodb(mongoUrl) {
  try {
    mongoose.set("strictQuery", false);
    mongoose.createConnection(mongoUrl, (err) => {
      if (err)
        return console.log(`Error connecting to mongodb: ` + err?.message);
      console.info("Mongodb Connected");
    });
  } catch (e) {
    console.error(`Error connecting mongodb: ${e.message}`);
  }
}
