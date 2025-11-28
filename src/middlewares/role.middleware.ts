import { Response, NextFunction } from "express";
import { ApiResponse } from "../core/response";
import { ApiErrorResponseFail, UserRole } from "../core/Type";
import { AuthenticatedRequest } from "../core/AuthRequest";

export const isOwner = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    const resp: ApiErrorResponseFail = {
      errors: [
        { errorCode: "Unauthorized", errorMessage: "No user found" },
      ],
      success: false,
      message: "Unauthorized: No user found",
      status: 401,
    };
    return ApiResponse.error(res, resp);
  }

  const resourceOwnerId = req.body.userId;

  if (resourceOwnerId && Number(resourceOwnerId) !== Number(req.user.id)) {
    const resp: ApiErrorResponseFail = {
      errors: [
        { errorCode: "Forbidden", errorMessage: "Not the resource owner" },
      ],
      success: false,
      message: "Forbidden: Not the resource owner",
      status: 403,
    };
    return ApiResponse.error(res, resp);
  }
  next();
}

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    const resp: ApiErrorResponseFail = {
      errors: [
        { errorCode: "Unauthorized", errorMessage: "No user found" },
      ],
      success: false,
      message: "Unauthorized: No user found",
      status: 401,
    };
    return ApiResponse.error(res, resp);
  }
  if (req.user.role !== UserRole.Admin) {
    const resp: ApiErrorResponseFail = {
      errors: [
        { errorCode: "Forbidden", errorMessage: "Admin only" },
      ],
      success: false,
      message: "Forbidden: Admin only",
      status: 403,
    };
    return ApiResponse.error(res, resp);
  }
  next();
};