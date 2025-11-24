/**
 * @file reviewModel.js
 * @description Schema for storing user reviews for movies.
 * 
 * Fields:
 *  - movie: Reference to Movie model (ObjectId)
 *  - reviewer: Reference to User model (ObjectId)
 *  - rating: Number between 1–5
 *  - comment: Optional review text
 * 
 * Notes:
 *  - Average rating is calculated via aggregation, not stored.
 */


import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
  },
  reviewer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',                         
    required: true
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    trim: true 
  }
}, {
  timestamps: true
});

const reviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default reviewModel;
