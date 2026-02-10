import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import Button from './Button';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-bone pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">

        {/* Top Section: CTA & Branding */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
          <div className="max-w-xl space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif italic leading-none">
              Join the inner circle.
            </h2>
            <p className="text-ash font-light text-sm tracking-wide leading-relaxed">
              Receive early access to new collections, exclusive events, and the stories behind our stones.
            </p>

            {/* Minimal Input */}
            <div className="flex items-end gap-4 border-b border-white/20 pb-4 pt-8 w-full max-w-md group focus-within:border-bronze transition-colors duration-500">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent w-full outline-none text-bone placeholder-white/20 text-lg font-serif italic"
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-[10px] uppercase tracking-[0.25em] text-ash group-focus-within:text-bronze hover:text-white px-0"
              >
                Subscribe
              </Button>
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-bronze">Explore</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Collections', path: '/collections' },
                  { name: 'New Arrivals', path: '/collections?sort=new' },
                  { name: 'Bespoke', path: '/bespoke' },
                  { name: 'Gifts', path: '/gifts' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-ash hover:text-white transition-colors hover-underline-animation">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-bronze">Support</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Contact', path: '/contact' },
                  { name: 'Size Guide', path: '/size-guide' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-sm text-ash hover:text-white transition-colors hover-underline-animation">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.25em] text-bronze">Social</h4>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-ash hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300">
                    <Icon size={16} strokeWidth={1} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Big Brand Name */}
        <div className="border-t border-white/5 pt-12 flex flex-col items-center">
          <h1 className="text-[12vw] md:text-[14vw] leading-[0.8] font-serif text-[#151515] select-none pointer-events-none">
            HOWLITE
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 text-[10px] text-white/20 uppercase tracking-widest gap-4">
          <span>© 2024 Howlite Jewellery. All Rights Reserved.</span>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;