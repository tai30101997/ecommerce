import { SearchConditions } from "../../core/Type";
import { ProductDocument, ProductModel } from "../../models";
import { Product } from "../../models/product/product";

export class ProductRepository {

  /** Find all products */
  static async findAll(conditions: SearchConditions) {
    return await ProductModel.find(conditions.filters).skip(conditions.skip).limit(conditions.limit).lean();
  }
  static async countDocuments(conditions: SearchConditions) {
    return await ProductModel.countDocuments(conditions.filters);
  }
  /** Find product by productId */
  static async findById(productId: number) {
    return await ProductModel.findOne({ productId }).lean();
  }

  /** Create product */
  static async create(data: Partial<Product>): Promise<ProductDocument> {
    let product = new ProductModel({
      name: data.name || '',
      price: data.price || 0,
      stock: data.stock || 0,
      category: data.category || [],
    });
    await product.save();
    return product
  }

  /** Update product */
  static async update(productId: number, data: Partial<Product>) {
    return ProductModel.findOneAndUpdate(
      { productId },
      { $set: data },
      { new: true }
    ).lean();
  }

  /** Delete product */
  static async delete(productId: number) {
    return await ProductModel.findOneAndDelete({ productId }).lean();
  }
}