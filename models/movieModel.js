/**
 * @file movieModel.js
 * @description Defines the movie schema stored in MongoDB.
 * 
 * Fields:
 *  - title: Movie title (required)
 *  - description: Optional plot summary
 *  - director: Movie director name
 *  - releaseDate: Release date as a string or Date object
 *  - genre: Movie genre
 * 
 * Notes:
 *  - Admins manage movie CRUD operations.
 */


import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  director: { 
    type: String, 
    trim: true 
  },
  releaseDate: { 
    type: Date 
  },
  genre: { 
    type: [String], // Array of genres 
    default: [] 
  }
}, {
  timestamps: true 
});

const movieModel = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
export default movieModel;
