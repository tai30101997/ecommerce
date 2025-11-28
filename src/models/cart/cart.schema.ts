
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },

}, { _id: false });

export default {
  userId: { type: Number, required: true },
  items: {
    type: [CartItemSchema],
    default: []
  },
  cardId: { type: Number, unique: true },
};
