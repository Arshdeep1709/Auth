import { User } from "../models/userModels.js";
import { Session } from "../models/sessionModels.js";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../config/nodemailer.js";
import { sendOtpMail } from "../config/otpMail.js";


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
        const token = jwt.sign({ userId: newUser._id }, 'secretKey', { expiresIn: "1h" });
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
export const verification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        let token;
        if (authHeader?.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        } else if (req.body?.token) {
            token = req.body.token;
        } else if (req.query?.token) {
            token = req.query.token;
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Send token: Authorization Bearer header, body { token }, or query ?token="
            });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, 'secretKey');
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired'
                });
            }
            return res.status(400).json({
                success: false,
                message: 'token verification failed'
            })
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }
        user.token = null;
        user.isVerified = true;
        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Email verified'
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "un-authorised access"
            });
        }
        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                message: "invalid password"
            });
        }
        if (user.isVerified !== true) {
            return res.status(403).json({
                success: false,
                message: "user not verified"
            });
        }
        const exisitingSession = await Session.findOne({ userId: user._id })
        if (exisitingSession) {
            await Session.deleteOne({ userId: user._id })
        }
        await Session.create({ userId: user._id })

        const accessToken = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: "2d" })
        const refreshToken = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: "30d" })

        user.isLoggedIn = true
        await user.save()

        return res.status(200).json({
            success: true,
            message: `welcome back ${user.name}`,
            accessToken,
            refreshToken,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const logout = async (req, res) => {
    try {
        const userId = req.userId
        await Session.deleteMany({ userId })
        await User.findByIdAndUpdate(userId, { isLoggedIn: false })
        return res.status(200).json({
            success: true,
            message: 'logged out successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        const expiry = new Date(Date.now() + 1 * 60 * 60 * 1000)

        user.otp = otp
        user.otpExpiry = expiry

        await user.save()
        await sendOtpMail(email, otp, user.name)
        return res.status(200).json({
            success: true,
            message: 'otp sent to mail'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body
        const email = req.params.email
        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'otp requred'
            })
        }
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "user not found"
                });
            }
            if (!user.otp || !user.otpExpiry) {
                return res.status(400).json({
                    success: false,
                    message: "otp already verified"
                })
            }
            if (user.otpExpiry < new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "otp expired"
                })
            }
            if (otp != user.otp) {
                return res.status(400).json({
                    success: false,
                    message: "invalid otp"
                })
            }

            user.otp = null
            user.otpExpiry = null

            await user.save()
            return res.status(200).json({
                success: true,
                message: 'otp verified'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'internal server error'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}