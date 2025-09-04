import React from 'react';

const Hero = () => {
  return (
    <section 
      className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-12 min-h-[500px] flex items-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=600&fit=crop&crop=center")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            ArtWithShyz
          </h1>
          <div className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
            ✨ New Launch!
          </div>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            ArtWithShyz is a creative hub for unique art pieces and handcrafted gifts�
            <br />
            Discover Amazing Art💕@ArtWithShyz
          </p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Shop now😽
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
