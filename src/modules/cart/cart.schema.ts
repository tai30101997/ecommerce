import Joi from "joi";

export const addToCartSchema = Joi.object({
  userId: Joi.number().required(),
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
});

export const removeFromCartSchema = Joi.object({
  userId: Joi.number().required(),
  productId: Joi.number().required(),
});