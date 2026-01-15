import { supabase } from "../config/supabaseClient.js";

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  console.log("🔐 AUTH HEADER:", req.headers.authorization ? "PRESENT" : "MISSING");

  if (!token) {
    console.error("❌ NO TOKEN");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    console.error("❌ INVALID TOKEN:", error);
    return res.status(401).json({ message: "Invalid session" });
  }

  console.log("✅ AUTH USER VERIFIED:", data.user.id);

  req.user = data.user;
  next();
};
