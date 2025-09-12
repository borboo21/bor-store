import { HydratedDocument, InferSchemaType, model, Schema } from "mongoose";

const OrderItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
type OrderItem = InferSchemaType<typeof OrderItemSchema>;

export const OrderItemModel = model<OrderItem>("OrderItem", OrderItemSchema);

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    login: { type: String, required: true },
    items: [OrderItemSchema],
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

type Order = InferSchemaType<typeof OrderSchema>;

export type OrderDocument = HydratedDocument<Order>;

export const OrderModel = model<Order>("Order", OrderSchema);
