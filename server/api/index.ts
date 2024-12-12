import { environmentVariableValidation } from "../src/config/app.config";
import { connectDB } from "../src/db";
import { app } from "../src/app";

const start = async () => {
  environmentVariableValidation();
  try {
    await connectDB();
  } catch (error) {
    console.error("MONGODB connection failed !!! ", error);
    process.exit(1);
  }
};

start();

export default app;
