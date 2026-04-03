import { User } from "../models/userModels.js";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../config/nodemailer.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const newUser = await User.create({ name, email, password });
        const token = jwt.sign({ userId: newUser._id }, 'secretKey', { expiresIn: "5m" });
        await verifyEmail(email, token, name);
        newUser.token = token;
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
             message: error.message
             });
    }
}