import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { apiRateLimiter } from "./middleware/rateLimit.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { logger } from "./utils/logger.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import clientRoutes from "./modules/client/client.routes.js";
import jobRoutes from "./modules/job/job.routes.js";
import applicationRoutes from "./modules/application/application.routes.js";

const app = express();

// Required for Railway proxy + correct IPs + rate limiter
app.set("trust proxy", 1);

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://talentbridgehr-frontend.vercel.app"
];

// CORS OPTIONS (used for both main CORS and preflight)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server & curl (no origin)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS error: Origin ${origin} not allowed`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// CORS MUST COME BEFORE HELMET
app.use(cors(corsOptions));

// Very important — handle preflight requests with SAME CORS config
app.options("*", cors(corsOptions));

// Security headers
app.use(helmet());

// Parse JSON body
app.use(express.json({ limit: "5mb" }));

// Parse cookies (needed for refresh token)
app.use(cookieParser());

// Logging
app.use(
  morgan("combined", {
    stream: { write: (msg) => logger.info(msg.trim()) }
  })
);

// Rate limiter (after logging, before routes)
app.use(apiRateLimiter);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/jobs", jobRoutes);

// Nested applications route
app.use("/api/v1/jobs/:jobId/applications", applicationRoutes);
app.use("/api/v1/applications", applicationRoutes);

// Health check
app.get("/", (req, res) =>
  res.json({ status: "ok", service: "TalentBridgeHR" })
);

// Global error handler
app.use(errorHandler);

export default app;
