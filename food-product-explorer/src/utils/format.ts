const priceFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}

// "smart-phones" -> "Smart Phones"
export function formatCategory(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatRating(value: number): string {
  return value.toFixed(1);
}

export function formatPriceUpdatedAt(value?: string): string {
  if (!value) return "";

  const minutes = Math.max(0, Math.floor((Date.now() - Date.parse(value)) / 60_000));
  if (minutes < 1) return "Updated just now";
  if (minutes < 60) return `Updated ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Updated ${hours} ${hours === 1 ? "hour" : "hours"} ago`;

  const days = Math.floor(hours / 24);
  return `Updated ${days} ${days === 1 ? "day" : "days"} ago`;
}

export interface StockInfo {
  label: string;
  className: string;
}

export function getStockInfo(stock: number): StockInfo {
  if (stock === 0) return { label: "Out of stock", className: "stock-out" };
  if (stock < 10) return { label: `Low stock (${stock} left)`, className: "stock-low" };
  return { label: `In stock (${stock})`, className: "stock-in" };
}
