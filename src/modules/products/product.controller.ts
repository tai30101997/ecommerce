import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { AuthenticatedRequest } from "../../core/AuthRequest";

export class ProductController {
  static async create(req: AuthenticatedRequest, res: Response) {
    const product = await ProductService.createProduct(req.body);
    return res.status(200).json(product);
  }
  static async list(req: AuthenticatedRequest, res: Response) {
    const { skip, limit, category, maxPrice, minPrice, name } = req.query;
    let conditions: any = {};
    if (skip) {
      conditions.skip = Number(skip);
    }
    if (limit) {
      conditions.limit = Number(limit);
    }
    if (category) {
      conditions.category = [category];
    }
    if (minPrice) {
      conditions.minPrice = Number(minPrice);
    }
    if (maxPrice) {
      conditions.maxPrice = Number(maxPrice);
    }
    if (name) {
      conditions.name = name;
    }
    const products = await ProductService.list(conditions);
    return res.status(200).json(products);
  }
  static async detail(req: AuthenticatedRequest, res: Response) {
    const productId = Number(req.params.id);
    const product = await ProductService.detail(productId);
    return res.status(200).json(product);
  }
  static async update(req: AuthenticatedRequest, res: Response) {
    const productId = Number(req.params.id);
    const product = await ProductService.update(productId, req.body);
    return res.status(200).json(product);
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    const productId = Number(req.params.id);
    const deleted = await ProductService.delete(productId);
    return res.status(200).json(deleted);
  }
}