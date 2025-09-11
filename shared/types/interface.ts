export interface DeviceDTO {
  id: string;
  category: string;
  name: string;
  imageUrl: string;
  price: number;
}
export interface CartItemDTO {
  device: DeviceDTO;
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
  device: DeviceDTO;
  quantity: number;
  amount?: number;
};

export type MergeCartDataDTO = [{ device: DeviceDTO; quantity: number }];
