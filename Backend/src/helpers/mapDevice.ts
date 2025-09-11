import { DeviceDTO } from "@shared/types/interface";
import { DeviceDocument } from "../models/Device";

export function mapDevice(device: DeviceDocument): DeviceDTO {
  return {
    id: device._id.toString(),
    category: device.category,
    name: device.name,
    price: device.price,
    imageUrl: device.imageUrl,
  };
}
