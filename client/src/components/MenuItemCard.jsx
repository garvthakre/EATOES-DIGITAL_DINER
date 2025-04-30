import React from 'react';

const MenuItemCard = ({ item, addToCart }) => {
  
  const getBadgeStyle = (type) => {
    switch(type) {
      case 'vegetarian':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'vegan':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'glutenFree':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'spicy':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  
  const renderSpicyIndicator = (level) => {
    if (level <= 0) return null;
    
  
    const peppers = Array(level).fill('🌶️').join('');
    
    return (
      <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getBadgeStyle('spicy')}`}>
        <span className="font-medium">Spicy</span> {peppers}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 relative group">
 
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      
    
      <div className="relative h-48 overflow-hidden">
        {item.imageUrl ? (
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
        )}
        
      
        <div className="absolute top-3 right-3">
          <div className="bg-white px-3 py-1 rounded-full shadow-md text-indigo-600 font-bold">
            ${item.price.toFixed(2)}
          </div>
        </div>
      </div>
      
    
      <div className="p-5">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{item.name}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{item.description}</p>
        
        
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[28px]">
          {item.dietary?.vegetarian && (
            <span className={`px-2 py-1 text-xs rounded-full border ${getBadgeStyle('vegetarian')}`}>Vegetarian</span>
          )}
          {item.dietary?.vegan && (
            <span className={`px-2 py-1 text-xs rounded-full border ${getBadgeStyle('vegan')}`}>Vegan</span>
          )}
          {item.dietary?.glutenFree && (
            <span className={`px-2 py-1 text-xs rounded-full border ${getBadgeStyle('glutenFree')}`}>Gluten-Free</span>
          )}
          {item.spicyLevel > 0 && renderSpicyIndicator(item.spicyLevel)}
        </div>
        
         
        <button 
          onClick={() => addToCart(item)}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Cart
          </span>
          <div className="absolute inset-0 h-full w-0 bg-white bg-opacity-10 transition-all duration-300 group-hover:w-full"></div>
        </button>
      </div>
    </div>
  );
};

export default MenuItemCard;