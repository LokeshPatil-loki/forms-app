import { FormModel } from "../../models/form.model";
import { UserPayload } from "../../types/user-payload";

export const getMyFormsProvider = async (loggedInUser: UserPayload) => {
  const forms = await FormModel.find({ createdBy: loggedInUser._id });
  return forms;
};
