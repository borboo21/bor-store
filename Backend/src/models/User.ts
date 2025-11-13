import mongoose from "mongoose";
import type { HydratedDocument, InferSchemaType, Types } from "mongoose";
import { type CartItem, CartSchema } from "./Cart.ts";
import { ROLES } from "../constants/roles.ts";

const { model, Schema } = mongoose;

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
    default: ROLES.USER,
  },
  cart: { type: CartSchema },
});

export type User = InferSchemaType<typeof UserSchema>;

export type UserType = {
  _id: Types.ObjectId;
  login: string;
  role: number;
  cart: {
    items: CartItem[];
    amount: number;
  };
};

export const UserModel = model<User>("User", UserSchema);
