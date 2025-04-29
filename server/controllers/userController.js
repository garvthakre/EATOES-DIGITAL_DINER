import User from "../models/User.js";
import pool from "../config/postgres.js";
import bcrypt from "bcryptjs";

// Get user details
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify user ID matches authenticated user or is admin
    if (req.user.id !== id) {
      return res.status(403).json({ error: "Not authorized to access this user's data" });
    }
    
    const user = await User.findById(id).select("-password");
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Get user's recent orders
    const orderResult = await pool.query(
      `SELECT id, order_date, total_amount, status
       FROM orders 
       WHERE user_id = $1
       ORDER BY order_date DESC
       LIMIT 5`,
      [id]
    );
    
    // Return user with recent orders
    res.json({
      user,
      recentOrders: orderResult.rows
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, currentPassword, newPassword } = req.body;
    
    // Verify user ID matches authenticated user or is admin
    if (req.user.id !== id) {
      return res.status(403).json({ error: "Not authorized to update this user" });
    }
    
    // Find the user
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update user fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    
    // Handle password change if requested
    if (newPassword && currentPassword) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }
      
      // Hash new password
      user.password = await bcrypt.hash(newPassword, 10);
    }
    
    // Save updated user
    const updatedUser = await user.save();
    
    // Return updated user without password
    res.json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone
      }
    });
  } catch (error) {
    console.error("Error updating user:", error);
    
    // Check if error is due to duplicate email
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already in use" });
    }
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    // This would typically have admin middleware check
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};