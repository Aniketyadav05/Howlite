import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className={`min-h-screen bg-obsidian pt-32 pb-20 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left: The "Letter" Form */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium">
                Concierge Service
              </span>
              <h1 className="text-5xl md:text-7xl font-serif italic text-bone leading-none">
                Get in Touch
              </h1>
              <p className="text-ash font-light text-lg max-w-md leading-relaxed">
                Whether you are looking for a specific gemstone, a custom commission, or simply have a question, our atelier is at your disposal.
              </p>
            </div>

            <form className="space-y-12 pt-8" onSubmit={(e) => e.preventDefault()}>
              {/* Name */}
              <div className="relative border-b border-white/20 group focus-within:border-bronze transition-colors duration-500">
                <input 
                  type="text" 
                  placeholder=" " 
                  className="block w-full bg-transparent py-4 text-xl text-bone outline-none peer font-serif italic"
                />
                <label className="absolute left-0 top-4 text-ash text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text pointer-events-none">
                  Your Name
                </label>
              </div>

              {/* Email */}
              <div className="relative border-b border-white/20 group focus-within:border-bronze transition-colors duration-500">
                <input 
                  type="email" 
                  placeholder=" " 
                  className="block w-full bg-transparent py-4 text-xl text-bone outline-none peer font-serif italic"
                />
                <label className="absolute left-0 top-4 text-ash text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text pointer-events-none">
                  Email Address
                </label>
              </div>

              {/* Message */}
              <div className="relative border-b border-white/20 group focus-within:border-bronze transition-colors duration-500">
                <textarea 
                  rows="4" 
                  placeholder=" " 
                  className="block w-full bg-transparent py-4 text-xl text-bone outline-none peer font-serif italic resize-none"
                ></textarea>
                <label className="absolute left-0 top-4 text-ash text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-focus:uppercase peer-focus:tracking-widest peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-widest cursor-text pointer-events-none">
                  How can we help?
                </label>
              </div>

              {/* Submit Button */}
              <button className="px-12 py-5 bg-bone text-obsidian rounded-full text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-bronze hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,139,96,0.4)]">
                Send Request
              </button>
            </form>
          </div>

          {/* Right: The Info Card */}
          <div className="relative lg:h-[80vh] w-full hidden lg:block">
            <div className="absolute inset-0 bg-[#151515] rounded-3xl overflow-hidden border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1617038224558-28759b175787?q=80&w=2574&auto=format&fit=crop" 
                alt="Atelier" 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 reveal-img"
              />
              
              {/* Floating Contact Details */}
              <div className="absolute bottom-12 left-12 space-y-6 bg-obsidian/40 backdrop-blur-md p-8 border border-white/10 rounded-sm">
                 <div>
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-bronze mb-2">Atelier</h5>
                    <p className="text-bone font-serif text-lg italic">Jaipur, Rajasthan<br/>India</p>
                 </div>
                 <div>
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-bronze mb-2">Direct Line</h5>
                    <p className="text-bone font-serif text-lg italic">+91 987 654 3210</p>
                 </div>
                 <div>
                    <h5 className="text-[10px] uppercase tracking-[0.2em] text-bronze mb-2">Email</h5>
                    <p className="text-bone font-serif text-lg italic">concierge@howlite.com</p>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;