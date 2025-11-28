import mongoose, { Schema, HydratedDocument } from "mongoose";
import { Cart } from "./cart";
import SchemaCart from "./cart.schema";
import { getNextSequence } from "../../utils/autoIncrement";

const modelName = "carts";

const CartSchema = new Schema<Cart>(
  SchemaCart,
  {
    timestamps: true,
  }
);
CartSchema.pre("save", async function (next) {
  if (!this.cardId) {
    this.cardId = await getNextSequence(modelName);
  }
});

export type CartDocument = HydratedDocument<Cart>;

export const CartModel = mongoose.model<Cart>(modelName, CartSchema);