import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight } from 'lucide-react';

import PageTransition from '../components/PageTransition';

const Bespoke = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-obsidian text-bone pt-32 pb-20">
                <SEO
                    title="Bespoke | Howlite"
                    description="Custom commissioned jewellery, designed uniquely for you."
                    url="/bespoke"
                />

                <div className="container mx-auto px-6">

                    {/* Split Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-[60vh]">

                        {/* Left: Text */}
                        <div className="space-y-8 animate-fade-up">
                            <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium block">
                                Commissions
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif italic text-bone leading-tight">
                                Designed <br /> Only For You.
                            </h1>
                            <p className="text-ash font-light text-lg leading-relaxed max-w-md">
                                The Bespoke service invites you to collaborate with our artisans to create a one-of-a-kind piece.
                                Whether repurposing an heirloom or starting from a sketch, we bring your vision to life in 18k Gold and precious stones.
                            </p>

                            <div className="pt-8">
                                <Link to="/contact" className="inline-flex items-center gap-4 text-white border border-white/20 px-8 py-4 uppercase text-xs tracking-widest hover:bg-white hover:text-obsidian transition-colors">
                                    Start a Consultation <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* Right: Image */}
                        <div className="relative aspect-[4/5] bg-[#151515] overflow-hidden rounded-sm animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <img
                                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2670&auto=format&fit=crop"
                                alt="Bespoke Design Process"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute bottom-6 left-6 border border-white/20 backdrop-blur-sm px-4 py-2">
                                <span className="text-[10px] uppercase tracking-widest text-white">Atelier / 2024</span>
                            </div>
                        </div>

                    </div>

                    {/* Process Steps */}
                    <div className="mt-32 border-t border-white/5 pt-24">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                            <div className="space-y-4">
                                <span className="text-4xl font-serif italic text-bronze">01.</span>
                                <h3 className="text-xl text-white uppercase tracking-widest">Consultation</h3>
                                <p className="text-ash text-sm px-8">We meet virtually or in-person to discuss your vision, inspirations, and budget.</p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-4xl font-serif italic text-bronze">02.</span>
                                <h3 className="text-xl text-white uppercase tracking-widest">Design</h3>
                                <p className="text-ash text-sm px-8">Our designers create detailed sketches and 3D renders for your approval.</p>
                            </div>
                            <div className="space-y-4">
                                <span className="text-4xl font-serif italic text-bronze">03.</span>
                                <h3 className="text-xl text-white uppercase tracking-widest">Creation</h3>
                                <p className="text-ash text-sm px-8">Our master craftsmen bring the design to life using ethically sourced materials.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Bespoke;
