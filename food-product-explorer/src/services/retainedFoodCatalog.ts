import type { Product } from "../types/product";

type ProductSeed = readonly [
  name: string,
  description: string,
  category: string,
  price: number,
  rating: number,
  stock: number,
  unit: string,
  image: string,
];

const PRODUCT_SEEDS: ProductSeed[] = [
  ["Organic Bananas", "Sweet, ripe bananas for quick snacks and smoothies.", "fruits", 49, 4.8, 42, "1 dozen", "banana.jpg"],
  ["Fresh Avocados", "Creamy avocados for toast, salads, and guacamole.", "fruits", 89, 4.7, 18, "2 pieces", "avocado.jpg"],
  ["Red Bell Peppers", "Crisp red peppers for roasting, salads, and stir-fries.", "vegetables", 79, 4.6, 27, "500 g", "pepper.jpg"],
  ["Baby Spinach", "Tender spinach leaves for salads, wraps, and smoothies.", "vegetables", 39, 4.4, 33, "200 g", "spinach.jpg"],
  ["Greek Yogurt Cups", "Creamy, protein-rich yogurt cups for breakfast and snacks.", "dairy", 99, 4.5, 24, "2 x 100 g", "yogurt.jpg"],
  ["Artisan Sourdough Bread", "Slow-fermented sourdough with a crisp crust and airy crumb.", "bakery", 179, 4.9, 16, "500 g loaf", "bread.jpg"],
  ["Cold Brew Coffee", "Smooth cold brew coffee for a chilled, ready-to-drink pick-me-up.", "beverages", 149, 4.3, 20, "250 ml", "coffee.jpg"],
  ["Atlantic Salmon Fillets", "Fresh salmon fillets for pan-searing, grilling, or baking.", "seafood", 499, 4.8, 12, "250 g", "salmon.jpg"],
  ["Almond Butter Crackers", "Crunchy crackers paired with creamy almond butter.", "snacks", 129, 4.4, 30, "200 g", "crackers.jpg"],
  ["Extra Virgin Olive Oil", "Extra virgin olive oil for dressings and everyday cooking.", "cooking-oil", 699, 4.6, 22, "500 ml", "oliveoil.jpg"],
  ["Fresh Strawberries", "Sweet, ripe strawberries for snacking and desserts.", "fruits", 199, 4.6, 20, "250 g", "strawberries.jpg"],
  ["Roasted Almonds", "Lightly salted roasted almonds for a satisfying snack.", "nuts", 299, 4.7, 18, "200 g", "roasted-almonds.jpg"],
  ["Golden Mangoes", "Juicy ripe mangoes for snacking, desserts, and smoothies.", "fruits", 149, 4.8, 24, "1 kg", "mango.jpg"],
  ["Cherry Tomatoes", "Sweet cherry tomatoes for salads and quick meals.", "vegetables", 69, 4.5, 32, "250 g", "tomato.jpg"],
  ["Blueberry Mix", "Fresh blueberries for breakfast bowls and baking.", "fruits", 199, 4.5, 15, "125 g", "blueberry.jpg"],
  ["Brown Rice", "Whole-grain brown rice for everyday meals.", "rice-grains", 179, 4.5, 26, "1 kg", "rice.jpg"],
  ["Free-Range Eggs", "Farm-fresh free-range eggs for breakfast and baking.", "dairy", 129, 4.7, 22, "12 eggs", "eggs.jpg"],
  ["Curly Kale", "Hearty leafy kale for salads, soups, and sautés.", "vegetables", 59, 4.5, 26, "200 g", "kale.jpg"],
];

export const FOOD_PRODUCTS: Product[] = PRODUCT_SEEDS.map(
  ([name, description, category, price, rating, stock, unit, image], index) => ({
    id: index + 1,
    name,
    description,
    category,
    price,
    currency: "INR",
    image: `/food-images/${image}`,
    rating,
    stock,
    unit,
    isLivePrice: false,
    priceStatus: "catalog",
  }),
);