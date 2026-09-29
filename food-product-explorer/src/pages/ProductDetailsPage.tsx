import { Link, useParams } from "react-router-dom";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { useProduct } from "../hooks/useProduct";
import {
  formatCategory,
  formatPriceUpdatedAt,
  formatRating,
  getStockInfo,
} from "../utils/format";
import { parseProductId } from "../utils/parseProductId";
import { ProductPrice } from "../components/ProductPrice";
import { ProductImage } from "../components/ProductImage";

function BackLink() {
  return (
    <Link to="/products" className="back-link">
      &larr; Back to products
    </Link>
  );
}

interface ProductDetailsProps {
  id: number | null;
}

function ProductDetails({ id }: ProductDetailsProps) {
  const { product, loading, error, notFound, retry } = useProduct(id);

  if (loading) {
    return (
      <>
        <BackLink />
        <LoadingState message="Loading product..." />
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <BackLink />
        <ErrorState message="Product not found." />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <BackLink />
        <ErrorState message="Unable to load product." onRetry={retry} />
      </>
    );
  }

  const stock = getStockInfo(product.stock);
  return (
    <>
      <BackLink />
      <article className="details">
        <ProductImage product={product} />
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <dl className="details-list">
            <dt>Price</dt>
            <dd><ProductPrice product={product} /></dd>
            <dt>Brand</dt>
            <dd>{product.brand ?? "Unbranded"}</dd>
            <dt>Category</dt>
            <dd>{formatCategory(product.category)}</dd>
            <dt>Unit</dt>
            <dd>{product.unit}</dd>
            <dt>Rating</dt>
            <dd>&#9733; {formatRating(product.rating)}</dd>
            <dt>Stock</dt>
            <dd className={stock.className}>{stock.label}</dd>
            <dt>Price status</dt>
            <dd>{product.priceStatus === "live" ? "Live price" : product.priceStatus === "unavailable" ? "Price currently unavailable" : product.priceStatus === "loading" ? "Checking price..." : "Catalog price"}</dd>
            {product.priceUpdatedAt && <><dt>Last updated</dt><dd>{formatPriceUpdatedAt(product.priceUpdatedAt)}</dd></>}
          </dl>
        </div>
      </article>
    </>
  );
}

export function ProductDetailsPage() {
  const { id } = useParams();

  // key={id}: React creates a fresh component (and fresh state) when the URL id changes
  return <ProductDetails key={id} id={parseProductId(id)} />;
}
