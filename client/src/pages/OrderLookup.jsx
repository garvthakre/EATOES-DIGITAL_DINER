import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneIcon, SearchIcon, ClockIcon, CalendarIcon, CreditCardIcon } from 'lucide-react';

const OrderLookup = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  // Phone number formatter
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    
    // Remove all non-digits
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Apply formatting based on length
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  // Format date from ISO to readable format
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge color based on order status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle phone input changes
  const handlePhoneChange = (e) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedNumber);
  };

  // Fetch orders for the entered phone number
  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Remove formatting before sending to API
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Use the correct URL format as specified in your orderRoutes.js
      const response = await fetch(`/api/orders/phone/${cleanPhone}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Orders fetched:', data); // For debugging
      setOrders(data);
      setSearched(true);
      
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message || 'An error occurred while fetching orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // View details of a specific order
  const viewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find Your Orders</h1>
      
      {/* Phone number search form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Enter your phone number</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="555-123-4567"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              maxLength={12}
            />
          </div>
          
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </span>
            ) : (
              <span className="flex items-center">
                <SearchIcon className="mr-2 h-5 w-5" />
                Find Orders
              </span>
            )}
          </button>
        </form>
      </div>
      
      {/* Search results */}
      {searched && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {orders.length > 0 
              ? `Orders for ${phoneNumber}` 
              : 'No orders found'
            }
          </h2>
          
          {orders.length === 0 && searched ? (
            <div className="text-center py-6">
              <p className="text-gray-500">No orders were found for this phone number.</p>
              <p className="text-gray-500 mt-2">Please check the number and try again.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm text-gray-500">Order #{order.id}</span>
                      <h3 className="font-medium">{order.contact_name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      {formatDate(order.order_date)}
                    </div>
                    
                    {order.pickup_time && (
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        Pickup: {formatDate(order.pickup_time)}
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <CreditCardIcon className="mr-1 h-4 w-4" />
                      ${parseFloat(order.total_amount).toFixed(2)}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => viewOrderDetails(order.id)}
                    className="w-full mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Order Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderLookup;