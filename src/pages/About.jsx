import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className={`min-h-screen bg-obsidian text-bone pt-32 pb-20 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* 1. THE MANIFESTO (Hero) */}
      <div className="container mx-auto px-6 mb-32">
        <div className="max-w-4xl">
          <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium block mb-6 animate-slide-num">
            The Philosophy
          </span>
          <h1 className="text-5xl md:text-8xl font-serif italic leading-[0.9] text-bone mb-12 animate-fade-up">
            We believe beauty <br />
            is found in the <br />
            <span className="text-ash">shadows.</span>
          </h1>
          <div className="max-w-xl ml-auto border-l border-white/20 pl-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg font-light leading-relaxed text-ash">
              Howlite was born from a desire to strip away the excess. 
              In a world of noise, we choose silence. In a world of fast fashion, 
              we choose slow, deliberate craftsmanship. Every piece is a study in 
              contrast—light and dark, rough and polished, ancient and modern.
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE ATELIER (Image Grid) */}
      <div className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Tall Image (Left) */}
          <div className="md:col-span-5 relative group">
            <div className="aspect-[3/4] overflow-hidden rounded-sm bg-[#151515]">
              <img 
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2675&auto=format&fit=crop" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s] ease-out reveal-img"
              />
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-widest text-ash">
              Fig. 01 — The Casting Process
            </p>
          </div>

          {/* Text & Small Image (Right) */}
          <div className="md:col-span-6 md:col-start-7 space-y-16">
             <div className="aspect-video overflow-hidden rounded-sm relative group bg-[#151515]">
                <img 
                  src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop" 
                  alt="Detail" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 reveal-img"
                />
             </div>
             
             <div className="space-y-6">
               <h2 className="text-4xl font-serif italic text-white">Ethical Alchemy.</h2>
               <p className="text-ash font-light leading-relaxed">
                 We work exclusively with 100% Recycled 18k Gold and Sterling Silver. 
                 Our stones are ethically sourced, conflict-free, and hand-selected for their unique character. 
                 We believe luxury should not cost the earth.
               </p>
               <Link to="/collections" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] border-b border-bronze pb-1 hover:text-bronze transition-colors">
                 View The Collection <ArrowRight size={14} />
               </Link>
             </div>
          </div>

        </div>
      </div>

      {/* 3. THE STATS (Minimalist Data) */}
      <div className="border-t border-white/5 bg-[#0A0A0A] py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            <div className="space-y-4 group cursor-default">
              <h3 className="text-6xl font-serif text-white group-hover:text-bronze transition-colors duration-500">100%</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ash">Recycled Metals</p>
            </div>

            <div className="space-y-4 group cursor-default">
              <h3 className="text-6xl font-serif text-white group-hover:text-bronze transition-colors duration-500">Jaipur</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ash">Handcrafted in India</p>
            </div>

            <div className="space-y-4 group cursor-default">
              <h3 className="text-6xl font-serif text-white group-hover:text-bronze transition-colors duration-500">Lifetime</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ash">Warranty Care</p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. THE SIGNATURE */}
      <div className="container mx-auto px-6 py-32 text-center">
        <p className="text-xl font-serif italic text-ash mb-8">
          "Jewellery is the armor we wear to face the world."
        </p>
        <div className="inline-block border border-white/10 px-12 py-8 relative">
           <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-bronze"></span>
           <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-bronze"></span>
           <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-bronze"></span>
           <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-bronze"></span>
           
           <h2 className="text-2xl uppercase tracking-[0.5em] text-bone font-light">
             Howlite
           </h2>
           <span className="block mt-2 text-[8px] uppercase tracking-widest text-ash">
             Est. 2024
           </span>
        </div>
      </div>

    </div>
  );
};

export default About;