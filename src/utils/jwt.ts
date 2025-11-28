import jwt from "jsonwebtoken";
import { HttpError } from "../core/httpError";
import dotenv from "dotenv";
dotenv.config();
export class JWTTokenProvider {
  private secret: string;
  private expiresIn: string;

  constructor(secret = process.env.JWT_SECRET, expiresIn = "3h") {
    if (!secret) {
      throw new Error("JWT secret is missing. Please set JWT_SECRET in environment.");
    }
    if (!expiresIn) {
      throw new Error("JWT secret is missing. Please set JWT_SECRET in environment.");
    }
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  /** Create token */
  sign(payload: object) {
    try {
      return jwt.sign({
        ...payload,
      }, this.secret!, {
        expiresIn: '1h'
      })
    } catch (err: any) {
      const errorInfo = [{ errorCode: "500", errorMessage: "Unknown error" }]
      throw new HttpError({ status: 400, message: "Invalid email or password", errors: errorInfo });
    }
  }

  /** Verify token */
  verify(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (err: any) {
      const errorInfo = [{ errorCode: "500", errorMessage: "Unknown error" }]
      throw new HttpError({ status: 400, message: "Invalid email or password", errors: errorInfo });
    }
  }

  /** Decode token without verifying (rarely needed) */
  decode(token: string) {
    return jwt.decode(token);
  }

  /** Express middleware: attach user to request */
  attachUser = (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return next(); // no token -> public route
      }

      const token = authHeader.replace("Bearer ", "");
      const decoded = this.verify(token);

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  };
}