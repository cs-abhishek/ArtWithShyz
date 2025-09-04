import React, { useState, useEffect } from 'react';
import AdminApp from './admin/AdminApp.tsx';
// import Hero from './components/Hero';
// import FeaturedProducts from './components/FeaturedProducts';
// import Collections from './components/Collections';
// import TrendingCategories from './components/TrendingCategories';
// import ProductOfTheWeek from './components/ProductOfTheWeek';
// import Testimonials from './components/Testimonials';
// import Footer from './components/Footer';

// Inline FeaturedProducts Component
const FeaturedProducts: React.FC<{ 
  addToCart: (product: any) => void; 
  setCurrentView: (view: 'home' | 'login' | 'signup' | 'cart' | 'checkout' | 'collections') => void;
}> = ({ addToCart, setCurrentView }) => {
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
            <div className="relative">
              <h2 className="text-5xl font-bold font-bodoni text-black mb-3">
                Curated Gift Hamper
              </h2>
              <div className="absolute -bottom-1 left-0 w-32 h-1 bg-gradient-to-r from-amber-700 to-yellow-800 rounded-full"></div>
            </div>
            <p className="text-gray-700 font-medium mt-2">Handpicked favorites from our artistic collection</p>
          </div>
          <button 
            onClick={() => setCurrentView('collections')}
            className="bg-gradient-to-r from-red-700 to-red-800 text-white px-10 py-4 rounded-xl hover:from-red-800 hover:to-red-900 font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-red-600"
          >
            View All Collections
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group">
              {product.isBestseller && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold z-10">
                  BESTSELLER
                </div>
              )}
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 text-sm md:text-base">{product.name}</h3>
                <p className="text-2xl font-bold text-amber-700 mb-3">₹{product.price}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-amber-700 to-yellow-800 hover:from-yellow-800 hover:to-amber-900 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-amber-600 hover:border-amber-500"
                >
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

// Inline Collections Component
const Collections = () => {
  const collections = [
    {
      id: 1,
      title: "Digital Art",
      description: "Beautiful digital artwork and prints",
      bgColor: "from-amber-100 to-orange-100",
      image: "https://img.freepik.com/free-photo/side-view-woman-posing-with-parrot_23-2151403733.jpg?t=st=1756626705~exp=1756630305~hmac=37c2cb5f0c3d192919b0ac60ae12caf09c91cfef8ed6739822eaabf78e138c48&w=1480"
    },
    {
      id: 2,
      title: "Canvas Paintings",
      description: "Original canvas paintings and artwork",
      bgColor: "from-yellow-100 to-amber-100",
      image: "https://img.freepik.com/free-photo/graffiti-children-bicycle_1122-2206.jpg?t=st=1756625931~exp=1756629531~hmac=2e77a9ed69f3ed8957710597be04521e410ae68e05fc894778e9ddcc4a9d78a7&w=1480"
    },
    {
      id: 3,
      title: "Custom Portraits",
      description: "Personalized portrait drawings",
      bgColor: "from-orange-100 to-red-100",
      image: "https://img.freepik.com/free-photo/drawings-about-legal-profession_23-2151190641.jpg?t=st=1756626949~exp=1756630549~hmac=8de07c92c7d31380ef5fadbcc2240f0c89c20feb145813036928dc8a4ef657a3&w=1480"
    },
    {
      id: 4,
      title: "Abstract Art",
      description: "Modern abstract art pieces",
      bgColor: "from-amber-100 to-yellow-100",
      image: "https://img.freepik.com/free-vector/watercolor-soft-earth-tones-illustration_23-2151155586.jpg?t=st=1756627045~exp=1756630645~hmac=6791b0e5ea278b01279361a36726fea2077a8e35413e7b923f2f1f62b7c1e91c&w=1480"
    },
    {
      id: 5,
      title: "Art Supplies",
      description: "Quality art supplies and materials",
      bgColor: "from-orange-100 to-amber-100",
      image: "https://img.freepik.com/free-photo/front-view-paint-brushes-cup_23-2148591229.jpg?t=st=1756627123~exp=1756630723~hmac=050f4da0db9586b8c9327689415561623fdab2673f1b44862702c6791a5558ca&w=1480"
    },
    {
      id: 6,
      title: "Watercolor Art",
      description: "Vibrant watercolor paintings and techniques",
      bgColor: "from-blue-100 to-cyan-100",
      image: "https://img.freepik.com/free-vector/sunrise-floral-watercolor-landscape-background_1409-2892.jpg?t=st=1756627173~exp=1756630773~hmac=f6e3aeaf012889fdd89a8e7e1ec1d19a1ba702aac7b4aa55ca37a9a4d2235321&w=1480"
    },
    {
      id: 7,
      title: "Sketches & Drawings",
      description: "Hand-drawn sketches and artistic illustrations",
      bgColor: "from-gray-100 to-slate-100",
      image: "https://img.freepik.com/premium-photo/sketching-illustration_1137879-179829.jpg?w=1480"
    },
    {
      id: 8,
      title: "Oil Paintings",
      description: "Classic oil paintings with rich textures and colors",
      bgColor: "from-emerald-100 to-teal-100",
      image: "https://img.freepik.com/free-photo/digital-art-style-illustration-river-nature_23-2151825741.jpg?t=st=1756627475~exp=1756631075~hmac=928fc1114db298dc286540c94f0dec74dda9f941ada229182013cc7f307a2214&w=1480"
    },
    {
      id: 9,
      title: "Mixed Media Art",
      description: "Creative combinations of different artistic mediums",
      bgColor: "from-purple-100 to-indigo-100",
      image: "https://img.freepik.com/premium-photo/collage-many-retro-tvs-from-which-hand-with-microphone-gun-clapper-syringe-is-sticking_94558-9606.jpg?w=1480"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-6xl font-bold font-bodoni text-black mb-4">
              Customer Favorite
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-amber-700 to-yellow-800 rounded-full"></div>
            <div className="absolute -top-3 left-0 w-16 h-0.5 bg-gradient-to-r from-amber-700 to-transparent rounded-full"></div>
            <div className="absolute -top-3 right-0 w-16 h-0.5 bg-gradient-to-l from-amber-700 to-transparent rounded-full"></div>
          </div>
          <p className="text-gray-700 text-lg font-medium mt-6 max-w-2xl mx-auto">
            Handpicked for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="group cursor-pointer">
              {/* Full Image Card - Taller */}
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              
              {/* Text Outside Card */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors duration-300">{collection.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{collection.description}</p>
                <button className="bg-gradient-to-r from-amber-700 to-yellow-800 text-white px-10 py-4 rounded-xl font-semibold hover:from-yellow-800 hover:to-amber-900 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-amber-600">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Inline TrendingCategories Component
const TrendingCategories = () => {
  const categories = [
    "🎨 Paintings", "💻 Digital Art", "✏️ Sketches", "🎨 Custom Art",
    "👤 Portraits", "🌀 Abstract", "🖼️ Art Prints", "🖌️ Canvas",
    "🎨 Watercolor", "🎭 Art Supplies"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-6xl font-bold font-bodoni text-black mb-4">Trending Categories</h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-amber-700 to-yellow-800 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-amber-300 hover:bg-amber-50">
              <span className="text-lg font-semibold text-gray-800">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Inline SocialMediaSection Component
const SocialMediaSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="space-y-6">
              <div className="relative">
                <h2 className="text-5xl font-bold font-bodoni text-black mb-4">Connect With Us</h2>
                <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-red-900 to-red-700 rounded-full"></div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Follow our artistic journey and stay connected with the latest creations, behind-the-scenes moments, 
                and exclusive art collections. Join our community of art lovers and be the first to discover new pieces, 
                get inspired by our creative process, and connect with fellow art enthusiasts. Share your love for art 
                with us and become part of the ArtWithShyz family!
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-6 pt-4">
                <a 
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="font-semibold">WhatsApp</span>
                </a>
                
                <a 
                  href="https://instagram.com/YOUR_INSTAGRAM_HANDLE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="font-semibold">Instagram</span>
                </a>
              </div>
            </div>
            
            {/* Image Side */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1529943684416-9d29047b809e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXQlMjBza2V0Y2h8ZW58MHx8MHx8fDA%3D" 
                  alt="Beautiful portrait sketch artwork" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-900/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-amber-600/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Inline ProductOfTheWeek Component
const ProductOfTheWeek: React.FC<{ addToCart: (product: any) => void }> = ({ addToCart }) => {
  const weeklyProduct = {
    id: 999,
    name: "Custom Art Piece",
    price: 899,
    image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=600&fit=crop"
  };

  return (
    <section className="py-16 bg-gradient-to-r from-amber-100 to-orange-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h2 className="text-5xl font-bold font-bodoni text-black mb-4">Product of the Week</h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-700 to-yellow-800 rounded-full"></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={weeklyProduct.image} 
                  alt={weeklyProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-bodoni">{weeklyProduct.name}</h3>
              <div className="text-3xl font-bold text-amber-700 mb-4">₹{weeklyProduct.price}</div>
              <p className="text-gray-600 mb-6">
                Send your ideas on WhatsApp for custom artwork
                <br />
                <span className="text-sm">(customised art pieces and sizes available, contact for more details💕)</span>
              </p>
              <div className="space-y-4">
                <button 
                  onClick={() => addToCart(weeklyProduct)}
                  className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  WhatsApp Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Inline Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      initial: "S",
      name: "Sarah",
      title: "Art Collector",
      review: "The custom portrait was absolutely stunning! Shyz captured every detail perfectly. Amazing talent and professionalism! 🎨✨"
    },
    {
      initial: "M",
      name: "Mike",
      title: "Client",
      review: "The digital art piece exceeded my expectations. The colors, composition, everything was perfect. Will definitely order again! 💕"
    },
    {
      initial: "E",
      name: "Emma",
      title: "Customer",
      review: "The abstract canvas painting is now the centerpiece of my living room. Such incredible artistic vision and execution! 🖼️💕"
    },
    {
      initial: "A",
      name: "Alex",
      title: "Art Enthusiast",
      review: "Received my custom art journal and it's absolutely beautiful! The attention to detail is remarkable. Highly recommend! 📚💕"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-6xl font-bold font-bodoni text-black mb-4">What Our Customers Say</h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-amber-700 to-yellow-800 rounded-full"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {testimonial.initial}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{testimonial.review}</p>
              <button className="text-amber-700 font-semibold hover:text-amber-800 transition-colors">
                Shop this Look
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Inline Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">🎨 ArtWithShyz</h3>
            <p className="text-gray-400">Your creative hub for unique art pieces and handcrafted gifts.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Digital Art</a></li>
              <li><a href="#" className="hover:text-white">Canvas Art</a></li>
              <li><a href="#" className="hover:text-white">Custom Portraits</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">WhatsApp</a></li>
              <li><a href="#" className="hover:text-white">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ArtWithShyz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Inline Cart Component
const Cart: React.FC<{ 
  cartItems: any[], 
  updateQuantity: (id: number, quantity: number) => void, 
  removeFromCart: (id: number) => void,
  getCartTotal: () => number,
  setCurrentView: (view: 'home' | 'login' | 'signup' | 'cart' | 'checkout') => void,
  isLoggedIn: boolean,
  setShowLoginModal: (show: boolean) => void
}> = ({ cartItems, updateQuantity, removeFromCart, getCartTotal, setCurrentView, isLoggedIn, setShowLoginModal }) => {
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-bodoni">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some beautiful art pieces to get started!</p>
          <button 
            onClick={() => setCurrentView('home')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => setCurrentView('home')}
        className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 mb-6 font-bodoni font-semibold transition-colors"
      >
        <span className="text-xl">←</span>
        <span>Back to Shopping</span>
      </button>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-8 font-bodoni">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 font-bodoni">{item.name}</h3>
                  <p className="text-amber-600 font-semibold">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                  >
                    -
                  </button>
                  <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bodoni">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold">₹99</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{getCartTotal() + 99}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                if (isLoggedIn) {
                  setCurrentView('checkout');
                } else {
                  setShowLoginModal(true);
                }
              }}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold mt-6 transition-colors"
            >
              {isLoggedIn ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
            <button 
              onClick={() => setCurrentView('home')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold mt-3 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Notification Component
const Toast: React.FC<{ show: boolean, product: any, onClose: () => void }> = ({ show, product, onClose }) => {
  if (!show || !product) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-all duration-300 transform ${
      show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3 max-w-sm border-l-4 border-green-400">
        <div className="flex-shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="font-semibold font-bodoni">Added to Cart! 🎉</div>
          <div className="text-sm opacity-90">{product.name}</div>
          <div className="text-sm opacity-90 font-semibold">₹{product.price}</div>
        </div>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 text-xl font-bold flex-shrink-0 w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Simple inline Login component to avoid import issues
const SimpleLogin: React.FC<{ onLoginSuccess: (userData: any) => void }> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Demo/Mock login - works with any email and password
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email && password) {
        setMessage('✅ Login successful!');
        const mockUser = {
          id: 1,
          name: email.split('@')[0] || 'User',
          email: email
        };
        localStorage.setItem('token', 'demo-token-123');
        // Call parent function to handle login success
        setTimeout(() => {
          onLoginSuccess(mockUser);
        }, 1000);
      } else {
        setMessage('❌ Please enter both email and password');
      }
    } catch (error) {
      setMessage('❌ Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-700">Login to ArtWithShyz</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

// Simple inline Signup component
const SimpleSignup: React.FC<{ onSignupSuccess: (userData: any) => void }> = ({ onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Demo/Mock signup - works with any form data
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (formData.email && formData.password) {
        setMessage('✅ Account created successfully!');
        const mockUser = {
          id: 2,
          name: formData.firstName ? `${formData.firstName} ${formData.lastName || ''}`.trim() : formData.email.split('@')[0],
          email: formData.email
        };
        localStorage.setItem('token', 'demo-token-456');
        // Call parent function to handle signup success
        setTimeout(() => {
          onSignupSuccess(mockUser);
        }, 1000);
      } else {
        setMessage('❌ Please fill in all required fields');
      }
    } catch (error) {
      setMessage('❌ Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-amber-700">Join ArtWithShyz</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Last name"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Create password"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

// Checkout Component
const Checkout: React.FC<{ 
  cartItems: any[], 
  getCartTotal: () => number,
  setCurrentView: (view: 'home' | 'login' | 'signup' | 'cart' | 'checkout') => void,
  user: any,
  onPlaceOrder: (orderData: any) => void
}> = ({ cartItems, getCartTotal, setCurrentView, user, onPlaceOrder }) => {
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'razorpay'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    return required.every(field => formData[field as keyof typeof formData]?.trim());
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: cartItems,
        total: getCartTotal() + 99, // Including shipping
        shipping: 99,
        subtotal: getCartTotal(),
        customerInfo: formData,
        orderId: `ORDER_${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call parent function to handle order placement and Razorpay integration
      onPlaceOrder(orderData);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-bodoni">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some beautiful art pieces to get started!</p>
          <button 
            onClick={() => setCurrentView('home')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={() => setCurrentView('cart')}
        className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 mb-6 font-bodoni font-semibold transition-colors"
      >
        <span className="text-xl">←</span>
        <span>Back to Cart</span>
      </button>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-8 font-bodoni">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 font-bodoni">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 font-bodoni">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter complete address"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select State</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{6}"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Enter PIN code"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 font-bodoni">Payment Method</h2>
              <div className="space-y-3">
                <div className="flex items-center p-4 border border-amber-200 rounded-lg bg-amber-50">
                  <input
                    type="radio"
                    id="razorpay"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === 'razorpay'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <label htmlFor="razorpay" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <div className="text-2xl">💳</div>
                    <div>
                      <div className="font-semibold text-gray-900">Pay with Razorpay</div>
                      <div className="text-sm text-gray-600">UPI, Cards, Net Banking, Wallets</div>
                    </div>
                  </label>
                  <div className="text-green-600 font-semibold text-sm">Recommended</div>
                </div>
                
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <label htmlFor="cod" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <div className="text-2xl">💰</div>
                    <div>
                      <div className="font-semibold text-gray-900">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive your order</div>
                    </div>
                  </label>
                  <div className="text-amber-600 font-semibold text-sm">+₹50 COD charges</div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4 font-bodoni">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                <span className="font-semibold">₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold">₹99</span>
              </div>
              {formData.paymentMethod === 'cod' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">COD Charges:</span>
                  <span className="font-semibold">₹50</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{getCartTotal() + 99 + (formData.paymentMethod === 'cod' ? 50 : 0)}</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button 
              onClick={handlePlaceOrder}
              disabled={isProcessing || !validateForm()}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-semibold mt-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Place Order - ₹${getCartTotal() + 99 + (formData.paymentMethod === 'cod' ? 50 : 0)}`}
            </button>

            {/* Security Info */}
            <div className="mt-4 text-xs text-gray-500 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span>🔒</span>
                <span>Secure SSL Encrypted Payment</span>
              </div>
              <p>Your payment information is safe and secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup' | 'cart' | 'checkout' | 'collections' | 'admin'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState<any>(null);
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orderData, setOrderData] = useState<any>(null);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Promotional messages
  const promoMessages = [
    "Free shipping on all orders above Rs. 999 - Shop your favorite artworks with no extra delivery charges",
    "Discover unique handcrafted art pieces created with passion - New collections added every week just for you",
    "Original artwork by Shyz - Each piece tells a story and brings life to your space with authentic creativity",
    "Perfect gifts for art enthusiasts and home decorators - Surprise your loved ones with meaningful artistic treasures"
  ];

  // Navigate promotional messages
  const nextPromo = React.useCallback(() => {
    setCurrentPromoIndex(prev => (prev + 1) % promoMessages.length);
  }, [promoMessages.length]);

  const prevPromo = React.useCallback(() => {
    setCurrentPromoIndex(prev => (prev - 1 + promoMessages.length) % promoMessages.length);
  }, [promoMessages.length]);

  // Rotate promotional messages
  useEffect(() => {
    const promoInterval = setInterval(() => {
      nextPromo();
    }, 4000);
    return () => clearInterval(promoInterval);
  }, [nextPromo]);

  // Hero carousel images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Artistic Masterpiece",
      subtitle: "Discover unique art that transforms spaces"
    },
    {
      url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1466&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Creative Art Studio",
      subtitle: "Where imagination meets artistic expression"
    },
    {
      url: "https://images.unsplash.com/photo-1456086272160-b28b0645b729?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Art Gallery Collection",
      subtitle: "Curated artworks for discerning collectors"
    },
    {
      url: "https://images.unsplash.com/photo-1579541591970-e5780dc6b31f?q=80&w=2086&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Handcrafted Artworks",
      subtitle: "Original pieces crafted with passion and skill"
    }
  ];

  const nextHeroSlide = React.useCallback(() => {
    setCurrentHeroIndex(prev => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  const prevHeroSlide = React.useCallback(() => {
    setCurrentHeroIndex(prev => (prev - 1 + heroImages.length) % heroImages.length);
  }, [heroImages.length]);

  // Auto-advance hero carousel
  useEffect(() => {
    const heroInterval = setInterval(nextHeroSlide, 5000);
    return () => clearInterval(heroInterval);
  }, [nextHeroSlide]);

  // Hero Component
  const Hero = () => (
    <section className="relative py-20 min-h-[700px] flex items-center overflow-hidden">
      {/* Carousel Images */}
      <div className="absolute inset-0 z-0 flex">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(${(index - currentHeroIndex) * 100}%)`
            }}
          >
            <img 
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-red-800/40"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevHeroSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
        aria-label="Previous image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextHeroSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
        aria-label="Next image"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentHeroIndex 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl font-bodoni">
            ArtWithShyz
          </h1>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6 shadow-lg">
            New Launch!
          </div>
          <p className="text-lg md:text-xl text-white mb-8 drop-shadow-lg max-w-2xl mx-auto">
            {heroImages[currentHeroIndex].subtitle}
            <br />
            Discover Amazing Art @ArtWithShyz
          </p>
          <button className="bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white px-12 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border border-red-600 hover:border-red-500">
            Start Shopping
          </button>
        </div>
      </div>
    </section>
  );

  // Collections Page Component
  const CollectionsPage = () => {
    const giftHampers = [
      {
        id: 201,
        name: "Romantic Art Collection",
        price: 2999,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&auto=format&fit=crop",
        category: "Couples",
        description: "Perfect romantic art pieces for couples - includes 3 paintings and a handwritten card",
        items: ["Heart Canvas Art", "Love Quote Calligraphy", "Couple Portrait Sketch"]
      },
      {
        id: 202,
        name: "Nature Lover's Bundle",
        price: 2499,
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&auto=format&fit=crop",
        category: "Nature",
        description: "Beautiful nature-themed artwork collection with 4 pieces",
        items: ["Forest Landscape", "Mountain Watercolor", "Flower Painting", "Wildlife Sketch"]
      },
      {
        id: 203,
        name: "Abstract Art Starter Kit",
        price: 3499,
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&auto=format&fit=crop",
        category: "Abstract",
        description: "Complete abstract art collection for modern homes",
        items: ["Large Abstract Canvas", "Color Study Prints", "Geometric Art", "Paint Palette Art"]
      },
      {
        id: 204,
        name: "Spiritual Art Collection",
        price: 1999,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop",
        category: "Spiritual",
        description: "Peaceful spiritual artwork for meditation spaces",
        items: ["Buddha Painting", "Mandala Art", "Om Calligraphy", "Zen Garden Print"]
      },
      {
        id: 205,
        name: "Kids Art Bundle",
        price: 1599,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        category: "Kids",
        description: "Fun and colorful art perfect for children's rooms",
        items: ["Animal Cartoon Art", "Rainbow Painting", "Alphabet Art", "Number Art"]
      },
      {
        id: 206,
        name: "Vintage Art Collection",
        price: 3999,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        category: "Vintage",
        description: "Classic vintage-style artworks for traditional homes",
        items: ["Vintage Portrait", "Antique Map Art", "Classic Landscape", "Heritage Calligraphy"]
      },
      {
        id: 207,
        name: "Minimalist Set",
        price: 2199,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        category: "Minimalist",
        description: "Clean and simple art for modern minimalist spaces",
        items: ["Line Art Print", "Minimal Landscape", "Simple Typography", "Geometric Shapes"]
      },
      {
        id: 208,
        name: "Festive Celebration Pack",
        price: 2799,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        category: "Festive",
        description: "Special occasion artwork for celebrations and festivals",
        items: ["Festival Colors", "Celebration Art", "Party Theme Print", "Joy Painting"]
      }
    ];

    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Couples', 'Nature', 'Abstract', 'Spiritual', 'Kids', 'Vintage', 'Minimalist', 'Festive'];

    const filteredHampers = selectedCategory === 'All' 
      ? giftHampers 
      : giftHampers.filter(hamper => hamper.category === selectedCategory);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <button 
              onClick={() => setCurrentView('home')}
              className="mb-6 text-red-700 hover:text-red-800 font-semibold flex items-center mx-auto"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            <h1 className="text-6xl font-bold font-bodoni text-black mb-4">Curated Gift Hampers</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-red-700 to-red-800 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Thoughtfully curated art collections perfect for gifting to your loved ones
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-red-700 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-700 shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gift Hampers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHampers.map((hamper) => (
              <div key={hamper.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={hamper.image} 
                    alt={hamper.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-700 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Gift Hamper
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-white text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                      {hamper.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-bodoni">{hamper.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{hamper.description}</p>
                  
                  {/* Items in Hamper */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Includes:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {hamper.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-red-700 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-700">₹{hamper.price}</span>
                    <button 
                      onClick={() => addToCart(hamper)}
                      className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredHampers.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No gift hampers found in this category.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Cart functions
  const addToCart = (product: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    // Clear existing timeout
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    
    // Show toast notification
    setToastProduct(product);
    setShowToast(true);
    const newTimeout = setTimeout(() => {
      setShowToast(false);
    }, 3000) as NodeJS.Timeout; // Hide after 3 seconds
    setToastTimeout(newTimeout);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const closeToast = () => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      setToastTimeout(null);
    }
    setShowToast(false);
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setCurrentView('home');
  };

  const handleSignupSuccess = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setCurrentView('home');
  };

  const handleShowLogin = () => {
    setShowLoginModal(true);
  };

  const handlePlaceOrder = (orderData: any) => {
    setOrderData(orderData);
    
    // Here we'll integrate with Razorpay
    if (orderData.customerInfo.paymentMethod === 'razorpay') {
      initiateRazorpayPayment(orderData);
    } else {
      // COD order
      processCODOrder(orderData);
    }
  };

  const initiateRazorpayPayment = (orderData: any) => {
    // TODO: Add your Razorpay integration here
    // Example Razorpay integration:
    /*
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Enter the Key ID generated from the Dashboard
      amount: orderData.total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "ArtWithShyz",
      description: "Art Purchase",
      image: "/logo.png",
      order_id: orderData.orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // Handle successful payment
        alert("Payment successful!");
        setCartItems([]); // Clear cart
        setCurrentView('home');
      },
      prefill: {
        name: orderData.customerInfo.firstName + " " + orderData.customerInfo.lastName,
        email: orderData.customerInfo.email,
        contact: orderData.customerInfo.phone
      },
      notes: {
        address: orderData.customerInfo.address
      },
      theme: {
        color: "#D97706" // Amber color to match your theme
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response){
      alert("Payment failed!");
      console.log(response);
    });
    rzp.open();
    */
    
    // For now, showing alert for demo (remove this when you add actual Razorpay integration)
    alert(`Razorpay integration will be added here!\nOrder ID: ${orderData.orderId}\nAmount: ₹${orderData.total}\n\nCustomer: ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}\nEmail: ${orderData.customerInfo.email}`);
    
    // Simulate successful payment for demo
    setTimeout(() => {
      alert('Payment successful! Order placed successfully.');
      setCartItems([]); // Clear cart
      setCurrentView('home');
    }, 2000);
  };

  const processCODOrder = (orderData: any) => {
    // Process COD order
    alert(`COD Order placed successfully!\nOrder ID: ${orderData.orderId}\nAmount: ₹${orderData.total}\n\nYou will receive a confirmation call within 24 hours.`);
    setCartItems([]); // Clear cart
    setCurrentView('home');
  };

  // Promotional Strip Component
  const PromoStrip = () => (
    <div className="bg-red-900 text-white py-2 overflow-hidden border-b border-white border-opacity-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={prevPromo}
            className="text-white hover:text-red-200 transition-colors p-1 flex-shrink-0"
            aria-label="Previous promotion"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex-1 text-center px-8">
            <p 
              key={currentPromoIndex}
              className="text-sm font-medium animate-slide-in"
            >
              {promoMessages[currentPromoIndex]}
            </p>
          </div>
          
          <button 
            onClick={nextPromo}
            className="text-white hover:text-red-200 transition-colors p-1 flex-shrink-0"
            aria-label="Next promotion"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // Main Website Header Component
  const WebsiteHeader = () => (
    <header className="bg-red-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => setCurrentView('home')}>
            <div className="bg-white rounded-lg p-2 shadow-lg border-2 border-red-200 overflow-hidden">
              <img src="/logo.png" alt="ArtWithShyz Logo" className="w-44 h-24 object-cover hover:scale-110 transition-transform duration-200" />
            </div>
          </button>
          
          {/* Search Icon and Input */}
          <div className="flex items-center space-x-2">
            {showSearch ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1 rounded text-gray-900 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-red-300"
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      console.log('Searching for:', searchQuery);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery('');
                  }}
                  className="text-white hover:text-red-200 transition-colors"
                  aria-label="Close search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-red-200 transition-colors p-2"
                aria-label="Search products"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => setCurrentView('home')}
              className={`font-bodoni font-semibold transition-colors ${
                currentView === 'home' ? 'text-red-200' : 'text-white hover:text-red-200'
              }`}
            >
              Home
            </button>
            <a href="#" className="text-white hover:text-red-200 font-bodoni font-semibold transition-colors">Shop</a>
            <a href="#" className="text-white hover:text-red-200 font-bodoni font-semibold transition-colors">About</a>
            <a href="#" className="text-white hover:text-red-200 font-bodoni font-semibold transition-colors">Contact</a>
          </nav>
          <button 
            onClick={() => setCurrentView('cart')}
            className="relative text-white hover:text-red-200 transition-colors p-2"
          >
            <span className="text-2xl">🛒</span>
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </button>
          {/* Admin Access Button - For Demo, always show when logged in */}
          {isLoggedIn && (
            <button 
              onClick={() => setCurrentView('admin')}
              className="relative text-white hover:text-red-200 transition-colors p-2"
              title="Admin Panel"
            >
              <span className="text-2xl">⚙️</span>
            </button>
          )}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user?.name || 'User'}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleShowLogin}
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );

  // Login Modal Component
  const LoginModal = () => {
    if (!showLoginModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
          <button
            onClick={() => setShowLoginModal(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
          
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-amber-700">Join ArtWithShyz</h2>
              <p className="text-gray-600">Login or create an account to continue</p>
            </div>
            
            <button
              onClick={() => {
                setCurrentView('login');
                setShowLoginModal(false);
              }}
              className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 font-semibold"
            >
              Login to Existing Account
            </button>
            
            <button
              onClick={() => {
                setCurrentView('signup');
                setShowLoginModal(false);
              }}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 font-semibold"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main App Return - Always show the website first
  return (
    <div className="min-h-screen bg-white">
      {/* Promotional Strip */}
      <PromoStrip />
      {/* Website Header */}
      <WebsiteHeader />

      {/* Main Content */}
      {currentView === 'home' && (
        <>
          <Hero />
          <FeaturedProducts addToCart={addToCart} setCurrentView={setCurrentView} />
          <Collections />
          <TrendingCategories />
          <SocialMediaSection />
          <ProductOfTheWeek addToCart={addToCart} />
          <Testimonials />
          <Footer />
        </>
      )}
      
      {currentView === 'cart' && (
        <Cart 
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          getCartTotal={getCartTotal}
          setCurrentView={setCurrentView}
          isLoggedIn={isLoggedIn}
          setShowLoginModal={setShowLoginModal}
        />
      )}

      {currentView === 'checkout' && (
        <Checkout 
          cartItems={cartItems}
          getCartTotal={getCartTotal}
          setCurrentView={setCurrentView}
          user={user}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {currentView === 'collections' && (
        <CollectionsPage />
      )}

      {currentView === 'admin' && (
        <AdminApp onLogout={() => setCurrentView('home')} />
      )}

      {/* Login/Signup Views - Full Page */}
      {(currentView === 'login' || currentView === 'signup') && (
        <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <button 
                onClick={() => setCurrentView('home')}
                className="text-amber-600 hover:text-amber-700 mb-4 flex items-center mx-auto"
              >
                ← Back to Website
              </button>
            </div>
            
            {currentView === 'login' && <SimpleLogin onLoginSuccess={handleLoginSuccess} />}
            {currentView === 'signup' && <SimpleSignup onSignupSuccess={handleSignupSuccess} />}
            
            <div className="mt-6 text-center">
              {currentView === 'login' ? (
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setCurrentView('signup')}
                    className="text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    Sign up here
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setCurrentView('login')}
                    className="text-amber-600 hover:text-amber-700 font-semibold"
                  >
                    Login here
                  </button>
                </p>
              )}
            </div>
            
            {/* Demo Status */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <div className="bg-green-50 text-green-700 p-3 rounded-md">
                <p className="font-semibold">🧪 Demo Mode Active</p>
                <p>Login/Signup works with any email and password!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal />

      {/* Toast Notification */}
      <Toast 
        show={showToast} 
        product={toastProduct} 
        onClose={closeToast} 
      />
    </div>
  );
}

export default App;
