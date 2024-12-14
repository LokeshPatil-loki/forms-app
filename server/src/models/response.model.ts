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
    required: true,
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
});

ResponseSchema.methods.toJSON = function () {
  const response = this;
  const responseObject = response.toObject();
  responseObject.id = responseObject._id;
  if (
    typeof responseObject.respondent != "string" &&
    responseObject.respondent._id
  ) {
    responseObject.respondent.id = responseObject.respondent._id;
    delete responseObject.respondent._id;
  }
  delete responseObject._id;
  return responseObject;
};

export const ResponseModel = mongoose.model("Response", ResponseSchema);
