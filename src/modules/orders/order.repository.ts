import { Order } from "../../models/order/order";
import { OrderDocument, OrderModel } from "../../models/order/order.model";

export class OrderRepository {
  static async createOrder(data: Partial<Order>): Promise<OrderDocument> {
    const order = new OrderModel({
      userId: data.userId,
      items: data.items || [],
      total: data.total || 0,
      status: data.status,
    });

    await order.save();
    return order;
  }
  static async findByUser(userId: number) {
    return OrderModel.find({ userId }).sort({ createdDate: -1 }).lean();
  }

  static async findAll() {
    return OrderModel.find().sort({ createdDate: -1 }).lean();
  }
}