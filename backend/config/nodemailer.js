import nodemailer from "nodemailer";

export const verifyEmail = async (email, token, name) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "arshdeepchhabra1712@gmail.com",
                pass: "hmgrwmqtkalfwtru"
            }
        });
        const mailConfiguration = {
            from: "arshdeepchhabra1712@gmail.com" ,
            to: email,
            subject: `Hii ${name}, Email Verification`,
            text: `
            Your account has been successfully create with id ${email}
            `
        };
        await transporter.sendMail(mailConfiguration);
    } catch (error) {
        console.log(error);
    }
}