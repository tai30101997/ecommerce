import { Response } from "express";
import { CartService } from "./cart.service";
import { AuthenticatedRequest } from "../../core/AuthRequest";

export class CartController {
  static async add(req: AuthenticatedRequest, res: Response) {

    const { productId, quantity } = req.body;
    const cart = await CartService.addItem({
      enteredBy: req.user,
      productId, quantity
    });
    return res.status(200).json(cart);
  }

  static async remove(req: AuthenticatedRequest, res: Response) {
    const { productId } = req.body;
    const cart = await CartService.removeItem({
      enteredBy: req.user,
      productId
    });
    return res.status(200).json(cart);
  }

  static async get(req: AuthenticatedRequest, res: Response) {
    const cart = await CartService.getCart({
      enteredBy: req.user
    });
    return res.status(200).json(cart);
  }
}