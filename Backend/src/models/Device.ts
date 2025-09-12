import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";
import validator from "validator";

export const DeviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: "Image should be a valid URL",
    },
  },
});

export type Device = InferSchemaType<typeof DeviceSchema>;

export type DeviceDocument = HydratedDocument<Device>;

export const DeviceModel = model<Device>("Device", DeviceSchema);
