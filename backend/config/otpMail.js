import nodemailer from "nodemailer";

export const sendOtpMail = async (email,otp,name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "arshdeepchhabra1712@gmail.com",
                pass: "hmgrwmqtkalfwtru"
            }
        });
        const mailOptions = {
            from: "arshdeepchhabra1712@gmail.com" ,
            to: email,
            subject: `Hii ${name}, Your  request for password reset otp`,
            html: `<h2>${otp}</h2>`
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
}