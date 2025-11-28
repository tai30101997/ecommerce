import { Router } from "express";
import { ProductController } from "../modules/products/product.controller";
import { isAdmin } from "../middlewares/role.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "../modules/products/product.schema";
import { canUpdate, canCreate, canDelete } from "../middlewares/permissions.middleware";
const router = Router();

// Public
router.get("/", ProductController.list);
router.get("/:id", ProductController.detail);

// Admin only
router.delete("/:id", authenticate, isAdmin, canDelete, ProductController.delete);
router.post(
  "/",
  authenticate,
  isAdmin,
  canCreate,
  validate(createProductSchema),
  ProductController.create
);
router.put(
  "/:id",
  authenticate,
  isAdmin,
  canUpdate,
  validate(updateProductSchema),
  ProductController.update
);


export default router;