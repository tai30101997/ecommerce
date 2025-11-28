import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { CartController } from "../modules/cart/cart.controller";
import { addToCartSchema, removeFromCartSchema } from "../modules/cart/cart.schema";
import { validate } from "../middlewares/validate.middleware";
import { isOwner } from "../middlewares/role.middleware";

const router = Router();

router.get("/my", authenticate, CartController.get);
router.post("/add", authenticate, isOwner, validate(addToCartSchema), CartController.add);
router.post("/remove", authenticate, isOwner, validate(removeFromCartSchema), CartController.remove);

export default router;