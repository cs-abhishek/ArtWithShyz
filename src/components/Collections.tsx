import React from 'react';

const Collections = () => {
  const collections = [
    {
      id: 1,
      title: "Digital Art",
      description: "Beautiful digital artwork and prints",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Canvas Paintings",
      description: "Original canvas paintings and artwork",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Custom Portraits",
      description: "Personalized portrait drawings",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Abstract Art",
      description: "Modern abstract art pieces",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Art Supplies",
      description: "Quality art supplies and materials",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Explore Collections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div key={collection.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
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
