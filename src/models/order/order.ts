export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  orderId: number;
  userId: number;
  items: OrderItem[];
  total: number;
  status: string;
}