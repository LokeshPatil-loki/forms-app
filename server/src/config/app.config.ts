import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();
export const appConfig = {
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

const schema = Joi.object({
  MONGODB_URL: Joi.string().required().messages({
    "any.required": "MONGODB_URL is not set",
  }),
  JWT_SECRET: Joi.string().required().messages({
    "any.required": "JWT_SECRET is not set",
  }),
});

export const environmentVariableValidation = () => {
  const { error: validationError } = schema.validate(appConfig);
  if (validationError) {
    console.error(
      `Environment Variable error: ${validationError.details.map(
        (err) => err.message
      )}`
    );
    process.exit(1);
  }
};
