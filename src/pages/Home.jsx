import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO'; // <--- IMPORT
import { products } from '../data/products';

import PageTransition from '../components/PageTransition'; // Added Import
import FadeIn from '../components/FadeIn'; // Added Import

const Home = () => {
  const newArrivals = products.filter(p => p.isNew).slice(0, 3);

  return (
    <PageTransition>

      {/* Add SEO Data */}
      <SEO
        title="Quiet Luxury Jewellery"
        description="Discover Howlite. Handcrafted artefacts from 100% recycled gold and ethically sourced obsidian. Made in Jaipur."
      />

      <Hero />

      {/* ... rest of your Home component ... */}
      <section className="py-32 px-6 bg-obsidian relative z-10">
        {/* (Keep existing code unchanged) */}
        <div className="container mx-auto">
          <FadeIn>
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
                View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {newArrivals.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.1}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 md:hidden text-center">
            <Link to="/collections" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-ash hover:text-white transition-colors">
              View All Collections <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;