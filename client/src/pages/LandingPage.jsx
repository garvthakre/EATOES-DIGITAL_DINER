import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaShoppingCart, FaHistory, FaArrowRight, FaMobileAlt, FaCheckCircle } from 'react-icons/fa';

const LandingPage = () => {
  // Features array to display how the application works
  const features = [
    {
      id: 'menu',
      title: 'Interactive Menu',
      description: 'Browse our delicious menu items with detailed information, dietary preferences, and spice levels.',
      icon: <FaUtensils className="text-3xl mb-4 text-indigo-500" />
    },
    {
      id: 'cart',
      title: 'Smart Cart',
      description: 'Add items, customize quantities, and review your order before checkout.',
      icon: <FaShoppingCart className="text-3xl mb-4 text-indigo-500" />
    },
    {
      id: 'track',
      title: 'Order Tracking',
      description: 'Get real-time updates on your order status from preparation to pickup.',
      icon: <FaHistory className="text-3xl mb-4 text-indigo-500" />
    }
  ];

  // Benefits array to show the advantages of using the system
  const benefits = [
    'Skip the line and order ahead',
    'Easy menu filtering for dietary preferences',
    'Customize your orders to your taste',
    'View your order history anytime',
    'Secure payment processing',
    'Quick pickup notifications'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
       

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Food Ordering <br />Made Simple
            </h1>
            <p className="text-lg mb-8 text-indigo-100 max-w-md">
              Browse our menu, customize your order, and skip the line with our simple digital ordering system.
            </p>
            <div className="flex space-x-4">
              <Link to="/menu" className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition duration-300">
                View Menu
              </Link>
              <Link to="/signup" className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
                Sign Up Free
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex items-center justify-between mb-4 border-b pb-4">
                <h3 className="font-semibold text-gray-800">Today's Specials</h3>
                <span className="text-indigo-600 text-sm font-medium">Updated Daily</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Signature Burger', price: '$12.99', tags: ['Popular'] },
                  { name: 'Garden Fresh Salad', price: '$8.99', tags: ['Vegan'] },
                  { name: 'House Special Pizza', price: '$14.99', tags: ['New'] }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-800 font-medium">{item.name}</span>
                      <div className="flex space-x-2 mt-1">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-indigo-600 font-semibold">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/menu" className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
                Browse Full Menu <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our digital ordering system makes getting your favorite meals quick and convenient
            </p>
          </div>
          
          {/* Steps */}
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-6 justify-between">
            {[
              { number: '01', title: 'Browse Menu', desc: 'Explore our full menu with images and detailed descriptions' },
              { number: '02', title: 'Add to Cart', desc: 'Select your favorite items and customize as needed' },
              { number: '03', title: 'Checkout', desc: 'Provide your contact details and confirm your order' },
              { number: '04', title: 'Pickup', desc: 'Skip the line and pick up your order when it\'s ready' }
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md flex-1 relative hover:shadow-lg transition-shadow duration-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 mt-4">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Digital Diner?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <FaCheckCircle className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
                  Create Free Account
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="bg-indigo-100 rounded-xl p-6 md:p-10 shadow-lg">
                  <div className="bg-white rounded-lg shadow-md p-5 mb-6">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <FaMobileAlt className="text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-800">Mobile Friendly</h4>
                        <p className="text-sm text-gray-600">Order from any device</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/6"></div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="bg-white rounded-lg shadow-md p-4 flex-1">
                      <div className="h-20 bg-gray-100 rounded mb-3"></div>
                      <div className="h-2 bg-gray-100 rounded w-full mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 flex-1">
                      <div className="h-20 bg-gray-100 rounded mb-3"></div>
                      <div className="h-2 bg-gray-100 rounded w-full mb-2"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Easy to Use
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to place your order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-indigo-100">
            Join thousands of satisfied customers who love using Digital Diner for their food orders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/menu" className="bg-white text-indigo-600 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition duration-300">
              Browse Menu
            </Link>
            <Link to="/signup" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-indigo-700 transition duration-300">
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <FaUtensils className="text-indigo-400" />
                <span className="font-bold text-xl">Digital Diner</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                A modern restaurant ordering system for easy online ordering and pickup.
              </p>
              <div className="mt-4 flex space-x-4">
                {/* Social media icons would go here */}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Navigation</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-400 hover:text-indigo-400">Home</Link></li>
                  <li><Link to="/menu" className="text-gray-400 hover:text-indigo-400">Menu</Link></li>
                  <li><a href="#about" className="text-gray-400 hover:text-indigo-400">About</a></li>
                  <li><a href="#how-it-works" className="text-gray-400 hover:text-indigo-400">How It Works</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Account</h3>
                <ul className="space-y-2">
                  <li><Link to="/signup" className="text-gray-400 hover:text-indigo-400">Sign Up</Link></li>
                  <li><Link to="/login" className="text-gray-400 hover:text-indigo-400">Log In</Link></li>
                  <li><Link to="/home" className="text-gray-400 hover:text-indigo-400">My Account</Link></li>
                  <li><span className="text-gray-400">Order History</span></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>BIT DURG</li>
                  <li>Chhattisgarh,India</li>
                  <li>Phone:9691383641</li>
                  <li>Email:garvthakre0@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-6 text-center">
            <p className="text-gray-400">© 2025 Digital Diner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;