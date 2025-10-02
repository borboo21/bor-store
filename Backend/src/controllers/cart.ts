import type {
  AddToCartResponseDTO,
  MergeCartDataDTO,
} from "../../../shared/types/interface.ts";
import { DeviceModel } from "../models/Device.ts";
import { UserModel } from "../models/User.ts";
import type { CartItemPopulated } from "../models/Cart.ts";
import { mapDevice } from "../helpers/mapDevice.ts";
import { mapCart } from "../helpers/mapCart.ts";

// add
export async function addDeviceInCart(
  userId: string,
  deviceId: string
): Promise<AddToCartResponseDTO> {
  const device = await DeviceModel.findById(deviceId);
  if (!device) throw new Error("Device not found");
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $push: { "cart.items": { device: device._id } },
      $inc: { "cart.amount": +device.price },
    },
    { new: true }
  ).populate<{ cart: { items: CartItemPopulated[]; amount: number } }>(
    "cart.items.device"
  );
  if (!updatedUser) throw new Error("User not updated");
  const lastAddedItem =
    updatedUser.cart.items[updatedUser.cart.items.length - 1];
  return {
    device: mapDevice(lastAddedItem.device),
    quantity: lastAddedItem.quantity,
    amount: updatedUser.cart.amount,
  };
}

// delete
export async function deleteDeviceInCart(userId: string, deviceId: string) {
  const user = await UserModel.findById({
    _id: userId,
    "cart.items.device": deviceId,
  }).populate<{
    cart: { items: CartItemPopulated[]; amount: number };
  }>("cart.items.device");
  if (!user) throw new Error("User not found");
  const cartItem = user.cart.items.find(
    (item) => item.device._id.toString() === deviceId
  );
  if (!cartItem) throw new Error("Device not found");
  await UserModel.findOneAndUpdate(
    { _id: userId, "cart.items.device": deviceId },
    {
      $pull: { "cart.items": { device: deviceId } },
      $inc: { "cart.amount": -(cartItem.device.price * cartItem?.quantity) },
    }
  );
}

// switch quantity
export async function switchQuantityInCart(
  deviceId: string,
  userId: string,
  quantity: number
) {
  const user = await UserModel.findById(userId).populate<{
    cart: { items: CartItemPopulated[]; amount: number };
  }>("cart.items.device");
  if (!user) throw new Error("User not found");
  const cartItem = user.cart.items.find(
    (item) => item.device._id.toString() === deviceId
  );
  if (!cartItem) throw new Error("Item not found in cart");
  const pricePerItem = cartItem.device.price;
  const oldQuantiy = cartItem.quantity;
  const newQuantity = quantity - oldQuantiy;
  const newAmount = newQuantity * pricePerItem;
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId, "cart.items.device": deviceId },
    {
      $set: { "cart.items.$.quantity": quantity },
      $inc: { "cart.amount": newAmount },
    },
    { new: true }
  ).populate<{ items: CartItemPopulated[]; amount: number }>(
    "cart.items.device"
  );
  if (!updatedUser) throw new Error("Failed to update cart");
  if (!updatedUser.cart) throw new Error("User don`t have cart");
  const updatedItem = updatedUser.cart.items.find(
    (item) => item.device._id.toString() === deviceId
  );
  if (!updatedItem) throw new Error("Updated item not found");
  return {
    quantity: updatedItem.quantity,
    amount: updatedUser.cart.amount,
  };
}

// add cart from frontend
export async function addCartForUser(userId: string, cart: MergeCartDataDTO) {
  const user = await UserModel.findById(userId).populate<{
    items: CartItemPopulated[];
    amount: number;
  }>("cart.items.device");
  if (user && user.cart) {
    for (const cartItem of cart) {
      const existingItem = user.cart.items.find(
        (item) => item.device._id.toString() === cartItem.device.id
      );
      if (existingItem) {
        const device = await DeviceModel.findById(existingItem.device._id);
        if (!device) throw new Error("Device not found");
        await UserModel.updateOne(
          { _id: userId, "cart.items.device": device._id },
          { $inc: { "cart.items.$.quantity": +cartItem.quantity } },
          { new: true, projection: { _id: 0 } }
        );
      } else {
        const device = await DeviceModel.findById(cartItem.device.id);
        if (!device) throw new Error("Device not found");
        await UserModel.updateOne(
          { _id: userId },
          { $push: { "cart.items": { device: device._id } } },
          { new: true, projection: { _id: 0 } }
        );
      }
      await user.save();
    }
  }
  return cart;
}

// get
export async function getCart(userId: string) {
  const user = await UserModel.findById(userId).populate<{
    cart: { items: CartItemPopulated[]; amount: number };
  }>("cart.items.device");
  if (!user) throw new Error("User not found");
  user.cart.amount = user.cart.items.reduce(
    (sum, item) => sum + item.device.price * item.quantity,
    0
  );
  return mapCart(user.cart);
}
