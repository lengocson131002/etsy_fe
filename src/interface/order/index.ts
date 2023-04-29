export type OrderStatus = 'created' | 'processing' | 'shipped';

export interface ProductOption {
  id: string | number;
  code: string;
  name: string;
  value: string;
  price: number;
  description: string;
}

export interface OrderItem {
  id?: number;
  etsyListingId?: string;
  image?: string;
  price?: number;
  name?: string;
  quantity?: number;
  description?: string;
}

export interface Order {
  id?: number;
  image?: string;
  etsyOrderId?: string;
  progressStep?: string;
  itemCount?: number;
  itemTotal?: number;
  couponRate?: number;
  couponValue?: number;
  couponCode?: string;
  subTotal?: number;
  orderTotal?: number;
  adjustedTotal?: number;
  tax?: number;
  orderName?: string;
  orderEmail?: string;
  orderTime?: string;
  shippingCustomerName?: string;
  shippingPrice?: number;
  shippingAddress?: string;
  shippingBy?: string;
  shippingCareer?: string;
  estimateDelivery?: string;
  trackingNumber?: string;
  markAsGift?: true;
  shopId: string;
  shopName: string;
  currencyCode: string;
  currencySymbol: string
}

export interface OrderDetail extends Order {
  items?: OrderItem[];
}
