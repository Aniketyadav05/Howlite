import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  // Detect Scroll for Glass Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-obsidian/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* 1. Logo */}
        <Link to="/" className="text-2xl font-serif tracking-widest text-bone z-50 mix-blend-difference">
          HOWLITE
        </Link>

        {/* 2. Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {['Collections', 'About', 'Contact'].map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase()}`} 
              className="text-[10px] uppercase tracking-[0.2em] text-bone hover:text-bronze transition-colors hover-underline-animation"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* 3. Actions (Cart + Mobile Toggle) */}
        <div className="flex items-center gap-6 z-50">
          <Link to="/cart" className="relative group">
            <ShoppingBag size={20} className="text-bone group-hover:text-bronze transition-colors" strokeWidth={1} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-bronze text-obsidian text-[9px] flex items-center justify-center rounded-full font-medium">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Toggle Button (Visible only on mobile) */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-bone focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 4. Mobile Menu Overlay */}
        {/* ADDED 'md:hidden' here to ensure it disappears on desktop */}
        <div className={`md:hidden fixed inset-0 bg-obsidian flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
           {['Home', 'Collections', 'About', 'Contact'].map((item) => (
             <Link 
               key={item} 
               to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
               className="text-4xl font-serif italic text-bone hover:text-bronze transition-colors"
             >
               {item}
             </Link>
           ))}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;