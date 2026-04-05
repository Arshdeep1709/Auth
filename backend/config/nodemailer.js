import nodemailer from "nodemailer";
import fs from 'fs'
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const verifyEmail = async (email, token, name) => {

    const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, "template.html"),
        "utf-8"
    )
    const template = Handlebars.compile(emailTemplateSource)
    const Html = template({ token: encodeURIComponent(token) })

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
            html: Html
        };
        await transporter.sendMail(mailConfiguration);
    } catch (error) {
        console.log(error);
    }
}