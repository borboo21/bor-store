import { InferSchemaType, model, Schema, Types } from "mongoose";
import { DeviceDocument } from "./Device";

export const CartSchema = new Schema({
  items: [
    {
      device: { type: Schema.Types.ObjectId, ref: "Device", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
});

export type CartItemPopulated = {
  device: DeviceDocument;
  quantity: number;
};

export type CartItemRaw = {
  device: Types.ObjectId;
  quantity: number;
};

export type CartPopulated = {
  items: CartItemPopulated[];
  amount: number;
};

export type Cart = InferSchemaType<typeof CartSchema>;

export const CartModel = model<Cart>("Cart", CartSchema);
