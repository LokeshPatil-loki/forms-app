import { z } from "zod";

export const QuestionBaseSchema = z.object({
  body: z.object({
    type: z.enum(["Text", "Grid", "CheckBox"], {
      errorMap: () => ({
        message: "Type must be one of: Text, Grid, or CheckBox",
      }),
    }),
    title: z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
      })
      .min(1, "Title cannot be empty"),
    description: z
      .string({
        invalid_type_error: "Description must be a string",
      })
      .optional(),
    isRequired: z
      .boolean({
        invalid_type_error: "isRequired must be a boolean",
      })
      .optional()
      .default(false),
    imageUrl: z
      .string({
        invalid_type_error: "Image URL must be a string",
      })
      .url("Image URL must be a valid URL")
      .optional(),
    gridConfig: z
      .object({
        rows: z
          .array(z.string().min(1, "Rows must not contain empty strings"), {
            invalid_type_error: "Rows must be an array of strings",
          })
          .refine((rows) => rows.length > 0, {
            message: "Rows cannot be empty",
          })
          .optional(),
        columns: z
          .array(z.string().min(1, "Columns must not contain empty strings"), {
            invalid_type_error: "Columns must be an array of strings",
          })
          .refine((columns) => columns.length > 0, {
            message: "Columns cannot be empty",
          })
          .optional(),
      })
      .refine(
        (data) =>
          (data.rows && data.rows.length > 0) ||
          (data.columns && data.columns.length > 0),
        {
          message:
            "At least one of rows or columns must be provided and not empty",
        }
      )
      .optional(),
    checkboxConfig: z
      .object({
        options: z
          .array(z.string().min(1, "option cannot contain an empty string"), {
            invalid_type_error: "Options must be an array of strings",
          })
          .refine((options) => options.length > 0, {
            message: "Options cannot be empty",
          })
          .optional(),
        selectMultiple: z
          .boolean({
            invalid_type_error: "selectMultiple must be a boolean",
          })
          .optional(),
      })
      .optional(),
    validation: z
      .object({
        minLength: z
          .number({
            invalid_type_error: "minLength must be a number",
          })
          .int("minLength must be an integer")
          .optional(),
        maxLength: z
          .number({
            invalid_type_error: "maxLength must be a number",
          })
          .int("maxLength must be an integer")
          .optional(),
        pattern: z
          .string({
            invalid_type_error: "Pattern must be a string",
          })
          .optional(),
      })
      .optional(),
  }),
  // .strict(),
  params: z.object({
    formId: z
      .string({ required_error: "formId is required" })
      .length(24, "Invalid formId"),
  }),
});
