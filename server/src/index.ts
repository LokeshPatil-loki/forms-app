import Joi from "joi";
import { appConfig } from "./config/app.config";
import { connectDB } from "./db";
const schema = Joi.object({
  MONGODB_URL: Joi.string().required().messages({
    "any.required": "MONGODB_URL is not set",
  }),
});

const { error: validationError } = schema.validate(appConfig);
if (validationError) {
  console.error(
    `Environment Variable error: ${validationError.details.map(
      (err) => err.message
    )}`
  );
  process.exit(1);
}

try {
  await connectDB();
} catch (error) {
  console.error("MONGODB connection failed !!! ", error);
  process.exit(1);
}

import { app } from "./app";

const PORT = process.env.PORT || 4000;

app.on("error", (error) => {
  console.log("ERROR ", error);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
