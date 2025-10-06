import mongoose from "mongoose";
import type { HydratedDocument, InferSchemaType, Types } from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

export const DeviceSpecsSchema = new Schema(
  {
    storage: {
      type: String,
    },
    ram: {
      type: String,
    },
    simType: {
      type: String,
    },
    diagonal: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: true }
);

export type DeviceSpecs = InferSchemaType<typeof DeviceSpecsSchema> & {
  _id: Types.ObjectId;
};

export const DeviceSpecModel = model<DeviceSpecs>(
  "DeviceSpecs",
  DeviceSpecsSchema
);

export const DeviceVariantSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
    },
    colorName: {
      type: String,
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
    specs: [DeviceSpecsSchema],
  },
  { _id: true }
);

export type DeviceVariant = InferSchemaType<typeof DeviceVariantSchema> & {
  _id: Types.ObjectId;
};

export type DeviceVariantDocument = HydratedDocument<DeviceVariant>;

export const DeviceVariantModel = model<DeviceVariant>(
  "DeviceVariant",
  DeviceVariantSchema
);

export const DeviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      validate: {
        validator: (v: string) => validator.isURL(v),
        message: "Image should be a valid URL",
      },
    },
    price: {
      type: Number,
      required: true,
    },
    variants: [DeviceVariantSchema],
  },
  { _id: true }
);

export type Device = InferSchemaType<typeof DeviceSchema>;

export type DeviceDocument = HydratedDocument<Device>;

export const DeviceModel = model<Device>("Device", DeviceSchema);
