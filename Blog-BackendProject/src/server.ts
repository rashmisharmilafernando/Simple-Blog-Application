import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import * as process from "process";
import jwt, { Secret } from 'jsonwebtoken';

dotenv.config();  // Load environment variables
import UserModel from "./models/user.model";
import BlogModel from "./models/blog.model";
import * as SchemaTypes from "./types/SchemaTypes";
import CustomResponse from "./dtos/custom.response";

import UserRoutes from "./routes/user.routes";
import BlogRoutes from "./routes/blog.routes"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json());



interface User {
  username: string,
  name: string,
  email: string,
  password: string
}

// Default Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const db = mongoose.connection
    console.log(`Server running on http://localhost:${PORT}`);
    db.on('error', (error) => {
      console.log("DB Connection Error: ", error)
    })
    db.on('open', () => {
      console.log("DB Connected Successfully")
    })

   

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
});

app.use('/user', UserRoutes)
app.use('/posts', BlogRoutes)
