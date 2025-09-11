import {
  HydratedDocument,
  InferSchemaType,
  model,
  Schema,
  Types,
} from "mongoose";
import { CartItemPopulated, CartItemRaw, CartSchema } from "./Cart";
import roles from "../constants/roles";

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: roles.USER,
  },
  cart: { type: CartSchema },
});

export type User = InferSchemaType<typeof UserSchema>;

export type UserRaw = {
  _id: Types.ObjectId;
  login: string;
  role: number;
  cart: {
    items: CartItemRaw[];
    amount: number;
  };
};

export type UserPopulated = {
  _id: Types.ObjectId;
  login: string;
  role: number;
  cart: {
    items: CartItemPopulated[];
    amount: number;
  };
};

export type UserDocument = HydratedDocument<User>;

export const UserModel = model<User>("User", UserSchema);
