import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  // Replace with your actual phone number (International format without +)
  const PHONE_NUMBER = "1234567890"; 
  const message = "Hi Howlite, I have a query regarding your jewellery.";
  
  const link = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={link}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" className="text-white" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-white text-charcoal text-xs font-bold py-2 px-4 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppFloat;