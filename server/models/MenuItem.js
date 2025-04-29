import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks']
  },
  imageUrl: { 
    type: String
  },
  ingredients: [{ 
    type: String 
  }],
  dietary: {
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    glutenFree: { type: Boolean, default: false },
  },
  spicyLevel: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  popular: { 
    type: Boolean, 
    default: false 
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  customizations: [{
    name: { type: String },
    options: [{
      name: { type: String },
      priceAdjustment: { type: Number, default: 0 }
    }]
  }]
}, { timestamps: true });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;