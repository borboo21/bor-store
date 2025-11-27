import type { UserDTO } from "@shared/index.js";
import type { UserDocument } from "../models/User.ts";
import { mapCart } from "./mapCart.ts";

export function mapUserForFrontend(user: UserDocument): UserDTO {
  return {
    id: user._id.toString(),
    login: user.login,
    role: user.role,
    cart: mapCart(user.cart),
  };
}
