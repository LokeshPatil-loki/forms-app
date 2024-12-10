import Joi from "joi";
import { appConfig } from "./config/app.config";
const schema = Joi.object({
  MONGODB_URL: Joi.string().required().messages({
    "any.required": "MONGODB_URL is not set",
  }),
});

const { error: validationError } = schema.validate(appConfig);
if (validationError) {
  console.log(
    `Environment Variable error: ${validationError.details.map(
      (err) => err.message
    )}`
  );
  throw new Error(
    `Environment Variable error: ${validationError.details.map(
      (err) => err.message
    )}`
  );
}
