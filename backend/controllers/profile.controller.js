import { getProfileByUserId } from "../models/profile.model.js";
import { success, error } from "../utils/apiResponse.js";

export const getMyProfile = async (req, res) => {
  const userId = req.user.id;

  const { data, error: profileError } =
    await getProfileByUserId(userId);

  if (profileError) return error(res, profileError.message);

  return success(res, "Profile fetched", data);
};
