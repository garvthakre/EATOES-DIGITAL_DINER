import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity }) => {
  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
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
      
      {/* Cart footer with total and checkout button */}
      <div className="border-t p-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </div>
        
        <button 
          disabled={cartItems.length === 0}
          className={`w-full py-3 rounded-md ${
            cartItems.length === 0 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;