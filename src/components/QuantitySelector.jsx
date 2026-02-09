import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, min = 1, max = 99 }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [animatingNum, setAnimatingNum] = useState(quantity);

  // Trigger animation when quantity changes
  useEffect(() => {
    setAnimatingNum(quantity);
  }, [quantity]);

  const handleDecrease = () => {
    if (quantity <= min) {
      // Trigger "Haptic Shake" (Visual Feedback for Error)
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
    } else {
      onDecrease();
    }
  };

  const handleIncrease = () => {
    if (quantity >= max) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
    } else {
      onIncrease();
    }
  };

  return (
    <div className={`flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-2 py-2 transition-all duration-300 ${isShaking ? 'border-red-500/50' : 'hover:border-white/30'}`}>
      
      {/* Decrease Button (Tactile) */}
      <button 
        onClick={handleDecrease}
        className="w-8 h-8 rounded-full flex items-center justify-center text-bone hover:bg-white/10 active:scale-75 transition-all"
      >
        <Minus size={14} />
      </button>

      {/* The Number (Slot Machine Effect) */}
      <div className={`w-6 text-center font-sans font-medium text-bone overflow-hidden ${isShaking ? 'animate-shake' : ''}`}>
        {/* We use a key to force re-render animation on change */}
        <span key={quantity} className="block animate-slide-num">
          {quantity}
        </span>
      </div>

      {/* Increase Button (Tactile) */}
      <button 
        onClick={handleIncrease}
        className="w-8 h-8 rounded-full flex items-center justify-center text-bone hover:bg-white/10 active:scale-75 transition-all"
      >
        <Plus size={14} />
      </button>

    </div>
  );
};

export default QuantitySelector;