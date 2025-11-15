import type { OrdersResponseDTO } from "@shared/types";
import type { OrderDocument } from "../models/Order.ts";

export function mapOrders(order: OrderDocument): OrdersResponseDTO {
  return {
    id: order._id.toString(),
    userId: order.userId.toString(),
    login: order.login,
    items: order.items,
    createdAt: order.createdAt.toString(),
    amount: order.amount,
  };
}
