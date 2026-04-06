import express from "express";
import { forgotPassword, login, logout, signup, verification, verifyOtp } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verification", verification);
router.post("/login", login);
router.post("/logout", isAuthenticated,logout);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOtp/:email", verifyOtp);


export default router