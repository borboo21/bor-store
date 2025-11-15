import type { UserDTO } from "@shared/types";
import type { UserDocument } from "../models/User.ts";

export function mapUserForFrontend(user: UserDocument): UserDTO {
  return {
    id: user._id.toString(),
    login: user.login,
    role: user.role,
  };
}
