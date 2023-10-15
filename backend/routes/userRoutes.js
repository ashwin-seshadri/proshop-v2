import express from "express";
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router
    .route("/")
    .get(protect, admin, getUsers)
    .post(registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route("/:id")
    .delete(protect, admin, checkObjectId, deleteUser)
    .get(protect, admin, checkObjectId, getUserById)
    .put(protect, admin, checkObjectId, updateUser);

export default router;