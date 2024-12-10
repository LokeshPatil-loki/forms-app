import mongoose from "mongoose";

export const ResponseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  responses: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed, // Flexible to handle different answer types
        required: true,
      },
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  // IP and other metadata for tracking
  metadata: {
    ipAddress: String,
    userAgent: String,
  },
});

export const ResponseModel = mongoose.model("Response", ResponseSchema);
