import { z } from "zod";
import { QuestionBaseSchema } from "./question-base.validation";

export const CreateQuestionSchema = z.object({
  body: QuestionBaseSchema.shape.body
    .strict()
    .refine(
      (data) =>
        (data.type === "Text" && data.validation) ||
        (data.type === "Grid" && data.gridConfig) ||
        (data.type === "CheckBox" && data.checkboxConfig),
      {
        message:
          "At least one of gridConfig, checkboxConfig, or validation must be provided.",
        path: ["gridConfig", "checkboxConfig", "validation"], // Points to the related fields
      }
    ),
  params: QuestionBaseSchema.shape.params,
});
