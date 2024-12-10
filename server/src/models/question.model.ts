import mongoose from "mongoose";
export const QuestionSchema = new mongoose.Schema({
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
  },
  validation: {
    minLength: Number,
    maxLength: Number,
    pattern: String,
  },
});

export const QuestionModel = mongoose.model("Question", QuestionSchema);
