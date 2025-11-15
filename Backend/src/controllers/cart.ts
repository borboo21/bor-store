import type { AddToCartResponseDTO, MergeCartDataDTO } from "@shared/types";
import { DeviceModel } from "../models/Device.ts";
import { UserModel } from "../models/User.ts";
import { mapCart, mapCartItemDevice } from "../helpers/mapCart.ts";

// add
export async function addDeviceInCart(
  userId: string,
  deviceId: string,
  variantId: string,
  specId: string
): Promise<AddToCartResponseDTO> {
  const device = await DeviceModel.findById(deviceId);
  if (!device) throw new Error("Device not found");
  const variant = device.variants.find((v) => v._id.toString() === variantId);
  if (!variant) throw new Error("Variant not found");
  const spec = variant?.specs.find((s) => s._id.toString() === specId);
  if (!spec) throw new Error("Spec not found");
  const cartItem = {
    device: {
      deviceId: device._id,
      name: device.name,
      category: device.category,
      variantId: variant._id,
      color: variant.color,
      colorName: variant.colorName,
      imageUrl: variant.imageUrl,
      specId: spec._id,
      storage: spec.storage ?? undefined,
      diagonal: spec.diagonal ?? undefined,
      ram: spec.ram ?? undefined,
      simType: spec.simType ?? undefined,
      price: spec.price,
    },
    quantity: 1,
  };
  if (!cartItem.device) throw new Error("Cart item not created");
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $push: {
        "cart.items": cartItem,
      },
      $inc: { "cart.amount": +spec.price },
    },
    { new: true }
  );
  if (!updatedUser) throw new Error("User not updated");
  if (!updatedUser.cart) throw new Error("User don`t have cart");
  const lastAddedItem =
    updatedUser.cart.items[updatedUser.cart.items.length - 1];
  if (!lastAddedItem) throw new Error("Cart item not found");
  return {
    device: mapCartItemDevice(lastAddedItem.device),
    quantity: lastAddedItem.quantity,
    amount: updatedUser.cart.amount,
  };
}

// delete
export async function deleteDeviceInCart(userId: string, specId: string) {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");
  if (!user.cart) throw new Error("Cart not found");
  const cartItem = user.cart.items.find(
    (item) => item.device.specId.toString() === specId
  );
  if (!cartItem) throw new Error("Device not found");
  await UserModel.findOneAndUpdate(
    { _id: userId, "cart.items.device.specId": specId },
    {
      $pull: { "cart.items": { "device.specId": specId } },
      $inc: { "cart.amount": -(cartItem.device.price * cartItem?.quantity) },
    }
  );
}

// switch quantity
export async function switchQuantityInCart(
  specId: string,
  userId: string,
  quantity: number
) {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");
  if (!user.cart) throw new Error("Cart not found");
  const cartItem = user.cart.items.find(
    (item) => item.device.specId.toString() === specId
  );
  if (!cartItem) throw new Error("Item not found in cart");
  const pricePerItem = cartItem.device.price;
  const oldQuantiy = cartItem.quantity;
  const newQuantity = quantity - oldQuantiy;
  const newAmount = newQuantity * pricePerItem;
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: userId, "cart.items.device.specId": specId },
    {
      $set: { "cart.items.$.quantity": quantity },
      $inc: { "cart.amount": newAmount },
    },
    { new: true }
  );
  if (!updatedUser) throw new Error("Failed to update cart");
  if (!updatedUser.cart) throw new Error("User don`t have cart");
  const updatedItem = updatedUser.cart.items.find(
    (item) => item.device.specId.toString() === specId
  );
  if (!updatedItem) throw new Error("Updated item not found");
  return {
    quantity: updatedItem.quantity,
    amount: updatedUser.cart.amount,
  };
}

// add cart from frontend
export async function addCartForUser(userId: string, cart: MergeCartDataDTO) {
  const user = await UserModel.findById(userId);
  if (user && user.cart) {
    for (const cartItem of cart) {
      const device = await DeviceModel.findById(cartItem.device.deviceId);
      if (!device) throw new Error("Device not found");
      const variant = device.variants.find(
        (v) => v._id.toString() === cartItem.device.variantId.toString()
      );
      if (!variant) throw new Error("Variant not found");
      const spec = variant.specs.find(
        (s) => s._id.toString() === cartItem.device.specId.toString()
      );
      if (!spec) throw new Error("Spec not found");
      const existingItem = user.cart.items.find(
        (item) => item.device.specId.toString() === cartItem.device.specId
      );
      if (existingItem) {
        await UserModel.updateOne(
          { _id: userId, "cart.items.device.specId": spec._id },
          {
            $inc: {
              "cart.items.$.quantity": +cartItem.quantity,
              "cart.amount": +(spec.price * cartItem.quantity),
            },
          },
          { new: true, projection: { _id: 0 } }
        );
      } else {
        const cartItemFromDB = {
          device: {
            deviceId: device._id,
            name: device.name,
            category: device.category,
            variantId: variant._id,
            color: variant.color,
            colorName: variant.colorName,
            imageUrl: variant.imageUrl,
            specId: spec._id,
            storage: spec.storage ?? undefined,
            diagonal: spec.diagonal ?? undefined,
            ram: spec.ram ?? undefined,
            simType: spec.simType ?? undefined,
            price: spec.price,
          },
          quantity: cartItem.quantity,
        };
        await UserModel.updateOne(
          { _id: userId },
          {
            $push: { "cart.items": cartItemFromDB },
            $inc: { "cart.amount": +(spec.price * cartItem.quantity) },
          },
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
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");
  if (!user.cart) throw new Error("Cart not found");
  user.cart.amount = user.cart.items.reduce(
    (sum, item) => sum + item.device.price * item.quantity,
    0
  );
  return mapCart(user.cart);
}
