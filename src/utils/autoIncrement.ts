import { Counter } from "../models";


export async function getNextSequence(modelName: string): Promise<number> {
  const counter = await Counter.findOneAndUpdate(
    { model: modelName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
}