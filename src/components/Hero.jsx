import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from './Button';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[100dvh] flex items-center bg-obsidian overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(40,40,40,0.4),transparent_50%)]" />

      {/* Container: Matches Navbar perfectly (px-6) */}
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10 pt-24 lg:pt-0">

        {/* --- LEFT: Typography --- */}
        <div className={`lg:col-span-5 space-y-6 lg:space-y-8 transition-opacity duration-700 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="overflow-hidden">
            <span className="block text-bronze text-[10px] uppercase tracking-[0.4em] font-medium animate-slide-num">
              Est. 2024 — Jaipur
            </span>
          </div>

          <div className="overflow-hidden">
            {/* Tighter leading for better alignment */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-bone leading-[0.95] animate-fade-up">
              Quiet <br />
              Luxury.
            </h1>
          </div>

          <div className="max-w-md overflow-hidden">
            <p className="text-ash text-base md:text-lg font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Handcrafted from 100% recycled 18k gold and ethically sourced obsidian.
              Designed for those who find beauty in the shadows.
            </p>
          </div>

          <div className="pt-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button
              to="/collections"
              variant="primary"
              size="lg"
              icon={ArrowRight}
            >
              Explore Collection
            </Button>
          </div>
        </div>

        {/* --- RIGHT: Dual Image Composition --- */}
        <div className={`lg:col-span-7 relative h-[50vh] lg:h-[80vh] w-full animate-scale-slow transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>

          {/* GIRL IMAGE */}
          <div className="absolute top-0 right-0 w-[60%] h-[90%] z-10">
            <div className="w-full h-full rounded-[40px] md:rounded-[80px] rounded-tr-none overflow-hidden border border-white/5 bg-[#151515]">
              <img
                src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2670&auto=format&fit=crop"
                alt="Model"
                fetchPriority="high" // <--- CRITICAL SEO FIX
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-[1.5s] ease-out reveal-img"
              />
            </div>
          </div>

          {/* PRODUCT IMAGE */}
          <div className="absolute bottom-4 left-0 w-[45%] aspect-[3/4] z-20">
            <div className="w-full h-full rounded-[40px] md:rounded-[60px] rounded-bl-none overflow-hidden border border-white/10 shadow-2xl bg-[#151515]">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2670&auto=format&fit=crop"
                alt="Ring"
                loading="eager" // Ensure it loads immediately
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1.5s] ease-out reveal-img"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;