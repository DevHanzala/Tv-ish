import express from "express";
import "dotenv/config";
import { corsConfig } from "./config/cors.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import globalErrorHandler from "./exception/globalErrorHandler.js"
import { HttpError } from "./exception/HttpError.js";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(corsConfig);
app.use(express.json()); // REQUIRED
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Health check (NO DB logic)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Tv_ish Backend!");
});

// Global Exception handler
app.use(globalErrorHandler);

// Server startup
app.listen(PORT, async () => {
  console.log(`Backend running at http://localhost:${PORT}`);

  try {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });

  

    if (res.ok) {
      console.log("Supabase API reachable");
    } else {
      console.error("Supabase API responded but rejected request");
    }
  } catch (err) {
    console.error("Supabase API unreachable:", err.message);
  }
});
