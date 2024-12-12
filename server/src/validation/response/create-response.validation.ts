import { z } from "zod";
import { BaseResponseSchema } from "./base-response.validation";

export const CreateResponseSchema = z.object({
  body: BaseResponseSchema.strict(),
});
