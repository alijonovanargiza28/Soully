import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";

export interface Product {
  _id: string;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  productSold?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductInquery {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  search?: string;
}

export interface ProductPage {
  products: Product[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
