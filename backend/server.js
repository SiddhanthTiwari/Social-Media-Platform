import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app=express();

app.use(cors({
    origin: 'https://social-media-platform-dun.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true // allow cookies if needed
}));
app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"));


const start=async()=>{
    const connectDB=mongoose.connect("mongodb+srv://siddhanthtiwari885:siddsahihai@linkedin.270viza.mongodb.net/?retryWrites=true&w=majority&appName=linkedin");
    console.log("database is connected");

    app.listen(9090,()=>{
        console.log("Server is running on port 9090");
    })
}
start();