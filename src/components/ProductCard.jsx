import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from './Button';
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

        {/* Quick Add - Labelled Button */}
        <div className="absolute bottom-4 left-0 w-full px-4 flex justify-center z-20">
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="sm"
            className="w-full shadow-xl bg-bone/90 backdrop-blur-sm hover:!bg-bronze text-[10px] !text-black hover:!text-black py-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hidden md:flex"
            icon={Plus}
          >
            Add to Cart
          </Button>

          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="sm"
            className="md:hidden w-10 h-10 p-0 rounded-full flex items-center justify-center shadow-lg active:scale-95 absolute bottom-3 right-3"
          >
            <Plus size={16} />
          </Button>
        </div>
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