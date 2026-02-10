import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';

import PageTransition from '../components/PageTransition';

const TermsOfUse = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-obsidian text-bone pt-32 pb-20">
                <SEO
                    title="Terms of Use | Howlite"
                    description="Terms and conditions for using the Howlite website."
                    url="/terms-of-use"
                />

                <div className="container mx-auto px-6 max-w-4xl">
                    <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium block mb-6 animate-slide-num">
                        Legal
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif italic text-bone mb-12 animate-fade-up">
                        Terms of Use
                    </h1>

                    <div className="space-y-8 text-ash font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        <p>
                            Welcome to Howlite. These terms and conditions outline the rules and regulations for the use of Howlite's Website.
                        </p>

                        <h2 className="text-2xl font-serif text-bone mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing this website we assume you accept these terms and conditions. Do not continue to use Howlite if you do not agree to take all of the terms and conditions stated on this page.
                        </p>

                        <h2 className="text-2xl font-serif text-bone mt-8 mb-4">2. Intelectual Property</h2>
                        <p>
                            Unless otherwise stated, Howlite and/or its licensors own the intellectual property rights for all material on Howlite. All intellectual property rights are reserved. You may access this from Howlite for your own personal use subjected to restrictions set in these terms and conditions.
                        </p>

                        <h2 className="text-2xl font-serif text-bone mt-8 mb-4">3. User Comments</h2>
                        <p>
                            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Howlite does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Howlite,its agents and/or affiliates.
                        </p>

                        <h2 className="text-2xl font-serif text-bone mt-8 mb-4">4. Product Descriptions</h2>
                        <p>
                            Howlite attempts to be as accurate as possible. However, Howlite does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by Howlite itself is not as described, your sole remedy is to return it in unused condition.
                        </p>

                        <p className="mt-8 text-sm opacity-60">
                            Last updated: February 2026
                        </p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default TermsOfUse;
