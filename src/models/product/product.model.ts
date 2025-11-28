import mongoose, { Schema, HydratedDocument } from "mongoose";
import ProductSchemaDef from "./product.schema";
import { getNextSequence } from "../../utils/autoIncrement";
import { Product } from "./product";

const modelName = "products";

const productSchema = new Schema<Product>(
  ProductSchemaDef,
  {
    timestamps: true,
  }
);

// Auto-increment productId
productSchema.pre("save", async function (next) {
  if (!this.productId) {
    this.productId = await getNextSequence(modelName);
  }
});

export type ProductDocument = HydratedDocument<Product>;

export const ProductModel = mongoose.model<Product>(modelName, productSchema);