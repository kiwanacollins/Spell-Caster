'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({ 
  phoneNumber = '15185607836', 
  message = 'Hello! I would like to learn more about your spiritual services.' 
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 bottom-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on WhatsApp"
    >
      {/* Tooltip */}
      <div
        className={`absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink-900 text-parchment-100 px-4 py-2 rounded-ritual font-serif text-sm shadow-lg transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
        }`}
      >
        <span className="block font-cinzel text-mystical-amber">Chat with us</span>
        <span className="text-xs text-parchment-200">+1 (518) 560-7836</span>
        {/* Arrow */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-ink-900" />
      </div>

      {/* Button */}
      <div className="relative">
        {/* Glow effect */}
        <div 
          className={`absolute inset-0 rounded-full bg-green-500 blur-md transition-all duration-300 ${
            isHovered ? 'opacity-60 scale-110' : 'opacity-30'
          }`} 
        />
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        
        {/* Main button */}
        <div 
          className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-green-400 to-green-600 shadow-lg transition-all duration-300 ${
            isHovered ? 'scale-110 shadow-xl shadow-green-500/30' : 'scale-100'
          }`}
        >
          <FaWhatsapp className="w-7 h-7 text-white" />
        </div>

        {/* Mystical accent ring */}
        <div 
          className={`absolute inset-0 rounded-full border-2 border-mystical-amber/50 transition-all duration-300 ${
            isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-0'
          }`} 
        />
      </div>
    </a>
  );
}
