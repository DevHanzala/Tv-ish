import express from "express";
import { getMyProfile } from "../controllers/profile.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/me", requireAuth, asyncHandler(getMyProfile));

export default router;
