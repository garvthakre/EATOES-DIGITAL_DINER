import React, { useState } from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity }) => {
  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  // Add state for contact info and checkout status
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  
  // Handle checkout process
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    // Show contact form if not already showing
    if (!showContactForm) {
      setShowContactForm(true);
      return;
    }
    
    // Validate contact info
    if (!contactName.trim() || !contactPhone.trim()) {
      setOrderError('Please provide your name and phone number');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setOrderError('');
      
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          menuItemId: item._id,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions || ''
        })),
        contactName,
        contactPhone,
        // If you have user authentication, you can include userId here
        // userId: currentUser?._id,
        pickupTime: null // You could add a pickup time selector if needed
      };
      
      // Make API call to create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      
      const orderResult = await response.json();
      
      // Handle successful order
      setOrderSuccess(true);
      setOrderId(orderResult.id);
      
      // You might want to clear the cart here or handle that at a higher level
      
    } catch (error) {
      console.error('Checkout error:', error);
      setOrderError(error.message || 'An error occurred during checkout');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Reset the form
  const handleNewOrder = () => {
    setOrderSuccess(false);
    setOrderId(null);
    setContactName('');
    setContactPhone('');
    setShowContactForm(false);
    onClose();
    // You would typically clear the cart here
  };
  
  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-lg transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      {/* Cart header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Order success message */}
      {orderSuccess ? (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-600 mb-2">Order Placed Successfully!</h3>
            <p className="mb-4">Your order number is: <span className="font-bold">{orderId}</span></p>
            <p className="mb-4">We'll send you a notification when your order is ready.</p>
            <button 
              onClick={handleNewOrder}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Place Another Order
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p>Your cart is empty</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item._id} className="py-4">
                    <div className="flex items-center">
                      {/* Item image (small thumbnail) */}
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <span className="text-xs text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Item details */}
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      </div>
                      
                      {/* Quantity controls */}
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Item subtotal */}
                      <div className="ml-4 text-sm font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Contact form when checkout is initiated */}
          {showContactForm && cartItems.length > 0 && (
            <div className="p-4 border-t">
              <h3 className="font-medium mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Error message */}
          {orderError && (
            <div className="px-4 pb-2 text-red-500 text-sm">
              {orderError}
            </div>
          )}
          
          {/* Cart footer with total and checkout button */}
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${totalAmount.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || isSubmitting}
              className={`w-full py-3 rounded-md ${
                cartItems.length === 0 || isSubmitting
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : showContactForm ? "Place Order" : "Proceed to Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;