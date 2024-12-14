import { User } from "../auth";

export interface AuthResponse {
  token: string;
  user: User;
}
