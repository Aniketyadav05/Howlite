import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ArrowLeft, Star, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import SEO from '../components/SEO';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition'; // Added Import
import FadeIn from '../components/FadeIn'; // Added Import

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="min-h-screen bg-obsidian text-bone flex items-center justify-center">Product not found</div>;

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian">
        <SEO
          title={product.name}
          description={product.description}
          image={product.image}
          url={`/product/${product.id}`}
          type="product"
          product={product} // Triggers JSON-LD generation
        />
        {/* Navbar Buffer */}
        <div className="pt-24 md:pt-32 pb-12">
          <div className="container mx-auto px-6">

            <Button
              to="/collections"
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
              className="mb-6 px-0 hover:bg-transparent"
            >
              Back
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">

              {/* --- LEFT: Image Gallery --- */}
              {/* Mobile: Height restricted to 45vh so content appears below. Desktop: Sticky. */}
              <div className="relative h-[45vh] md:h-auto md:sticky md:top-32 aspect-[3/4] md:aspect-[4/5] bg-[#151515] rounded-lg overflow-hidden border border-white/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover reveal-img"
                />
                <div className="absolute bottom-4 left-4 bg-obsidian/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-white flex items-center gap-1">
                    <Star size={10} className="fill-bronze text-bronze" /> 4.9 (128 Reviews)
                  </span>
                </div>
              </div>

              {/* --- RIGHT: Buy Box (Compact) --- */}
              <div className="flex flex-col space-y-6 md:pr-12">

                {/* Header */}
                <div className="space-y-2">
                  <span className="text-bronze text-[10px] uppercase tracking-[0.3em] font-medium">{product.category}</span>
                  <h1 className="text-3xl md:text-5xl font-serif italic text-bone leading-tight">{product.name}</h1>
                  <p className="text-2xl font-light text-bone pt-2">{product.formattedPrice}</p>
                </div>

                {/* Short Description */}
                <p className="text-ash font-light text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                  {product.description} An artifact of silence, crafted for those who speak without words.
                </p>

                {/* CONTROLS (The Amazon Box) */}
                <div className="bg-[#151515] border border-white/5 p-6 rounded-xl space-y-6 shadow-2xl">

                  {/* Quantity */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-ash">Quantity</span>
                    <div className="flex items-center bg-obsidian border border-white/10 rounded-full px-1">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:text-bronze text-ash transition-colors"><Minus size={14} /></button>
                      <span className="text-bone w-6 text-center text-sm font-medium">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:text-bronze text-ash transition-colors"><Plus size={14} /></button>
                    </div>
                  </div>

                  {/* Primary Action */}
                  {/* Primary Action */}
                  <Button
                    onClick={() => addToCart({ ...product, quantity })}
                    variant="primary"
                    className="w-full text-black"
                  >
                    Add to Cart
                  </Button>

                  {/* Trust Signals */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2 text-ash/60">
                      <Truck size={14} /> <span className="text-[10px] uppercase tracking-widest">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-ash/60">
                      <ShieldCheck size={14} /> <span className="text-[10px] uppercase tracking-widest">Lifetime Warranty</span>
                    </div>
                  </div>
                </div>

                {/* Accordions (Details) */}
                <div className="space-y-2 pt-4">
                  <button onClick={() => setActiveTab(activeTab === 'details' ? '' : 'details')} className="w-full flex justify-between items-center py-3 border-b border-white/10 text-xs uppercase tracking-widest text-ash hover:text-bone">
                    <span>Materials & Origins</span>
                    <Plus size={14} className={`transition-transform ${activeTab === 'details' ? 'rotate-45' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeTab === 'details' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-ash pt-2 pb-4">100% Recycled 18k Gold. Ethically sourced Obsidian from volcanic regions.</p>
                  </div>

                  <button onClick={() => setActiveTab(activeTab === 'care' ? '' : 'care')} className="w-full flex justify-between items-center py-3 border-b border-white/10 text-xs uppercase tracking-widest text-ash hover:text-bone">
                    <span>Care Instructions</span>
                    <Plus size={14} className={`transition-transform ${activeTab === 'care' ? 'rotate-45' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeTab === 'care' ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-ash pt-2 pb-4">Store in provided velvet pouch. Avoid perfumes and chlorine.</p>
                  </div>
                </div>

              </div>


            </div>
          </div>

          {/* --- RELATED PRODUCTS (Full Width) --- */}
          <div className="mt-24 md:mt-32 border-t border-white/5 pt-16 animate-fade-up">
            <h3 className="text-2xl md:text-3xl font-serif italic text-bone mb-8 text-center">You May Also Adore</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id)
                .sort((a, b) => (a.category === product.category ? -1 : 1))
                .slice(0, 4)
                .map((related) => (
                  <Link key={related.id} to={`/product/${related.id}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[#151515] mb-4">
                      <img
                        src={related.image}
                        alt={related.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      {related.isNew && (
                        <div className="absolute top-2 left-2 bg-bronze/90 text-obsidian text-[9px] uppercase tracking-widest px-2 py-1">
                          New Arrival
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-serif italic text-lg text-bone group-hover:text-bronze transition-colors">{related.name}</h4>
                      <p className="text-ash text-sm mt-1">{related.formattedPrice}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default ProductDetail;