import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthProvider {
  static async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  static signToken(payload: any) {
    return jwt.sign({
      ...payload,
    }, process.env.JWT_SECRET!, {
      expiresIn: '3h'
    });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}