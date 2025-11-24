import movieModel from '../models/movieModel.js';

// Create a new movie
export const createMovie = async (req, res) => {
  try {
    const { title, description, director, releaseDate, genre } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const movie = new movieModel({ title, description, director, releaseDate, genre });
    await movie.save();
    return res.status(201).json({ success: true, data: movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModel.find();
    return res.status(200).json({ success: true, data: movies });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get a movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    return res.status(200).json({ success: true, data: movie });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a movie by ID
export const updateMovie = async (req, res) => {
  try {
    const { title, description, director, releaseDate, genre } = req.body;

    // Prepare an update object only with allowed fields
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (director) updateFields.director = director;
    if (releaseDate) updateFields.releaseDate = releaseDate;
    if (genre) updateFields.genre = genre;

    const updatedMovie = await movieModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Delete a movie by ID
export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await movieModel.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    return res.status(200).json({ success: true, message: 'Movie deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
