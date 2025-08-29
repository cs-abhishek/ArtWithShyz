import React from 'react';

const TrendingCategories = () => {
  const categories = [
    { 
      id: 1, 
      name: "Paintings", 
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop&crop=center" 
    },
    { 
      id: 2, 
      name: "Digital Art", 
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=300&fit=crop&crop=center" 
    },
    { 
      id: 3, 
      name: "Sketches", 
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=300&fit=crop&crop=center" 
    },
    { 
      id: 4, 
      name: "Custom Art", 
      image: "https://images.unsplash.com/photo-1596548438137-d51ea5c83ca4?w=300&h=300&fit=crop&crop=center" 
    },
    { 
      id: 5, 
      name: "Portraits", 
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop&crop=center" 
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Trending Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="text-center group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 mb-4">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCategories;
