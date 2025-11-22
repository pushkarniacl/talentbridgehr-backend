import app from "./app.js";
import { config } from "./config/index.js";
import prisma from "./config/database.js";
import { logger } from "./utils/logger.js";
import cookieParser from "cookie-parser";
app.set("trust proxy", 1);
app.use(cookieParser());

const start = async () => {
  try {
    // test DB connection
    await prisma.$connect();
    logger.info("Connected to DB");

    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });

    // graceful shutdown
    const shutdown = async () => {
      logger.info("Shutting down");
      await prisma.$disconnect();
      process.exit(0);
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
};

start();
