import type {
  DeviceDTO,
  DeviceSpecsDTO,
  DeviceVariantDTO,
} from "../../../shared/types/interface.ts";
import type {
  DeviceDocument,
  DeviceSpecs,
  DeviceVariant,
} from "../models/Device.ts";

export function mapDeviceSpec(deviceSpec: DeviceSpecs): DeviceSpecsDTO {
  return {
    specsId: deviceSpec._id.toString(),
    storage: deviceSpec.storage,
    ram: deviceSpec.ram,
    diagonal: deviceSpec.diagonal,
    simType: deviceSpec.simType,
    price: deviceSpec.price,
  };
}

export function mapDeviceVariant(
  deviceVariant: DeviceVariant
): DeviceVariantDTO {
  return {
    variantId: deviceVariant._id.toString(),
    color: deviceVariant.color,
    colorName: deviceVariant.colorName,
    imageUrl: deviceVariant.imageUrl,
    specs: deviceVariant.specs.map((spec) => mapDeviceSpec(spec)),
  };
}

export function mapDevice(device: DeviceDocument): DeviceDTO {
  return {
    id: device._id.toString(),
    category: device.category,
    name: device.name,
    imageUrl: device.imageUrl,
    price: device.price,
    variants: device.variants.map((variant) => mapDeviceVariant(variant)),
  };
}
