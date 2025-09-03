// backend/controllers/user.controller.js
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // Exclude the logged-in user from the list
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
