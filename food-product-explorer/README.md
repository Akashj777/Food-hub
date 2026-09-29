# Foodhub

A React, TypeScript, and Vite grocery catalog for browsing Indian food products. Foodhub includes local product photography, search and shopping filters, product details, and a pluggable live-price provider.

## 🚀 Features

* Browse the retained 18-item food catalog
* Search by product name, brand, or category
* Filter by category, brand, price range, rating, and availability
* Sort by name, price, or rating
* View product image, unit, stock, rating, and price status
* Use local food photos with an image fallback
* See INR formatting throughout the application
* Connect a live price provider through a server-side endpoint
* Responsive product grid, loading, error, and empty states

## 🛠️ Technologies Used

* React
* TypeScript
* Vite
* HTML5
* CSS3
* JavaScript
* Local Indian food catalog
* Optional JSON price-provider API

## 📁 Project Structure

```text
foodhub/
│
├── public/
│   └── food-images/
│
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailsPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── routes/
│   ├── services/
│   │   ├── api.ts

│   │   ├── foodCatalog.ts
│   │   └── priceApi.ts
│   │
│   ├── types/
│   │   └── product.ts
│   │
│   ├── utils/
│   │   ├── filterProducts.ts
│   │   ├── format.ts
│   │   └── parseProductId.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── package.json
├── vite.config.ts
├── .env.example
└── README.md
```

## ▶️ Run the Project

Install dependencies:

```bash
npm install
```

Optionally copy `.env.example` to `.env` and set a price-provider URL. The local catalog works without environment variables.

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 📦 Product Information

The catalog in `src/services/foodCatalog.ts` contains Indian grocery products with:

* Name, category, description, and optional real brand
* Catalog price in INR and unit
* Local food image, rating, and stock quantity

The catalog is local and does not fetch product data from DummyJSON or another generic catalog API.

## 🔎 Product Filtering

The application supports filtering and searching food products based on:

* Product name, brand, and category
* Category and brand
* Minimum and maximum price
* Minimum rating and stock availability
* Name ascending/descending, price ascending/descending, and rating descending

## Pricing

Prices use `Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })`.

Without a provider URL, the included example amounts are **catalog prices**, not live market prices. The UI labels them as such. No amounts are randomly generated. If a provider URL is configured but a current price is missing or the provider fails, the UI displays **Price unavailable** rather than presenting the catalog amount as current.

### Live price provider

Foodhub does not ship with a configured Indian food-price API. Set `VITE_PRICE_API_URL` to the exact URL of a trusted API or a server-side proxy you operate. Foodhub does not append an assumed route. The endpoint must accept a `POST` request with this body:

```json
{
	"products": [
		{ "id": 1, "name": "Alphonso Mangoes", "category": "fruits" }
	]
}
```

It must return prices in this shape; each amount must be INR and include a valid ISO 8601 update time:

```json
{
	"prices": [
		{ "id": 1, "price": 249, "currency": "INR", "updatedAt": "2026-09-29T10:00:00Z" }
	]
}
```

Only valid returned prices are labeled **Live price**. Missing products, non-INR responses, invalid timestamps, network errors, and provider errors are labeled **Price unavailable**. Implement provider credentials on the server-side proxy; never put secrets in a `VITE_` variable because Vite embeds those values in the browser bundle.

Environment variable:

```env
VITE_PRICE_API_URL=
```

Copy `.env.example` to `.env`, set the URL, and restart Vite. Do not commit `.env` or credentials.

## ⭐ Rating

Product ratings are displayed with one decimal place.

Example:

```text
4.5
```

## 📦 Stock Status

Products can display:

```text
In stock
Low stock
Out of stock
```

## 🧪 Development

To check the project for TypeScript and build errors:

```bash
npm run build
```

Run the linter with:

```bash
npm run lint
```

To run the development server:

```bash
npm run dev
```

## 🎯 Project Goal

The goal of this project is to provide a simple and user-friendly platform for discovering and exploring food products through search, filtering, sorting, and detailed product information.

## 👨‍💻 Project

**Foodhub**

Built with **React + TypeScript + Vite**.
