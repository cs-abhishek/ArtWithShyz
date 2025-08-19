import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust badges */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-lg">🚚</span>
              </div>
              <h3 className="font-semibold">Timely Delivery</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-lg">🔒</span>
              </div>
              <h3 className="font-semibold">Secure Payments</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-lg">✨</span>
              </div>
              <h3 className="font-semibold">Assured Quality</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-lg">🇮🇳</span>
              </div>
              <h3 className="font-semibold">Made In India</h3>
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <div className="py-8 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              Hello! I'm Shyz & this is ArtWithShyz - my creative passion project. I've always loved 
              art and creating unique pieces so here we have it! ArtWithShyz� follow us on 
              Instagram @ArtWithShyz💕
            </p>
          </div>
        </div>
      </div>

      {/* Links section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Categories */}
            <div>
              <h4 className="font-bold text-lg mb-4">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {["Paintings", "Digital Art", "Sketches", "Custom Art", "Portraits", "Canvas", "Watercolor", "Art Supplies", "Prints"].map((item) => (
                  <button key={item} className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div>
              <h4 className="font-bold text-lg mb-4">Collections</h4>
              <div className="flex flex-wrap gap-2">
                {["Digital Art", "Canvas Paintings", "Custom Portraits", "Abstract Art", "Art Supplies"].map((item) => (
                  <button key={item} className="text-gray-300 hover:text-pink-400 transition-colors text-sm">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold text-lg mb-4">Help</h4>
              <div className="space-y-2">
                {["Store Policies", "Track your Order", "Return Policy", "Privacy Policy"].map((item) => (
                  <button key={item} className="block text-gray-300 hover:text-pink-400 transition-colors text-sm text-left">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between items-center">
            <div>
              <h3 className="font-bold text-lg mb-2">ArtWithShyz</h3>
              <p className="text-gray-300 text-sm">
                Creative Studio<br />
                Art & Design Hub<br />
                <a href="tel:+91XXXXXXXXXX" className="text-pink-400 hover:text-pink-300">
                  Contact Us
                </a>
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <p className="text-gray-300 text-sm mb-2">We accept</p>
              <div className="flex space-x-2">
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">VISA</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">MasterCard</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">GPay</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">UPI</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">Net Banking</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-xs">Wallet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-900 py-4 text-center text-gray-400 text-sm">
        <p>Built with ❤️ for ArtWithShyz</p>
      </div>
    </footer>
  );
};

export default Footer;
