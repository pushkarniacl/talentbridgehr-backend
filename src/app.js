import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/index.js";
import { apiRateLimiter } from "./middleware/rateLimit.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { logger } from "./utils/logger.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import clientRoutes from "./modules/client/client.routes.js";
import jobRoutes from "./modules/job/job.routes.js";
import applicationRoutes from "./modules/application/application.routes.js";

const app = express();

app.use(helmet());
app.use(cors({
origin: "https://talentbridgehr-frontend.vercel.app",
  methods: "GET,POST,PUT,DELETE",
}));app.use(express.json({ limit: "5mb" }));
app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(apiRateLimiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/jobs", jobRoutes);

// nested applications route: /api/v1/jobs/:jobId/applications
app.use("/api/v1/jobs/:jobId/applications", applicationRoutes);
app.use("/api/v1/applications", applicationRoutes);

app.get("/", (req, res) => res.json({ status: "ok", service: "TalentBridgeHR" }));

app.use(errorHandler);

export default app;
