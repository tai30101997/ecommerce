import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  model: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});
const modelName = "counters";

export const Counter = mongoose.model(modelName, CounterSchema);