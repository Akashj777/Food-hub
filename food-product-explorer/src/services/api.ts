import { FOOD_PRODUCTS } from "./retainedFoodCatalog";
import type { Product } from "../types/product";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  if (signal?.aborted) throw new ApiError("Request aborted", 0);
  await Promise.resolve();
  return [...FOOD_PRODUCTS];
}

export async function getProductById(id: number, signal?: AbortSignal): Promise<Product> {
  if (signal?.aborted) throw new ApiError("Request aborted", 0);

  const product = FOOD_PRODUCTS.find((item) => item.id === id);
  if (!product) throw new ApiError("Product not found.", 404);
  return product;
}
