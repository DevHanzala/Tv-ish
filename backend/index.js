import express from "express";
import cors from "cors";
import "dotenv/config";
import { supabase } from "./services/supabaseClient.js";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS (development only)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
  });
});


// Server startup
app.listen(PORT, async () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);

  try {
    const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    });

  

    if (res.ok) {
      console.log("✅ Supabase API reachable");
    } else {
      console.error("❌ Supabase API responded but rejected request");
    }
  } catch (err) {
    console.error("❌ Supabase API unreachable:", err.message);
  }
});
