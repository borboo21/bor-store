import mongoose from "mongoose";
import type { InferSchemaType } from "mongoose";
import type { DeviceDocument, DeviceSpecs, DeviceVariant } from "./Device.ts";

const { model, Schema } = mongoose;

export const CartSchema = new Schema({
  items: [
    {
      device: {
        type: {
          deviceId: {
            type: Schema.Types.ObjectId,
            ref: "Device",
            required: true,
          },
          name: { type: String, required: true },
          category: { type: String, required: true },
          variantId: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          color: { type: String, required: true },
          colorName: { type: String, required: true },
          imageUrl: { type: String, required: true },
          specId: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          storage: String,
          ram: String,
          diagonal: String,
          simType: String,
          price: { type: Number, required: true },
        },
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
});

export type CartItem = {
  device: {
    deviceId: DeviceDocument["_id"];
    name: DeviceDocument["name"];
    category: DeviceDocument["category"];
    variantId: DeviceVariant["_id"];
    color: DeviceVariant["color"];
    colorName: DeviceVariant["colorName"];
    imageUrl: DeviceVariant["imageUrl"];
    specId: DeviceSpecs["_id"];
    storage?: DeviceSpecs["storage"];
    ram?: DeviceSpecs["ram"];
    diagonal?: DeviceSpecs["diagonal"];
    simType?: DeviceSpecs["simType"];
    price: DeviceSpecs["price"];
  };
  quantity: number;
};

export type CartType = {
  items: CartItem[];
  amount: number;
};

export type Cart = InferSchemaType<typeof CartSchema>;

export const CartModel = model<Cart>("Cart", CartSchema);
