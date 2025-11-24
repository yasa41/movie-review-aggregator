import express from "express";
import { createMovie, deleteMovie,updateMovie,getAllMovies,getMovieById } from "../controllers/movieController.js";
import { verifyToken } from '../middleware/auth.js';

const router =express.Router();

// Create a new movie
router.post('/',verifyToken, createMovie);

// Get all movies
router.get('/',verifyToken, getAllMovies);

// Get a movie by ID
router.get('/:id',verifyToken, getMovieById);

// Update a movie by ID
router.put('/:id',verifyToken, updateMovie);

// Delete a movie by ID
router.delete('/:id',verifyToken, deleteMovie);

export default router;