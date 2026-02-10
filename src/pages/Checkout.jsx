import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { ArrowLeft, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO'; // Don't forget SEO on checkout!

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // 1. SECURITY: Read from Environment Variable
  const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
  console.log("Target Script URL:", SCRIPT_URL); // Debugging Log

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    _gotcha: '' // 2. SECURITY: The Honeypot Field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3. SECURITY: Bot Trap Check
    // If the hidden field has a value, it's a bot. silently fail.
    if (formData._gotcha) {
      console.log("Spam detected");
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/');
      }, 1000);
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity
      })),
      total: cartTotal,
      orderDate: new Date().toISOString()
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      clearCart();
      showNotification("Enquiry Sent Successfully");
      navigate('/');

    } catch (error) {
      console.error("Error submitting order", error);
      showNotification("Connection Error. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/collections');
    return null;
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20 px-6 animate-fade-up">
      <SEO title="Secure Checkout" />

      <div className="container mx-auto max-w-6xl">
        <Button
          onClick={() => navigate('/cart')}
          variant="ghost"
          size="sm"
          icon={ArrowLeft}
          className="mb-8 px-0 hover:bg-transparent"
        >
          Return to Cart
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          <div className="lg:col-span-7 space-y-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-serif italic text-bone mb-2">Finalize Enquiry</h1>
              <div className="flex items-center gap-2 text-bronze text-xs uppercase tracking-widest">
                <Lock size={12} /> Concierge Service
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* HONEYPOT FIELD (Hidden from humans, visible to bots) */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              {/* ... Real Fields ... */}
              <div className="relative border-b border-white/20 focus-within:border-bronze transition-colors">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="block w-full bg-transparent py-3 text-bone outline-none peer font-serif italic text-lg"
                />
                <label className="absolute left-0 top-3 text-ash text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] pointer-events-none">
                  Full Name
                </label>
              </div>

              <div className="relative border-b border-white/20 focus-within:border-bronze transition-colors">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="block w-full bg-transparent py-3 text-bone outline-none peer font-serif italic text-lg"
                />
                <label className="absolute left-0 top-3 text-ash text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] pointer-events-none">
                  Email Address
                </label>
              </div>

              <div className="relative border-b border-white/20 focus-within:border-bronze transition-colors">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="block w-full bg-transparent py-3 text-bone outline-none peer font-serif italic text-lg"
                />
                <label className="absolute left-0 top-3 text-ash text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] pointer-events-none">
                  Phone Number
                </label>
              </div>

              <div className="relative border-b border-white/20 focus-within:border-bronze transition-colors">
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="block w-full bg-transparent py-3 text-bone outline-none peer font-serif italic text-lg resize-none"
                />
                <label className="absolute left-0 top-3 text-ash text-xs uppercase tracking-widest transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-bronze peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] pointer-events-none">
                  Special Requests (Optional)
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                variant="primary"
                size="lg"
                className="w-full"
                icon={ArrowRight}
                iconPosition="right"
              >
                {isSubmitting ? "Processing" : "Send Enquiry"}
              </Button>

            </form>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="bg-[#151515] p-8 border border-white/5 rounded-xl sticky top-32">
              <h3 className="text-xl font-serif italic text-bone mb-6">Your Selection</h3>

              <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-white/5 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-bone font-serif italic">{item.name}</p>
                      <p className="text-[10px] uppercase text-ash tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-bone text-sm">{item.formattedPrice}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                <span className="text-ash text-xs uppercase tracking-widest">Estimated Total</span>
                <span className="text-2xl text-bone font-serif italic">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;