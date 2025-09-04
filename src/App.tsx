import React from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import FeaturedProducts from './components/FeaturedProducts.tsx';
import Collections from './components/Collections.tsx';
import TrendingCategories from './components/TrendingCategories.tsx';
import ProductOfTheWeek from './components/ProductOfTheWeek.tsx';
import Testimonials from './components/Testimonials.tsx';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <div className="App">
      <Header />
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

export default App;
