// types/order.ts
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface DeliveryAddress {
  area: string;
  street?: string;
}

export interface Order {
  _id: string;
  userId: {
    name: string;
    email: string;
    _id: string;
  };
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: "bkash" | "nagad" | "card" | "cash" | string;
  orderStatus: "pending" | "confirmed" | "cancelled" | "delivered" | string;
  deliveryAddress: DeliveryAddress;
  deliveryDate: string;
  deliveryTime: string;
  createdAt?: string;
  updatedAt?: string;
}
