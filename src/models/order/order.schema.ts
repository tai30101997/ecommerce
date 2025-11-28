import { OrderStatus } from "../../core/Type";

export default {
  orderId: { type: Number, unique: true },
  userId: { type: Number, required: true },
  items: [
    {
      productId: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: OrderStatus,
    default: OrderStatus.Pending,
  },
};