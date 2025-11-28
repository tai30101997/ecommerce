import _ from 'lodash';
import { HttpError } from "../../core/httpError";
import { AddCardInput } from "../../core/Type";
import { ProductRepository } from "../products/product.repository";
import { CartDocument, CartModel } from "../../models/cart/cart.model";
export class CartProvider {

  static validateAddItemInput(input: AddCardInput) {
    if (!input?.enteredBy?.id) {
      throw new HttpError({
        status: 400,
        message: "User id is required",
        errors: [{ errorCode: "400", errorMessage: "Missing userId" }]
      });
    }
    if (!input?.productId) {
      throw new HttpError({
        status: 400,
        message: "Product id is required",
        errors: [{ errorCode: "400", errorMessage: "Missing productId" }]
      });
    }
    if (!input?.quantity || input.quantity <= 0) {
      throw new HttpError({
        status: 400,
        message: "Quantity must be greater than zero",
        errors: [{ errorCode: "400", errorMessage: "Invalid quantity" }]
      });
    }
  }

  static async getProductOrThrow(productId: number) {
    const product = await ProductRepository.findById(productId);
    if (_.isNil(product)) {
      throw new HttpError({
        status: 404,
        message: "Product not found",
        errors: [{ errorCode: "404", errorMessage: "Product not found" }]
      });
    }
    return product;
  }

  static validateQuantityStock(currentQuantity: number, addedQuantity: number, stock: number) {
    const newQuantity = currentQuantity + addedQuantity;
    if (newQuantity > stock) {
      throw new HttpError({
        status: 400,
        message: "Insufficient stock",
        errors: [{ errorCode: "400", errorMessage: "Insufficient stock" }]
      });
    }
    return newQuantity;
  }

  static ensureCartItemsIsArray(cart: any) {
    if (!Array.isArray(cart.items)) {
      cart.items = [];
    }
  }

  static findCartItem(cart: CartDocument, productId: number) {
    return cart.items.find((i: any) => i.productId === productId);
  }

}
