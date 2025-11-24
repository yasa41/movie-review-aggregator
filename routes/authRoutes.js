/**
 * @file authRoutes.js
 * @description Routes for user authentication.
 * 
 * Endpoints:
 *  POST /register
 *  POST /login
 *  POST /logout
 * 
 * Notes:
 *  - Login generates JWT in secure cookie.
 *  - Logout clears the auth cookie.
 */


import express from 'express';
import { register, login, logout } from '../controllers/authControllers.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

export default router;
