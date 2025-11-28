import { ApiResponse } from "../core/response";
import { ApiErrorResponseFail } from "../core/Type";
export const validate =
  (schema: any) =>
    (req: any, res: any, next: any) => {
      const { error } = schema.validate(req.body);

      if (error) {
        const resp: ApiErrorResponseFail = {
          errors: [
            { errorCode: "BadRequest", errorMessage: error.details[0].message || "Error" },
          ],
          success: false,
          message: error.details[0].message || "Error",
          status: 400
        };
        return ApiResponse.error(res, resp);
      }
      next();
    };