import express from "express";
import { createReview,
  getAllReviews,
  getReviewsByMovieId,
  updateReview,
  deleteReview,getAverageRatingForMovie } from "../controllers/reviewControllers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create a new review
router.post('/', verifyToken, createReview);

// Get all reviews
router.get('/', verifyToken, getAllReviews);

// Get all reviews for a specific movie by movie ID
router.get('/movies/:movieId', verifyToken, getReviewsByMovieId);

// Update a review by ID
router.put('/:id', verifyToken, updateReview);

// Delete a review by ID
router.delete('/:id', verifyToken, deleteReview);

router.get('/:movieId/average-rating', verifyToken, getAverageRatingForMovie);

export default router;