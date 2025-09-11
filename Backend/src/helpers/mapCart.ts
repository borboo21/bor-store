import { CartDTO, CartItemDTO } from "@shared/index";
import { mapDevice } from "./mapDevice";
import { CartItemPopulated, CartPopulated } from "../models/Cart";

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
