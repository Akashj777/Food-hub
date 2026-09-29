export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: "INR";
  image: string;
  rating: number;
  stock: number;
  brand?: string;
  unit: string;
  priceUpdatedAt?: string;
  isLivePrice: boolean;
  priceStatus: "catalog" | "loading" | "live" | "unavailable";
}

export type ProductSortOption =
  | "featured"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

export type ProductAvailability = "all" | "in-stock" | "out-of-stock";

export interface ProductFilters {
  query: string;
  category: string; // "all" means no category filter
  brand: string;
  availability: ProductAvailability;
  minRating: number; // 0 means no rating filter
  minPrice?: number;
  maxPrice?: number;
  sortBy?: ProductSortOption;
}
