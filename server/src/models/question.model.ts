import mongoose, { InferSchemaType, ObjectId } from "mongoose";

export const QuestionSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  type: {
    type: String,
    enum: ["Text", "Grid", "CheckBox"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
  },
  // Specific configurations for different question types
  gridConfig: {
    rows: [String],
    columns: [String],
  },
  checkboxConfig: {
    options: [String],
    selectMultiple: Boolean,
  },
  validation: {
    minLength: Number,
    maxLength: Number,
    pattern: String,
  },
});

// export type Question = InferSchemaType<typeof QuestionSchema>;
export interface Question extends InferSchemaType<typeof QuestionSchema> {
  _id: mongoose.Schema.Types.ObjectId | string;
}

export const QuestionModel = mongoose.model("Question", QuestionSchema);
