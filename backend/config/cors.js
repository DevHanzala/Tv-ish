import cors from "cors";

export const corsConfig = cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
});
console.log("CORS configured with origin:", process.env.CORS_ORIGIN || "http://localhost:5173");