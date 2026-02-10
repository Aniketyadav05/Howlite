import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { products } from '../data/products'; // Assuming we can reuse product data or filter it

import PageTransition from '../components/PageTransition';

const Gifts = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Simple filter for "giftable" items - for now just taking a subset
    const giftProducts = products.slice(0, 4);

    return (
        <PageTransition>
            <div className="min-h-screen bg-obsidian text-bone pt-32 pb-20">
                <SEO
                    title="Gifts | Howlite"
                    description="Curated gifts for the ones you cherish."
                    url="/gifts"
                />

                {/* Hero Section */}
                <div className="container mx-auto px-6 mb-24 text-center">
                    <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium block mb-6 animate-slide-num">
                        Curated
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif italic text-bone mb-8 animate-fade-up">
                        The Art of Giving
                    </h1>
                    <p className="max-w-2xl mx-auto text-ash font-light text-lg leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
                        Silence speaks volumes. Explore our curated selection of pieces designed to be cherished forever.
                        Each piece arrives in our signature velvet packaging, ready to be gifted.
                    </p>
                </div>

                {/* Gift Grid */}
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {giftProducts.map((product) => (
                            <Link key={product.id} to={`/product/${product.id}`} className="group block animate-fade-up">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#151515] mb-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-serif italic text-lg text-bone group-hover:text-bronze transition-colors">{product.name}</h4>
                                    <p className="text-ash text-sm mt-1">{product.formattedPrice}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Gift Services */}
                <div className="container mx-auto px-6 mt-32">
                    <div className="border border-white/10 p-12 text-center md:text-left md:flex justify-between items-center rounded-sm">
                        <div className="mb-8 md:mb-0">
                            <h3 className="text-3xl font-serif italic text-white mb-2">Personalization Service</h3>
                            <p className="text-ash font-light">Add a personal touch with our bespoke engraving service.</p>
                        </div>
                        <div>
                            <Link to="/contact" className="px-8 py-3 bg-white text-obsidian uppercase text-xs tracking-widest font-bold hover:bg-bronze transition-colors">
                                Contact Concierge
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </PageTransition >
    );
};

export default Gifts;
