import Joi from "joi";
import { appConfig, environmentVariableValidation } from "./config/app.config";
import { connectDB } from "./db";
import { app } from "./app";

const start = async () => {
  environmentVariableValidation();
  try {
    await connectDB();
  } catch (error) {
    console.error("MONGODB connection failed !!! ", error);
    process.exit(1);
  }

  const PORT = process.env.PORT || 4000;

  app.on("error", (error) => {
    console.log("ERROR ", error);
    process.exit(1);
  });

  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
};

start();
