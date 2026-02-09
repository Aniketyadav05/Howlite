import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedCollection = () => {
  return (
    <section className="py-40 bg-[#080808] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#9E8E76]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Header: Editorial Split */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10 border-b border-white/5 pb-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-[#9E8E76] text-[10px] uppercase tracking-[0.3em] font-medium">
              Curated Selection
            </span>
            <h2 className="text-5xl md:text-6xl font-serif text-[#E0E0E0] font-light leading-none">
              The Collection
            </h2>
          </div>

          <Link 
            to="/collections" 
            className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[#888] hover:text-white transition-colors pb-2"
          >
            <span>View Full Archive</span>
            <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center group-hover:border-white/50 transition-colors">
              <ArrowRight size={12} className="group-hover:-rotate-45 transition-transform duration-500" />
            </div>
          </Link>
        </div>

        {/* The Grid: Spacious & Rhythmic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-24">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;