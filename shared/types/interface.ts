export interface DeviceSpecsDTO {
  specsId: string;
  storage?: string | null | undefined;
  diagonal?: string | null | undefined;
  ram?: string | null | undefined;
  simType?: string | null | undefined;
  price: number;
}

export interface DeviceVariantDTO {
  variantId: string;
  color: string;
  colorName: string;
  imageUrl: string;
  specs: DeviceSpecsDTO[];
}

export interface DeviceDTO {
  id: string;
  category: string;
  name: string;
  basePrice: number;
  variants: DeviceVariantDTO[];
}

export interface CartDeviceDTO {
  deviceId: string;
  name: string;
  category: string;
  variantId: string;
  color: string;
  colorName: string;
  imageUrl: string;
  specId: string;
  storage?: string | null | undefined;
  diagonal?: string | null | undefined;
  ram?: string | null | undefined;
  simType?: string | null | undefined;
  price: number;
}
export interface CartItemDTO {
  device: CartDeviceDTO;
  quantity: number;
}

export interface CartDTO {
  items: CartItemDTO[];
  amount: number;
}

export interface UserDTO {
  id: string;
  login: string;
  role: number;
  cart?: CartDTO;
}

export interface OrderItemDTO {
  name: string;
  colorName?: string;
  storage?: string;
  diagonal?: string;
  ram?: string;
  simType?: string;
  price: number;
  quantity: number;
}

export interface OrderDTO {
  id: string;
  login: string;
  createdAt: string;
  items: OrderItemDTO[];
  amount: number;
}

export interface OrdersResponseDTO {
  id: string;
  userId: string;
  login: string;
  amount: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  createdAt: string;
}

export type AddToCartResponseDTO = {
  device: CartDeviceDTO;
  quantity: number;
  amount?: number;
};

export type MergeCartDataDTO = [{ device: CartDeviceDTO; quantity: number }];
