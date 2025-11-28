import { SchemaDefinition } from "mongoose";
import { CUSTOMER_PRIVILEGES, UserRole } from "../../core/Type";

const UserSchemaDef: SchemaDefinition = {
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: Number, default: UserRole.Customer },
  userId: { type: Number, unique: true },
  privileges: { type: Number, default: CUSTOMER_PRIVILEGES },
};

export default UserSchemaDef;