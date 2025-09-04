import React from 'react';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Custom Portrait Drawing",
      price: 299,
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Abstract Canvas Art",
      price: 1499,
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Digital Art Print",
      price: 199,
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Handmade Art Journal",
      price: 399,
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          <button className="text-pink-600 hover:text-pink-700 font-semibold">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
              {product.isBestseller && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 absolute z-10 m-3 rounded">
                  BESTSELLER
                </div>
              )}
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
