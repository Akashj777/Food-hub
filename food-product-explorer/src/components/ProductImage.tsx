import type { Product } from "../types/product";

interface ProductImageProps {
  product: Product;
  className?: string;
}

export function ProductImage({ product, className }: ProductImageProps) {
  return (
    <img
      className={className}
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={(event) => {
        const image = event.currentTarget;
        if (image.dataset.fallbackApplied) return;
        image.dataset.fallbackApplied = "true";
        image.src = "/food-images/image-unavailable.svg";
      }}
    />
  );
}