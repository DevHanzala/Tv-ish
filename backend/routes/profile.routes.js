import express from "express";
import { getMyProfile, ensureProfile, updateMyProfile, requestEmailChange, syncEmail, updatePhone,   changePassword  } from "../controllers/profile.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.get("/me", requireAuth, asyncHandler(getMyProfile));
router.patch("/update", requireAuth, asyncHandler(updateMyProfile));

// Ensure profile exists
router.post(
  "/ensure",
  requireAuth,
  asyncHandler(ensureProfile)
);


// Email change
router.post(
  "/email/request",
  requireAuth,
  asyncHandler(requestEmailChange)
);

// Sync email
router.patch(
  "/sync-email",
  requireAuth,
  asyncHandler(syncEmail)
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
