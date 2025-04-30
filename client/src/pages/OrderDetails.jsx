import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  PhoneIcon, 
  CalendarIcon, 
  ClockIcon, 
  ArrowLeftIcon,
  ShoppingBagIcon,
  UserIcon
} from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Format date from ISO to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
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
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={goBack}
            className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 inline-flex items-center"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Order Not Found</h2>
        <p className="mt-2 text-gray-600">The order you're looking for doesn't exist or may have been removed.</p>
        <button 
          onClick={goBack}
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={goBack}
        className="mb-6 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 inline-flex items-center"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Orders
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Order header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Order #{order.id}
            </h1>
            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadgeColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-800">
                  Ordered on: {formatDate(order.order_date)}
                </span>
              </div>
              
              {order.pickup_time && (
                <div className="flex items-center mb-2">
                  <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-800">
                    Pickup time: {formatDate(order.pickup_time)}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center mb-2">
                <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-800">{order.contact_name}</span>
              </div>
              
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-800">{order.contact_phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order items */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            <ShoppingBagIcon className="inline-block h-5 w-5 mr-2" />
            Order Items
          </h2>

          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <div className="grid grid-cols-10 bg-gray-100 p-4 font-medium text-gray-700">
              <div className="col-span-5">Item</div>
              <div className="col-span-1 text-center">Qty</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {order.items && order.items.map((item) => {
              const itemTotal = parseFloat(item.unit_price) * item.quantity;
              
              return (
                <div key={item.id} className="grid grid-cols-10 p-4 border-t border-gray-200">
                  <div className="col-span-5">
                    <div className="font-medium">{item.menu_item_name}</div>
                    {item.special_instructions && (
                      <div className="text-sm text-gray-500 mt-1">
                        Note: {item.special_instructions}
                      </div>
                    )}
                    {item.customizations && (
                      <div className="text-sm text-gray-500 mt-1">
                        {JSON.parse(item.customizations).map((customization, index) => (
                          <div key={index}>
                            {customization.name}: {customization.option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 text-center">{item.quantity}</div>
                  <div className="col-span-2 text-right">${parseFloat(item.unit_price).toFixed(2)}</div>
                  <div className="col-span-2 text-right font-medium">${itemTotal.toFixed(2)}</div>
                </div>
              );
            })}

            <div className="grid grid-cols-10 p-4 border-t border-gray-200 bg-gray-50">
              <div className="col-span-8 text-right font-semibold text-gray-800">Total:</div>
              <div className="col-span-2 text-right font-bold text-indigo-600">
                ${parseFloat(order.total_amount).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;