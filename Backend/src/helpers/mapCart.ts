import type {
  CartDeviceDTO,
  CartDTO,
  CartItemDTO,
} from "../../../shared/types/interface.ts";
import type { CartItem, CartType } from "../models/Cart.ts";

export function mapCartItemDevice(item: CartItem["device"]): CartDeviceDTO {
  return {
    deviceId: item.deviceId.toString(),
    name: item.name,
    category: item.category,
    variantId: item.variantId.toString(),
    color: item.color,
    colorName: item.colorName,
    imageUrl: item.imageUrl,
    specId: item.specId.toString(),
    storage: item.storage,
    diagonal: item.diagonal,
    ram: item.ram,
    simType: item.simType,
    price: item.price,
  };
}

export function mapCartItem(item: CartItem): CartItemDTO {
  return {
    device: mapCartItemDevice(item.device),
    quantity: item.quantity,
  };
}

export function mapCart(cart: CartType): CartDTO {
  return {
    items: cart.items.map((item) => mapCartItem(item)),
    amount: cart.amount,
  };
}
