import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar with offer */}
      <div className="bg-pink-500 text-white text-center py-2 px-4">
        <p className="text-sm">
          FLAT ₹75 ASSURED CASHBACK ON 1ST MOBIKWIK UPI PAYMENT (MIN ₹399)
        </p>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
              🎨 ArtWithShyz
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">Home</Link>
            <button className="text-gray-700 hover:text-pink-600 transition-colors">Categories</button>
            <button className="text-gray-700 hover:text-pink-600 transition-colors">Collections</button>
            <button className="text-gray-700 hover:text-pink-600 transition-colors">About</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-pink-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Login/Signup Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-pink-600 transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Sign Up
              </Link>
            </div>

            <button className="text-gray-700 hover:text-pink-600 relative transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M19 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden text-gray-700 hover:text-pink-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
