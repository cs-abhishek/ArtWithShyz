import React from 'react';

const ProductOfTheWeek = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Product of the Week</h2>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="bg-gray-200 h-80 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Custom Art Piece</h3>
              <p className="text-gray-600 mb-6">
                Send your ideas on WhatsApp for custom artwork
                <br /><br />
                (customised art pieces and sizes available, contact for more details�)
              </p>
              <div className="flex items-center space-x-4">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Shop Now
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  WhatsApp Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOfTheWeek;
