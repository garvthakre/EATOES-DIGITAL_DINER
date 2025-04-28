import React, { useState } from 'react';
import { FaUtensils, FaShoppingCart, FaHistory, FaArrowRight } from 'react-icons/fa';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState('menu');

  const features = [
    {
      id: 'menu',
      title: 'Interactive Menu',
      description: 'Browse our delicious menu items organized by categories',
      icon: <FaUtensils className="text-3xl mb-4 text-amber-500" />
    },
    {
      id: 'cart',
      title: 'Smart Cart',
      description: 'Add items, customize quantities, and preview your order',
      icon: <FaShoppingCart className="text-3xl mb-4 text-amber-500" />
    },
    {
      id: 'history',
      title: 'Order History',
      description: 'View your past orders using your phone number',
      icon: <FaHistory className="text-3xl mb-4 text-amber-500" />
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaUtensils className="text-amber-600 text-xl" />
            <span className="font-bold text-xl text-gray-800">Digital Diner</span>
          </div>
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-amber-600">Menu</button>
            <button className="text-gray-600 hover:text-amber-600">About</button>
            <button className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-400 text-white py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Food Ordering Made Simple
            </h1>
            <p className="text-lg mb-6">
              Browse our menu, add items to your cart, and place your order in minutes!
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-amber-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
                View Menu
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-amber-700">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Featured Menu Items</h3>
                <div className="space-y-2">
                  {['Signature Burger', 'Fresh Salad', 'House Special Pizza'].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{item}</span>
                      <span className="text-amber-600 font-medium">View</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full bg-amber-600 text-white py-3 rounded-md font-semibold hover:bg-amber-700 flex items-center justify-center">
                Start Ordering <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${
                  activeFeature === feature.id 
                    ? 'bg-amber-50 border-2 border-amber-500'
                    : 'bg-white hover:shadow-lg'
                }`}
                onClick={() => setActiveFeature(feature.id)}
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

      {/* About Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">About Digital Diner</h2>
              <p className="text-gray-600 mb-4">
                Digital Diner is a modern restaurant ordering system that makes it easy for 
                customers to browse our menu, add items to their cart, and place pickup orders online.
              </p>
              <p className="text-gray-600 mb-4">
                Our system is built using the MERN stack with PostgreSQL integration, providing 
                a seamless experience for all our customers.
              </p>
              <div className="flex space-x-4">
                <button className="bg-amber-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-amber-700">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h3 className="font-semibold text-gray-800 mb-4 text-center">Technology Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['MongoDB', 'Express', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'].map((tech, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-md text-center">
                      <span className="text-gray-700 font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-amber-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to place your order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get started now and enjoy our delicious food delivered right to your door.
          </p>
          <button className="bg-white text-amber-600 px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100">
            Start Ordering Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <FaUtensils className="text-amber-400" />
                <span className="font-bold text-xl">Digital Diner</span>
              </div>
              <p className="text-gray-400 max-w-xs">
                A modern restaurant ordering system for easy online ordering and pickup.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-amber-400">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-amber-400">Menu</a></li>
                <li><a href="#" className="text-gray-400 hover:text-amber-400">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-amber-400">Order History</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Main Street</li>
                <li>Anytown, USA</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@digitaldiner.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">© 2025 Digital Diner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;