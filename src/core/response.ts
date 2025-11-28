import { Response } from "express";
import { ApiErrorResponseFail, ApiErrorResponseSuccess } from "./Type";

export class ApiResponse {
  static success(input: ApiErrorResponseSuccess, res: Response) {
    const { success, message, data } = input;
    return res.status(200).json({
      success,
      message,
      data,
    });
  }

  static error(res: Response, input: ApiErrorResponseFail) {
    const { success, message, status } = input;
    return res.status(status).json({
      success,
      message,
    });
  }
}