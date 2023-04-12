export type OrderStatus = 'created' | 'processing' | 'shipped'

export interface ProductOption {
  id: string | number;
  code: string;
  name: string;
  value: string;
  price: number;
  description: string;
}

export interface OrderItem {
  order_id: string | number;
  product_id: string | number;
}

export interface Order {
  id: number;
  shopId: number;
  amount: number;
  discount?: number;
  orderName: string;
  orderPhone: string;
  orderCountry: string;
  orderState: string;
  orderCity: string;
  orderAddress: string;
  description?: string;
  status: OrderStatus;
  trackingNumber: string;
  createdAt: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  items?: OrderItem[]
}
