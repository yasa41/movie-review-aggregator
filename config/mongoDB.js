/**
 * @file mongoDB.js
 * @description MongoDB connection setup using Mongoose.
 * 
 * Responsibilities:
 *  - Connect to the MongoDB database using MONGO_URI from .env
 *  - Log connection status and handle connection errors
 * 
 * Notes:
 *  - DB connection is imported in server.js before starting the server.
 */


import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");

    }
    catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);
    }
};
export default connectDB;