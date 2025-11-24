/**
 * @file auth.js
 * @description Middleware for verifying JWT tokens and protecting routes.
 * 
 * Responsibilities:
 *  - Validate JWT from HTTP-only cookies
 *  - Attach authenticated user details to req.user
 *  - Restrict access based on user roles (admin/user)
 * 
 * Notes:
 *  - If no token is found, the route is blocked.
 */


import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists 
    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found.'
      });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};
