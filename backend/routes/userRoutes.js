import express from "express";
import { login, signup, verification } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verification", verification);
router.post("/login", login);


export default router