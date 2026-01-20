import express from "express";
import "dotenv/config";
import { corsConfig } from "./config/cors.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import globalErrorHandler from "./exception/globalErrorHandler.js";

const app = express();

// Middleware
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// 🔍 Root status (ALL INFO SHOWN HERE)
app.get("/", async (req, res) => {
  let supabaseStatus = "unknown";

  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });

    supabaseStatus = response.ok ? "reachable" : "rejected";
  } catch {
    supabaseStatus = "unreachable";
  }

  res.status(200).json({
    service: "Tv_ish Backend",
    status: "running",
    environment: process.env.NODE_ENV || "production",
    supabase: supabaseStatus,
    timestamp: new Date().toISOString(),
  });
});

// Health check (minimal)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Global error handler
app.use(globalErrorHandler);

// Server startup (NO LOGS)
const PORT = process.env.PORT || 10000;
app.listen(PORT);
