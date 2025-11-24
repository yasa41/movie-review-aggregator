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
