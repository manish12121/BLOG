import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"

import cookieParser from "cookie-parser"

dotenv.config()
const app = express();

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`server listening at PORT ${PORT}`);
});