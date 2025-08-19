import React from 'react';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Custom Portrait Drawing",
      price: 299,
      isBestseller: true,
      image: "/images/portrait.jpg"
    },
    {
      id: 2,
      name: "Abstract Canvas Art",
      price: 1499,
      isBestseller: true,
      image: "/images/abstract-art.jpg"
    },
    {
      id: 3,
      name: "Digital Art Print",
      price: 199,
      isBestseller: true,
      image: "/images/digital-print.jpg"
    },
    {
      id: 4,
      name: "Handmade Art Journal",
      price: 399,
      isBestseller: true,
      image: "/images/art-journal.jpg"
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
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {product.isBestseller && (
                <div className="bg-red-500 text-white text-xs px-2 py-1 absolute z-10 m-3 rounded">
                  BESTSELLER
                </div>
              )}
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">Image</span>
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
