import _ from 'lodash';
import { HttpError } from "../../core/httpError";
import { PlaceOrderInput, } from "../../core/Type";

export class OrderProvider {

  static validateOrderInput(input: PlaceOrderInput) {
    if (!input?.enteredBy?.id) {
      throw new HttpError({
        status: 400,
        message: "User id is required",
        errors: [{ errorCode: "400", errorMessage: "Missing userId" }]
      });
    }
  }

}
