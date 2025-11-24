import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  movie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Movie', 
    required: true 
  },
  reviewer: { 
    type: mongoose.Schema.Types.ObjectId, // changed to ObjectId reference
    ref: 'User',                         // reference User model
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
