import React from 'react';

const Collections = () => {
  const collections = [
    {
      id: 1,
      title: "Under ₹99",
      description: "All the products you can get under ₹99",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop&crop=center",
      bgColor: "from-purple-100 to-pink-100"
    },
    {
      id: 2,
      title: "Canvas Art",
      description: "Beautiful canvas paintings and artwork",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop&crop=center",
      bgColor: "from-green-100 to-blue-100"
    },
    {
      id: 3,
      title: "Custom Art",
      description: "Personalized artwork just for you",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop&crop=center",
      bgColor: "from-yellow-100 to-orange-100"
    },
    {
      id: 4,
      title: "Digital Prints",
      description: "Modern digital art and prints",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=500&h=300&fit=crop&crop=center",
      bgColor: "from-pink-100 to-purple-100"
    },
    {
      id: 5,
      title: "Art Supplies",
      description: "Quality materials for your creativity",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=300&fit=crop&crop=center",
      bgColor: "from-blue-100 to-indigo-100"
    },
    {
      id: 6,
      title: "New Arrivals",
      description: "Fresh artwork added weekly",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=300&fit=crop&crop=center",
      bgColor: "from-red-100 to-pink-100"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Collections</h2>
          <p className="text-gray-600 text-lg">Discover curated art collections for every taste and budget</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {collections.map((collection) => (
            <div 
              key={collection.id} 
              className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br ${collection.bgColor}`}
            >
              <div className="aspect-square p-4 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 mb-4 rounded-full overflow-hidden shadow-md">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{collection.title}</h3>
                <p className="text-gray-700 text-xs leading-tight">{collection.description}</p>
              </div>
              
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
