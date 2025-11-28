export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  cardId: number;
  userId: number;
  items: CartItem[];
  updatedAt: Date;
}
