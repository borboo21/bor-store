import { UserDTO } from "@shared/types/interface";
import { UserDocument } from "../models/User";

export function mapUserForFrontend(user: UserDocument): UserDTO {
  return {
    id: user._id.toString(),
    login: user.login,
    role: user.role,
  };
}
