import type { Product, ProductFilters, ProductSortOption } from "../types/product";

function sortProducts(products: Product[], sortBy?: ProductSortOption): Product[] {
  const nextProducts = [...products];

  switch (sortBy) {
    case "name-asc":
      return nextProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return nextProducts.sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return nextProducts.sort((a, b) => {
        if (a.priceStatus === "unavailable") return 1;
        if (b.priceStatus === "unavailable") return -1;
        return a.price - b.price;
      });
    case "price-desc":
      return nextProducts.sort((a, b) => {
        if (a.priceStatus === "unavailable") return 1;
        if (b.priceStatus === "unavailable") return -1;
        return b.price - a.price;
      });
    case "rating-desc":
      return nextProducts.sort((a, b) => b.rating - a.rating);
    case "featured":
    default:
      return nextProducts;
  }
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const searchableText = `${product.name} ${product.brand ?? ""} ${product.category}`.toLowerCase();
    const matchesQuery = searchableText.includes(query);
    const matchesCategory =
      filters.category === "all" || product.category === filters.category;
    const matchesBrand = filters.brand === "all" || product.brand === filters.brand;
    const matchesAvailability =
      filters.availability === "all" ||
      (filters.availability === "in-stock" ? product.stock > 0 : product.stock === 0);
    const matchesRating = product.rating >= filters.minRating;
    const matchesMinPrice =
      filters.minPrice === undefined ||
      (product.priceStatus !== "unavailable" && product.price >= filters.minPrice);
    const matchesMaxPrice =
      filters.maxPrice === undefined ||
      (product.priceStatus !== "unavailable" && product.price <= filters.maxPrice);

    return (
      matchesQuery &&
      matchesCategory &&
      matchesBrand &&
      matchesAvailability &&
      matchesRating &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  return sortProducts(filteredProducts, filters.sortBy);
}

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map((product) => product.category))].sort();
}

export function getBrands(products: Product[]): string[] {
  return [...new Set(products.flatMap((product) => product.brand ? [product.brand] : []))].sort();
}
