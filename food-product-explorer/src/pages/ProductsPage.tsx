import { useMemo, useState } from "react";
import { CategoryFilter } from "../components/CategoryFilter";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { ProductList } from "../components/ProductList";
import { RatingFilter } from "../components/RatingFilter";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";
import type { ProductSortOption } from "../types/product";
import { filterProducts, getBrands, getCategories } from "../utils/filterProducts";

export function ProductsPage() {
  const { products, loading, error, priceLoading, retry } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [availability, setAvailability] = useState<"all" | "in-stock" | "out-of-stock">("all");
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState<ProductSortOption>("featured");

  const categories = useMemo(() => getCategories(products), [products]);
  const brands = useMemo(() => getBrands(products), [products]);
  const visibleProducts = useMemo(
    () =>
      filterProducts(products, {
        query,
        category,
        brand,
        availability,
        minRating,
        minPrice: minPrice === "" ? undefined : Number(minPrice),
        maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
        sortBy,
      }),
    [products, query, category, brand, availability, minRating, minPrice, maxPrice, sortBy],
  );

  const hasActiveFilters =
    query !== "" || category !== "all" || brand !== "all" || availability !== "all" ||
    minRating !== 0 || minPrice !== "" || maxPrice !== "" || sortBy !== "featured";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setBrand("all");
    setAvailability("all");
    setMinRating(0);
    setMinPrice("");
    setMaxPrice("");
    setSortBy("featured");
  };

  const renderContent = () => {
    if (loading) return <LoadingState message="Loading food products..." />;
    if (error) return <ErrorState message="Unable to load food products." onRetry={retry} />;
    if (visibleProducts.length === 0) {
      return (
        <EmptyState
          message="No products found."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      );
    }
    return (
      <>
        <p className="result-count">
          Showing {visibleProducts.length} of {products.length} food products
          {priceLoading && <span className="price-checking">Checking live prices...</span>}
        </p>
        <ProductList products={visibleProducts} />
      </>
    );
  };

  return (
    <section>
      <h1 className="page-title">Indian groceries, all in one place</h1>
      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        <div className="field">
          <label htmlFor="brand">Brand</label>
          <select id="brand" value={brand} onChange={(event) => setBrand(event.target.value)}>
            <option value="all">All brands</option>
            {brands.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <RatingFilter value={minRating} onChange={setMinRating} />
        <div className="field">
          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            value={availability}
            onChange={(event) => setAvailability(event.target.value as typeof availability)}
          >
            <option value="all">Any availability</option>
            <option value="in-stock">In stock</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="min-price">Min price (₹)</label>
          <input id="min-price" type="number" min="0" step="10" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="No minimum" />
        </div>
        <div className="field">
          <label htmlFor="max-price">Max price (₹)</label>
          <input id="max-price" type="number" min="0" step="10" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="No maximum" />
        </div>
        <div className="field">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as ProductSortOption)}
          >
            <option value="featured">Featured</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>
        {hasActiveFilters && (
          <button type="button" className="btn btn-outline" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>
      {renderContent()}
    </section>
  );
}
