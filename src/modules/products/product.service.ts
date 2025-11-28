import { HttpError } from "../../core/httpError";
import { ProductData, ResponseModel, SearchConditions, ProductListInput, AggregateInfo, PageInfo, ProductListResponseData } from "../../core/Type";
import { ProductProvider } from "./product.provider";
import { ProductRepository } from "./product.repository";
import _ from 'lodash';

export class ProductService {
  static async createProduct(data: any): Promise<ResponseModel<ProductData>> {
    let rs = new ResponseModel<ProductData>();
    rs.success = false;
    rs.message = "Create product failed.";
    try {
      const { name, price, stock } = data;
      if (!name || price == null || stock == null) {
        const errorInfo = [{ errorCode: "400", errorMessage: "Missing required fields" }];
        throw new HttpError({
          status: 400,
          message: "Missing required fields",
          errors: errorInfo
        });
      }

      const product = await ProductRepository.create(data);

      rs.success = true;
      rs.message = "Product created successfully.";
      rs.data = {
        productId: product.productId.toString(),
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: ProductProvider.mapCategoryIdsToNames(product.category || []),
      };

    } catch (err) {
      if (err instanceof HttpError) throw err;
      throw new HttpError({ status: 500, message: "Internal error while adding item to cart", errors: [{ errorCode: "500", errorMessage: "Unknown error" }] });
    }

    return rs;
  }



  static async list(input: ProductListInput): Promise<ResponseModel<ProductListResponseData>> {
    let rs = new ResponseModel<ProductListResponseData>();
    rs.success = false;
    rs.message = "Fetch products failed.";
    let responseData = new ProductListResponseData();
    responseData.aggregate = new AggregateInfo();
    responseData.pageInfo = new PageInfo();
    try {
      let { orderBy, skip, limit } = ProductProvider.buildPagingInfo(input);
      let filters: any = {};
      filters = ProductProvider.buildFilterConditions(input)
      let conditions: SearchConditions = new SearchConditions();
      conditions.filters = filters;
      conditions.skip = skip;
      conditions.limit = limit;
      conditions.orderBy = orderBy;
      const [products, total] = await Promise.all([
        ProductRepository.findAll(conditions),
        ProductRepository.countDocuments(conditions),
      ]);
      if (products && products.length > 0) {
        responseData.items = products.map(product => ({
          productId: product.productId?.toString(),
          name: product.name,
          price: product.price,
          stock: product.stock,
          category: ProductProvider.mapCategoryIdsToNames(product.category || []),
        }));
        responseData.aggregate = { count: total };
        responseData.pageInfo = {
          hasNextPage: skip + limit < total,
          hasPreviousPage: skip > 0,
        };
      }
      rs.data = responseData;
      rs.success = true;
      rs.message = "Fetch products successful.";

    } catch (err) {
      if (err instanceof HttpError) throw err;
      throw new HttpError({ status: 500, message: "Internal error while adding item to cart", errors: [{ errorCode: "500", errorMessage: "Unknown error" }] });
    }
    return rs

  }

  static async detail(productId: number): Promise<ResponseModel<ProductData>> {
    let rs = new ResponseModel<ProductData>();
    rs.success = false;
    rs.message = "Fetch product failed.";
    try {
      const product = await ProductRepository.findById(productId);

      if (_.isNil(product)) {
        const errorInfo = [{ errorCode: "404", errorMessage: "Product not found" }];
        throw new HttpError({
          status: 400,
          message: "Bad Request",
          errors: errorInfo
        });
      }
      rs.data = {
        productId: product.productId.toString(),
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: ProductProvider.mapCategoryIdsToNames(product.category || []),
      };
      rs.success = true;
      rs.message = "Product fetched successfully.";

    } catch (err) {
      if (err instanceof HttpError) throw err;
      throw new HttpError({ status: 500, message: "Internal error while adding item to cart", errors: [{ errorCode: "500", errorMessage: "Unknown error" }] });
    }

    return rs;
  }

  static async update(productId: number, data: any): Promise<ResponseModel<ProductData>> {
    let rs = new ResponseModel<ProductData>();
    rs.success = false;
    rs.message = "Update product failed.";
    try {
      const product = await ProductRepository.update(
        productId,
        data,
      );

      if (_.isNil(product)) {
        const errorInfo = [{ errorCode: "404", errorMessage: "Product not found" }];
        throw new HttpError({
          status: 404,
          message: "Product not found",
          errors: errorInfo
        });
      }
      rs.success = true;
      rs.message = "Product updated successfully.";
      rs.data = {
        productId: product.productId.toString(),
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: ProductProvider.mapCategoryIdsToNames(product.category || []),
      }

    } catch (err) {
      if (err instanceof HttpError) throw err;
      throw new HttpError({ status: 500, message: "Internal error while adding item to cart", errors: [{ errorCode: "500", errorMessage: "Unknown error" }] });

    }

    return rs;
  }

  static async delete(productId: number): Promise<ResponseModel<any>> {
    let rs = new ResponseModel<any>();
    rs.success = false;
    rs.message = "Delete product failed.";
    try {
      const result = await ProductRepository.delete(productId);

      if (!result) {
        const errorInfo = [{ errorCode: "404", errorMessage: "Product not found" }];
        throw new HttpError({
          status: 404,
          message: "Product not found",
          errors: errorInfo
        });
      }

      rs.success = true;
      rs.message = "Product deleted successfully.";

    } catch (err) {
      if (err instanceof HttpError) throw err;
      throw new HttpError({ status: 500, message: "Internal error while adding item to cart", errors: [{ errorCode: "500", errorMessage: "Unknown error" }] });

    }

    return rs;
  }
}