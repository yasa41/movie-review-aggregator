/**
 * @file userModel.js
 * @description Mongoose schema for application users.
 * 
 * Fields:
 *  - name: User's display name
 *  - email: Unique identifier for login
 *  - password: Hashed user password
 *  - role: 'user' or 'admin'
 * 
 * Notes:
 *  - Passwords must never be stored in plain text.
 *  - Email must be unique for each user.
 */


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Authentication fields
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin'],     // restrict roles
    default: 'user'             // default role
  }
},
{
  timestamps: true
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
