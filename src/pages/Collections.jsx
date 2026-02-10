import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

import PageTransition from '../components/PageTransition'; // Added Import
import FadeIn from '../components/FadeIn'; // Added Import

const Collections = () => {
  const [filter, setFilter] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === filter));
    }
  }, [filter]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian pt-32 pb-24 px-6">
        <div className="container mx-auto">

          {/* 1. Header Section */}
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-serif italic text-bone leading-none">
                  The Collection
                </h1>
                <p className="text-ash text-sm md:text-base font-light max-w-md leading-relaxed">
                  Timeless artifacts forged from the earth's most precious materials.
                </p>
              </div>

              {/* UX FIX: Scrollable, Touch-Friendly Filters */}
              <div className="overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0">
                <div className="flex gap-4 md:gap-8 min-w-max border-b border-white/10">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`
                        relative pb-4 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300
                        ${filter === cat ? 'text-bronze' : 'text-ash hover:text-white'}
                      `}
                    >
                      {cat}
                      {/* Animated Underline */}
                      <span className={`absolute bottom-0 left-0 h-[1px] bg-bronze transition-all duration-300 ${filter === cat ? 'w-full' : 'w-0'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 2. Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.05} className="h-full">
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>

          {/* UX FIX: Empty State with Action */}
          {filteredProducts.length === 0 && (
            <div className="py-32 flex flex-col items-center justify-center text-center space-y-4 border border-white/5 rounded-lg bg-white/5">
              <p className="text-ash font-serif italic text-xl">
                No artifacts found in this category.
              </p>
              <button
                onClick={() => setFilter('All')}
                className="text-[10px] uppercase tracking-widest text-bone border-b border-bone pb-1 hover:text-bronze hover:border-bronze transition-colors"
              >
                View All Works
              </button>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default Collections;