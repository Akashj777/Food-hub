import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { hasPriceProvider, withCurrentPrices } from "../services/priceApi";
import type { Product } from "../types/product";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  priceLoading: boolean;
  error: string | null;
  retry: () => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceLoading, setPriceLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const data = await getProducts(controller.signal);
        if (controller.signal.aborted) return;

        const providerConfigured = hasPriceProvider();
        setProducts(data.map((product) => ({
          ...product,
          priceStatus: providerConfigured ? "loading" : "catalog",
        })));
        setLoading(false);

        if (providerConfigured) {
          setPriceLoading(true);
          const pricedProducts = await withCurrentPrices(data, controller.signal);
          if (!controller.signal.aborted) setProducts(pricedProducts);
          setPriceLoading(false);
        }
      } catch {
        if (controller.signal.aborted) return;
        setError("Unable to load food products.");
        setLoading(false);
        setPriceLoading(false);
      }
    };

    void loadProducts();

    return () => controller.abort();
  }, [reloadKey]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  return { products, loading, priceLoading, error, retry };
}
