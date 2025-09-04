import React from 'react';

const TrendingCategories = () => {
  const categories = [
    { id: 1, name: "Paintings", image: "/images/paintings.png" },
    { id: 2, name: "Digital Art", image: "/images/digital-art.jpg" },
    { id: 3, name: "Sketches", image: "/images/sketches.png" },
    { id: 4, name: "Custom Art", image: "/images/custom-art.png" },
    { id: 5, name: "Portraits", image: "/images/portraits.png" },
    { id: 6, name: "Abstract", image: "/images/abstract.png" },
    { id: 7, name: "Art Prints", image: "/images/prints.png" },
    { id: 8, name: "Canvas", image: "/images/canvas.png" },
    { id: 9, name: "Watercolor", image: "/images/watercolor.png" },
    { id: 10, name: "Art Supplies", image: "/images/supplies.png" }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Trending Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="text-center group cursor-pointer">
              <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center group-hover:bg-pink-100 transition-colors">
                <span className="text-2xl">�</span>
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
