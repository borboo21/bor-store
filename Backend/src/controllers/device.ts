import { mapDevice } from "../helpers/mapDevice.ts";
import { DeviceModel, type Device } from "../models/Device.ts";

//add

export function addDevice(device: Device) {
  return DeviceModel.create(device);
}

//edit

export async function editDevice(id: string, device: Device) {
  const newDevice = await DeviceModel.findByIdAndUpdate(id, device, {
    returnDocument: "after",
  });
  return newDevice;
}

// delete

export function deleteDevice(id: string) {
  return DeviceModel.deleteOne({ _id: id });
}

// get, paginate, search, category, sort

type Sorting = 1 | -1 | null;

interface GetDevicesOptions {
  search?: string;
  category?: string;
  sorting?: Sorting;
  page?: number;
}

export async function getDevices({
  search = "",
  category = "",
  sorting = null,
  page = 1,
}: GetDevicesOptions) {
  const [rawDevices] = await Promise.all([
    DeviceModel.find({
      name: { $regex: search, $options: "i" },
      category: { $regex: category, $options: "i" },
    })
      .skip(page - 1)
      .sort(sorting ? { basePrice: sorting } : { name: -1 }),
    DeviceModel.countDocuments({
      category: { $regex: category, $options: "i" },
    }),
  ]);
  const devices = rawDevices.map(mapDevice);
  return {
    devices,
  };
}

// get all devices
export async function getAllDevices() {
  const allDevices = await DeviceModel.find();
  if (!allDevices) {
    throw new Error("Devices not found");
  }
  return allDevices;
}

// get item
export async function getDevice(id: string) {
  const oneDevice = await DeviceModel.findById(id);
  if (!oneDevice) {
    throw new Error("Device not found");
  }
  return oneDevice;
}
