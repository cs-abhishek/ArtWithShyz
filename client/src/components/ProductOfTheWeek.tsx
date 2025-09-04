import React from 'react';

const ProductOfTheWeek = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Product of the Week</h2>
          <div className="w-24 h-1 bg-white mx-auto rounded"></div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-80 overflow-hidden rounded-l-lg">
                <img 
                  src="https://images.unsplash.com/photo-1596548438137-d51ea5c83ca4?w=600&h=600&fit=crop&crop=center" 
                  alt="Custom Art Piece"
                  className="w-full h-full object-cover"
                />
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
