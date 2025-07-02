// types.ts
export interface Product {
  productId: string;
  categoryName: string;
  subCategoryName: string;
  productName: string;
  price: string;
  discountPrice: string;
  quantity: string;
  imageOne: string;
}

export interface ApiResponse {
  statusCode: number;
  data: {
    product: Product[];
  };
}
