import React, { useState } from 'react';
// import Hero from './components/Hero';
// import FeaturedProducts from './components/FeaturedProducts';
// import Collections from './components/Collections';
// import TrendingCategories from './components/TrendingCategories';
// import ProductOfTheWeek from './components/ProductOfTheWeek';
// import Testimonials from './components/Testimonials';
// import Footer from './components/Footer';

// Inline Hero Component
const Hero = () => {
  return (
    <section className="relative py-16 min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&h=900&fit=crop" 
          alt="Art Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-orange-50 opacity-90"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            ArtWithShyz
          </h1>
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
            ✨ New Launch!
          </div>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            ArtWithShyz is a creative hub for unique art pieces and handcrafted gifts💕
            <br />
            Discover Amazing Art💕@ArtWithShyz
          </p>
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Shop now😽
          </button>
        </div>
      </div>
    </section>
  );
};

// Inline FeaturedProducts Component
const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Custom Portrait Drawing",
      price: 299,
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=faces"
    },
    {
      id: 2,
      name: "Abstract Canvas Art",
      price: 1499,
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Digital Art Print",
      price: 199,
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Handmade Art Journal",
      price: 399,
      isBestseller: true,
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center"
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
          <button className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 font-semibold transition-colors">
            View All
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
                <p className="text-2xl font-bold text-amber-700">₹{product.price}</p>
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
      image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Canvas Paintings",
      description: "Original canvas paintings and artwork",
      bgColor: "from-yellow-100 to-amber-100",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Custom Portraits",
      description: "Personalized portrait drawings",
      bgColor: "from-orange-100 to-red-100",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Abstract Art",
      description: "Modern abstract art pieces",
      bgColor: "from-amber-100 to-yellow-100",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Art Supplies",
      description: "Quality art supplies and materials",
      bgColor: "from-orange-100 to-amber-100",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">Explore Collections</h2>
        <p className="text-center text-gray-600 mb-12">Discover art in every category</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div key={collection.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.bgColor} opacity-80`}></div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{collection.title}</h3>
                <p className="text-gray-700 mb-6">{collection.description}</p>
                <button className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
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
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Trending Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-amber-200">
              <span className="text-lg font-semibold text-gray-800">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Inline ProductOfTheWeek Component
const ProductOfTheWeek = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-100 to-orange-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Product of the Week</h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=600&fit=crop" 
                  alt="Custom Art Piece"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Custom Art Piece</h3>
              <p className="text-gray-600 mb-6">
                Send your ideas on WhatsApp for custom artwork
                <br />
                <span className="text-sm">(customised art pieces and sizes available, contact for more details💕)</span>
              </p>
              <div className="space-y-4">
                <button className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                  Shop Now
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
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What our customers say</h2>
        
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

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleSignupSuccess = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setCurrentView('home');
  };

  // If user is logged in, show the full homepage
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header for logged in users */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo.png" alt="ArtWithShyz Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name || 'User'}!</span>
              <button
                onClick={handleLogout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Full Homepage Content */}
        <Hero />
        <FeaturedProducts />
        <Collections />
        <TrendingCategories />
        <ProductOfTheWeek />
        <Testimonials />
        <Footer />
      </div>
    );
  }

  // If user is not logged in, show login/signup interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="ArtWithShyz Logo" className="w-32 h-32 object-contain" />
          </div>
          <nav className="space-x-4">
            <button 
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded ${currentView === 'home' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-100'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentView('login')}
              className={`px-4 py-2 rounded ${currentView === 'login' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-100'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setCurrentView('signup')}
              className={`px-4 py-2 rounded ${currentView === 'signup' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-100'}`}
            >
              Sign Up
            </button>
          </nav>
        </div>

        {/* Content */}
        {currentView === 'home' && (
          <div className="text-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Welcome to ArtWithShyz!</h2>
              <p className="text-gray-600 mb-6">Your one-stop destination for amazing artwork and creative services.</p>
              <div className="space-y-4">
                <button 
                  onClick={() => setCurrentView('login')}
                  className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700"
                >
                  Login to Your Account
                </button>
                <button 
                  onClick={() => setCurrentView('signup')}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700"
                >
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'login' && <SimpleLogin onLoginSuccess={handleLoginSuccess} />}
        {currentView === 'signup' && <SimpleSignup onSignupSuccess={handleSignupSuccess} />}

        {/* Demo Status */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <div className="bg-green-50 text-green-700 p-3 rounded-md max-w-md mx-auto">
            <p className="font-semibold">🧪 Demo Mode Active</p>
            <p>Login/Signup works with any email and password!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
