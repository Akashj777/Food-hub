import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { formatCategory, formatRating } from "../utils/format";
import { ProductPrice } from "./ProductPrice";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <ProductImage product={product} />
      <div className="product-card-body">
        <h2>{product.name}</h2>
        <span className="badge">{formatCategory(product.category)}</span>
        <div className="product-meta">
          <ProductPrice product={product} compact />
          <span className="rating">&#9733; {formatRating(product.rating)}</span>
        </div>
        <Link to={`/products/${product.id}`} className="btn">
          View Details
        </Link>
      </div>
    </article>
  );
}
