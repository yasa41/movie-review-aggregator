import mongoose from 'mongoose';
import reviewModel from '../models/reviewModel.js';

// Create a new review (authenticated user)
export const createReview = async (req, res) => {
  try {
    const { movie, rating, comment } = req.body;
    const reviewer = req.user._id; // use authenticated user ID

    if (!movie || !rating) {
      return res.status(400).json({ success: false, message: 'Movie and rating are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const review = new reviewModel({ movie, reviewer, rating, comment });
    await review.save();
    return res.status(201).json({ success: true, data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews (open to all)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().populate('movie', 'title');
    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get reviews by movie ID (open to all)
export const getReviewsByMovieId = async (req, res) => {
  try {
    const reviews = await reviewModel.find({ movie: req.params.movieId }).populate('movie', 'title');
    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a review by ID (only author or admin)
export const updateReview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Authorization: only author or admin can update
    if (review.reviewer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const updatedReview = await reviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a review by ID (only author or admin)
export const deleteReview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Authorization: only author or admin can delete
    if (review.reviewer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    await reviewModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get average rating for a movie (open to all)
export const getAverageRatingForMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const [result] = await reviewModel.aggregate([
      { $match: { movie: new mongoose.Types.ObjectId(movieId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 }
        }
      }
    ]);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this movie"
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        movieId,
        averageRating: result.averageRating,
        numberOfReviews: result.count
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
