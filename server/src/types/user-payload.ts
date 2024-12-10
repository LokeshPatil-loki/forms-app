import { Types } from "mongoose";
export interface UserPayload {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
}
