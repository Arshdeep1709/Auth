import express from "express";
import { connectDB } from "./database/connection.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

const port = 3009;

app.use(express.json());
app.use('/user', userRoutes);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});