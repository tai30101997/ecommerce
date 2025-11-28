import dotenv from "dotenv";
import { createApp } from "./app";
import { MongoDBUtils } from "./utils/mongoUtils";

dotenv.config();

const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    let dbConnectResult = await MongoDBUtils.connectDB(process.env.MONGO_URL || "", 3);
    if (!dbConnectResult) {
      process.exit(1);
    }
    console.log("MongoDB connected");
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();