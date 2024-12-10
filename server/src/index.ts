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
