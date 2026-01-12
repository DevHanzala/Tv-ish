import express from "express";
import { getMyProfile, updateMyProfile, requestEmailChange, updatePhone,   changePassword  } from "../controllers/profile.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/me", requireAuth, asyncHandler(getMyProfile));
router.patch("/", requireAuth, asyncHandler(updateMyProfile));

// Email change
router.post(
  "/email/request",
  requireAuth,
  asyncHandler(requestEmailChange)
);

// Phone update
router.patch(
  "/phone",
  requireAuth,
  asyncHandler(updatePhone)
);


// Password change
router.post(
  "/password/change",
  requireAuth,
  asyncHandler(changePassword)
);


export default router;
