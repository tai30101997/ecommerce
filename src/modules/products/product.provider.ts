import { ProductCategory } from "../../core/Type";
import _ from "lodash";
export class ProductProvider {

  static mapCategoryIdsToNames(categoryIds: number[]) {
    if (!Array.isArray(categoryIds)) return [];
    return categoryIds
      .map((id) => ProductCategory[id])
      .filter(Boolean);
  }
  static buildFilterConditions(filterInput: any) {
    let filters: any = {};
    if (filterInput.name) {
      filters.name = { $regex: filterInput.name, $options: 'i' };
    }
    if (filterInput.minPrice !== undefined || filterInput.maxPrice !== undefined) {
      filters.price = {};
      if (filterInput.minPrice !== undefined) {
        filters.price.$gte = filterInput.minPrice;
      }
      if (filterInput.maxPrice !== undefined) {
        filters.price.$lte = filterInput.maxPrice;
      }
    }
    if (filterInput.category && Array.isArray(filterInput.category) && filterInput.category.length > 0) {
      filters.category = { $in: filterInput.category };
    }
    return filters;
  }
  static buildPagingInfo(listInput: any) {
    let skip = 0;
    let limit = 25;
    let orderBy = new Object();
    if (listInput.sortBy && listInput.sortBy.length > 0) {
      for (let order of listInput.sortBy) {
        let fieldName = order.fieldName;
        orderBy[fieldName] = order.isAscending ? 1 : -1;
      }
    } else {
      orderBy['createdDate'] = -1;
    }
    if (!_.isNil(listInput.skip)) {
      skip = listInput.skip;
    }
    if (!_.isNil(listInput.limit)) {
      limit = listInput.limit;
    }
    return { orderBy, skip, limit };
  }
}
