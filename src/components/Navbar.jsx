import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import Button from './Button';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  // 1. Close menu automatically when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // 2. Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // 3. Detect Scroll for Glass Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* --- HEADER BAR (Always on Top) --- */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 border-b border-transparent
        ${scrolled || isOpen ? 'bg-obsidian/80 backdrop-blur-md border-white/5 py-4' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="relative z-[101]">
            <span className="text-xl md:text-2xl font-serif text-bone tracking-widest uppercase">
              Howlite
            </span>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {['Collections', 'About', 'Contact'].map((item) => (
              <Button
                key={item}
                to={`/${item.toLowerCase()}`}
                variant="ghost"
                size="sm"
                className="text-ash hover:text-bone"
              >
                {item}
              </Button>
            ))}
          </div>

          {/* Actions (Cart & Menu) */}
          <div className="flex items-center gap-6 relative z-[101]">
            <div className="relative">
              <Button to="/cart" variant="ghost" size="sm" className="px-2" aria-label="Cart">
                <ShoppingBag size={20} strokeWidth={1} />
              </Button>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-bronze text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full pointer-events-none">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden px-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY (The Fix) --- */}
      <div
        className={`fixed inset-0 z-[90] bg-obsidian transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
      >
        {/* Container with top padding to push content BELOW the logo */}
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 pt-20">

          {['Collections', 'About', 'Contact', 'Cart'].map((item, index) => (
            <Link
              key={item}
              to={item === 'Cart' ? '/cart' : `/${item.toLowerCase()}`}
              className={`text-4xl font-serif italic text-bone hover:text-bronze transition-all duration-500
                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}

          <div className={`pt-12 transition-all duration-700 delay-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-[10px] uppercase tracking-[0.3em] text-ash/50 text-center">
              Est. 2024 — Jaipur
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;