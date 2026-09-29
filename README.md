# 🍴 Foodhub

**Foodhub** is a modern food product explorer built with **React, TypeScript, and Vite**. It allows users to browse, search, filter, sort, and explore food products through a clean and responsive interface.

## 🚀 Features

* 🍎 Browse food products
* 🔍 Search by product name, brand, or category
* 🏷️ Filter by category
* 💰 Filter by price range
* ⭐ Filter and sort by rating
* 📊 Sort products by name, price, or rating
* 📦 View stock and availability
* 🖼️ Product images with fallback handling
* 📄 Detailed product pages
* 💵 Indian Rupee (₹) price formatting
* 📱 Responsive design
* ⚡ Fast performance with Vite
* 🛡️ Loading, error, and empty-result states

## 🛠️ Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **HTML5**
* **CSS3**
* **JavaScript**
* **REST API / Food Product Data**

## 📂 Project Structure

```text
food-product-explorer/
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
├── .env.example
├── package.json
├── vite.config.ts
└── README.md
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/Food-hub.git
```

Navigate to the project:

```bash
cd Food-hub
```

Install dependencies:

```bash
npm install
```

## ▶️ Run the Project

Start the development server:

```bash
npm run dev
```

Open the URL displayed in the terminal, usually:

```text
http://localhost:5173
```

## 💰 Currency

Foodhub displays product prices in **Indian Rupees (INR)** using the `en-IN` locale.

Example:

```text
₹99.00
₹249.00
₹1,299.00
```

## 🔄 Price Updates

Foodhub is designed with a pluggable price-provider architecture.

When a live price API is configured, the application can display updated product prices and their update time.

If a live price provider is not configured, the application uses the
