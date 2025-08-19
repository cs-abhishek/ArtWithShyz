import React from 'react';

const Hero = () => {
  return (
    <section 
      className="relative bg-gradient-to-r from-pink-50 to-purple-50 py-12 min-h-[500px] flex items-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=600&fit=crop&crop=center")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            New Launch!
          </h1>
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
