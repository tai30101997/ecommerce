import mongoose, { Schema, HydratedDocument } from "mongoose";
import OrderSchemaDef from "./order.schema";
import { Order } from "./order";
import { getNextSequence } from "../../utils/autoIncrement";

const modelName = "orders";

const orderSchema = new Schema<Order>(
  OrderSchemaDef,
  {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
  }
);

orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    this.orderId = await getNextSequence(modelName);
  }
});


export type OrderDocument = HydratedDocument<Order>;

export const OrderModel = mongoose.model<Order>(modelName, orderSchema);