import express from "express";
import { connectDB } from "./database/connection.js";

const app = express();

const port = 3009;

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});