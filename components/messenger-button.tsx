'use client';

import { useState } from 'react';
import { FaFacebookMessenger } from 'react-icons/fa';

interface MessengerButtonProps {
  pageId?: string;
  message?: string;
}

export function MessengerButton({ 
  pageId = '852523554609766', 
  message = 'Hello! I would like to learn more about your spiritual services.' 
}: MessengerButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Facebook Messenger link format
  const messengerUrl = `https://m.me/${pageId}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={messengerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Contact us on Facebook Messenger"
    >
      {/* Tooltip */}
      <div
        className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-ink-900 text-parchment-100 px-4 py-2 rounded-ritual font-serif text-sm shadow-lg transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        <span className="block font-cinzel text-mystical-amber">Message us</span>
        <span className="text-xs text-parchment-200">Facebook Messenger</span>
        {/* Arrow */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-ink-900" />
      </div>

      {/* Button */}
      <div className="relative">
        {/* Glow effect */}
        <div 
          className={`absolute inset-0 rounded-full bg-blue-500 blur-md transition-all duration-300 ${
            isHovered ? 'opacity-60 scale-110' : 'opacity-30'
          }`} 
        />
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
        
        {/* Main button */}
        <div 
          className={`relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-blue-400 to-blue-600 shadow-lg transition-all duration-300 ${
            isHovered ? 'scale-110 shadow-xl shadow-blue-500/30' : 'scale-100'
          }`}
        >
          <FaFacebookMessenger className="w-7 h-7 text-white" />
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
