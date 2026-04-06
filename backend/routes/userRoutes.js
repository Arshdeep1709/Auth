import express from "express";
import { changePassword, forgotPassword, login, logout, signup, verification, verifyOtp } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { userSchema, validateUser } from "../validations/userValidation.js";

const router = express.Router();

router.post("/signup", validateUser(userSchema), signup);
router.post("/verification", verification);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyOtp/:email", verifyOtp);
router.post("/changePassword/:email", changePassword);


export default router