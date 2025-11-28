import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.array().items(Joi.number()).optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().max(500).optional(),
  price: Joi.number().min(0).optional(),
  stock: Joi.number().integer().min(0).optional(),
  category: Joi.array().items(Joi.number()).optional(),
}).min(1);

export const getProductByIdSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
});
export const deleteProductSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
});
export const listProductsSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10),
  name: Joi.string().max(100).optional(),
  category: Joi.array().items(Joi.number()).optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
});
