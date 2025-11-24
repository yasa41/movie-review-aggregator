/**
 * @file server.js
 * @description Entry point of the Movie Review Aggregator API.
 *
 * Responsibilities:
 *  - Initialize the Express application
 *  - Load environment variables
 *  - Connect to MongoDB
 *  - Configure global middleware (CORS, JSON body parser, cookie parser)
 *  - Register route modules (Auth, Movies, Reviews)
 *  - Start the server on the configured PORT
 *
 * Notes:
 *  - Includes a global error-handling middleware
 *  - CORS is configured to allow credentials for cookie-based JWT auth
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Database and Routes
import connectDB from "./config/mongoDB.js";
import authRouter from "./routes/authRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/reviews", reviewRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Start Server
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
