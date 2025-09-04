import React from 'react';

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
            <h1 className="text-2xl font-bold text-pink-600">
              � ArtWithShyz
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <button className="text-gray-700 hover:text-pink-600">Home</button>
            <button className="text-gray-700 hover:text-pink-600">Categories</button>
            <button className="text-gray-700 hover:text-pink-600">Collections</button>
            <button className="text-gray-700 hover:text-pink-600">About</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-pink-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-pink-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-pink-600 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M19 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
