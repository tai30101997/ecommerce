import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).required().trim(),
  email: Joi.string().required().trim(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});