import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Filter only items marked as "isNew"
  const newArrivals = products.filter(p => p.isNew).slice(0, 3);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. The Interaction Hero */}
      <Hero />

      {/* 2. Featured Collection */}
      <section className="py-32 px-6 bg-obsidian relative z-10">
        <div className="container mx-auto">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium block mb-4">
                Selected Works
              </span>
              <h2 className="text-4xl md:text-6xl font-serif italic text-bone">
                New Arrivals
              </h2>
            </div>

            <Link to="/collections" className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ash hover:text-white transition-colors group cursor-pointer">
              View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mobile 'View All' Link */}
          <div className="mt-16 md:hidden text-center">
            <Link to="/collections" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ash hover:text-white transition-colors">
              View All Collections <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;