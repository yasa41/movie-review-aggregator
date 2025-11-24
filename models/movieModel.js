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
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // adds createdAt and updatedAt automatically
});

const movieModel = mongoose.models.Movie || mongoose.model('Movie', movieSchema);
export default movieModel;
