import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative flex flex-col gap-3">
      {/* Image Container - Aspect 3/4 is cleaner/shorter than 4/5 */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-[#151515] rounded-xl border border-white/5">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s] ease-out"
        />
        
        {/* Badge */}
        {product.isNew && (
          <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest text-obsidian bg-white/90 backdrop-blur-md px-2 py-1 rounded-sm">
            New
          </span>
        )}

        {/* Quick Add - Always visible on mobile, hover on desktop */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-white text-obsidian rounded-full flex items-center justify-center 
            shadow-lg cursor-pointer z-20
            transform transition-all duration-300
            md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100
            hover:bg-bronze hover:text-white active:scale-95"
        >
          <Plus size={18} />
        </button>
      </Link>

      {/* Concise Details */}
      <div className="flex justify-between items-start px-1">
        <div>
          <h3 className="text-base font-serif text-bone group-hover:text-bronze transition-colors leading-tight">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-[10px] uppercase tracking-widest text-ash mt-1">{product.category}</p>
        </div>
        <span className="text-sm font-medium text-bone">{product.formattedPrice}</span>
      </div>
    </div>
  );
};

export default ProductCard;