import React from 'react';

const MenuItemCard = ({ item, addToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
          <span className="font-bold text-indigo-600">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {item.dietary?.vegetarian && (
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Vegetarian</span>
          )}
          {item.dietary?.vegan && (
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Vegan</span>
          )}
          {item.dietary?.glutenFree && (
            <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Gluten-Free</span>
          )}
          {item.spicyLevel > 0 && (
            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
              Spicy {Array(item.spicyLevel).fill('🌶️').join('')}
            </span>
          )}
        </div>
        
        <button 
          onClick={() => addToCart(item)}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;