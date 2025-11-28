import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./core/errorHandler";
import routes from "./routes";
export const createApp = (): Application => {
  const app = express();
  // Global middlewares
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morgan("dev"));
  // Register all module routes
  app.use("/api", routes);
  // Global error handler (always last)
  app.use(errorHandler);
  return app;
};