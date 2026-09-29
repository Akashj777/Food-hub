import type { Product } from "../types/product";
import { formatPrice, formatPriceUpdatedAt } from "../utils/format";

interface ProductPriceProps {
  product: Product;
  compact?: boolean;
}

export function ProductPrice({ product, compact = false }: ProductPriceProps) {
  if (product.priceStatus === "unavailable") {
    return <span className="price-state">Price unavailable</span>;
  }

  if (product.priceStatus === "loading") {
    return <span className="price-state">Checking live price...</span>;
  }

  return (
    <span className="price-block">
      <strong className={compact ? "price" : undefined}>{formatPrice(product.price)}</strong>
      {!compact && <span className="price-unit"> / {product.unit}</span>}
      <span className="price-status">
        {product.isLivePrice ? "Live price" : "Catalog price"}
        {product.isLivePrice && product.priceUpdatedAt && (
          <> · {formatPriceUpdatedAt(product.priceUpdatedAt)}</>
        )}
      </span>
    </span>
  );
}
