import MenuItem from "../models/MenuItem.js";

// Get all menu items
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ available: true });
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// Get all menu categories
export const getMenuCategories = async (req, res) => {
  try {
    const categories = await MenuItem.distinct("category");
    res.json(categories);
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    res.status(500).json({ error: "Failed to fetch menu categories" });
  }
};

// Get menu items by category
export const getMenuItemsByCategory = async (req, res) => {
  try {
    const { id: category } = req.params;
    
    // Validate category
    const validCategories = ['Appetizers', 'Main Courses', 'Desserts', 'Drinks'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }
    
    const menuItems = await MenuItem.find({ 
      category,
      available: true 
    });
    
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items by category:", error);
    res.status(500).json({ error: "Failed to fetch menu items by category" });
  }
};

// Get single menu item
export const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findById(id);
    
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    
    res.json(menuItem);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    
     
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: "Invalid menu item ID" });
    }
    
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
};

// Admin endpoints for menu management

// Create new menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, ingredients, dietary, spicyLevel, customizations } = req.body;
    
    // Basic validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: "Required fields missing" });
    }
    
    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl,
      ingredients,
      dietary,
      spicyLevel,
      customizations
    });
    
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Failed to create menu item" });
  }
};

// Update menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    
    res.json(updatedMenuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
     
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: "Invalid menu item ID" });
    }
    
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

// Delete menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findByIdAndDelete(id);
    
    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: "Invalid menu item ID" });
    }
    
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};