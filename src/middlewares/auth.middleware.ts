import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../core/response";
import { ApiErrorResponseFail } from "../core/Type";
import { JWTTokenProvider } from "../utils/jwt";
import dotenv from "dotenv";
import { AuthenticatedRequest } from "../core/AuthRequest";

dotenv.config();

const expiresIn = "3h";

const jwtProvider = new JWTTokenProvider(process.env.JWT_SECRET, expiresIn);

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    const resp: ApiErrorResponseFail = {
      errors: [{ errorCode: "MissingToken", errorMessage: "Missing Bearer token" }],
      success: false,
      message: "Unauthorized: Token missing",
      status: 401,
    };
    return ApiResponse.error(res, resp);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwtProvider.verify(token);
    req.user = decoded;
    return next();
  } catch (err: any) {
    const resp: ApiErrorResponseFail = {
      errors: [{ errorCode: "InvalidToken", errorMessage: err.message }],
      success: false,
      message: "Unauthorized: Invalid token",
      status: 401,
    };
    return ApiResponse.error(res, resp);
  }
}