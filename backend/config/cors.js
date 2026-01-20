import cors from "cors";

export const corsConfig = cors({
  origin: process.env.CORS_ORIGIN || "https://tv-ish-frontend.onrender.com",
  credentials: true,
});