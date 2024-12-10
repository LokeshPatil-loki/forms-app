import dotenv from "dotenv";

dotenv.config();
export const appConfig = {
  MONGODB_URL: process.env.MONGODB_URL,
};
