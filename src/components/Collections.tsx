import React from 'react';

const Collections = () => {
  const collections = [
    {
      id: 1,
      title: "Digital Art",
      description: "Beautiful digital artwork and prints",
      image: "/images/digital-art.png"
    },
    {
      id: 2,
      title: "Canvas Paintings",
      description: "Original canvas paintings and artwork",
      image: "/images/canvas.png"
    },
    {
      id: 3,
      title: "Custom Portraits",
      description: "Personalized portrait drawings",
      image: "/images/portraits.png"
    },
    {
      id: 4,
      title: "Abstract Art",
      description: "Modern abstract art pieces",
      image: "/images/abstract.png"
    },
    {
      id: 5,
      title: "Art Supplies",
      description: "Quality art supplies and materials",
      image: "/images/supplies.png"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Explore Collections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 h-48 flex items-center justify-center">
                <span className="text-gray-500">Collection Image</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{collection.title}</h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>
                <button className="text-pink-600 hover:text-pink-700 font-semibold">
                  Shop Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
