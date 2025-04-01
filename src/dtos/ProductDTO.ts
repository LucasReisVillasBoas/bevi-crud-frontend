import { ProductStatus } from "../enums/productStatus";

export interface ProductDTO {
  id?: number;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  stock_quantity: number;
}