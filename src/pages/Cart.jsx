import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <--- IMPORT useNavigate
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate(); // <--- INIT HOOK

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center space-y-6 pt-20">
        <h2 className="text-3xl md:text-4xl font-serif italic text-bone">Your cart is empty.</h2>
        <Link to="/collections" className="text-[10px] uppercase tracking-[0.25em] text-bronze border-b border-bronze pb-1 hover:text-white hover:border-white transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-24 md:pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-5xl">
        
        <h1 className="text-4xl md:text-6xl font-serif italic text-bone mb-12 md:mb-16">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Items List */}
          <div className="lg:col-span-8 space-y-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 md:gap-6 py-6 border-b border-white/5 items-center group">
                
                <Link to={`/product/${item.id}`} className="w-20 h-20 md:w-24 md:h-24 bg-[#151515] rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </Link>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg md:text-xl font-serif text-bone leading-tight">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </h3>
                    <span className="text-sm font-light text-bone">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-ash mb-4">{item.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-ash hover:text-white transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="text-xs w-4 text-center text-bone">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-ash hover:text-white transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="text-[10px] uppercase tracking-widest text-ash/50 hover:text-error transition-colors flex items-center gap-1">
                      <Trash2 size={12} /> <span className="hidden md:inline">Remove</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4 h-fit bg-[#151515] p-6 md:p-8 space-y-8 sticky top-32 border border-white/5 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-serif italic text-bone">Order Summary</h3>
            
            <div className="space-y-4 border-b border-white/10 pb-6">
              <div className="flex justify-between text-sm text-ash">
                <span>Subtotal</span>
                <span className="text-bone">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-ash">
                <span>Shipping</span>
                <span className="text-bone">Calculated next</span>
              </div>
            </div>

            <div className="flex justify-between text-lg text-bone font-medium">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            {/* FIXED: Simply navigate to /checkout */}
            <button 
              onClick={() => navigate('/checkout')} 
              className="w-full py-4 bg-bone text-obsidian text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-bronze hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Proceed to Checkout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            
            <p className="text-[10px] text-ash text-center leading-relaxed">
              Secure checkout. Duties and taxes calculated at next step.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;