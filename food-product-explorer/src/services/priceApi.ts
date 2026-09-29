import type { Product } from "../types/product";

interface ProviderPrice {
  id: number;
  price: number;
  currency: string;
  updatedAt: string;
}

interface ProviderResponse {
  prices: ProviderPrice[];
}

const priceApiUrl = import.meta.env.VITE_PRICE_API_URL?.trim();

export function hasPriceProvider(): boolean {
  return Boolean(priceApiUrl);
}

export async function withCurrentPrices(
  products: Product[],
  signal?: AbortSignal,
): Promise<Product[]> {
  if (!priceApiUrl) {
    return products.map((product) => ({ ...product, isLivePrice: false, priceStatus: "catalog" }));
  }

  try {
    const response = await fetch(priceApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: products.map(({ id, name, category }) => ({ id, name, category })),
      }),
      signal,
    });

    if (!response.ok) throw new Error(`Price provider returned ${response.status}`);

    const payload = await response.json() as ProviderResponse;
    const prices = new Map(
      payload.prices
        .filter((entry) => Number.isFinite(entry.id)
          && Number.isFinite(entry.price)
          && entry.price >= 0
          && entry.currency === "INR"
          && Number.isFinite(Date.parse(entry.updatedAt)))
        .map((entry) => [entry.id, entry]),
    );

    return products.map((product) => {
      const currentPrice = prices.get(product.id);
      if (!currentPrice) {
        return { ...product, isLivePrice: false, priceStatus: "unavailable" };
      }

      return {
        ...product,
        price: currentPrice.price,
        currency: "INR",
        priceUpdatedAt: currentPrice.updatedAt,
        isLivePrice: true,
        priceStatus: "live",
      };
    });
  } catch {
    if (signal?.aborted) return products;
    return products.map((product) => ({ ...product, isLivePrice: false, priceStatus: "unavailable" }));
  }
}
