import { HttpError } from "../../core/httpError";
import { CartRepository } from "./cart.repository";
import { CartProvider } from "./cart.provider";
import { AddCardInput, AddCartItemResponseData, CardResponseData, GetCardInput, RemoveCartItemResponseData, RemoveItemInput, ResponseModel } from "../../core/Type";

export class CartService {

  static async addItem(input: AddCardInput): Promise<ResponseModel<AddCartItemResponseData>> {
    let rs = new ResponseModel<AddCartItemResponseData>();
    rs.success = false;
    rs.message = "Add item to cart failed.";
    try {
      CartProvider.validateAddItemInput(input);

      const userId = input.enteredBy.id;
      const quantity = input.quantity;
      const productId = input.productId;
      const product = await CartProvider.getProductOrThrow(productId);

      let cart = await CartRepository.findByUserId(userId);

      if (!cart) {
        const newCart = await CartRepository.createCart({ userId, items: [] });
        if (!newCart) {
          throw new HttpError({
            status: 500,
            message: "Failed to create cart",
            errors: [{ errorCode: "500", errorMessage: "Create cart failed" }]
          });
        }

        cart = newCart;
      }

      CartProvider.ensureCartItemsIsArray(cart);

      const item = CartProvider.findCartItem(cart, productId);
      const newQuantity = CartProvider.validateQuantityStock(item?.quantity ?? 0, quantity, product.stock);

      if (item) {
        item.quantity = newQuantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      const updatedCart = await CartRepository.updateCart(userId, cart);
      if (!updatedCart) throw new HttpError({ status: 500, message: "Failed to update cart", errors: [{ errorCode: "500", errorMessage: "Update cart failed" }] });

      rs.success = true;
      rs.message = "Item added to cart successfully.";
      rs.data = updatedCart;

    } catch (err) {
      if (err instanceof HttpError) throw err;
      throw new HttpError({ status: 500, message: "Internal error while adding item to cart", errors: [{ errorCode: "500", errorMessage: "Unknown error" }] });
    }
    return rs;
  }

  static async removeItem(input: RemoveItemInput): Promise<ResponseModel<RemoveCartItemResponseData>> {
    let rs = new ResponseModel<RemoveCartItemResponseData>();
    rs.success = false;
    rs.message = "Remove item from cart failed.";
    try {
      if (!input?.enteredBy?.id) throw new HttpError({ status: 400, message: "Missing userId", errors: [{ errorCode: "400", errorMessage: "Missing userId" }] });
      if (!input?.productId) throw new HttpError({ status: 400, message: "Missing productId", errors: [{ errorCode: "400", errorMessage: "Missing productId" }] });

      const userId = input.enteredBy.id;
      const productId = input.productId;

      let cart = await CartRepository.findByUserId(userId);
      if (!cart) throw new HttpError({ status: 404, message: "Cart not found", errors: [{ errorCode: "404", errorMessage: "Cart not found" }] });

      const itemIndex = cart.items.findIndex(i => i.productId === productId);
      if (itemIndex === -1) throw new HttpError({ status: 404, message: "Item not in cart", errors: [{ errorCode: "404", errorMessage: "Product not in cart" }] });

      cart.items.splice(itemIndex, 1);

      const updatedCart = await CartRepository.updateCart(userId, cart);
      if (!updatedCart) throw new HttpError({ status: 500, message: "Failed to update cart", errors: [{ errorCode: "500", errorMessage: "Update cart failed" }] });

      rs.success = true;
      rs.message = "Item removed from cart successfully.";
      rs.data = updatedCart;

    } catch (err) {
      if (err instanceof HttpError) throw err;
      throw new HttpError({ status: 500, message: "Internal error while removing item from cart", errors: [{ errorCode: "500", errorMessage: "Unknown error" }] });
    }
    return rs;
  }

  static async getCart(input: GetCardInput): Promise<ResponseModel<CardResponseData>> {
    let rs = new ResponseModel<CardResponseData>();
    rs.success = false;
    rs.message = "Get cart failed.";
    try {
      if (!input?.enteredBy?.id) throw new HttpError({ status: 400, message: "Missing userId", errors: [{ errorCode: "400", errorMessage: "Missing userId" }] });

      const userId = input.enteredBy.id;
      const cart = await CartRepository.getCartWithDetails(userId);

      rs.success = true;
      rs.message = "Cart fetched successfully.";

      if (!Array.isArray(cart) || cart.length === 0) {
        rs.data = { userId, items: [], total: 0 };
        return rs;
      }

      rs.data = cart[0];

    } catch (err) {
      if (err instanceof HttpError) throw err;
      throw new HttpError({ status: 500, message: "Internal error while fetching cart", errors: [{ errorCode: "500", errorMessage: "Unknown error" }] });
    }
    return rs;
  }

}
