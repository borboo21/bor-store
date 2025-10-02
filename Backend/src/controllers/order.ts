import type { CartItemPopulated } from "../models/Cart.ts";
import { OrderModel } from "../models/Order.ts";
import { UserModel } from "../models/User.ts";

export function getAllOrders() {
  const allOrders = OrderModel.find(
    {},
    "userId login items amount createdAt"
  ).sort({ createdAt: -1 });
  return allOrders;
}

export async function takeOrder(userId: string) {
  const user = await UserModel.findById(userId).populate<{
    cart: { items: CartItemPopulated[]; amount: number };
  }>("cart.items.device");
  if (!user) throw new Error("User not found");
  if (!user.cart) throw new Error("Cart not exist");
  const order = new OrderModel({
    userId: user._id,
    login: user.login,
    items: user.cart.items.map((item) => ({
      name: item.device.name,
      price: item.device.price,
      quantity: item.quantity,
    })),
    amount: user.cart.amount,
  });
  await order.save();
  user.cart.items.splice(0, user.cart.items.length);
  user.cart.amount = 0;
  await user.save();
}
