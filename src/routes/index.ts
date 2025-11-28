import { Router } from "express";
import authRoutes from "./auth.route";
import productRoutes from "./product.route";
import cartRoutes from "./cart.route"
import orderRoutes from "./order.route";
const router = Router();
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
export default router;