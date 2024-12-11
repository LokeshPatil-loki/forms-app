import { z } from "zod";
import { QuestionBaseSchema } from "./question-base.validation";

export const CreateQuestionSchema = z.object({
  body: QuestionBaseSchema.shape.body.refine(
    (data) => data.gridConfig || data.checkboxConfig || data.validation,
    {
      message:
        "At least one of gridConfig, checkboxConfig, or validation must be provided.",
      path: ["gridConfig", "checkboxConfig", "validation"], // Points to the related fields
    }
  ),
  params: QuestionBaseSchema.shape.params,
});
