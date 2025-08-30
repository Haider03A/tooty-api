import { mongoose } from "mongoose";
import { config } from "../../config.js";

// DB info
const dbHost = "mongodb://localhost:27017";
const dbName = config.mongoDbName;
const URL = `${dbHost}/${dbName}`;
const options = {};

// DB connect
const connectDB = async () => {
  try {
    await mongoose.connect(URL, options);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

export { connectDB };
