import { NextFunction, Request, Response } from "express";
import { OrderService } from "./order.service";
import { AuthenticatedRequest } from "../../core/AuthRequest";

export class OrderController {

  static async place(req: AuthenticatedRequest, res: Response) {
    const result = await OrderService.placeOrder({
      enteredBy: req.user
    });
    res.status(200).json(result);
  }

  static async myOrders(req: AuthenticatedRequest, res: Response) {
    const result = await OrderService.getMyOrders({
      enteredBy: req.user
    });
    res.status(200).json(result);
  }

  static async all(req: AuthenticatedRequest, res: Response) {
    const result = await OrderService.getAllOrders({
      enteredBy: req.user
    });
    res.status(200).json(result);
  }
}