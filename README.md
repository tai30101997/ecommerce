
---

# Ecommerce API – Clean Architecture Backend

A production-ready ecommerce backend built with **Node.js**, **Express**, **MongoDB**
Includes authentication, product management, shopping cart, and full order workflows.

---

## Features

### ✔ Authentication

* Register / Login (JWT)
* Secure password hashing
* Role-based access (Admin / Customer)

### ✔ Product Management

* CRUD
* Search / Filter / Pagination
* Admin-only write permissions

### ✔ Shopping Cart

* User-based persistent cart
* Add / update / remove items

### ✔ Orders

* Place orders from cart
* Order history for customer
* Admin order visibility

### ✔ Architecture

* Clean architecture: controller → service → repository
* Joi validation middleware
* Authentication & permission middleware
* Unified API response format

---

## Project Structure

```
src/
│── app.ts
│── server.ts
│── config/
│── core/
│     ├── httpError.ts
│     ├── response.ts
│     └── types/
│── middleware/
│     ├── authenticate.ts
│     ├── permissions.middleware.ts
│     └── validate.middleware.ts
│── models/
│     ├── user/
│     ├── product/
│     ├── cart/
│     └── order/
│── modules/
│     ├── auth/
│     ├── products/
│     ├── cart/
│     └── orders/
│── routes/
│     ├── auth.route.ts
│     ├── product.route.ts
│     ├── cart.route.ts
│     └── order.route.ts
└── utils/
```

---

##  Request Flow

```
CLIENT
  |
  | 1. Request
  v
ROUTE
  |
  | 2. Input validation (Joi)
  v
VALIDATION MIDDLEWARE
  |
  | 3. Token verification (JWT)
  v
AUTHENTICATION MIDDLEWARE
  |
  | 4. Permission check (Admin/Customer)
  v
PERMISSION MIDDLEWARE
  |
  | 5. Controller receives validated request
  v
CONTROLLER
  |
  | 6. Business logic
  v
SERVICE
  |
  | 7. MongoDB operations
  v
REPOSITORY
  |
  | 8. Standardized ResponseModel
  v
RESPONSE HANDLER
  |
  v
CLIENT
```

---

##  Installation & Setup

###  Clone repository

```bash
git clone <repo-url>
cd ecommerce-api
```

###  Install dependencies

```bash
npm install
```

### 3️⃣ Start MongoDB with Docker

```bash
docker compose up -d
```

### 4️⃣ Create `.env` file

```
PORT=3000
MONGO_URL=mongodb://root:example@localhost:27017/ecommerce?authSource=admin
JWT_SECRET= USE IN SAMPLE.ENV FOR TEST 
```

### 5️⃣ Run development server

```bash run seed
npm run seed
```

```bash
npm run dev
```

---

## 📦 Postman Collection

FOR SIMPLE SET UP
Import file:

```
setup/postman/
   ecommerce.postman_collection.json
```
```
setup/dbschema/
   ecommerce.postman_collection.json
```
Contains all API routes for:

* Authentication
* Products
* Cart
* Orders
* Admin operations

---

## 🧱 Tech Stack

* **Node.js / Express** – Backend web server
* **MongoDB / Mongoose** – Database
* **Joi** – Request validation
* **JWT** – Authentication
* **Docker** – Database container
* **Clean Architecture** – Modular + scalable structure


