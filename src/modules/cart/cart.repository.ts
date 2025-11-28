import { Cart } from "../../models/cart/cart";
import { CartDocument, CartModel } from "../../models/cart/cart.model";


export class CartRepository {
  static async findByUserId(userId: number): Promise<CartDocument | null> {
    return CartModel.findOne({ userId });
  }

  static async createCart(data: Partial<Cart>): Promise<CartDocument> {

    let cart = new CartModel({
      userId: data.userId,
      items: data.items || [],
    });
    await cart.save();
    return cart
  }

  static async updateCart(userId: number, cart: any) {
    return CartModel.findOneAndUpdate(
      { userId },
      cart,
      { new: true }
    );
  }

  static async deleteCard(userId: number, cardId: number) {
    return await CartModel.findOneAndDelete({ cardId, userId }).lean();

  }

  static async getCartWithDetails(userId: number) {
    return CartModel.aggregate([
      { $match: { userId } },
      { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "productId",
          as: "product",
        },
      },
      { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },

      {
        $addFields: {
          "items.subtotal": {
            $multiply: ["$items.quantity", "$product.price"]
          }
        }
      },

      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          items: {
            $push: {
              productId: "$items.productId",
              quantity: "$items.quantity",
              name: "$product.name",
              price: "$product.price",
              subtotal: "$items.subtotal"
            }
          },
        }
      },

      {
        $addFields: {
          total: { $sum: "$items.subtotal" }
        }
      }
    ]);
  }
}