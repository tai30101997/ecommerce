export default {
  productId: { type: Number, unique: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "", trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: [Number], default: [] },
};