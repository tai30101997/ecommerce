import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { OrderController } from "../modules/orders/order.controller";
import { isAdmin, isOwner } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { placeOrderSchema } from "../modules/orders/order.schema";

const router = Router();
router.post(
  "/",
  authenticate,
  isOwner,
  validate(placeOrderSchema),
  OrderController.place
);
router.get(
  "/my",
  authenticate,
  OrderController.myOrders
);

router.get(
  "/",
  authenticate,
  isAdmin,
  OrderController.all
);

export default router;