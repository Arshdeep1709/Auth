import express from "express";
import { connectDB } from "./database/connection.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors'

const app = express();

const port = 3009;

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))
app.use('/user', userRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});