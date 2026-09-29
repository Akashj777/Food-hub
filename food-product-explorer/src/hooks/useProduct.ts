import { useEffect, useState } from "react";
import { ApiError, getProductById } from "../services/api";
import { hasPriceProvider, withCurrentPrices } from "../services/priceApi";
import type { Product } from "../types/product";

interface UseProductResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
  retry: () => void;
}

export function useProduct(id: number | null): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(id !== null);
  const [error, setError] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (id === null) return; // invalid id: nothing to fetch

    const controller = new AbortController();

    const loadProduct = async () => {
      try {
        const data = await getProductById(id, controller.signal);
        if (controller.signal.aborted) return;

        const providerConfigured = hasPriceProvider();
        setProduct({ ...data, priceStatus: providerConfigured ? "loading" : "catalog" });
        setLoading(false);

        const [pricedProduct] = await withCurrentPrices([data], controller.signal);
        if (!controller.signal.aborted && pricedProduct) setProduct(pricedProduct);
      } catch (err: unknown) {
        if (controller.signal.aborted) return;
        if (err instanceof ApiError && err.status === 404) {
          setMissing(true);
        } else {
          setError("Unable to load product.");
        }
        setLoading(false);
      }
    };

    void loadProduct();

    return () => controller.abort();
  }, [id, reloadKey]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  return { product, loading, error, notFound: id === null || missing, retry };
}
