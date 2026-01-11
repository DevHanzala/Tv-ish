import cors from "cors";

export const corsConfig = cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
});
console.log("✅ CORS configured with origin:", process.env.CORS_ORIGIN);    