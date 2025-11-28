import mongoose from "mongoose";
import { UserModel } from "./models/user/user.model";
import { ProductModel } from "./models/product/product.model";
import { AuthProvider } from "./modules/auth/auth.provider";
import { UserRole, CUSTOMER_PRIVILEGES, ADMIN_PRIVILEGES } from "./core/Type";

async function connectDB() {
  const uri = process.env.MONGO_URL || "mongodb://root:example@localhost:27017/ecommerce?authSource=admin";

  await mongoose.connect(uri);
  console.log("Connected to MongoDB for seeding");
}

/** Seed admin user */
async function seedAdmin() {
  const adminEmail = "admin@example.com";

  const exists = await UserModel.findOne({ email: adminEmail });
  if (exists) {
    console.log("Admin already exists, skipping...");
    return;
  }

  const hashed = await AuthProvider.hashPassword("123456");

  const admin = await UserModel.create({
    name: "Admin User",
    email: adminEmail,
    password: hashed,
    role: UserRole.Admin,
    privileges: ADMIN_PRIVILEGES,
  });

  console.log("✔ Admin created:", admin.email);
}

/** Seed customer user */
async function seedCustomer() {
  const userEmail = "user@example.com";

  const exists = await UserModel.findOne({ email: userEmail });
  if (exists) {
    console.log("Customer already exists, skipping...");
    return;
  }

  const hashed = await AuthProvider.hashPassword("123456");

  const customer = await UserModel.create({
    name: "Normal Customer",
    email: userEmail,
    password: hashed,
    role: UserRole.Customer,
    privileges: CUSTOMER_PRIVILEGES,
  });

  console.log("Customer created:", customer.email);
}


export async function seedProducts() {
  try {
    const count = await ProductModel.countDocuments();

    if (count > 0) {
      console.log("Products already exist, skipping seeding");
      return;
    }

    const sampleProducts = [
      {
        name: "iPhone 15",
        description: "Latest Apple flagship smartphone with A16 chip.",
        price: 999,
        stock: 50,
        category: [1, 3]
      },
      {
        name: "Samsung S23",
        description: "Samsung flagship with Snapdragon 8 Gen 2.",
        price: 899,
        stock: 30,
        category: [1, 3]
      },
      {
        name: "Macbook Air M2",
        description: "Apple’s lightweight laptop powered by M2 chip.",
        price: 1299,
        stock: 20,
        category: [2]
      },
      {
        name: "Asus Gaming Laptop",
        description: "High-performance gaming laptop with RTX graphics.",
        price: 1499,
        stock: 15,
        category: [2, 4]
      },
      {
        name: "Sony WH-1000XM5",
        description: "Premium noise-canceling wireless headphones.",
        price: 399,
        stock: 40,
        category: [3]
      },
      {
        name: "AirPods Pro 2",
        description: "Apple’s advanced noise-canceling wireless earbuds.",
        price: 249,
        stock: 60,
        category: [3]
      },
      {
        name: "Logitech MX Master 3",
        description: "Ergonomic productivity mouse with fast scroll.",
        price: 99,
        stock: 80,
        category: [4]
      },
      {
        name: "Dell Monitor 27",
        description: "27-inch 2K IPS monitor for work and gaming.",
        price: 279,
        stock: 25,
        category: [4]
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with tactile switches.",
        price: 149,
        stock: 70,
        category: [4]
      },
      {
        name: "Sony PS5",
        description: "Next-gen gaming console with ultra-fast SSD.",
        price: 499,
        stock: 10,
        category: [5]
      }
    ];

    console.log("Seeding products...");

    for (const product of sampleProducts) {
      const doc = new ProductModel(product);
      await doc.save();
    }

    console.log(`Seeded ${sampleProducts.length} products successfully.`);
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}

/** RUN ALL */
async function runSeed() {
  try {
    await connectDB();
    await seedAdmin();
    await seedCustomer();
    await seedProducts();


    console.log("Seeding completed!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

runSeed();