import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Ruler, Minus } from 'lucide-react';
import SEO from '../components/SEO';

const SizeGuide = () => {
  const [activeTab, setActiveTab] = useState('rings');

  const categories = [
    { id: 'rings', label: 'Rings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'bracelets', label: 'Bracelets' },
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-32 pb-20 px-6 animate-fade-up">
      <SEO 
        title="Size Guide" 
        description="Find your perfect fit. A calm guide to measuring for rings, necklaces, and bracelets."
      />

      <div className="container mx-auto max-w-4xl">
        
        {/* --- Header --- */}
        <div className="text-center mb-16 space-y-6">
          <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium">
            Atelier Services
          </span>
          <h1 className="text-4xl md:text-6xl font-serif italic text-bone">
            Finding Your Fit
          </h1>
          <p className="text-ash font-light text-lg max-w-lg mx-auto leading-relaxed">
            Jewellery should feel like a second skin. Use this guide to find the size that sits most comfortably with you.
          </p>
        </div>

        {/* --- Category Tabs --- */}
        <div className="flex justify-center mb-16 border-b border-white/5">
          <div className="flex gap-8 md:gap-16 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`pb-4 text-[11px] uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap
                  ${activeTab === cat.id 
                    ? 'text-bronze border-b border-bronze' 
                    : 'text-ash hover:text-bone border-b border-transparent'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- Content Area --- */}
        <div className="min-h-[400px] transition-opacity duration-500">
          
          {/* 1. RINGS */}
          {activeTab === 'rings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 animate-fade-in">
              
              {/* Instructions */}
              <div className="space-y-8">
                <h3 className="text-2xl font-serif italic text-bone">Measuring at Home</h3>
                <div className="space-y-6 text-ash font-light leading-relaxed">
                  <p>
                    The most accurate fit is found at the end of the day when hands are warm. 
                  </p>
                  <ul className="space-y-4 border-l border-white/10 pl-6">
                    <li className="flex gap-4">
                      <span className="text-bronze font-serif italic">1.</span>
                      <span>Wrap a strip of paper or ribbon around the base of the finger.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-bronze font-serif italic">2.</span>
                      <span>Mark the point where the ends meet comfortably.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-bronze font-serif italic">3.</span>
                      <span>Measure the length against a ruler in millimeters.</span>
                    </li>
                  </ul>
                  <p className="text-sm italic opacity-80 pt-4">
                    Note: If you fall between sizes, we recommend opting for the larger size for a more comfortable fit.
                  </p>
                </div>
              </div>

              {/* Minimal Chart */}
              <div className="bg-[#151515] p-8 md:p-12 rounded-xl border border-white/5">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-ash mb-6 border-b border-white/10 pb-2">
                  <span>Circumference</span>
                  <span>US Size</span>
                </div>
                <div className="space-y-4">
                  {[
                    { mm: '52mm', size: '6' },
                    { mm: '54.5mm', size: '7' },
                    { mm: '57mm', size: '8' },
                    { mm: '59.5mm', size: '9' },
                    { mm: '62mm', size: '10' },
                  ].map((row) => (
                    <div key={row.size} className="flex justify-between text-bone font-serif text-lg py-2 border-b border-white/5 last:border-0">
                      <span>{row.mm}</span>
                      <span className="italic">{row.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. NECKLACES */}
          {activeTab === 'necklaces' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 animate-fade-in">
              
              <div className="space-y-8">
                <h3 className="text-2xl font-serif italic text-bone">The Drop</h3>
                <p className="text-ash font-light leading-relaxed">
                  Necklaces are measured by the full length of the chain. Use this guide to visualize where our standard lengths fall on the décolletage.
                </p>
                
                {/* Visual List */}
                <div className="space-y-8 pt-4">
                  {[
                    { len: '16"', name: 'Choker', desc: 'Sits at the hollow of the neck. Intimate and minimal.' },
                    { len: '18"', name: 'Princess', desc: 'Rests on the collarbone. Our most classic fit.' },
                    { len: '20"', name: 'Matinee', desc: 'Falls just below the collarbone. Ideal for layering.' },
                  ].map((item) => (
                    <div key={item.len} className="group">
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className="text-bronze font-serif text-xl italic">{item.len}</span>
                        <span className="text-bone text-xs uppercase tracking-widest">{item.name}</span>
                      </div>
                      <p className="text-ash/80 text-sm font-light pl-10 border-l border-white/10">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic Representation (CSS) */}
              <div className="relative bg-[#151515] rounded-xl border border-white/5 hidden md:flex items-center justify-center min-h-[400px]">
                 {/* Abstract Neckline */}
                 <div className="absolute top-12 w-32 h-32 border-b border-white/10 rounded-full"></div>
                 
                 {/* Chains */}
                 <div className="absolute top-12 w-40 h-40 border-b border-bronze/40 rounded-full flex items-end justify-center pb-2 text-[9px] text-bronze uppercase tracking-widest">16"</div>
                 <div className="absolute top-12 w-56 h-56 border-b border-white/20 rounded-full flex items-end justify-center pb-2 text-[9px] text-ash uppercase tracking-widest">18"</div>
                 <div className="absolute top-12 w-72 h-72 border-b border-white/20 rounded-full flex items-end justify-center pb-2 text-[9px] text-ash uppercase tracking-widest">20"</div>
              </div>

            </div>
          )}

          {/* 3. BRACELETS */}
          {activeTab === 'bracelets' && (
            <div className="max-w-2xl mx-auto space-y-12 animate-fade-in">
              <div className="text-center space-y-4">
                 <h3 className="text-2xl font-serif italic text-bone">Wrist & Drape</h3>
                 <p className="text-ash font-light leading-relaxed">
                   The fit of a bracelet defines its character.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#151515] p-8 rounded-xl border border-white/5 space-y-4 hover:border-bronze/30 transition-colors">
                  <span className="text-bronze text-[10px] uppercase tracking-widest">Step 1</span>
                  <h4 className="text-bone font-serif text-xl">Measure Tightly</h4>
                  <p className="text-ash text-sm font-light leading-relaxed">
                    Measure your wrist bone tightly with a measuring tape or strip of paper. Note the exact circumference.
                  </p>
                </div>

                <div className="bg-[#151515] p-8 rounded-xl border border-white/5 space-y-4 hover:border-bronze/30 transition-colors">
                   <span className="text-bronze text-[10px] uppercase tracking-widest">Step 2</span>
                   <h4 className="text-bone font-serif text-xl">Add Allowance</h4>
                   <p className="text-ash text-sm font-light leading-relaxed">
                     Add <span className="text-white font-medium">1.0cm</span> for a snug fit.<br/>
                     Add <span className="text-white font-medium">2.0cm</span> for a relaxed drape.
                   </p>
                </div>
              </div>

              <div className="text-center pt-8 border-t border-white/10">
                <p className="text-ash italic font-serif text-lg">
                  "Our cuffs are designed with a slight flex, allowing you to shape them gently to your wrist."
                </p>
              </div>
            </div>
          )}

        </div>

        {/* --- Footer / Concierge --- */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col items-center text-center space-y-6">
          <MessageCircle size={24} className="text-bronze" strokeWidth={1} />
          <div>
            <h3 className="text-xl font-serif italic text-bone mb-2">Unsure of your size?</h3>
            <p className="text-ash font-light text-sm max-w-md mx-auto">
              Our team in Jaipur is happy to assist with specific measurements, custom sizing requests, or guidance on fit.
            </p>
          </div>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-bone bg-white/5 px-8 py-3 rounded-full hover:bg-bronze hover:text-white transition-all duration-500"
          >
            Contact Concierge <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SizeGuide;