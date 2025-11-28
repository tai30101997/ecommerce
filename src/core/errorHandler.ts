import { HttpError } from "./httpError";
import { ApiResponse } from "./response";

import { ApiErrorResponseFail } from "./Type";

export function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);

  if (err instanceof HttpError) {
    const resp: ApiErrorResponseFail = {
      success: false,
      errors: err.errors ? err.errors : [],
      message: err.message,
      status: err.status,
    };
    return ApiResponse.error(res, resp);
  }

  const resp: ApiErrorResponseFail = {
    success: false,
    errors: [
      { errorCode: "Error", errorMessage: err.message ? err.message : "Error" },
    ],
    message: err.message,
    status: 500,
  };

  return ApiResponse.error(res, resp);
}