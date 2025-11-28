let errorMap: Map<string, any> = new Map<string, any>();

errorMap.set("err_001", {
  errorCode: "err_001",
  errorMessage: "Missing name, email, or password",
});

errorMap.set("err_002", {
  errorCode: "err_002",
  errorMessage: "Email already exists",
});

errorMap.set("err_003", {
  errorCode: "err_003",
  errorMessage: "Invalid email or password",
});

errorMap.set("err_004", {
  errorCode: "err_004",
  errorMessage: "Unauthorized: Missing token",
});

errorMap.set("err_005", {
  errorCode: "err_005",
  errorMessage: "Unauthorized: Invalid token",
});

errorMap.set("err_006", {
  errorCode: "err_006",
  errorMessage: "Forbidden: Insufficient privileges",
});

errorMap.set("err_007", {
  errorCode: "err_007",
  errorMessage: "Forbidden: Admin only resource",
});

errorMap.set("err_008", {
  errorCode: "err_008",
  errorMessage: "User not found",
});

errorMap.set("err_009", {
  errorCode: "err_009",
  errorMessage: "Password does not match",
});

errorMap.set("err_100", {
  errorCode: "err_100",
  errorMessage: "Product not found",
});

errorMap.set("err_101", {
  errorCode: "err_101",
  errorMessage: "Missing required product fields",
});

errorMap.set("err_102", {
  errorCode: "err_102",
  errorMessage: "Invalid product price",
});

errorMap.set("err_103", {
  errorCode: "err_103",
  errorMessage: "Invalid product stock",
});

errorMap.set("err_104", {
  errorCode: "err_104",
  errorMessage: "Invalid category",
});

errorMap.set("err_105", {
  errorCode: "err_105",
  errorMessage: "Failed to create product",
});

errorMap.set("err_106", {
  errorCode: "err_106",
  errorMessage: "Failed to update product",
});

errorMap.set("err_107", {
  errorCode: "err_107",
  errorMessage: "Failed to delete product",
});

errorMap.set("err_200", {
  errorCode: "err_200",
  errorMessage: "Cart not found",
});

errorMap.set("err_201", {
  errorCode: "err_201",
  errorMessage: "Product not found in cart",
});

errorMap.set("err_202", {
  errorCode: "err_202",
  errorMessage: "Missing productId or quantity",
});

errorMap.set("err_203", {
  errorCode: "err_203",
  errorMessage: "Quantity must be greater than zero",
});

errorMap.set("err_204", {
  errorCode: "err_204",
  errorMessage: "Failed to update cart",
});

errorMap.set("err_205", {
  errorCode: "err_205",
  errorMessage: "Cannot add product: not enough stock",
});

errorMap.set("err_206", {
  errorCode: "err_206",
  errorMessage: "Failed to remove product from cart",
});

errorMap.set("err_300", {
  errorCode: "err_300",
  errorMessage: "Order not found",
});

errorMap.set("err_301", {
  errorCode: "err_301",
  errorMessage: "Cannot place order: cart is empty",
});

errorMap.set("err_302", {
  errorCode: "err_302",
  errorMessage: "Insufficient stock for one or more items",
});

errorMap.set("err_303", {
  errorCode: "err_303",
  errorMessage: "Failed to create order",
});

errorMap.set("err_304", {
  errorCode: "err_304",
  errorMessage: "Failed to update product stock",
});

errorMap.set("err_305", {
  errorCode: "err_305",
  errorMessage: "Failed to fetch order history",
});

errorMap.set("err_306", {
  errorCode: "err_306",
  errorMessage: "Admin privilege required to view all orders",
});

errorMap.set("err_900", {
  errorCode: "err_900",
  errorMessage: "Database connection failed",
});



/** Convert errorCode → object */
export function getError(errorCode: string) {
  return errorMap.get(errorCode) || {
    errorCode: "err_099",
    errorMessage: "An unexpected error occurred",
  };
}

export default errorMap;