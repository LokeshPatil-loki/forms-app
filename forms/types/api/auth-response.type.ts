import { User } from "../auth.type";

export interface AuthResponse {
  token: string;
  user: User;
}
