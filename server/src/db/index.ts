import mongoose from "mongoose";
import { appConfig } from "../config/app.config";
import { DB_NAME } from "../db.constants";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${appConfig.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error: ", error);
    process.exit(1);
  }
};
