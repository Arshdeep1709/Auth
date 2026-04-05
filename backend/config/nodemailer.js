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
            text: `Your account was created for ${email}.

To verify, call POST /user/verification with either:
- Header: Authorization: Bearer ${token}
- Or JSON body: { "token": "${token}" }

Token expires in 1 hour.
`
        };
        await transporter.sendMail(mailConfiguration);
    } catch (error) {
        console.log(error);
    }
}