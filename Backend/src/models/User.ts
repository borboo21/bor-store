import mongoose from "mongoose";
import type { HydratedDocument, InferSchemaType, Types } from "mongoose";
import {
  CartSchema,
  type CartItemPopulated,
  type CartItemRaw,
} from "./Cart.ts";
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
