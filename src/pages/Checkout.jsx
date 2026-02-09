import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { ArrowLeft, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  
  // YOUR GOOGLE SCRIPT URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx1uAs0Auf6KEK8ATF9Xv9oJNUAqG4ZzNv_om5Pu_EUgtApV9bF3-DWVkaK_KPIDrYe/exec"; 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Prepare Payload
    const orderPayload = {
      ...formData,
      items: cartItems.map(item => ({ 
        name: item.name, 
        quantity: item.quantity 
      })),
      total: cartTotal,
      orderDate: new Date().toISOString()
    };

    try {
      // 2. Send to Google Sheets
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      // 3. Success Actions
      clearCart(); // Clear the cart context
      showNotification("Enquiry Sent Successfully");
      navigate('/'); // Redirect to Home (or create a /success page if you prefer)

    } catch (error) {
      console.error("Error submitting order", error);
      showNotification("Connection Error. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate('/collections');
    return null;
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 pb-20 px-6 animate-fade-up">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Button */}
        <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-ash hover:text-bone text-[10px] uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft size={14} /> Return to Cart
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT: Contact Form (Dark Theme) */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h1 className="text-3xl md:text-5xl font-serif italic text-bone mb-2">Finalize Enquiry</h1>
              <div className="flex items-center gap-2 text-bronze text-xs uppercase tracking-widest">
                <Lock size={12} /> Concierge Service
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Name */}
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

              {/* Email */}
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

              {/* Phone */}
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

              {/* Message */}
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

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-bone text-obsidian text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-bronze hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Processing <Loader2 size={14} className="animate-spin"/></>
                ) : (
                  <>Send Enquiry <ArrowRight size={14} /></>
                )}
              </button>

            </form>
          </div>

          {/* RIGHT: Order Summary (Sticky) */}
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