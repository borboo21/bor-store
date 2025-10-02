import type { CartDTO, CartItemDTO } from "../../../shared/types/interface.ts";
import type { CartItemPopulated, CartPopulated } from "../models/Cart.ts";
import { mapDevice } from "./mapDevice.ts";

export function mapCartItem(item: CartItemPopulated): CartItemDTO {
  return {
    device: mapDevice(item.device),
    quantity: item.quantity,
  };
}

export function mapCart(cart: CartPopulated): CartDTO {
  return {
    items: cart.items.map((item) => mapCartItem(item)),
    amount: cart.amount,
  };
}
