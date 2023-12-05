import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  createReview,
  deleteReview,
  updateReview,
  getOtherUserProfile,
  addFriend,
  deleteFriend,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/review")
  .put(protect, createReview)
  .delete(protect, deleteReview)
  .patch(protect, updateReview);
router.get("/profile/:username", getOtherUserProfile);

router.route("/friend").put(protect, addFriend).delete(protect, deleteFriend);

export default router;
