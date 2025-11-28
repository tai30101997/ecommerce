import { ProductModel } from "../../models/product/product.model";
import { OrderRepository } from "./order.repository";
import { HttpError } from "../../core/httpError";
import { GetAllOrderInput, GetOrderInput, GetOrderResponse, OrderStatus, PlaceOrderInput, PlaceOrderResponseData, ResponseModel } from "../../core/Type";
import { CartRepository } from "../cart/cart.repository";
import { OrderItem } from "../../models/order/order";
import { ProductRepository } from "../products/product.repository";
import { OrderProvider } from "./order.provider";

export class OrderService {
  static async placeOrder(input: PlaceOrderInput): Promise<ResponseModel<PlaceOrderResponseData>> {
    const rs = new ResponseModel<PlaceOrderResponseData>();
    rs.success = false;
    rs.message = "Place Order was unsuccessful."

    try {
      OrderProvider.validateOrderInput(input);
      const userId = input.enteredBy.id;
      const cart = await CartRepository.findByUserId(userId);

      if (!cart || cart.items.length === 0) {
        throw new HttpError({ status: 400, message: "Cart is empty" });
      }

      let total = 0;
      const orderItems: OrderItem[] = [];

      for (const item of cart.items) {
        const product = await ProductRepository.findById(item.productId);

        if (!product) {
          throw new HttpError({ status: 404, message: "Product not found" });
        }

        if (product.stock < item.quantity) {
          throw new HttpError({
            status: 400,
            message: `Insufficient stock for ${product.name}`
          });
        }

        const subtotal = product.price * item.quantity;
        total += subtotal;

        orderItems.push({
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          subtotal
        });

        const newStock = product.stock - item.quantity;
        await ProductRepository.update(product.productId, { stock: newStock });
      }

      const newOrder = await OrderRepository.createOrder({
        userId,
        items: orderItems,
        total,
        status: OrderStatus.Pending
      });

      await CartRepository.deleteCard(userId, cart.cardId);

      rs.success = true;
      rs.message = "Order placed successfully";
      rs.data = newOrder;

      return rs;

    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError({
        status: 500,
        message: "Internal error while placing order"
      });
    }
  }

  static async getMyOrders(input: GetOrderInput): Promise<ResponseModel<GetOrderResponse>> {
    const rs = new ResponseModel<GetOrderResponse>();
    rs.success = false;
    rs.message = "Get orders was unsuccessful."

    try {
      OrderProvider.validateOrderInput(input);
      const userId = input.enteredBy.id;
      let orderList = await OrderRepository.findByUser(userId)
      if (orderList && orderList.length > 0) {
        rs.message = "Get orders was successful."
        rs.data = orderList;
      } else {
        rs.data = []
      }

    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError({
        status: 500,
        message: "Internal error while placing order"
      });
    }
    return rs
  }

  static async getAllOrders(input: GetAllOrderInput): Promise<ResponseModel<GetOrderResponse>> {
    const rs = new ResponseModel<GetOrderResponse>();
    rs.success = false;
    rs.message = "Get all orders was unsuccessful."

    try {
      let orderList = await OrderRepository.findAll();
      if (orderList && orderList.length > 0) {
        rs.message = "Get orders was successful."
        rs.data = orderList;
      } else {
        rs.data = []
      }
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError({
        status: 500,
        message: "Internal error while placing order"
      });
    }
    return rs

  }
}