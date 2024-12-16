import { z } from "zod";

// Base schema for all questions
export const questionBaseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  isRequired: z.boolean().optional(),
  imageUrl: z.string().optional(),
});

// Text question schema
// has all the properties of the base schema plus the type and validation properties required for text questions
export const textQuestionSchema = questionBaseSchema.extend({
  type: z.literal("Text"),
  validation: z
    .object({
      minLength: z.number().optional(),
      maxLength: z.number().optional(),
      regex: z.string().optional(),
    })
    .strict(),
});

// Grid question schema
// has all the properties of the base schema plus the type and gridConfig properties required for grid questions
export const gridQuestionSchema = questionBaseSchema.extend({
  type: z.literal("Grid"),
  gridConfig: z.object({
    rows: z.array(z.string()).min(1, "Minimum 1 row is required"),
    columns: z.array(z.string()).min(1, "Minimum 1 column is required"),
  }),
});

// Checkbox question schema
// has all the properties of the base schema plus the type and checkboxConfig properties required for checkbox questions
export const checkboxQuestionSchema = questionBaseSchema.extend({
  type: z.literal("Checkbox"),
  checkboxConfig: z.object({
    options: z.array(z.string()).min(1, "Minimum 1 option is required"),
    selectMultiple: z.boolean(),
  }),
});

// Union of all question schemas
// This is used to validate the questions array in the form schema based on the type property
export const questionSchema = z.discriminatedUnion("type", [
  textQuestionSchema,
  gridQuestionSchema,
  checkboxQuestionSchema,
]);
