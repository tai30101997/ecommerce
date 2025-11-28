import Joi from "joi";

export const placeOrderSchema = Joi.object({
  userId: Joi.number().required(),
});
