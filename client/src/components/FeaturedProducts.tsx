import React from 'react';

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Custom Portrait Drawing",
      price: 299,
      isBestseller: true,
      image: "https://skyryedesign.com/wp-content/uploads/2024/06/4222193391251403-pin-image.jpg"
    },
    {
      id: 2,
      name: "Abstract Canvas Art",
      price: 1499,
      isBestseller: true,
      image: "https://img.freepik.com/free-photo/digital-art-style-illustration-river-nature_23-2151825727.jpg?t=st=1756626115~exp=1756629715~hmac=d622033bd50f81be196e54e61492d9f888f40ce7313f7987dd0a5d304452f0e9&w=1480"
    },
    {
      id: 3,
      name: "Digital Art Print",
      price: 199,
      isBestseller: true,
      image: "https://img.freepik.com/free-photo/representation-collective-mind-process-concept-digital-art-style_23-2151657790.jpg?t=st=1756626212~exp=1756629812~hmac=2fedf353c72b7322ace4e6964761a0e406da0fb64786e2dff5ee6099e2dd5475&w=1480"
    },
    {
      id: 4,
      name: "Handmade Art Journal",
      price: 399,
      isBestseller: true,
      image: "https://img.freepik.com/free-photo/empty-notepad-painted-frame_23-2148660980.jpg?t=st=1756626324~exp=1756629924~hmac=d3ac07f17f4688bc56a62a1ec583ecf5f17e5afa9c2c220eff310b472535b2fc&w=1480"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Handpicked favorites from our collection</p>
          </div>
          <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 font-semibold transition-colors">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group">
              {product.isBestseller && (
                <div className="bg-red-500 text-white text-xs px-3 py-1 absolute z-10 m-3 rounded-full font-bold">
                  BESTSELLER
                </div>
              )}
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg leading-tight">{product.name}</h3>
                <p className="text-3xl font-bold text-pink-600 mb-4">₹{product.price}</p>
                <button className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition-colors font-semibold">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
