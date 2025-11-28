import { Response, NextFunction } from "express";
import { ApiResponse } from "../core/response";
import { ApiErrorResponseFail, UserPrivileges } from "../core/Type";
import { AuthenticatedRequest } from "../core/AuthRequest";

/** 
 * Check bitwise privilege 
 */
const hasPrivilege = (userPriv: number, required: UserPrivileges): boolean => {
  return (userPriv & required) === required;
};


const deny = (res: Response, privilegeName: string) => {
  const resp: ApiErrorResponseFail = {
    success: false,
    status: 403,
    message: `Missing '${privilegeName}' privilege`,
    errors: [
      {
        errorCode: "FORBIDDEN",
        errorMessage: `User lacks '${privilegeName}' permission`
      },
    ],
  };

  return ApiResponse.error(res, resp);
};



/** View */
export const canView = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !hasPrivilege(req.user.privileges, UserPrivileges.View)) {
    return deny(res, "View");
  }
  next();
};

/** List */
export const canList = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !hasPrivilege(req.user.privileges, UserPrivileges.List)) {
    return deny(res, "List");
  }
  next();
};

/** Purchase */
export const canPurchase = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !hasPrivilege(req.user.privileges, UserPrivileges.Purchase)) {
    return deny(res, "Purchase");
  }
  next();
};

/** Create */
export const canCreate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !hasPrivilege(req.user.privileges, UserPrivileges.Create)) {
    return deny(res, "Create");
  }
  next();
};

/** Update */
export const canUpdate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !hasPrivilege(req.user.privileges, UserPrivileges.Update)) {
    return deny(res, "Update");
  }
  next();
};

/** Delete */
export const canDelete = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || !hasPrivilege(req.user.privileges, UserPrivileges.Delete)) {
    return deny(res, "Delete");
  }
  next();
};

