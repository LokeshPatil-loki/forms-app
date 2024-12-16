import { FormModel } from "../../models/form.model";
import { UserPayload } from "../../types/user-payload";

export const getMyFormsProvider = async (loggedInUser: UserPayload) => {
  const forms = await FormModel.find({ createdBy: loggedInUser._id }).populate({
    path: "questions",
    transform: (doc) => {
      const questionObject = doc.toObject();
      questionObject.id = questionObject._id;
      delete questionObject._id;
      return questionObject;
    },
  });
  return forms;
};
