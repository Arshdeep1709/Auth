import express from "express";
import { login, logout, signup, verification } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verification", verification);
router.post("/login", login);
router.post("/logout", isAuthenticated,logout);


export default router