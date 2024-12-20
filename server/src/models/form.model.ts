import mongoose, { InferSchemaType } from "mongoose";

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  headerImageUrl: {
    type: String,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  shareableLink: {
    type: String,
    unique: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

FormSchema.methods.toJSON = function () {
  const form = this;
  const formObject = form.toObject();
  formObject.id = formObject._id;
  delete formObject._id;
  return formObject;
};

export type Form = InferSchemaType<typeof FormSchema>;

export const FormModel = mongoose.model("Form", FormSchema);
