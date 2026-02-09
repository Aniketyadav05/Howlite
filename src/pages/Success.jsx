import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Import context

const Success = () => {
  const { clearCart } = useCart();

  // Clear the cart when this page loads
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ivory text-center px-4 animate-fade-in">
      <div className="mb-6 text-gold animate-bounce">
        <CheckCircle size={64} strokeWidth={1} />
      </div>
      <h1 className="text-4xl md:text-5xl font-serif text-charcoal mb-4">Thank You</h1>
      <p className="text-stone max-w-md mb-8">
        Your enquiry has been received. Our concierge team will review your request and contact you shortly via WhatsApp or Email.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 border border-charcoal text-charcoal uppercase text-xs tracking-[0.2em] hover:bg-charcoal hover:text-white transition-all duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Success;