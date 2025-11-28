export type Optional<T> = T | undefined;
export type Nullable<T> = T | null;

export enum UserRole {
  Customer = 1,
  Admin = 2
}

export enum ProductCategory {
  Electronics = 1,
  Fashion = 2,
  HomeAppliances = 3,
  Beauty = 4,
  Sports = 5,
}

export enum UserPrivileges {
  View = 1,
  List = 2,
  Purchase = 4,
  Create = 8,
  Update = 16,
  Delete = 32,
}

export enum OrderStatus {
  Pending = "Pending",
  Paid = "Paid",
  Cancel = " Cancel"
}

export const CUSTOMER_PRIVILEGES =
  UserPrivileges.View |
  UserPrivileges.List |
  UserPrivileges.Purchase;
export const ADMIN_PRIVILEGES =
  UserPrivileges.View |
  UserPrivileges.List |
  UserPrivileges.Purchase |
  UserPrivileges.Create |
  UserPrivileges.Update |
  UserPrivileges.Delete;

export class AuthenticatedInput {
  enteredBy: EnteredByInfo = new EnteredByInfo();
}
export class EnteredByInfo {
  id: number = 0;
  role: number = 0;
  email: string = '';
  name: string = '';
  privileges: number = 0;
}
export interface HttpErrorInput {
  status: number;
  message: string;
  errors?: ErrorInfo[];
}

export class ErrorInfo {
  errorCode: string = '';
  errorMessage: string = '';
  item?: any;
}

export class ResponseModel<T> {
  success: boolean = false;
  message: Nullable<string> = null;
  data?: Nullable<T> = null;
  errors: ErrorInfo[] = [];
}
export class PageInfo {
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;
}

export class AggregateInfo {
  count: number = 0;
}
export class ApiErrorResponseFail extends ResponseModel<null> {
  status: number = 500;
}
export class ApiErrorResponseSuccess extends ResponseModel<null> {
}
export class RegisterSuccessResponseData {
  userId: string = '';
  name: string = '';
  email: string = '';
  role: string = '';
  privileges: string = '';
}
export class SortByInfo {
  fieldName: string = '';
  isAscending: boolean = false;
}

export class LoginSuccessResponse {
  token: string = '';
}
export class ProductListResponseData extends ResponseModel<null> {
  items: ProductData[] = [];
  pageInfo: Nullable<PageInfo> = null;
  aggregate: Nullable<AggregateInfo> = null;
}
export class ProductListInput {
  maxPrice?: number;
  minPrice?: number;
  name?: string;
  category?: number[];
  skip?: number;
  limit?: number;
  sortBy?: SortByInfo[];
}

// Product 
export class ProductData {
  productId: string = '';
  name: string = '';
  price: number = 0;
  stock: number = 0;
  category?: string[];
}
export class SearchConditions {
  filters: any = {};
  skip: number = 0;
  limit: number = 20;
  orderBy: any = {};
}
// Cart
export class AddCardInput extends AuthenticatedInput {
  productId: number = 0;
  quantity: number = 0;
}
export class CartItemData {
  productId: string = '';
  name: string = '';
  price: number = 0;
  quantity: number = 0;
  totalPrice: number = 0;
}
export class CardResponseData {
  userId: number = 0;
  items: CartItemData[] = [];
  total: number = 0;
}

export class AddCartItemResponseData { }
export class RemoveCartItemResponseData { }
export class PlaceOrderResponseData { }
export class RemoveItemInput extends AuthenticatedInput {
  productId: number = 0;
}
export class GetCardInput extends AuthenticatedInput {
}
export class PlaceOrderInput extends AuthenticatedInput { }
export class GetOrderInput extends AuthenticatedInput { }
export class GetAllOrderInput extends AuthenticatedInput { }

export class GetOrderResponse { }