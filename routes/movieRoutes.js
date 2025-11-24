/**
 * @file movieRoutes.js
 * @description Routes for movie management.
 * 
 * Endpoints:
 *  POST /          - Create movie (Admin only)
 *  GET /           - Get all movies (Public)
 *  GET /:id        - Get specific movie (Public)
 *  PUT /:id        - Update movie (Admin only)
 *  DELETE /:id     - Delete movie (Admin only)
 * 
 * Notes:
 *  - Protected routes require auth + admin role.
 */


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