import mongoose, { Schema, HydratedDocument } from "mongoose";
import { getNextSequence } from "../../utils/autoIncrement";
import UserSchemaDef from "./user.schema";
import { User } from "./user";

const modelName = "users";

const userSchema = new Schema<User>(
  UserSchemaDef,
  {
    autoIndex: false,
    bufferCommands: true,
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" }
  }
);
userSchema.pre("save", async function () {
  if (!this.userId) {
    this.userId = await getNextSequence(modelName);
  }
});
// Auto-increment
// Type for TS
export type UserDocument = HydratedDocument<User>;
// Model
export const UserModel = mongoose.model<User>(modelName, userSchema);