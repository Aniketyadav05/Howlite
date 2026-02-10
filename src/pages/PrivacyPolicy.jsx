import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => setIsLoaded(true), 100);
    }, []);

    return (
        <div className={`min-h-screen bg-obsidian text-bone pt-32 pb-20 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <SEO
                title="Privacy Policy | Howlite"
                description="Our commitment to your privacy."
                url="/privacy-policy"
            />

            <div className="container mx-auto px-6 max-w-4xl">
                <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium block mb-6 animate-slide-num">
                    Legal
                </span>
                <h1 className="text-5xl md:text-7xl font-serif italic text-bone mb-12 animate-fade-up">
                    Privacy Policy
                </h1>

                <div className="space-y-8 text-ash font-light leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <p>
                        At Howlite, we respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you as to how we look after your personal data when you visit our website
                        (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2 className="text-2xl font-serif text-bone mt-8 mb-4">1. Important Information</h2>
                    <p>
                        This privacy policy aims to give you information on how Howlite collects and processes your personal data
                        through your use of this website, including any data you may provide through this website when you sign up
                        to our newsletter, purchase a product or service or take part in a competition.
                    </p>

                    <h2 className="text-2xl font-serif text-bone mt-8 mb-4">2. The Data We Collect</h2>
                    <p>
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier.</li>
                        <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                        <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
                        <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                    </ul>

                    <h2 className="text-2xl font-serif text-bone mt-8 mb-4">3. How We Use Your Data</h2>
                    <p>
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                    </ul>

                    <p className="mt-8 text-sm opacity-60">
                        Last updated: February 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
