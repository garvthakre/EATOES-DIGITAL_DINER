import React, { useState, useEffect } from 'react';
import MenuItemCard from '../components/MenuItemCard';
import CartSidebar from '../components/CartSidebar';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch menu categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/menu/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load menu categories');
      }
    };

    fetchCategories();
  }, []);

  // Fetch menu items (all or by category)
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        let url = '/api/menu';
        
        if (selectedCategory) {
          url = `/api/menu/category/${selectedCategory}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to load menu items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedCategory]);

  // Add item to cart
  const addToCart = (item) => {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
    
    if (existingItemIndex !== -1) {
      // If item exists, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If item doesn't exist, add with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    // Remove this line to prevent automatic cart opening
    // setIsCartOpen(true);
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // Remove item if quantity is less than 1
      setCart(cart.filter(item => item._id !== itemId));
    } else {
      // Update quantity
      setCart(cart.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating cart button */}
      {!isCartOpen && cartItemsCount > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
        >
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {cartItemsCount}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      )}

      {/* Cart sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        updateQuantity={updateCartItemQuantity}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
        
        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === null 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Loading and error states */}
        {isLoading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Menu items grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.length > 0 ? (
              menuItems.map(item => (
                <MenuItemCard 
                  key={item._id} 
                  item={item} 
                  addToCart={addToCart} 
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No menu items available in this category
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;